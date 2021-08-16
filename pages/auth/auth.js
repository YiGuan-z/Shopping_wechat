// pages/auth/auth.js
// import {requst} from "../../requst/index.js";
import {login} from "../../utils/asyncWx.js"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {},
	//获取用户信息
	async handleGetUserInfo(e) {
		try {
			console.log(e)
			const {encryptedData, rawData, iv, signature} = e.detail;
			//获取小程序登陆成功后的code
			const {code} = await login();
			//获取token需要的参数
			const loginParams = {encryptedData, rawData, iv, signature, code}
			//发送请求 获取用户token
			// const {token}=await requst({url:'/users/wxlogin',data:loginParams,method:'post'})
			// console.log(token)
			//把token存储到缓存
			// wx.setStorageSync('token',token);
			//把token存储到cache
			wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
			wx.navigateBack({delta: 1});
		} catch (e) {
			console.log(e)
		}
		
	}
	
})
