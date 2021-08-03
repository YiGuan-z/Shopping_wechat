// pages/user/user.js
import {getUserProfile, showToast} from "../../utils/asyncWx";

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
		CollectNum: 0
		
	},
	
	
	
	onShow() {
		//商品收藏数量
		const CollectNum = wx.getStorageSync('collect').length;
		const userInfo = wx.getStorageSync('userInfo') || [];
		if (JSON.stringify(userInfo).length === '{}') {
			return;
		} else {
			this.setData({userInfo, hasUserInfo: true})
		}
		this.setData({CollectNum})
	},
	async handleUserLogin(e) {
		wx.getUserInfo(e)
		try {
			let userInfo = await getUserProfile({desc: '完善用户资料'})
			this.setData({userInfo, hasUserInfo: true})
			wx.setStorageSync('userInfo', userInfo)
			console.log(e)
		} catch (err) {
			console.log(err)
		}
	},
	//清除用户状态
	handleLoginOut() {
		this.setData({
			userInfo: {},
			hasUserInfo: false
		})
		wx.setStorageSync('userInfo', "")
		setTimeout(() => {
			showToast({title: '退出成功'})
		}, 10 * 10)
	}
	
	
})
