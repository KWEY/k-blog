const axios = require('axios')
const shell = require('shelljs')
const download = require('image-downloader')
let currentList = {}
let aidPic = []
const aidList = [
  {
    aid: 39425207
  },
  {
    aid: 1046539
  },
  {
    aid: 1608327
  },
  {
    aid: 29364146
  },
  {
    aid: 2203040
  },
  {
    aid: 8926110
  },
]

exports.recommendList = async (req, res, next) => {
  const day = Math.floor(Math.random() * aidList.length)
  const aid = aidList[day].aid
  if (currentList[aid]) {
    res.json({
      success: 1,
      data: currentList[aid].list
    })
    return
  }
  // shell.rm('-rf', './static/recommend')
  // shell.mkdir('./static/recommend')
  await axios
    .get(`https://api.bilibili.com/x/web-interface/archive/related?aid=${aid}`)
    .then(data => {
      const list = data.data.data
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (aidPic.indexOf(item.aid) > -1) {
          continue;
        }
        picture(item.pic, item.aid)
        item.pic = null
        aidPic.push(item.aid)
      }
      currentList[aid] = {
        list
      }
      res.json({
        success: 1,
        data: list
      })
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: 0,
        data: 'err'
      })
    })
}
exports.recommendList01 = async (req, res, next) => {
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
      url: src + '@336w_190h.webp',
      dest: `./static/recommend/${name}.jpg`
    })
    .catch(err => {
      console.log(err)
    })
}
