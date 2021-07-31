// pages/login/login.js

import {getUserProfile} from "../../utils/asyncWx";

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		//用户信息
		userInfo: {},
		//用户是否登陆
		hasUserInfo: false
	},
	async handleGetUserInfo() {
		try {
			let userInfo = await getUserProfile({desc: '完善用户资料'})
			this.setData({userInfo, hasUserInfo: true})
			let user = {userInfo, hasUserInfo: true}
			wx.setStorageSync('user', user)
			wx.navigateBack({delta: 1})
		} catch (err) {
			console.log(err)
		}
		
	}
})
