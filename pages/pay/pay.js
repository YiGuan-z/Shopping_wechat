/**
 * 1.页面加载的时候从缓存汇总获取购物车数据，渲染checked属性为true的商品
 * 2.微信支付
 *      1.企业账号才能支付
 *      2.企业账号的小程序后台中 必须给开发者添加白名单
 *      3.一个appid可以同时绑定多个开发者
 *      4.这些开发者就可以公用appid
 * 3.
 * 4.
 * 5.
 */
// import {chooseAddress, showModal, showToast/*, getSetting, openSetting*/} from '../../utils/asyncWx.js'

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		//地址
		address: {},
		//商品的数组
		cart: [],
		//商品的总价
		totalPrice: 0,
		//商品的数量
		totalNum: 0
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
		const address = wx.getStorageSync('address');
		//获取缓存中的购物车数据
		let cart = wx.getStorageSync('cart') || [];
		//过滤后的购物车数组
		cart = cart.filter(v => v.checked);
		
		this.setData({address})
		// this.setCart(checkedCart)
		//设置购物车状态同时重新计算底部工具栏数据
		
		//计算商品价格
		//商品的总价格 总数量
		let totalPrice = 0;
		let totalNum = 0;
		cart.forEach(k => {
			if (k.checked) {
				totalPrice += k.num * k.goods_price;
				totalNum += k.num;
			}
		})
		//判断数组是否为空
		//5&6.把购物车数据重新填充回data&cache
		this.setData({cart, totalPrice, totalNum, address});
	}
	
})
