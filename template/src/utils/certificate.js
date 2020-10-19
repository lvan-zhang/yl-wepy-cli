const certificate = {
  toLoginPatient() {
    let callback = __BASE_URL__ + '/identity/h5tomini?token=&userId=&identityType=patient'
    callback = encodeURIComponent(callback)
    wx.navigateTo({ url: `/pages/web-view/web-view?url=${callback}` })
  },
  toLoginDoctor() {
    let callback = __BASE_URL__ + '/identity/h5tomini?token=&userId=&identityType=doctor'
    callback = encodeURIComponent(callback)
    wx.navigateTo({ url: `/pages/web-view/web-view?url=${callback}` })
  },
  showLoginDialog() {
    wx.showModal({
      title: '提示',
      content: '您还未登录！',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#999',
      confirmText: '去登录',
      confirmColor: '#2080e3',
      success: res => {
        if (res.confirm) {
          this.toLoginDoctor()
        }
      }
    })
  }
}

export default certificate
