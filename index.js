#!/usr/bin/env node
const clear = require('clear');
const boxen = require('boxen');
const { getXD, open } = require('./lib/utils')
const ASX = require('./lib/mode')
const Http = require('./lib/createHttp')
require('colors');

async function toConsole( id, cat ,link=false ) {
  clear()
  const data = ASX[cat]
  const cut = `-`
  const curPad = cut.padStart(19,cut) + '>'
  console.log(data)
  console.log(curPad)
  const info = await getXD(id)
  // console.log(info)
  const stat = await getXD(id, true)
  // console.log(stat)
  console.log(boxen(`\n mid: ${info.data.mid.toString().blue} \n name: ${info.data.name.green} \n sign: ${info.data.sign.red} \n level: ${info.data.level.toString().yellow} \n follower: ${stat.data.follower.toString().magenta} \n`,{
    padding: 2,
    margin: 1
  }))
  // `server listen to http://localhost:${RANDOM} port`
  console.log(curPad)
}

// toConsole()


// readonly mode `q` exit
function readonly() {
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
}

const argv = require('yargs').argv

/*
**
## bbfans --id 3 --console  --web --port=3000
          用户id    字符     web端     端口
**
** -> 需要传递用户`id`
** -> 默认是显示字符
** -> 可以传递`web`参数来开启`web`
** -> 如果想两个都开启需要这个两个参数都加
** -> 端口可设置,默认是随机端口
*/

;(async ()=> {

  let PORT = await Http.PORT(false)
  let id = argv.id, cwd = true, web = false

  if (!id) {
    console.log('请传递用户`id`'.red)
    process.exit(0)
  }
  let avgPort = argv.port
  if (avgPort && !isNaN(avgPort)) PORT = avgPort

  const flag = await Http.checkPORT(PORT)

  if (!flag) {
    console.log(`当前端口被占用: ${PORT.toString().red}, 你可以不传递参数使用随机端口`)
    process.exit(0)
  }
  if (argv.web) {
    cwd = false
    web = true
    if (argv.console) cwd = true
  }
  function web2(flag) {
    const url = `http://localhost:${PORT}?id=${id}`
    Http.App.listen(PORT)
    if (flag) console.log(`server listen to ${url}`)
    open(url)
  }
  function console2() {
    toConsole(id, 'resting')
    readonly()
  }
  if (cwd && web) {
    console2()
    web2();
    return
  }
  if (cwd) console2()
  if (web) web2(true)

})()