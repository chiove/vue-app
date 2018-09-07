/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-04-13 12:41:06
 * @version $Id$
 */

let jsAndroid = {

	//扫码
	barcode: {
		scan: function () {
			var d = jsAndroid.jsAndroidCallback()
			jsAndroid.is_android() ? window.jsAndroid.scan() : window.webkit.messageHandlers.scan.postMessage('');
			return d
		},
		scanBtn: function () {
			alert(jsAndroid.is_android())
			var d = jsAndroid.jsAndroidCallback()
			jsAndroid.is_android() ? window.jsAndroid.scanBtn() : window.webkit.messageHandlers.scanBtn.postMessage('');
			return d
		}
	},
  position: {
    locationService:function () {
      var d = jsAndroid.jsAndroidCallback()
      jsAndroid.is_android() ? window.jsAndroid.locationService() : window.webkit.messageHandlers.locationService.postMessage('');
      return d
    }
  },
  device: {
    getIdfv:function () {
      var d = jsAndroid.jsAndroidCallback()
      jsAndroid.is_android() ? window.jsAndroid.getIdfv() : window.webkit.messageHandlers.getIdfv.postMessage('');
      return d
    }
  },
	//分享
	share: {
		//分享连接
		shareHref: function (p) {
			var d = jsAndroid.jsAndroidCallback()
			window.jsAndroid.shareHref(p)
			return d
		},
		//分享文字
		shareText: function (p) {
			var d = jsAndroid.jsAndroidCallback()
			window.jsAndroid.shareText(p)
			return d
		}
	},
	//callback回调
	jsAndroidCallback () {
		return new Promise((resolve,reject) => {
			window["receiveMsgFromNative"] = function (msg) {
				resolve(msg)
			}
		});
	},
	//判断系统环境,return true表示为Android
	is_android () {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match('linux') == "linux") {
			return true;
		} else {
			return false;
		}

	}
}

export default jsAndroid
