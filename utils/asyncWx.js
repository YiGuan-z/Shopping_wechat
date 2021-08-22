/*
* Promise 形式 getSetting
* */
export const getSetting = () => {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
			complete: {}
		})
	})
}
export const chooseAddress = () => {
	return new Promise((resolve, reject) => {
		wx.chooseAddress({
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
/**
 * 打开设置页面
 * @returns {Promise<openSetting>}
 */
export const openSetting = () => {
	return new Promise((resolve, reject) => {
		wx.openSetting({
			success: (result) => {
				resolve(result)
			},
			fail: (err) => {
				reject(err)
			},
			complete: {}
		})
	})
}
/**
 *
 * @param content param0参数
 * @returns {Promise<showModal>}
 */
export const showModal = ({content}) => {
	return new Promise((resolve, reject) => {
		wx.showModal({
			title: '提示',
			content: content,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
export const showToast = ({title}) => {
	return new Promise((resolve, reject) => {
		wx.showToast({
			title: title,
			icon: 'none',
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
/**
 *
 *
 * @returns {Promise<login>}
 */
export const login = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			timeout: 100 * 100,
			success: (result) => {
				resolve(result);
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}
/**
 * 获取用户信息
 * @param desc 权限提示信息
 * @returns {Promise<getUserProfile>}
 */
export const getUserProfile = ({desc}) => {
	return new Promise((resolve, reject) => {
		wx.getUserProfile({
			desc: desc,
			success: (res) => {
				resolve(res.userInfo)
			},
			fail: (err) => {
				reject(err)
				console.log(err)
			}
		})
	})
}

