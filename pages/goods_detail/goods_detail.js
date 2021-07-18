// pages/goos_detail/goos_detail.js
/**
 * 1.发送请求获取数据
 * 2.点击轮播图 预览大图
 *  1.给轮播图添加点击事件
 *  2.调用api previewImage
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
	 * 商品对象
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
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
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
	}
	
})
