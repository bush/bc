// https://github.com/Uniswap/v3-info/blob/770a05dc1a191cf229432ebc43c1f2ceb3666e3b/src/data/pools/chartData.ts#L14
// https://docs.uniswap.org/sdk/subgraph/subgraph-examples

import util from 'util';
import fetch from 'node-fetch';

async function getPairs(first, skip) {

  // `skip` is the offset and `first` is the chuck size
  let query1 = `query pairs($first: Int!, $skip: Int!) {
    pools(skip: $skip, first: $first, orderBy: totalValueLockedToken0, orderDirection: desc) {
      id
    }
  }`;

  let query = `query pools( $skip: Int!) {
    pools(first: 1000, skip: $skip, orderBy: liquidity, orderDirection: desc) {
      id
      sqrtPrice
      totalValueLockedUSD
      liquidity
      volumeToken0
      volumeToken1
      token0 {
        id
        symbol
      }
        token1{
      id
      symbol
    }
    }
  }`;

  let r = await fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { skip },
    })
  })

  let data = await r.json();


  return data;
}

let done = false;
let skip = 0;

async function main() {
  while(true) {
    let data = await getPairs(1000,skip);

    if(data.errors) {
      console.log(data);
      return;
    }

    for(const pair of data.data.pools) {
      console.log(`${pair.id},${pair.token0.symbol}-${pair.token1.symbol}, ${pair.totalValueLockedUSD}, ${pair.liquidity}, ${pair.volumeToken0} ${pair.volumeToken1}`);
    }

    skip += 1000;
    if(data.data.pools.length < 1000 ) { return; }
  }
}

main();
