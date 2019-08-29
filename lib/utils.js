/*
** create by @d1y
** date: 2019-08-29
*/
const axios = require('axios')
const conf = require('./url')
const figlet = require('figlet');

async function getXD( pip ) {
  const { data } = await axios.get(pip)
  return data
}

async function toChar( str ) {
  return new Promise((rcv, rjt)=> {
    figlet(str, ( err, data )=> {
      if (err) {
        console.error('the gen char code error')
        rjt(err)
      } else rcv(data)
    })
  })
}

module.exports = {
  getInfo: getXD(conf.info),
  getStat: getXD(conf.stat),
  toChar
}