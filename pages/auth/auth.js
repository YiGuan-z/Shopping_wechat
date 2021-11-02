// pages/auth/auth.js
import {login} from "../../utils/asyncWx.js"

/**
 * 用户授权页面
 * @param {[type]} data   [页面数据]
 * @param {[type]} async  [同步方法]
 */
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		token: undefined
	},
	//获取用户信息
	async handleGetUserInfo(e) {
		try {
			//正常操作
			console.log(e)
			//从点击事件中获取用户的encryptedData, rawData, iv, signature
			const {encryptedData, rawData, iv, signature} = e.detail;
			console.log({encryptedData, rawData, iv, signature})
			//获取小程序登陆成功后的code
			const {code} = await login();
			//获取token需要的参数
			// const loginParams = {encryptedData, rawData, iv, signature, code}
			//发送请求 获取用户token
			// const {token}=await requst({url:'/users/wxlogin',data:loginParams,method:'post'})
			// console.log(“token:\n”+token)
			//把token存储到缓存
			const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
			wx.setStorageSync('token', token);
			//无企业账号进行的模拟操作
			//把token存储到cache
			wx.setStorageSync("token", token)
			//返回上一级
			wx.navigateBack({delta: 1});
		} catch (error) {
			console.log(error)
		}
		
	}
	
})
