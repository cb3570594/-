// components/calendar/calendar.js
import calendar from './main.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    calendarMonths: {
      type: Number
    },  
    defaultDate :{
      type: Object,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    weekList: ['日', '一', '二', '三', '四', '五', '六'], //星期顶部
    currentDays: [],  //选择的起止时间
    calendarList: []  //日历列表
  },

  ready: function () {
    this.initCalendar(this.properties.calendarMonths, this.properties.defaultDate)
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //提交按钮
    confirm() {
      let { currentDays } = this.data
      if (currentDays.length === 2) {
        //currentDays 起止时间
        //totalNightCount 计算共几晚
        this.triggerEvent('confirm', {currentDays, totalNightCount:(currentDays[1].timeStr - currentDays[0].timeStr) / (1000 * 60 * 60 * 24)})
      }
    },
    //选择日期
    selectDay(e) {
      let midx = e.currentTarget.dataset.midx
      let didx = e.currentTarget.dataset.didx

      let calendarList = this.data.calendarList
      let currentDate = calendarList[midx].list[didx]

      if (!e.currentTarget.dataset.enable) {
        return
      }

      let currentDays = this.data.currentDays

      if (currentDays.length == 0) {// 没有选择起止时间
        currentDays.push(currentDate)
      } else if (currentDays.length == 1) {// 选择开始时间，没有选择结束时间
        if (currentDate.timeStr <= currentDays[0].timeStr) {//点击日期之前
          currentDays = [currentDate]
        } else {
          currentDays.push(currentDate)
        }
      } else if (currentDays.length > 1) {// 选择起止时间后，再选择时间，则重置时间
        currentDays = [currentDate]
      }

      this.setData({
        currentDays
      })
    },
    //初始化
    initCalendar(number, defaultDate) {
      this.setData({
        currentDays: calendar.getFutureDays(defaultDate.date, defaultDate.number),
        calendarList: calendar.initCalendar(number)
      })
    },
  },

})
