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
	//获取用户登陆信息
	async handleGetUserInfo() {
		try {
			//打开权限申请页面并把获取到的用户信息放到userInfo里面
			let userInfo = await getUserProfile({desc: '完善用户资料'})
			//设置用户信息和登陆状态
			this.setData({userInfo, hasUserInfo: true})
			//获取用户登陆状态
			let {hasUserInfo} = this.data;
			//将用户信息和登陆状态包装成user
			let user = {userInfo, hasUserInfo};
			//将包装的user塞进缓存里
			wx.setStorageSync('user', user);
			//TODO 这一行注释调的代码等待测试
			// wx.setStorageSync('hasUserInfo', this.hasUserInfo);
			//返回上一级
			wx.navigateBack({delta: 1})
		} catch (error) {
			console.log(error)
		}
		
	}
})
