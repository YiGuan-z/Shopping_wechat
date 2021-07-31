// pages/user/user.js
import {getUserProfile} from "../../utils/asyncWx";

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
	
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	},
	
	onShow() {
		//商品收藏数量
		let CollectNum = wx.getStorageSync('collect').length;
		let userInfo = wx.getStorageSync('userInfo') || [];
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
	}
	
	
})
