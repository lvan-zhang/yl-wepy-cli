import certificate from '@/utils/certificate'

// 基准路径
// 1.0 返回一个 promise 对象
function handleResult (result, url) {
  if (result.code !== '200' && result.code !== '401') {
    wx.showModal({
      title: '提示',
      content: result.msg,
      showCancel: false,
      success (res) {
        if (res.confirm) {
          // wx.navigateBack({
          //   delta: 1
          // })
        }
      }
    })
    return false
  } else if (result.code === '401') {
    wx.showModal({
      title: '提示',
      content: '授权失效',
      confirmText: '去授权',
      success (res) {
        if (res.confirm) {
          certificate.toLoginDoctor()
        } else if (res.cancel) {

        }
      }
    })
  }
}
function ajax (url, method = 'GET', data = {}, header = {}) {
  let token = wx.getStorageSync('token')
  // eslint-disable-next-line
  // if (__BASE_URL__ === 'https://mcptest.cmvalue.com') {
  //   token = 'WlhsS2FHSlBSMk5wVDJsS1NWVjZWWGhOYVVvNS5aWGxLZW1SVFYwbHBUMmxLTjFoRFNtaFpNazUyWkZjMU1GUnRPWFZTV0doM1lWaEtiRnBHZDJsUGJWcG9Za2hPYkV4R2QybFpWMDVxWWpOV2RXUkZOWFppYTNoMldUSjBiRnBHZDJsUGJWcG9Za2hPYkV4R2QybFpXRll3WVVjNWVXRlljR3hhUmtwc1l6STVNV050VG14WVEwazJaVEYzYVZsWFRqQmhWemwxVVRJNWExcFlUbU5KYW5CaVdGTjRZMGx0UmpGa1IyaDJZMjFzTmxwWFVsZGFXRXA2WVZjNWRWaERTVFpZUTBwalNXbDRZMGx0TVdoaGJUbDVWRE5LYmxsWE5YQmxiVVl3WVZjNWRWaERTVFpsTVhkcFdUSTVhMXBXZDJsUGJIZHBVVEF4VjFoRFNYTllRMHAxV1ZjeGJGaERTVFpZUTB4c2EyOWZiVzQzVUc1d05VaHRhVzlFY0hVMWFtOXljVkpqU1c0d2MxaERTblpqYldSb1ltMXNObGxZVW5CaU1qVkVZakpTYkdNeGQybFBiSFJqU1d0T1RsWnNkMmxZVTNoalNXNUtiR015T1RGamJVNXNVMWRTZWxoRFNUWlhNVEJ6V0VOS2VWcFlUblprV0VwcVdsVnNkV0ZIVm5saFdGSlFZMjFrWTBscWNHTkpiSGRwWmxONFkwbHRSakpaV0ZKb1kyeDNhVTlzZDJsaFNGSXdZMGhOTmt4NU9UQmFXRTR3VEZjNWVtTjVOV3BpV0Zwb1lraFdiRXh0VG5aaVV6a3pXbGRPYjFsWVVYWk5ha0Y1VFVNNGQwNTZSWGhNZWxrMFRrUm5kMDVVVFRCT2VrMHdUbFJKZVUxcVp6Sk5SR3QxWVc1Q2JsaERTWE5ZUTBwcVkyMVdhMXBYTlRCaFYwWnpZekExZG1KclZqUmpSMng1V2xkU1kwbHFjRzFaVjNoNldsTjRZMGx0Vm5WWlYwcHpXbGRTWTBscWNEQmpibFpzVEVaM2FXTkhSbnBqTTJSMlkyMVNZMGxxY0dOSmJVNTBaR3c1VWxaVVpHeE9ha2w1WlZaM2FVeEdkMmxrV0U1c1kydHNhMWhEU1RaWVEwcHFZbGhhWmxWV1ZUTmFWRmw1VFc1c1kwbHBlR05KYmxaNldsaEtVMkl5ZUd4WVEwazJXRU5LYW1SWVRqQmlNakZzWTJ4M2FVeEdkMmxrV0U1c1kyMDFhR0pYVm1OSmFuQmpTWFZYT0c5UGFVTnpiSGRwWmxOSmMwbHRWalJqUTBrMlRWUlpkMDFVUlRWT1JGbDNUVzR3LllsWmthV3hGVWxoeE5HcGtUM1V4YzFNMWNWZEVXVlpHZUVaTlYxUnVaWGxrYVVsUE0zUnFVbkJVVDBocFltUnBkREpaYkVSVlltbGlORGh1YnpCV1JrcHlVa1pOTVdOSFlrZG5Va013U0ZBNFJFbDFjMHBu'
  // }
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    })
    // 2.0 完成逻辑处理
    wx.request({
      // eslint-disable-next-line
      url: __BASE_URL__ + url,
      method: method,
      data: data,
      header: {
        // 'Content-Type': 'multipart/form-data',
        'x-u-token': token
      },
      success: (res) => {
        wx.hideLoading()
        const result = res.data
        handleResult(result, url)
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

function ajaxUplaod (url, name, filePath, data) {
  let token = wx.getStorageSync('token')
  // if (__BASE_URL__ === 'https://mcptest.cmvalue.com') {
  //   token = 'WlhsS2FHSlBSMk5wVDJsS1NWVjZWWGhOYVVvNS5aWGxLZW1SVFYwbHBUMmxLTjFoRFNtaFpNazUyWkZjMU1GUnRPWFZTV0doM1lWaEtiRnBHZDJsUGJWcG9Za2hPYkV4R2QybFpWMDVxWWpOV2RXUkZOWFppYTNoMldUSjBiRnBHZDJsUGJWcG9Za2hPYkV4R2QybFpXRll3WVVjNWVXRlljR3hhUmtwc1l6STVNV050VG14WVEwazJaVEYzYVZsWFRqQmhWemwxVVRJNWExcFlUbU5KYW5CaVdFTktWVlJWVFhSTlZFRXdUVVJCZDA1c2QybE1SbmRwVmtVeFJFeFVSWGRPUkVGM1RVUmtZMGxwZUdOSmJGSk9VWGt3ZUUxRVVYZE5SRUY1V0VOSmMxaERTbFZVVlUxMFRWUkJNRTFFUVhkTk1YZHBURVozYVZaRk1VUk1WRVYzVGtSQmQwMUVVbU5KYVhoalNXeFNUbEY1TUhoTlJGRjNUVVJCTVZoRFNYTllRMHBWVkZWTmRFMVVRVEJOUkVGM1RWWjNhVXhHZDJsV1JURkVURlJGZDAxcVFYZE5SRVpqU1dsNFkwbHNVazVSZVRCNFRVUkpkMDFFUVhsWVEwbHpXRU5LVlZSVlRYUk5WRUY1VFVSQmQwMHhkMmxNUm5kcFZrVXhSRXhVUlhkTmFrRjNUVVJTWTBscGVHTkpiRkpPVVhrd2VFMUVUWGROUkVFeldFTkpjMWhEU2xWVVZVMTBUVlJCZWsxRVFYZE9WbmRwVEVaM2FWWkZNVVJNVkVWM1RYcEJkMDFFV21OSmFYaGpTV3hTVGxGNU1IaE5SRTEzVFVSQmVsaERTWE5ZUTBwVlZGVk5kRTFVUVhwTlJFRjNUa1ozYVV4R2QybFdSVEZFVEZSRmQwMTZRWGROUkVaalNXbDRZMGxzVWs1UmVUQjRUVVJOZDAxRVFYbFlRMGx6V0VOS1ZWUlZUWFJOVkVGNFRVUkJkMDB4ZDJsTVJuZHBWa1V4UkV4VVJYZE5WRUYzVFVSU1kwbHBlR05KYkZKT1VYa3dlRTFFUlhkTlJFRjRXRU5KYzFoRFNsVlVWVTEwVFZSQmVFMUVRWGROYkhkcFRFWjNhVlpGTVVSTVZFVjNUVlJCZDAxRVpHTkphWGhqU1d4U1RsRjVNSGhOUkVWM1RVUkJORmhEU1hOWVEwcFZWRlZOZEUxVVFYaE5SRUYzVGxaM2FVeEdkMmxXUlRGRVRGUkZkMDFVUVhkTlJGcGpTV3d3YzFoRFNtaGtXRkp2WWpOS2NHVnRWbXRXYlZaNVl6SnNkbUpzZDJsUGJIZHBXRU5KYzFoRFNuUlpWM0IyWTJzNWVWb3lSblZoV0hCb1pFZHNkbUpzZDJsUGJuUmpTVzFPZGxwSFZtTkphbkJqU1d0T1RsWnNkMmxNUm5kcFltMUdkRnBXZDJsUGJIZHBOVnBMVURWd0xYbzFObVZTTlc5eFFUWmlkVmsyU3pacldFTktPVXhHZDJsaU0wcHVXVmMxY0dWdFJqQmhWemwxVVRJNWExcFlUbU5KYW5CaVdFTktSRlJXV21OSmJEQnpXRU5LZVZwWVRuWmtXRXBxV2xWc2EyTXhkMmxQYkhONlRYbDNNRTFEZDNoT1EzY3dUbmwzZWsxR01ITllRMHA1V2xoT2RtUllTbXBhVld4MVlVZFdlV0ZZVWxCamJXUmpTV3B3WTBsclRrNVdiSGRwWmxONFkwbHRSakpaV0ZKb1kyeDNhVTlzZDJsaFNGSXdZMGhOTmt4NU9UQmFXRTR3VEZjNWVtTjVOV3BpV0Zwb1lraFdiRXh0VG5aaVV6bHRZVmQ0YkV4Nll6Rk9hazEyVFdwQmVVMURPSGRQUkVFeFRIcFpORTVVWTNwUFZHY3dUVlJaZDA1VVFYbE5hbFY0VGxSWmRXRnVRbTVZUTBseldFTkthbU50Vm10YVZ6VXdZVmRHYzJNd05YWmlhMVkwWTBkc2VWcFhVbU5KYW5CdFdWZDRlbHBUZUdOSmJWWjFXVmRLYzFwWFVtTkphbkF3WTI1V2JFeEdkMmxpUnpsdVlqSTFUMkl4ZDJsUGJIZHBXRU5KYzFoRFNuZFpXRTU2WkRJNWVWcEdkMmxQYkhkcFdUSXhNbGg2WkVaV1NFSk5VbXRzTlZoRFNYTllRMG94WXpKV2VWTlhVbU5KYW5CalNXMU9kR1JzT0ROU1ZsSjNWRVZhU21WV2QybE1SbmRwWkZoT2JHTnNTblppUjFaalNXcHdZMGx0VGpGak0xSjJZbGRXZVZoRFNYTllRMG94WXpKV2VXSnRSblJhVm5kcFQyeDNhVFZhUjBFMVdrOUpOVnBQU1ZoRFNqbEphWGRwV2xob2QwbHFiM2hPYWtGM1RsUm5OVTFxYTNkbVVRPT0uZVhoeVptaEZNR2hVTFd4UFdIQmtVM001VVdSNE1IaERkMWN4UTNsQlUyRnZNMUphVm1wNk0weHdiMFo2U1doU1JERnVNbFZXWjBsVWEybDViVGhoWWpKVE1EUnRVemRyTFhobFIwaHdVbmd4UVcweFUxRlI='
  // }
  return new Promise((resolve, reject) => {
    // 2.0 完成逻辑处理
    wx.uploadFile({
      url: __BASE_URL__ + url,
      name: name,
      filePath: filePath,
      formData: data,
      header: {
        // 'Content-Type': 'multipart/form-data',
        'x-u-token': token
      },
      success: function (res) {
        const result = JSON.parse(res.data)
        handleResult(result)
        resolve(result)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

// 封装一个单独的 get 方法
ajax.get = function (url, data = {}) {
  return ajax(url, 'GET', data)
}

// 封装一个单独的 post 方法
ajax.post = function (url, data = {}) {
  return ajax(url, 'POST', data)
}

// 封装一个单独的 put 方法
ajax.put = function (url, data = {}) {
  return ajax(url, 'PUT', data)
}

// 封装一个单独的 upload 方法
ajax.upload = function (url, name, filePath, data) {
  return ajaxUplaod(url, name, filePath, data)
}

// 封闭一个验证是否登录的方法
// ajax.auth = function (url, method, data = {}) {
//   // 得到 token
//   var token = wx.getStorageSync('token')
//   if (!token) {
//     // 如果不存在，跳转到登录页面
//     wx.navigateTo({
//       url: '/pages/index/index'
//     })
//     return new Promise(() => { })
//   }
//   // 如果存在，就直接发送请求（在请求头中带上 token）
//   return ajax(url, method, data, { "Authorization": token })
// }

// 3.0 暴露给外界
export default ajax
