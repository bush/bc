// https://github.com/Uniswap/v3-info/blob/770a05dc1a191cf229432ebc43c1f2ceb3666e3b/src/data/pools/chartData.ts#L14
// https://docs.uniswap.org/sdk/subgraph/subgraph-examples

import util from 'util';
import fetch from 'node-fetch';

async function getPoolInfo(first, skip) {

  let query = `{
    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
    tick
    token0 {
      symbol
      id
      decimals
    }
    token1 {
      symbol
      id
      decimals
    }
    feeTier
    sqrtPrice
    liquidity
  }
}`;

  let r = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  })

  let data = await r.json();


  return data;
}

let done = false;
let skip = 0;

async function main() {
  let data = await getPoolInfo();
  console.log(util.inspect(data,{depth:10}));
}

main();
