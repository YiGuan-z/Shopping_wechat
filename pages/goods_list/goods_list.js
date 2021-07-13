// pages/goods_list/goods_list.js
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
		]
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
	},
	//标题的点击事件从子组件传递Приходи
	tabsItemChange(e){
		// console.log(e)
		const {index}=e.detail;
		//修改源数组
		let {tabs}=this.data;
		tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
		//赋值到data
		this.setData({
			tabs
		})
	}
})
