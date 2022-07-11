import request from '@/utils/request'
export const getChildCity = (code) => {
  return request({
    url: '/houses/condition',
    params: {
      id: code
    }
  })
}
