/*
** raw sources 
** ::=> https://raw.githubusercontent.com/coleww/cat-me/master/cats.json
*/

const fs = require('fs')
const mode = require('../mode/mode.json')
const path = require('path')
const work = `${path.dirname(__dirname)}/mode/txt`

function json2() {
  const arr = {}
  for (let item in mode) {
    const current = mode[item].join('\n')
    arr[item] = current
  }
  return arr
}

function file2() {
  const F2 = {}
  const files = fs.readdirSync(work)
  const Lists = files.map(item=> `${work}/${item}`)
  Lists.forEach( item => {
    const name = path.basename(item).slice(0,-4)
    const ctx = fs.readFileSync(item, 'utf8')
    F2[name] = ctx
  })
  return F2
}

const codes = json2()
const lists = file2()
for (let list in lists) {
  codes[list] = lists[list]
}

module.exports = codes