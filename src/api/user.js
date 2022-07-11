import request from '@/utils/request'
/**
 *用户登录
 * @param {*} param0
 * @returns
 */
export const getLogin = ({ username, password }) => {
  return request({
    method: 'post',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
/**
 *获取用户资料
 * @param {*} token
 * @returns
 */
export const getUserMsg = (token) => {
  return request({
    method: 'get',
    url: '/user',
    headers: {
      authorization: token
    }
  })
}
/**
 *添加收藏
 * @param {房屋id} id
 * @returns
 */
export const addCollet = (id) => {
  return request({
    method: 'post',
    url: `/user/favorites/${id}`
  })
}

/**
 *删除收藏
 * @param {房屋id} id
 * @returns
 */
export const delCollet = (id) => {
  return request({
    method: 'delete',
    url: `/user/favorites/${id}`
  })
}
