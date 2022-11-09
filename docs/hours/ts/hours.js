var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Time = /** @class */ (function () {
    function Time() {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
    }
    Time.prototype.setHour = function (hour) {
        this.hour = hour;
        return this;
    };
    Time.prototype.setMinute = function (minute) {
        this.minute = minute;
        return this;
    };
    Time.prototype.setSecond = function (second) {
        this.second = second;
        return this;
    };
    Time.prototype.getTime = function () {
        return {
            hour: this.hour,
            minute: this.minute,
            second: this.second
        };
    };
    return Time;
}());
function includes(array, value) {
    var isInclude = false;
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        if (value === element) {
            isInclude = true;
            break;
        }
    }
    return isInclude;
}
function openingHours(_a) {
    var _b = _a.hours, _c = _b.from, from = _c === void 0 ? 0 : _c, _d = _b.to, to = _d === void 0 ? 0 : _d, _e = _a.days, days = _e === void 0 ? [] : _e;
    var now = new Date();
    var hours = now.getHours();
    var day = now.getDay();
    var fromHour = hours >= from;
    var toHour = hours < to;
    var daysInclude = includes(days, day);
    return fromHour && toHour && daysInclude;
}
function setWeekDays() {
    var sunday = 0;
    var monday = 1;
    var tuesday = 2;
    var wednesday = 3;
    var thursday = 4;
    var friday = 5;
    var saturday = 6;
    return [monday, tuesday, wednesday, thursday, friday, saturday];
}
var myTime = new Time();
myTime.setHour(7).setMinute(30);
var isAvailable = openingHours({
    hours: { from: myTime.getTime().hour, to: myTime.getTime().hour },
    days: __spreadArray([], setWeekDays(), true)
});
console.log({ isAvailable: isAvailable });
console.log(myTime.getTime());
