import util from 'util';
import fetch from 'node-fetch';

var query = `{
 pair(id: "0xe6c78983b07a07e0523b57e18aa23d3ae2519e05"){
     token0 {
       id
       symbol
       name
       derivedETH
     }
     token1 {
       id
       symbol
       name
       derivedETH
     }
     reserve0
     reserve1
     reserveUSD
     trackedReserveETH
     token0Price
     token1Price
     volumeUSD
     txCount
 }
}`;

fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', util.inspect(data,{depth:10})));
