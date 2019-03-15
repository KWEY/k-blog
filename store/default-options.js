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
  vue: '001_015',
  mongoose: '001_016',
  linux: '001_017',
  other: '001_014'
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
  '001_015': ['Vue', 'vue'],
  '001_016': ['Mongoose', 'mongoose'],
  '001_017': ['Linux', 'linux'],
  '001_014': ['其他', 'other']
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
          src: '/?type=vue',
          pid: '001_015',
          name: 'Vue'
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
      ]
    },
    {
      title: '文档库',
      tid: '003',
      list: [
        {
          src: '/doc/mse',
          pid: '003_001',
          name: 'Media Source Extensions'
        },
        {
          src: '/doc/mask',
          pid: '003_002',
          name: 'CSS Masking Module'
        }
      ]
    }
  ]
}
