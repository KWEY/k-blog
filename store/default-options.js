/**
 * 模块接口列表
 */

export const typeToId = {
  all: '001_001',
  html: '001_002',
  css: '001_003',
  js: '001_004',
  network: '001_006',
  node: '001_011',
  data: '001_012',
  performance: '001_013',
  frame: '001_015',
  mongoose: '001_016',
  linux: '001_017',
  other: '001_014',
  owner: '001_110'
}
export const idToName = {
  '001_001': ['最新', 'all'],
  '001_002': ['HTML', 'html'],
  '001_003': ['CSS', 'css'],
  '001_004': ['JS', 'js'],
  '001_006': ['计算机网络', 'network'],
  '001_011': ['Nodejs', 'node'],
  '001_012': ['数据结构', 'data'],
  '001_013': ['性能优化', 'performance'],
  '001_015': ['框架', 'frame'],
  '001_016': ['Mongoose', 'mongoose'],
  '001_017': ['Linux', 'linux'],
  '001_014': ['其他', 'other'],
  '001_110': ['个人', 'owner']
}

export const typeList = {
  tab: '001',
  page: 0,
  // value: '001_001',
  list: [
    {
      title: '笔记',
      tid: '001',
      list: [
        {
          src: '/',
          pid: '001_001',
          name: '最新'
        },
        {
          src: '/?type=html',
          pid: '001_002',
          name: 'HTML'
        },
        {
          src: '/?type=css',
          pid: '001_003',
          name: 'CSS'
        },
        {
          src: '/?type=js',
          pid: '001_004',
          name: 'JS'
        },
        {
          src: '/?type=network',
          pid: '001_006',
          name: '计算机网络'
        },
        {
          src: '/?type=node',
          pid: '001_011',
          name: 'Nodejs'
        },
        {
          src: '/?type=data',
          pid: '001_012',
          name: '数据结构'
        },
        {
          src: '/?type=performance',
          pid: '001_013',
          name: '性能优化'
        },
        {
          src: '/?type=frame',
          pid: '001_015',
          name: '框架'
        },
        {
          src: '/?type=mongoose',
          pid: '001_016',
          name: 'Mongoose'
        },
        {
          src: '/?type=linux',
          pid: '001_017',
          name: 'Linux'
        },
        {
          src: '/?type=other',
          pid: '001_014',
          name: '其他'
        },
        {
          src: '/?type=owner',
          pid: '001_110',
          name: '个人'
        }
      ]
    },
    {
      title: '工具集',
      tid: '002',
      list: [
        {
          src: '/follow',
          pid: '002_001',
          name: '收藏夹'
        }
        // {
        //   src: '/weplayer',
        //   pid: '002_002',
        //   name: '播放器'
        // }
      ]
    },
    {
      title: '文档库',
      tid: '003',
      list: [
        {
          src: '/doc/mse',
          pid: '003_001',
          name: 'MSE'
        },
        {
          src: '/doc/mask',
          pid: '003_002',
          name: 'CSS Mask'
        },
        {
          src: '/doc/f4v',
          pid: '003_003',
          name: 'F4V'
        },
        {
          src: '/doc/h264',
          pid: '003_004',
          name: 'H.264'
        },
        {
          src: '/doc/ci',
          pid: '003_005',
          name: 'CI'
        },
        {
          src: '/doc/dp',
          pid: '003_006',
          name: '设计模式'
        }
      ]
    }
  ]
}
