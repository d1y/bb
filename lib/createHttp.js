const express = require('express')
const port = require('detect-port')
const net = require('net')
const { getXD } = require('./utils')
const path = require('path')
const App = express()

const getPort = (flag = false) => {
  let ENV = process.env.NODE_PORT
  if (!flag) {
    return new Promise((rcv, rjt) => {
      port().then(r => {
        rcv(r)
      }).catch(err => rjt(err))
    })
  } else {
    return Promise.resolve(ENV)
  }
}

App.get('/', (req, res, next)=> {
  res.sendFile(path.dirname(__dirname)+'/view/web.html')
})

App.get('/api/:text', (req, res, next) => {
  const { text } = req.params
  const { id } = req.query
  switch (text) {
    case 'info':
      getXD(id).then(r=> {
        res.json(r)
      })
      break;
    case 'stat':
      getXD(id, true).then(r => {
        res.json(r)
      })
      break;
    default:
      res.json({
        code: 404,
        msg: '请求失败'
      })
      break;
  }
})

App.use((req,res,next)=> {
  res.json({
    code: 250
  })
})

async function checkPORT(port) {
  /*
   ** @tips { 检测端口是否被占用 }
   ** Link: https://segmentfault.com/a/1190000004915782
  */

  // create server and listen to
  const server = net.createServer().listen(port)

  return new Promise(rcv=> {
    server.on('listening', function () {
      server.close()
      rcv(true)
    })

    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        rcv(false)
      }
    })
  })

}

module.exports = {
  PORT: getPort,
  App,
  checkPORT
}

// async flag=> {
//   const RANDOM = await getPort(flag)
//   App.listen(RANDOM)
//   return {
//     port: RANDOM,
//     log: `server listen to http://localhost:${RANDOM} port`,
//     close: ()=> App.close()
//   }
// }