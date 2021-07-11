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
	getSwiperList: function () {
		requst({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
			.then(res => {
				this.setData({swiperList: res.data.message})
			})
	},
	//获取导航栏数据
	getCateList: function () {
		requst({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
			.then(res => {
				this.setData({cateList: res.data.message})
			})
	},
	//获取楼层数据
	getfloorList: function () {
		requst({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
			.then(res => {
				this.setData({floorList: res.data.message})
			})
	}
});
