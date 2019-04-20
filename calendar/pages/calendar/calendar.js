// pages/detail/calendar/calendar.js
import calendar from '../../components/calendar/main.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarMonths: 4,
    defaultDate:{}
  },
  //提交
  confirm(e){
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date().getTime() + (1000 * 60 * 60 * 24) * 2
    this.setData({
      defaultDate: {
        date,
        number: 2
      }
    })
  },
})