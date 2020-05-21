import BaseApi from '../BaseApi'

class AccountApi extends BaseApi {
  constructor() {
    super('user')
  }
  
  login(data) {
    const userInfo = {
      code: 200,
      message: '登录成功',
      data: {
        username: 'ylushen',
        token: 'woshitoken'
      }
    }
    return new Promise(resolve => {
      setTimeout(_ => resolve(userInfo), 500)
    })
  }
}

export default new AccountApi()
