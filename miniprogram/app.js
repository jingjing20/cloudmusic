//app.js
App({
  onLaunch: function () {
    this.checkUpdate()
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'jingjing-haohao',
        traceUser: true,
      })
    }

    this.getOpenId()

    this.globalData = {
      PlayMusicId: -1,
      openid: -1,
    }
  },
  setPlayMusicId(jing) {
    this.globalData.PlayMusicId = jing
  },
  getPlayMusicId() {
    return this.globalData.PlayMusicId
  },

  getOpenId(){
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid;
      this.globalData.openid = openid;
      if(wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid,[])
      }
    })
  },

  checkUpdate(){
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      if(res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提醒',
            content: '新版本已经准备好，是否重启应用',
            success(res) {
              if(res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },

})
