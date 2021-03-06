// pages/cart/cart.js
/*
* 获取用户收货地址
*   绑定用户点击事件
*   调用小程序内置api 获取用户地址
*   获取用户对小程序所授予获取地址的权限状态 scope
*   用户点击提示框为确定时 scope权限为true
*   该权限在2.16.1被废弃 腾讯果然不安好心
*   把获取到的地址存入本地缓存中
* 2.页面加载完毕
*   1.获取本地存储中的数据
*   2.把数据赋给data中的变量
* 3.页面加载完毕
*   1.获取缓存中的购物车数组
*   2.把购物车数据填充到data中
*   手动给goods_detail添加checked属性，默认为true
*       num=1;
*       checked=true;
*   4.全选的实现
*       1.onShow 获取缓存中的购物车数组
*       2.根据购物车中的商品数据计算 所有的商品都被选中 全选就被选中
*   5.商品总价格的计算
*       1.都需要该商品被选中 才能拿来计算
*       2.获取购物车数组
*       3.遍历
*       4.判断商品是否选中
*       5.总价格+=商品的单价*数量
*       5.总价格+=商品的数量
*       6.把计算结果后的价格和数量返回data
* 6.商品的选中
*   1.绑定change事件
*   2.获取到被修改商品的对象
*   3.商品对象中的选中状态，取反
*   4.重新填充会data中和缓存中
*   5.重新计算全选，总价格，总数量。
* 7.全选和反选
*   1.全选复选框绑定事件
*   2.获取data中的选中状态 allckecked
*   3.取反
*   4.遍历购物车数组 让购物车商品选中状态都跟随allckecked改变
*   5.把购物车数组和allchecked状态重新设置回设置中和缓存中
* 8.商品数量的编辑
*   1.'+''-'绑定同一个点击事件 使用自定义属性区分'+''-'
*       1.'+' +1
*       2.'-' -1
*   2.传递被点击的商品id goods_id
*   3.获取data中的购物车数组 来获取到被修改的商品对象
*   4.修改商品对象的num属性
*   5.把cart数组设置回缓存和data中
*   6.当商品数量为1，同时点击了'-'，弹出提示框询问是否删除
*       弹窗提示wx.showModal是否删除
*           确定 执行删除
*           取消 关闭对话框
* 9.点击结算
*   1.判断有没有收货地址
*   2.判断用户有没有选购
*   3.经过验证后跳转到支付页面
* */
import {chooseAddress, showModal, showToast} from '../../utils/asyncWx.js'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//地址
		address: {},
		//商品的数组
		cart: [],
		//是否全部选中
		allChecked: false,
		//商品的总价
		totalPrice: 0,
		//商品的数量
		totalNum: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	/*
	* 页面加载完成
	* */
	onShow: function () {
		//获取缓存中的收货地址
		const address = wx.getStorageSync('address');
		//获取缓存中的购物车数据
		const cart = wx.getStorageSync('cart') || [];
		//计算全选
		//ever 数组方法，会遍历就收一个回调函数，如果每一个回调函数都返回true，
		// 那么该函数返回true
		//如果是一个空数组，返回值就是true
		//如果数组长度为0就执行?后面的方法，否则就直接返回false
		//黑马程序猿炫技中
		// const allChecked=cart.length?cart.every(v=>v.checked):false;
		// //赋值
		// this.setData({address, cart, allChecked, totalPrice, totalNum});
		//自定义的set方法
		this.setCart(cart)
		this.setData({address})
	},
	//点击获取收货地址
	async handleChooseAddress() {
		try {
			let address = await chooseAddress()
			console.log(address)
			//给address里的all字段封装四个属性
			address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
			//将用户地址存入缓存
			wx.setStorageSync('address', address)
		} catch (e) {
			console.error(e)
		}
		//腾讯更新，该代码已被删减
		//获取权限状态
		// const res1=await getSetting;
		// const scopeAddress=res1.authSetting['scope.Address']
		// const res2=await chooseAddress()
		// console.log(res2)
		// 获取收货地址
		// wx.chooseAddress({
		// 	success:(res)=>{
		// 		console.log(res)
		// 	}
		// })
		
	},
	//商品的单选
	handleItemChange(e) {
		//1.获取被修改商品的id
		const goods_id = e.currentTarget.dataset.id;
		// console.log(goods_id)
		//2.获取购物车数组
		let {cart} = this.data;
		//3.通过索引找到被修改的商品对象
		let index = cart.findIndex(v => v.goods_id === goods_id);
		//4.选中状态取反
		cart[index].checked = !cart[index].checked;
		this.setCart(cart)
	},
	//设置购物车状态同时重新计算底部工具栏数据
	//自定义的setData
	setCart(cart) {
		//计算商品价格
		let allChecked = true;
		//商品的总价格 总数量
		let totalPrice = 0;
		let totalNum = 0;
		cart.forEach(k => {
			if (k.checked) {
				totalPrice += k.num * k.goods_price;
				totalNum += k.num;
			} else {
				allChecked = false;
			}
		})
		//判断数组是否为空
		allChecked = cart.length !== 0 ? allChecked : false;
		//5&6.把购物车数据重新填充回data&cache
		this.setData({cart, totalPrice, totalNum, allChecked});
		wx.setStorageSync("cart", cart);
	},
	//全选反选事件
	handleItemAllCheck() {
		//获取data中的数据
		let {cart, allChecked} = this.data;
		//修改值 给allChecked取反
		allChecked = !allChecked;
		//循环修改cart数组中的商品选中状态
		cart.forEach(v => v.checked = allChecked);
		//把修改后的值 填充回data中和缓存中
		this.setCart(cart);
	},
	//修改商品数量事件
	async handleItemNumEdit(e) {
		//获取事件传递的参数
		const {operation, id} = e.currentTarget.dataset;
		console.log({operation, id})
		//获取购物车数组
		let {cart} = this.data;
		//找到需要修改的商品索引
		const index = cart.findIndex(v => v.goods_id === id);
		//判断是否要执行删除
		if (cart[index].num === 1 && operation === -1) {
			//弹窗提示
			const res = await showModal({content: "您是否要删除？"})
			if (res.confirm) {
				cart.splice(index, 1)
				this.setCart(cart);
			}
			
		} else {
			//进行修改商品数量
			cart[index].num += operation
			//设置回缓存和data
			this.setCart(cart)
		}
	},
	//点击结算的功能
	async handlePay() {
		//判断收货地址
		const {address, totalNum} = this.data;
		if (!address.userName) {
			await showToast({title: '您还没有添加收货地址'})
			return;
		}
		//判断用户有没有选购商品
		if (totalNum === 0) {
			await showToast({title: '您还没有选购商品'})
			return;
		}
		//跳转到支付页面
		wx.navigateTo({
			url: '/pages/pay/pay'
		})
		
	}
})
