const crypto = require("crypto");

// 区块
class Block {
  constructor(previousHash, timestamp, data) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    // 工作量POW（proof-of-work）
    this.nonce = 0;
  }

  // 计算区块的哈希值
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
  }

  // 工作量计算
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

// 区块链
class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  // 创建当下时间的区块（创世块）
  createGenesisBlock() {
    return new Block(0, "2022/06/13 16:43:00", {});
  }

  // 获得区块链上最新的区块
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // 将新的区块添加到链上
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  // 验证区块链是否被篡改。
  // 遍历每个区块的hash值是否正确&&每个区块的指向previousHash是否正确。
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Block, BlockChain };
