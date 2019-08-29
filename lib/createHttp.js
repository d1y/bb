const express = require('express')
const port = require('detect-port')
const request = require('./utils')
const App = express()

const getPort = (flag = false) => {
  let ENV = process.env.NODE_PORT
  if (!flag) {
    return new Promise((rcv, rjt)=> {
      port().then(r=> {
        rcv(r)
      }).catch(err=> rjt(err))
    })
  } else {
    return Promise.resolve(ENV)
  }
}

App.get('/api/:text', (req, res, next)=> {
  const { text } = req.params
  switch ( text ) {
    case 'info':
      request.getInfo.then(r=> {
        res.json(r)
      })
      break;
    case 'stat':
      request.getStat.then(r=> {
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

module.exports = async flag=> {
  const RANDOM = await getPort(flag)
  App.listen(RANDOM)
  return {
    log: `server listen to http://localhost:${RANDOM} port`,
    close: ()=> App.close()
  }
}