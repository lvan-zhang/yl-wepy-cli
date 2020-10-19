import ajax from '@/utils/ajax.js'

const generalBase = '/bcms/api'

const API = {
  // get测试
  getTest (data) {
    return ajax.get(generalBase + '/get', data)
  },
  // post测试
  postTest (data) {
    return ajax.post(generalBase + '/post', data)
  },
  // upload测试
  uploadTest (path) {
    return ajax.upload(generalBase + '/upload', 'file', path)
  },
  // 获取患者个人信息
  getPatientInfo: () => ajax.get(generalBase + '/patient'),
  // 获取首页信息
  getIndexInfo: () => ajax.get(generalBase + '/patient/overview')
}
export default API
