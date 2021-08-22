/**
 * 1.页面加载的时候从缓存汇总获取购物车数据，渲染checked属性为true的商品
 * 2.微信支付
 *      1.企业账号才能支付
 *      2.企业账号的小程序后台中 必须给开发者添加白名单
 *      3.一个appid可以同时绑定多个开发者
 *      4.这些开发者就可以公用appid
 * 3.支付按钮
 *      1.判断用户缓存中存不存在token
 *      2.没有token 跳转到用户授权页面
 *      3.有token后放行逻辑
 *      4.创建订单
 * 4.
 * 5.
 */
import {showToast} from '../../utils/asyncWx.js'
import {request} from "../../request/index.js"

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
	},
	async handleOrderPay() {
		//获取用户token
		const token = wx.getStorageSync('token')
		//判断
		if (!token) {
			wx.navigateTo({
				url: "/pages/auth/auth"
			})
			return;
		}
		//创建订单
		//请求头参数
		const header = {Authorization: token};
		//请求体参数
		//订单价格
		const order_price = this.data.totalPrice;
		//收货地址
		const consignee_addr = this.data.address.all;
		//订单数组
		const cart = this.data.cart;
		let goods = [];
		cart.forEach(v => goods.push({
			goods_id: v.goods_id,
			goods_number: v.num,
			goods_price: v.goods_price,
		}))
		const orderParams = {order_price, consignee_addr, goods}
		//准备发送请求创建订单，获取订单编号
		const res = await request({url: '/my/orders/create', header, data: orderParams, method: 'post'})
		console.log(res);
		//没有企业账号，模拟支付成功
		const Pay = await showToast({title: '您已支付成功'})
		console.log(Pay)
	}
	
})
