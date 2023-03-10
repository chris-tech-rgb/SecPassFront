import request from '@/utils/request'

export function submit(data) {
  return request({
    url: '/form/submit',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/form/update',
    method: 'post',
    data
  })
}
