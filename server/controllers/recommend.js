const axios = require('axios')
const shell = require('shelljs')
const download = require('image-downloader')
let currentList = null

exports.recommendList = async (req, res, next) => {
  const day = new Date().getDate()
  if (currentList) {
    if (currentList.day === day) {
      res.json({
        success: 1,
        data: currentList
      })
      return
    }
    currentList = null
  }
  shell.rm('-rf', './static/recommend')
  shell.mkdir('./static/recommend')
  await axios
    .get('htpp://api.bilibili.com/x/web-interface/ranking/index')
    .then(data => {
      const list = data.data.data
      list.forEach(item => {
        picture(item.pic, item.aid)
        item.pic = null
      })
      currentList = list
      currentList.day = day
      res.json({
        success: 1,
        data: list
      })
    })
    .catch(() => {
      res.json({
        success: 0,
        data: 'err'
      })
    })
}

async function picture(src, name) {
  await download
    .image({
      url: src,
      dest: `./static/recommend/${name}.jpg`
    })
    .catch(err => {
      console.log(err)
    })
}
