/** ***** 时间相关工具函数 *******/

/**
 * Date 转化为指定格式的String<br>
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符<br>
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * @param {string} date
 * @param {string} fmt
 * @returns {string}
 * @example
 *
 * formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss.S');
 * // => 2006-07-02 08:09:04.423
 *
 * formatDate(Date.now(), 'yyyy-MM-dd E HH:mm:ss');
 * // => 2009-03-10 二 20:09:04
 *
 * formatDate(Date.now(), 'yyyy-MM-dd EE hh:mm:ss');
 * // => 2009-03-10 周二 08:09:04
 *
 * formatDate(Date.now(), 'yyyy-MM-dd EEE hh:mm:ss');
 * // => 2009-03-10 星期二 08:09:04
 *
 * formatDate(Date.now(), 'yyyy-M-d h:m:s.S')
 * // => 2006-7-2 8:9:4.18
 */
export function formatDate (date, fmt) {
    /* eslint-disable-next-line */
    if (date === void 0) date = new Date()
    /* eslint-disable-next-line */
    if (fmt === void 0) fmt = 'yyyy-MM-dd HH:mm:ss'
    // eslint-disable-next-line no-useless-escape
    date = (typeof date === 'number' || typeof date === 'string') ? new Date((date + '').replace(/\-/g, '/')) : date
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    var week = {
      0: '\u65e5',
      1: '\u4e00',
      2: '\u4e8c',
      3: '\u4e09',
      4: '\u56db',
      5: '\u4e94',
      6: '\u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  
  /**
   * 将时间转化为几天前,几小时前，几分钟前
   *
   * @param {number} ms
   * @returns {*}
   * @example
   *
   * formatTimeAgo(1505232000000);
   * // => 1天前
   */
  export function formatTimeAgo (ms) {
    ms = parseInt(ms)
    var timeNow = Date.now()
    var diff = (timeNow - ms) / 1000
    var date = new Date()
    var days = Math.round(diff / (24 * 60 * 60))
    var hours = Math.round(diff / (60 * 60))
    var minutes = Math.round(diff / 60)
    var second = Math.round(diff)
    if (days > 0 && days < 2) {
      return days + '天前'
    } else if (days <= 0 && hours > 0) {
      return hours + '小时前'
    } else if (hours <= 0 && minutes > 0) {
      return minutes + '分钟前'
    } else if (minutes <= 0 && second >= 0) {
      return '刚刚'
    } else {
      date.setTime(ms)
      return (date.getFullYear() + '-' + f(date.getMonth() + 1) + '-' + f(date.getDate()) + ' ' + f(date.getHours()) + ':' + f(date.getMinutes()))
    }
    function f (n) {
      return (n < 10) ? '0' + n : n
    }
  }
  
  /**
   * 获取指定时间unix时间戳
   *
   * @param {string} time
   * @returns {number}
   * @example
   *
   * formatDateToTimeStamp('20160126 12:00:00');
   * // => 1453780800000
   *
   * formatDateToTimeStamp('2016-01-26 12:00:00');
   * // => 1453780800000
   *
   * formatDateToTimeStamp('2016.01.26 12:00:00');
   * // => 1453780800000
   *
   * formatDateToTimeStamp('20160126');
   * // => 1453737600000
   *
   * formatDateToTimeStamp('2016-01-26 12:00:00.0');
   * // => 1453780800000
   */
  export function formatDateToTimeStamp (time) {
    if (typeof time !== 'string') { throw new Error('time数据类型必须是string') }
    // 2016-05-23 13:58:02.0
    if (time.length > 19) {
      time = time.substring(0, 19)
    }
    var unixTime
    var pattern = /-|\./g
    var year
    var month
    var day
    var reset
    if (pattern.test(time)) {
      unixTime = time.replace(pattern, '/')
    } else {
      // 若无’-‘，则不处理
      if (!~time.indexOf('-')) {
        year = time.slice(0, 4)
        month = time.slice(4, 6)
        day = time.slice(6, 8)
        reset = time.slice(8)
        unixTime = year + '/' + month + '/' + day + reset
      }
    }
    return Math.round(new Date(unixTime).getTime())
  }
  
  /**
   * 得到两个时间的时间差（返回天数）
   *
   * @param {number} startDay 开始时间戳
   * @param {number} endDay   结束时间戳
   * @returns {number}
   * @example
   *
   * getDiffDay(1501516800000, 1504195200000);
   * // => 31
   */
  export function getDiffDay (startDay, endDay) {
    startDay = Number(startDay)
    endDay = Number(endDay)
    return Math.abs(endDay - startDay) / (24 * 1000 * 3600)
  }
  
  /**
   * @desc 获取指定日期月份的总天数
   * @param {Date} time
   * @return {Number}
   * @example
   * monthDays('2029-2')
   * // => 28
   */
  export function monthDays (time) {
    time = new Date(time)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    return new Date(year, month, 0).getDate()
  }
  
  /**
   * @desc ${startTime - endTime}的剩余时间,startTime大于endTime时，均返回0
   * @param { Date | String } startTime
   * @param { Date | String } endTime
   * @returns { Object } { d, h, m, s } 天 时 分 秒
   * @example
   * timeLeft('2020-2-10 19:02:20', '2020-2-21 20:01:30')
   * // => {d: 11, h: 0, m: 59, s: 10}
   */
  
  export function timeLeft (startTime, endTime) {
    if (!startTime || !endTime) {
      return
    }
    var startDate, endDate
    if (startTime instanceof Date) {
      startDate = startTime
    } else {
      startDate = new Date(startTime.replace(/-/g, '/')) // 开始时间
    }
    if (endTime instanceof Date) {
      endDate = endTime
    } else {
      endDate = new Date(endTime.replace(/-/g, '/')) // 结束时间
    }
    var t = endDate.getTime() - startDate.getTime()
    var d = 0
    var h = 0
    var m = 0
    var s = 0
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24)
      h = Math.floor(t / 1000 / 60 / 60 % 24)
      m = Math.floor(t / 1000 / 60 % 60)
      s = Math.floor(t / 1000 % 60)
    }
    return { d, h, m, s }
  }
  
  /**
   *
   * @desc   格式化现在距${endTime}的剩余时间
   * @param  {Date} endTime
   * @return {String}
   * @example
   * formatRemainTime('2020-4-24')
   * // => "0天 6小时 50分钟 52秒"
   */
  export function formatRemainTime (endTime) {
    var startDate = new Date() // 开始时间
    var endDate = new Date(endTime) // 结束时间
    var t = endDate.getTime() - startDate.getTime() // 时间差
    var d = 0
    var h = 0
    var m = 0
    var s = 0
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24)
      h = Math.floor(t / 1000 / 60 / 60 % 24)
      m = Math.floor(t / 1000 / 60 % 60)
      s = Math.floor(t / 1000 % 60)
    }
    return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒'
  }
  