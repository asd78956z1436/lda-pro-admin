import request from '@/axios'

// 獲取所有字典
export const getDictApi = () => {
  return request.get({ url: '/mock/dict/list' })
}

// 模擬獲取某個字典
export const getDictOneApi = async () => {
  return request.get({ url: '/mock/dict/one' })
}
