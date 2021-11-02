// pages/user/user.js
import {getUserProfile, showModal, showToast} from "../../utils/asyncWx";

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		//用户信息
		userInfo: {},
		//用户是否登陆
		hasUserInfo: false,
		//收藏的商品数量
		CollectNum: 0,
		//我的足迹
		Footprint: 0
		
	},
	onShow() {
		//商品收藏数量
		const CollectNum = wx.getStorageSync('collect').length;
		const Footprint = wx.getStorageSync('UserFootprint').length;
		this.setData({
			CollectNum,
			Footprint
		})
	},
	async handleUserLogin() {
		try {
			let userInfo = await getUserProfile({desc: '完善用户资料'})
			this.setData({userInfo, hasUserInfo: true})
			wx.setStorageSync('userInfo', userInfo)
			console.log('用户已登陆')
		} catch (err) {
			console.log(err)
		}
	},
	//清除用户登陆状态
	async handleLoginOut() {
		const UserChoice = await showModal({content: '是否退出登陆？'})
		if (UserChoice.confirm) {
			this.setData({userInfo: {}, hasUserInfo: false})
			wx.setStorageSync('userInfo', "")
			setTimeout(() => {
				showToast({title: '退出成功'})
			}, 10 * 10)
			console.log('用户已退出')
		} else if (UserChoice.cancel) {
			console.log('用户已取消')
		}
	}
})
