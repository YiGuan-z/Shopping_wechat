//Page Object
//引入发送请求的方法
import {requst} from "../../requst/index.js";

Page({
	data: {
		//轮播图初始化
		swiperList: [],
		//导航初始化
		cateList: [],
		//楼层数据初始化
		floorList: []
	},
	//options(Object)
	//页面开始加载就会触发
	onLoad: function (options) {
		//1.发送异步请求获取数据
		//2.调用轮播图数据
		this.getSwiperList()
		//3.调用导航栏数据
		this.getCateList()
		//4.调用楼层数据
		this.getfloorList()
	},
	//获取轮播图数据
	async getSwiperList() {
		requst({url: '/home/swiperdata'})
			.then(res => {
				// res.forEach(v => {
				// 	v.navigator_url = v.navigator_url.replace('main', 'goods_detail')
				// })
				this.setData({swiperList: res})
			})
	},
	//获取导航栏数据
	async getCateList() {
		requst({url: '/home/catitems'})
			.then(res => {
				this.setData({cateList: res})
			})
	},
	//获取楼层数据
	async getfloorList() {
		requst({url: '/home/floordata'})
			.then(res => {
				res.forEach(v1 => {
					v1.product_list.forEach(v2 => {
						v2.navigator_url = v2.navigator_url.replace(/\?/, '/goods_list\?')
					})
				})
				this.setData({floorList: res})
			})
	}
	
});
