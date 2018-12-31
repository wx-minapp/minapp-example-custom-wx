/******************************************************************
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

const PROMISABLE = {FUNCS:["request","uploadFile","downloadFile","connectSocket","sendSocketMessage","closeSocket","chooseImage","previewImage","getImageInfo","saveImageToPhotosAlbum","startRecord","playVoice","getBackgroundAudioPlayerState","playBackgroundAudio","seekBackgroundAudio","getAvailableAudioSources","chooseVideo","saveVideoToPhotosAlbum","loadFontFace","saveFile","getSavedFileList","getSavedFileInfo","removeSavedFile","openDocument","getFileInfo","setStorage","getStorage","getStorageInfo","removeStorage","getLocation","chooseLocation","openLocation","getSystemInfo","getNetworkType","setScreenBrightness","getScreenBrightness","vibrateLong","vibrateShort","startAccelerometer","stopAccelerometer","startCompass","stopCompass","makePhoneCall","scanCode","setClipboardData","getClipboardData","openBluetoothAdapter","closeBluetoothAdapter","getBluetoothAdapterState","startBluetoothDevicesDiscovery","stopBluetoothDevicesDiscovery","getBluetoothDevices","getConnectedBluetoothDevices","createBLEConnection","closeBLEConnection","getBLEDeviceServices","getBLEDeviceCharacteristics","readBLECharacteristicValue","writeBLECharacteristicValue","notifyBLECharacteristicValueChange","startBeaconDiscovery","stopBeaconDiscovery","getBeacons","setKeepScreenOn","addPhoneContact","getHCEState","startHCE","stopHCE","sendHCEMessage","startWifi","stopWifi","connectWifi","getWifiList","setWifiList","getConnectedWifi","showToast","showLoading","showModal","showActionSheet","setNavigationBarTitle","setNavigationBarColor","setTabBarBadge","removeTabBarBadge","showTabBarRedDot","hideTabBarRedDot","setTabBarStyle","setTabBarItem","showTabBar","hideTabBar","setTopBarText","navigateTo","redirectTo","reLaunch","switchTab","startPullDownRefresh","getExtConfig","login","checkSession","authorize","getUserInfo","requestPayment","showShareMenu","hideShareMenu","updateShareMenu","getShareInfo","chooseAddress","addCard","openCard","openSetting","getSetting","getWeRunData","navigateToMiniProgram","navigateBackMiniProgram","chooseInvoiceTitle","checkIsSupportSoterAuthentication","startSoterAuthentication","checkIsSoterEnrolledInDevice","setEnableDebug"]};
const wxp = {}

Object.getOwnPropertyNames(wx).forEach(key => {
  let desc = Object.getOwnPropertyDescriptor(wx, key)
  if (desc) {
    if (PROMISABLE.FUNCS.indexOf(key) >= 0) {
      Object.defineProperty(wxp, key, {
        configurable: desc.configurable,
        enumerable: desc.enumerable,
        get() {
          // @ts-ignore
          return wxpromisify(wx[key], wx)
        }
      })
    } else {
      Object.defineProperty(wxp, key, desc)
    }
  }
})

function wxpromisify(func, context, callbackIndex = 0) {
  return (...args) => new Promise((resolve, reject) => {
    let {success, fail, complete, ...arg} = (args[callbackIndex] || {})

    args[callbackIndex] = {
      ...arg,
      success: (res) => {
        resolve(res)
        if (success) success(res)
      },
      fail: (err) => {
        reject(err)
        if (fail) fail(err)
      },
      complete
    }

    func.call(context, ...args)
  })
}

export {wxp}
