const api = `https://api.bilibili.com/x`;
const { id } = require('../config.json')

module.exports = {
  stat: `${api}/relation/stat?vmid=${id}`,
  info: `${api}/space/acc/info?mid=${id}`
}