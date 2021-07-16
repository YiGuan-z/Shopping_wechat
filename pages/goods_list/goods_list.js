// pages/goods_list/goods_list.js
import {requst} from "../../requst/index.js";
/*
* 1.用户上滑页面，页面触底，开始加载下一页
* 2.找到滚动条触底事件
* 3.判断是否还存在下一页数据 不存在则弹出提示框
* 4.假如有下一页旧加载下一页数据
* 1.触发下拉刷新事件 下拉刷新事件添加逻辑
* 2.重置数据数组
* 3.重置页码，设置为1
* */
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
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
		pagenum: '1',
		pagesize: '10'
	},
	//总页数
	totalPages: 1,
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.QueryParams.cid = options.cid;
		console.log(options)
		//获取商品详情
		this.getGoodsList();
	},
	
	//标题的点击事件从子组件传递Приходи
	tabsItemChange(e) {
		// console.log(e)
		const {index} = e.detail;
		//修改源数组
		let {tabs} = this.data;
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
		//赋值到data
		this.setData({
			tabs
		})
	},
	//获取商品列表数据
	async getGoodsList() {
		const res = await requst({url: '/goods/search', data: this.QueryParams})
		//获取总条数
		const total = res.total;
		//计算总页数
		this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
		// .then(res => {
		// 	this.setData({goodsList: res})
		// })
		//拼接了数组 ...为扩展运算符
		this.setData({goodsList:[ ...this.data.goodsList,...res.goods]})
	},
	
	/**
	 * 生命周期函数--监听页面上拉触底事件
	 * */
	onReachBottom: function (options) {
		//判断是否还有下一页
		if(this.QueryParams.pagenum>=this.totalPages){
			//没有下一页数据
			console.log("%c"+"没有下一页数据了","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
			wx.showToast({title:'没有下一页数据',icon:'error'})
		}else{
			//还有下一页数据
			console.log("%c"+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
			this.QueryParams.pagenum++;
			this.getGoodsList();
		}
		console.log("页面触底")
		
	},
	/**
	* 下拉刷新事件
	* */
	onPullDownRefresh:function(options, callback){
		console.log("%c"+"刷新","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
	}
})
