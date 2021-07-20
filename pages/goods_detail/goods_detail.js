// pages/goos_detail/goos_detail.js
/**
 * 1.发送请求获取数据
 * 2.点击轮播图 预览大图
 *  1.给轮播图添加点击事件
 *  2.调用api previewImage
 * 3.点击加入购物车
 *  1.绑定点击事件
 *  2.获取缓存中的购物车数据
 *  3.判断当前商品是否已经存在购物车
 *  4.已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存
 *  5.不存在购物车数组中 直接给购物车数组添加一个新元素 新元素带上购买数量属性 重新把数组填充回缓存
 *  6.弹出提示
 */
import {requst} from "../../requst/index.js";

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		goodsObj: {}
	},
	/**
	 * 商品对象初始化
	 */
	GoodsInfo: {},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//获取查询参数
		const {goods_id} = options;
		console.log(goods_id);
		// this.goodsId = goods_id;
		this.getGoodsDetail(goods_id)
	},
	async getGoodsDetail(goods_id) {
		const goodsObj = await requst({url: '/goods/detail', data: {goods_id}})
		this.GoodsInfo = goodsObj;
		this.setData({
			goodsObj: {
				goods_name: goodsObj.goods_name,
				goods_price: goodsObj.goods_price,
				//webp格式配置
				goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
				pics: goodsObj.pics
			}
		})
		console.log(goodsObj)
	},
	/**
	 * 点击轮播图放大预览
	 */
	handlePreviewImage: function (e) {
		console.log("%c" + "预览", "color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,green)")
		//1.构造需要预览的图片数组
		const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
		const current = e.currentTarget.dataset.url;
		wx.previewImage({
			current,
			urls
			
		})
	},
	//点击加入购物车
	handleCartAdd: function (e) {
		//获取缓存中的数组
		let cart = wx.getStorageSync('cart') || [];
		//判断商品对象是否存在于购物车数组中
		let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
		console.log(index)
		if (index === -1) {
			//数据不存在
			this.GoodsInfo.num = 1;
			this.GoodsInfo.checked = true;
			cart.push(this.GoodsInfo);
		} else {
			//数据存在执行num++
			cart[index].num++;
		}
		//把购物车重新添加回缓存中
		wx.setStorageSync('cart', cart);
		//弹窗提示
		wx.showToast({title: '加入成功', icon: 'success', mask: true})
	}
	
})