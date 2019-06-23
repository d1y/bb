const request = require('request');
const fx = require('./url');
const id = require('./config.json').id;
const clear = require('clear');
const boxen = require('boxen');
const figlet = require('figlet');

require('colors');

let rp = e => e.replace('FUCK', id)

clear()

function getPick() {
  let mp = {
    padding: 2,
    margin: 5
  }
  clear()
  ;(async () => {
    request(rp(fx.stat), (err, req, body) => {
      data = JSON.parse(body).data.follower
      if (!err) {
        figlet.text(` -> ${data} <- `, {
          font: 'big'
        }, (err, msg) => {
          console.log(boxen(msg.green, mp))
        })
      } else {
        throw err;
      }
    })
  })();
}

getPick()
setInterval(getPick,20000)

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