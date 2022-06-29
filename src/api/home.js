import request from '@/utils/request'
/**
 *轮播图
 * @returns
 */
export const getSwipes = () => {
  return request({
    url: '/home/swiper'
  })
}

export const getGroups = () => {
  return request({
    url: '/home/groups'
  })
}
