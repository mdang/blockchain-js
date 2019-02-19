class Block {
  constructor(timestamp, transactions, previousHash='') {
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.transactions = transactions
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce.toString())
  }
}