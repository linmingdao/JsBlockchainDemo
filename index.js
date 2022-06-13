const { Block, BlockChain } = require("./src/Block");

let firstClain = new BlockChain();
firstClain.addBlock(new Block(0, "2022/06/22", { champion: "Spain" }));
firstClain.addBlock(new Block(1, "2022/06/23", { champion: "China" }));

// 检查是否有效(将会返回true)
console.log("firstClain valid? " + firstClain.isChainValid(), firstClain.chain);

// 现在尝试操作变更数据
firstClain.chain[1].data = { champion: "korea" };

// 再次检查是否有效 (将会返回false)
console.log("firstClain valid? " + firstClain.isChainValid(), firstClain.chain);
