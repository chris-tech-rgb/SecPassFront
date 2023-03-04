const Mock = require('mockjs')

const mock_data = Mock.mock({
  'items|5': [{
    website: '@url("https")',
    username: '@word(3, 16)',
    'password|16-20': '',
    last_update: '@datetime("yyyy年MM月dd日")',
    'safety|1': ['low', 'medium', 'high']
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: () => {
      const items = mock_data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
