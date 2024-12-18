import moment from "moment";
import 'moment/locale/zh-cn';
import 'moment/locale/es';
import 'moment/locale/ru';
import 'moment/locale/vi';
import 'moment/locale/ko';
import 'moment/locale/ja';
import 'moment/locale/de';

const MomentjsLocale = () =>{

    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'a few seconds',
            ss : '%d s',
            m:  "a minute",
            mm: "%d m",
            h:  "an hour",
            hh: "%d hours",
            d:  "a day",
            dd: "%d days",
            w:  "a week",
            ww: "%d weeks",
            M:  "a month",
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        },
        durationLabelsShort: {
            S: 'msec',
            SS: 'msecs',
            SSS: 'msecs',
            s: 'sec',
            ss: 'secs',
            sss: 'secs',
            m: 'min',
            mm: 'mins',
            mmm: 'mins',
            h: 'hr',
            hh: 'hrs',
            hhh: 'hrs',
            d: 'dy',
            dd: 'dys',
            ddd: 'dys',
            w: 'wk',
            ww: 'wks',
            www: 'wks',
            M: 'mo',
            MM: 'mos',
            MMM: 'mos',
            y: 'yr',
            yy: 'yrs',
            yyy: 'yrs'
        },
    });

    moment.updateLocale('zh-cn', {
        relativeTime : {
            future: " %s",
            past:   "%s 之前",
            s  : '1 秒',
            ss : '%d 秒',
            m:  "1 分",
            mm: "%d 分",
            h:  "1 小时",
            hh: "%d 小时",
            d:  "1 天",
            dd: "%d 天",
            w:  "1 周",
            ww: "%d 周",
            M:  "1 月",
            MM: "%d 月",
            y:  "1 年",
            yy: "%d 年"
        },
        durationLabelsShort: {
            S: '微秒',
            SS: '微秒',
            SSS: '微秒',
            s: '秒',
            ss: '秒',
            sss: '秒',
            m: '分',
            mm: '分',
            mmm: '分',
            h: '时',
            hh: '时',
            hhh: '时',
            d: '天',
            dd: '天',
            ddd: '天',
            w: '周',
            ww: '周',
            www: '周',
            M: '月',
            MM: '月',
            MMM: '月',
            y: '年',
            yy: '年',
            yyy: '年'
        },
    });
}

export default MomentjsLocale

