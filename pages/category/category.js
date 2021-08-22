import {request} from "../../request/index.js";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//左侧菜单数据
		leftMenuList: [],
		//右侧商品数据
		rightContent: [],
		//被点击的左侧菜单
		currentIndex: 0,
		//右侧内容滚动条距离顶部的距离
		scrollTop: 0
	},
	Cates: [],

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		/*
		1.异步请求获取数据
		2.获取分类数据
		3.判断本地存储中有没有旧数据
		4.有旧的数据同时没有过期旧使用本地存储中的数据
		*/
		//1.获取本地存储中的数据
		const Cates = wx.getStorageSync("cates")
		if (!Cates) {
			this.getCategoryList()
		} else {
			//有旧数据 定义过期时间
			if (Date.now - Cates.time > 1000 * 10) {
				//重新发送请求
				this.getCategoryList()
			} else {
				//可以使用旧数据
				this.Cates = Cates.data;
				console.log("正在使用本地缓存")
				//构造左侧菜单数据
				let leftMenuList = this.Cates.map(v => v.cat_name)
				//构造右侧商品数据
				let rightContent = this.Cates[0].children;
				this.setData({leftMenuList, rightContent})
			}
		}
		
		
	},
	//获取分类数据
	async getCategoryList() {
		//data外的数据赋值方式
		this.Cates = await request({url: '/categories'});
		//把接口获取的数据存入本地
		wx.setStorageSync("cates", {time: Date.now(), data: this.Cates})
		//构造左侧菜单数据
		let leftMenuList = this.Cates.map(v => v.cat_name)
		//构造右侧商品数据
		let rightContent = this.Cates[0].children;
		//填充数据
		this.setData({leftMenuList, rightContent})
	},
	/*左侧菜单点击事件*/
	handleItemTap(e) {
		/*
		1.获取被点击的标题上的索引
		2.给data中的currentIndex赋值
		3.根据不同的索引渲染不同的内容
		* */
		//使用函数解构获取被点击的索引
		const {index} = e.currentTarget.dataset;
		//使用被点击的索引获取Cates里面的children对象
		let rightContent = this.Cates[index].children;
		this.setData({
			currentIndex: index,
			rightContent,
			scrollTop: 0
		})
		//重新设置右侧内容的scroll-view标签的顶部距离
	}
	
})
