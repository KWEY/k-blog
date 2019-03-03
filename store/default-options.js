/**
 * 模块接口列表
 */

export const typeToId = {
  all: '001_001',
  html: '001_002',
  css: '001_003',
  js: '001_004',
  es6: '001_005',
  network: '001_006',
  browser: '001_007',
  tool: '001_008',
  model: '001_009',
  frame: '001_010',
  node: '001_011',
  data: '001_012',
  performance: '001_013',
  other: '001_014'
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
          pid: '',
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
          src: '/?type=es6',
          pid: '001_005',
          name: 'ES6'
        },
        {
          src: '/?type=network',
          pid: '001_006',
          name: '计算机网络'
        },
        {
          src: '/?type=browser',
          pid: '001_007',
          name: '浏览器相关'
        },
        {
          src: '/?type=tool',
          pid: '001_008',
          name: '工程化'
        },
        {
          src: '/?type=model',
          pid: '001_009',
          name: '模块化'
        },
        {
          src: '/?type=frame',
          pid: '001_010',
          name: '框架'
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
