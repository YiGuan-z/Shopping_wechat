// pages/collect/collect.js
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [
			{
				id: 0,
				value: "商品收藏",
				isActive: true
			},
			{
				id: 1,
				value: "品牌收藏",
				isActive: false
			},
			{
				id: 2,
				value: "店铺收藏",
				isActive: false
			},
			{
				id: 3,
				value: "浏览足迹",
				isActive: false
			}
		],
		collect: []
		
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		const collect = wx.getStorageSync('collect') || [];
		this.setData({collect})
		
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
	}
})
