// pages/search/search.js
/*
* 1. 输入框绑定input事件
*   1.获取输入框的值
*   2.合法性判断
*   3.检验通过 把输入框的值发送到后台
*   4.把返回的数据打印到页面上
* 2.防抖 (防止数据乱动) 定时器实现
*   1.防抖一般防止重复输入 重复发送请求
*   2.节流 用于页面的下拉和上拉
* 3.
* 4.
*
* */
import {request} from "../../request/index";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goods: [],
		//取消按钮是否显示
		isFocus: false,
		//输入框的值
		inputValue: ""
	},
	//这是一个计时器，初始数据看心情
	TimeId: null,
	//输入框的值改变了触发的事件
	handleInput(e) {
		//从detal中结构获取value
		const {value} = e.detail;
		//合法性检查
		if (!value.trim()) {
			//该值不合法
			this.setData({
				goods: [],
				isFocus: false
			})
			return;
		}
		//发送请求获取数据
		//防抖
		this.setData({isFocus: true})
		//清除定时器
		clearTimeout(this.TimeId);
		//设置定时器
		this.TimeId = setTimeout(() => {
			this.qsearch(value);
		}, 60 * 10)
	},
	//发送请求获取搜索结果
	async qsearch(query) {
		//获取搜索结果并填充到data
		const res = await request({url: '/goods/qsearch', data: {query}})
		console.log(res)
		this.setData({goods: res})
	},
	//取消按钮事件
	handleCancel() {
		//重置所有数据
		this.setData({
			goods: [],
			isFocus: false,
			inputValue: ""
		})
	}
	
})
