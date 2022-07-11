
import request from '@/utils/request'
export const getHouse = ({ cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }) => {
  return request({
    url: '/houses',
    params: {
      cityId,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      start,
      end
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: `/houses/${id}`,
    params: {
      id
    }
  })
}
