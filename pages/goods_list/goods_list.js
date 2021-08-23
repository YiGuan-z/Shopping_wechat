// pages/goods_list/goods_list.js
import {request} from "../../request/index.js";
/*
* 1.用户上滑页面，页面触底，开始加载下一页
* 2.找到滚动条触底事件
* 3.判断是否还存在下一页数据 不存在则弹出提示框
* 4.假如有下一页旧加载下一页数据
* 1.触发下拉刷新事件 下拉刷新事件添加逻辑
* 2.重置数据数组
* 3.重置页码，设置为1
* 5.数据回来了，关闭 等待效果
* */
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//自定义组件需要使用的数据
		tabs: [
			{
				id: 0,
				value: "综合",
				isActive: true
			},
			{
				id: 1,
				value: "销量",
				isActive: false
			},
			{
				id: 2,
				value: "价格",
				isActive: false
			}
		],
		goodsList: []
	},
	/**
	 * 搜索接口需要的调用的参数
	 * */
	QueryParams: {
		query: '',
		cid: '',
		pagenum: 1,
		pagesize: 10
	},
	//总页数
	totalPages: 1,

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//从页面被传入的数据中获取cid并赋值给QueryParams.cid
		//有数据，则赋值，没有数据，则返回空字符串
		this.QueryParams.cid = options.cid || "";
		this.QueryParams.query = options.query || "";
		// console.log(options)
		//获取商品详情
		this.getGoodsList();
	},

	//标题的点击事件从子组件传递Приходи
	tabsItemChange(e) {
		//从点击事件中解构获取index
		const {index} = e.detail;
		//修改自定义组件tabs所使用的数据
		let {tabs} = this.data;
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
		//赋值到data
		this.setData({tabs})
	},
	//获取商品列表数据
	async getGoodsList() {
		await request({url: '/goods/search', data: this.QueryParams})
			.then(res => {
				//获取总条数
				const total = res.total;
				//计算总页数
				this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
				//拼接了数组 ...为扩展运算符
				this.setData({goodsList: [...this.data.goodsList, ...res.goods]})
			})
		//关闭下拉刷新的窗口
		wx.stopPullDownRefresh()
	},

	/**
	 * 生命周期函数--监听页面上拉触底事件
	 * */
	onReachBottom: function () {
		//判断是否还有下一页
		if (this.QueryParams.pagenum >= this.totalPages) {
			//没有下一页数据
			console.log("%c" + "没有下一页了", "color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
			//关闭加载
			wx.showToast({title: '没有下一页了', icon: 'error'})
		} else {
			// 还有下一页数据
			console.log("%c" + "有下一页数据", "color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
			this.QueryParams.pagenum++;
			this.getGoodsList();
		}
		
		
	},
	/**
	 * 下拉刷新事件
	 * */
	onPullDownRefresh: function () {
		console.log("%c" + "刷新", "color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
		//重置goodsList为空数组
		this.setData({goodsList: []})
		//将页码重置为1
		this.QueryParams.pagenum = 1;
		//重新发送请求
		this.getGoodsList();
	},
	
})
