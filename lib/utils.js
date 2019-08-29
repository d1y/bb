/*
** create by @d1y
** date: 2019-08-29
*/
const axios = require('axios')
const conf = require('./url')

async function getXD( id, pip) {
  /*
  ** the default is `info`
  */
  let fuck = conf.info(id)
  if (pip) fuck = conf.stat(id)
  const { data } = await axios.get(fuck)
  return data
}

function open(url) {
  const child_process = require("child_process");
  let cmd = '';
  switch (process.platform) {
    case 'wind32':
      cmd = 'start';
      break;
    case 'linux':
      cmd = 'xdg-open';
      break;
    case 'darwin':
      cmd = 'open';
      break;
  }
  child_process.exec(`${cmd} ${url}`);
}

module.exports = {
  getXD,
  open
}