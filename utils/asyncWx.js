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
