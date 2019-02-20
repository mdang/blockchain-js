import SHA256 from 'crypto-js/sha256'

class Block {
  constructor(timestamp, transactions, previousHash='') {
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.transactions = transactions
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log(`BLOCK MINED: ${this.hash}`)  
  }
}

export default Block