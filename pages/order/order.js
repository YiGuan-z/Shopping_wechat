// pages/order/order.js
/*
*   判断缓存中有没有token
*       1.没有 跳转到授权页面
*       2.有 直接发送请求
* 1.当页面被打开的时候 onShow没有options参数 onLoad 有该参数
*   1.获取url上的参数
*   2.根据type发送请求获取订单数据
*   3.渲染页面
*2.点击不同标题时需要重新发送请求获取新数据
* */
import {request} from "../../request/index.js";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//获取的数据
		orders: [],
		tabs: [
			{
				id: 0,
				value: "全部",
				isActive: true
			},
			{
				id: 1,
				value: "待付款",
				isActive: false
			},
			{
				id: 2,
				value: "待发货",
				isActive: false
			},
			{
				id: 3,
				value: "退款/收货",
				isActive: false
			}
		],
	},
	onShow(options) {
		//从缓存中加载token
		const token = wx.getStorageSync('token');
		//如果没有token，则跳转到授权页面获取token
		if (!token) {
			wx.navigateTo({
				url: '/pages/auth/auth'
			});
			return;
		}
		//包装请求头
		const header = {Authorization: token};
		//获取当前小程序页面栈 小程序页面栈长度最大为10
		//数组中索引最大的页面就是当前页面
		let Pages = getCurrentPages();
		let currentPage = Pages[Pages.length - 1];
		console.log(currentPage.options);
		//获取url上的type参数
		const {type} = currentPage.options;
		this.getOrders(type, header);

	},
	//获取订单列表的方法
	async getOrders(type, header) {
		//发送请求获取数据，把结果存入res里面
		const res = await request({url: '/my/orders/all', data: {type}, header: header})
		console.log(res)
		this.setData({
			orders: res.orders.map(v => ({
				...v,
				//将时间戳转换成GMT+8时间
				create_time_cn: (new Date(v.create_time * 1000).toLocaleString())
			}))
		})
	},

	//标题的点击事件从子组件传递Приходи
	tabsItemChange(e) {
		//解构获取index
		const {index} = e.detail;
		//修改自定义组件所使用的数组
		let {tabs} = this.data;
		//如果tabs里面的索引和解构所获取的索引对上了，就将isActive修改为true，否则媳妇爱为false
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
		//赋值到data
		this.setData({tabs})
	}
})
