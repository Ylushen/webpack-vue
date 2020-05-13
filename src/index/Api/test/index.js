import BaseApi from '../BaseApi'

class TestApi extends BaseApi {
  constructor() {
    super('test')
  }
}

export default new TestApi()
