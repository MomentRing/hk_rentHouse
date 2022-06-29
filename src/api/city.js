import request from '@/utils/request'
export const getAllCity = () => {
  return request({
    url: '/area/city',
    params: {
      level: 1
    }
  })
}
/**
 *查询热门城市
 * @returns
 */
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}
