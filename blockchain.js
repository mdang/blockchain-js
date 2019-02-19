class Blockchain {
  constructor(genesisNode) {
    this.chain = [this.createGenesisBlock()]
    this.nodes = [+genesisNode]
    this.difficulty = 4
    this.pendingTransactions = []
    this.miningReward = 100
  }

  createGenesisBlock() {
    return new Block(new Date().getTime(), [], '0')
  }
}