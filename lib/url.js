const api = `https://api.bilibili.com/x`;

module.exports = {
  stat: id=> `${api}/relation/stat?vmid=${id}`,
  info: id=> `${api}/space/acc/info?mid=${id}`
}