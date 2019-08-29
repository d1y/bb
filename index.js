#!/usr/bin/env node
const clear = require('clear');
const boxen = require('boxen');
const { getInfo, getStat, toChar } = require('./lib/utils')
const ASX = require('./lib/mode')
require('colors');

async function main() {
  // const data = await toChar('Bilibili')
  const data = ASX.cat
  const cut = `-`
  console.log(data)
  console.log(cut.padStart(19,cut))
  const info = await getInfo
  const stat = await getStat
  console.log(`name: ${info.data.name.green} \n sign: ${info.data.sign.red} \n level: ${info.data.level.toString().yellow}`)
}
main()


// readonly mode `q` exit
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', e => {
  if (e == 'q') {
    clear()
    rl.close();
    process.exit(1)
  }
})