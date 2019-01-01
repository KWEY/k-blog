import { CALL_API } from '@utils'

// 异步动作生成函数
const requestTypes = ['_REQUEST', '_SUCCESS', '_FAIL']
function createRequestTypes(base) {
  return requestTypes.map(item => base + item)
}

// 请求一次
export const FETCH_ONCE = 'FETCH_ONCE'
export const fetchOnce = () => ({
  type: FETCH_ONCE,
})

// 首页
// 获取首页数据
export const HOME = 'HOME'
export const getHome = payload => ({
  type: HOME,
  payload,
})

// 获取分类列表
export const LIST_TYPE = 'LIST_TYPE'
export const getHotSearch = payload => ({
  type: LIST_TYPE,
  payload,
})

// 个人中心
// 获取用户信息
export const USER = 'USER'
export const getUser = payload => ({
  type: USER,
  payload,
})

// 退出登陆
export const LOGOUT = 'LOGOUT'
export const getOut = () => ({ type: LOGOUT })

// 模板
const token ='';
export const TYPE = createRequestTypes('KWE')
export const getType = (id) => ({
  [CALL_API]: {
    types: TYPE,
    endpoint: `loans_filter`,
    params: { id }, // 可选
    method: 'put', // 可选，默认get
    toast: ['处理中', '处理成功', '处理失败'], // 可选
    options: { headers: { Authorization: `Bearer ${token}` } } // 可选
  },
})
