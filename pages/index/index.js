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
		const swiperList = await requst({url: '/home/swiperdata'})
		this.setData({swiperList})
	},
	//获取导航栏数据
	async getCateList() {
		const cateList = await requst({url: '/home/catitems'})
		this.setData({cateList})
	},
	//获取楼层数据
	async getfloorList() {
		const floorList = await requst({url: '/home/floordata'})
		floorList.forEach(v => {
			v.product_list.forEach(v2 => {
				v2.navigator_url = v2.navigator_url.replace(/\?/, '/goods_list\?')
			})
		})
		this.setData({floorList})
	}
	
});
