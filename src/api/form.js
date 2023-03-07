import request from '@/utils/request'

export function submit(data) {
  return request({
    url: '/form/submit',
    method: 'post',
    data
  })
}
