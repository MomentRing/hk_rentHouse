import request from '@/utils/request'
export const getChildCity = (code) => {
  return request({
    url: '/area',
    params: {
      id: code
    }
  })
}
