const calendar = {
  /**
   * 计算指定月份共多少天
   * @param {number} year 年份
   * @param {number} month  月份
   */
  getDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  },
  /**
   * 计算指定月份第一天星期几
   * @param {number} year 年份
   * @param {number} month  月份
   */
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  /**
   * 计算指定日期星期几
   * @param {number} year 年份
   * @param {number} month  月份
   * @param {number} date 日期
   */
  getDayOfWeek(year, month, date) {
    return new Date(Date.UTC(year, month - 1, date)).getDay();
  },
  /** 
   * 日期初始化
   * @param {number} number 
   */
  initCalendar(number) {
    let calendarList = []
    for (let i = 0; i < number; i++) {
      let obj = calendar.calculateDate(i)
      // 如果是当前月份，则将今天的日期作为参数，否则传0
      let curDay = i === 0 ? new Date().getDate() : 0
      let list = calendar.renderCalendar(obj.year, obj.month, curDay)
      calendarList.push({ year: obj.year, month: obj.month, list })
    }
    return calendarList
  },
  /**
   * 渲染日历
   * @param {number} curYear
   * @param {number} curMonth
   * @param {number} curDate
   */
  renderCalendar(curYear, curMonth, curDate) {
    return [...calendar.calculatePrevMonthGrids(curYear, curMonth), ...calendar.calculateDays(curYear, curMonth, curDate)]
  },
  /**
   * 计算上月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculatePrevMonthGrids(year, month) {
    let empytGrids = [];
    const prevMonthDays = calendar.getDaysOfMonth(year, month - 1);
    const firstDayOfWeek = calendar.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      const len = prevMonthDays - firstDayOfWeek;
      for (let i = prevMonthDays; i > len; i--) {
        empytGrids.push({year, month, day: i, status: false, enable: false, selected: false});
      }
    }
    return empytGrids.reverse()
  },
  /**
   * 设置日历面板数据
   * @param {number} year 年份
   * @param {number} month  月份
   */
  calculateDays(year, month, curDate) {
    let days = [];
    const thisMonthDays = calendar.getDaysOfMonth(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      //curDate之前的为无效日期
      let enable = i >= curDate
      days.push({
        year, 
        month, 
        day: i, 
        status: true, 
        enable, 
        week: calendar.getDayOfWeek(year, month, i),
        timeStr: new Date(`${year}-${month}-${i}`).getTime()
      });
    }
    return days
  },
  /**
   * 计算距离现在n个月的年月
   * @param {number} n
   */
  calculateDate(n){
    var currentMonth = new Date().getMonth() + 1;
    var currentYear = new Date().getFullYear();
    if(n >= 0){
      currentYear = currentYear + Math.floor((currentMonth + n - 1) / 12);
      currentMonth = (currentMonth + n) % 12 === 0 ? 12 : (currentMonth + n) % 12;
    }else{
      //处理前几个月的数据，待处理
      throw Error('暂不支持过去几个月的数据，请设置未来几个月的日期')
      return
    }
    return {year: currentYear, month: currentMonth}
  },
  /**
   * 获取指定日期未来几天的起止日期数据
   * @param {number} year 年份
   * @param {number} number 未来几天
   */
  getFutureDays(d, number = 1){
    if (!number || number < 1) {
      return
    }
    let duration = number * 1000 * 60 * 60 * 24
    let curDate = new Date(d)
    let nextDate = new Date(d + duration)
    let days = [calendar.getDateParam(curDate), calendar.getDateParam(nextDate)]
    return days
  },
  /**
   * 获取指定日期未来2天的日期数据
   * @param {number} date 日期
   */
  getDateParam(date){
    let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    return {
      year,
      month,
      day,
      status: true,
      enable: true,
      week: calendar.getDayOfWeek(year, month, day),
      timeStr: new Date(`${year}-${month}-${day}`).getTime()
    }
  }
}

export default calendar