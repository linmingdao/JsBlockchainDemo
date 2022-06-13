const { Block, BlockChain } = require("./src/Block");

let firstClain = new BlockChain();
firstClain.addBlock(new Block(0, "2022/06/22", { champion: "Spain" }));
firstClain.addBlock(new Block(1, "2022/06/23", { champion: "China" }));
firstClain.addBlock(new Block(2, "2022/06/25", { champion: "Japan" }));

// 检查是否有效(将会返回true)
console.log("firstClain valid? " + firstClain.isChainValid(), firstClain.chain);

// 现在尝试操作变更数据
firstClain.chain[1].data = { champion: "Korea" };

// 再次检查是否有效 (将会返回false)
console.log("firstClain valid? " + firstClain.isChainValid(), firstClain.chain);
