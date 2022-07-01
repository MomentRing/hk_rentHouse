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

/**
 *根据城市名称查询该城市信息
 * @param {城市名} name
 * @returns
 */
export const getCityCode = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}
