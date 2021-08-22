//Page Object
//引入发送请求的方法
import {request} from "../../request/index.js";

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
		this.getFloorList()
	},
	//获取轮播图数据
	async getSwiperList() {
		const swiperList = await request({url: '/home/swiperdata'})
		this.setData({swiperList})
	},
	//获取导航栏数据
	async getCateList() {
		const cateList = await request({url: '/home/catitems'})
		this.setData({cateList})
	},
	//获取楼层数据
	async getFloorList() {
		const floorList = await request({url: '/home/floordata'});
		floorList.forEach(v => {
			v.product_list.forEach(v1 => {
				v1.navigator_url = v1.navigator_url.replace(/\?/, '/goods_list\?')
			})
			this.setData({floorList})
		})
	}
})
