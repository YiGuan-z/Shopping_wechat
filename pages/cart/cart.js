// pages/cart/cart.js
/*
* 获取用户收货地址
*   绑定用户点击事件
*   调用小程序内置api 获取用户地址
*   获取用户对小程序所授予获取地址的权限状态 scope
*   用户点击提示框为确定时 scope权限为true
*   该权限在2.16.1被废弃 腾讯果然不安好心
*   把获取到的地址存入本地缓存中
* 2.页面加载完毕
*   1.获取本地存储中的数据
*   2.把数据赋给data中的变量
* */
import {chooseAddress, getSetting, openSetting} from '../../utils/asyncWx.js'

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		address: {}
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
	},
	/*
	* 页面加载完成
	* */
	onShow: function () {
		//获取缓存中的收货地址
		const address = wx.getStorageSync('address')
		this.setData({address});
	},
	//点击收货地址
	async handleChooseAddress() {
		try {
			let address = await chooseAddress()
			console.log(address)
			address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
			//将用户地址存入缓存
			wx.setStorageSync('address', address)
		} catch (e) {
			console.error(e)
		}
		//腾讯更新，该代码已被删减
		//获取权限状态
		// const res1=await getSetting;
		// const scopeAddress=res1.authSetting['scope.Address']
		// const res2=await chooseAddress()
		// console.log(res2)
		// 获取收货地址
		// wx.chooseAddress({
		// 	success:(res)=>{
		// 		console.log(res)
		// 	}
		// })
		
	}
	
})
