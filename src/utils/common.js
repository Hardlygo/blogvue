import timeago from 'timeago.js'
/**
 * 
 * @param {*} time 
 * 传入时间参数，返回指定时间到现在的距离
 */
const getTimeAgo = (time) => {
    let timeagoInstance = new timeago();
    const str = timeagoInstance.format(time, 'zh_CN');
    return str
}

/**
 * 
 * @param {*} date 
 * @param {*} fmt 
 * 传入时间对象，转换格式
 * 返回转换后的格式时间
 * dateFormat(date,"yyyy-MM-dd")
 */
const dateFormat = function(date, fmt) {
    date = new Date(date)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export let Public = {
        'metyou': dateFormat(new Date('2018-07-07'), "yyyy-MM-dd"),
        'then': 'want to stay with you',
        'wish': 'do not leave me alone',
        'leave': 'never'
    }
    //公共参数
export let commomData = {
    currentUser: ''
}

export default {
    getTimeAgo,
    dateFormat,
    Public,
    commomData
}