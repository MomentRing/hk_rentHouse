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
