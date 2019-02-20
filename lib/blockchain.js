import Block from './block'
import Transaction from './transaction'

class Blockchain {
  /**
   * @param {*} genesisNode URL on which you start the blockchain, set to port 4000 with global var
   */
  constructor(genesisNode) {
    this.chain = [this.createGenesisBlock()]
    this.nodes = [+genesisNode] // The + operator returns the numeric representation of the object
    this.difficulty = 4
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block(Date.parse('2019-02-19'), [], '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction)
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
    block.mineBlock(this.difficulty)

    this.chain.push(block)

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  isChainValid() {
    for (let i = 1, x = this.chain.length; i < x; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }

    return true
  }

  getBalanceOfAddress(address) {
    let balance = 0

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount
        }
      }
    }

    return balance
  }

}

export default Blockchain