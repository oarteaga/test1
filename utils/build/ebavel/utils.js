"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateDifference = exports.AddDate = exports.getDateFromString = exports.week = exports.getDateComponent = exports.replaceValuesFilter = exports.GetFieldsFromString = exports.daysNames = void 0;
const parseFilter_1 = require("./parseFilter");
const NumberToText_1 = require("./NumberToText");
const DateFNS = __importStar(require("date-fns"));
const validFormFieldChars = '([A-Za-z0-9\\/\\-%()_#áéíóúü?É?ÓÚÜ@¿?¡!.$&ñÑ ]+)';
const oldFieldFormPattern = '\\[' + validFormFieldChars + '@' + validFormFieldChars + '\\]';
const newFieldFormPattern = '(?:APP\\[' +
    '(?:' +
    validFormFieldChars.substr(1) +
    '\\].)?(FORM|VIEW)\\[' +
    validFormFieldChars +
    '\\](\\.(FIELD|DETAILS)\\[' +
    validFormFieldChars +
    '\\](\\.(FIELD)\\[' +
    validFormFieldChars +
    '\\]|)|)(?!\\.\\w*\\[)';
const matchOldFieldFormPatternG = new RegExp(oldFieldFormPattern, 'g');
const matchNewFieldFormPatternG = new RegExp(newFieldFormPattern, 'g');
const currencyPattern = /(USD)|(US\$)|(C\$)|(Lek)|(Дин\.)|(Br)|(BZ\$)|(\$b)|(KM)|(лв)|(R\$)|(kn)|(Kč)|(RD\$)|(Ft)|(kr)|(Rp)|(J\$)|(ден)|(RM)|(₨)|(MT)|(kr)|(Gs)|(B\/\.)|(S\/\.)|(zł)|(lei)|(CHF)|(NT\$)|(TT\$)|(\$U)|(Bs)|(Z\$)|\$|¢|ƒ|₼|L|P|Q|R|S|៛|¥|₡|₱|£|€|₩|₪|₭|₮|₦|₽|₴|₫/;
exports.daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const GetFieldsFromString = (aString, sForm) => {
    let res = [], m;
    while ((m = matchOldFieldFormPatternG.exec(aString))) {
        if (sForm && m[2] != sForm)
            continue;
        res.push({ form: m[2], field: m[1] });
    }
    while ((m = matchNewFieldFormPatternG.exec(aString))) {
        if (sForm && m[2] != sForm)
            continue;
        res.push({ form: m[2], field: m[5] });
    }
    return res;
};
exports.GetFieldsFromString = GetFieldsFromString;
const replaceValuesFilter = function (filter, sectionName, model) {
    return (0, parseFilter_1.parseFilter)(filter, sectionName, model);
};
exports.replaceValuesFilter = replaceValuesFilter;
/**
 * Get date component
 * @param date
 * @param component month, day, week, year
 * @param typeValue number, text
 * @returns
 */
const getDateComponent = function (date, component, typeValue) {
    let d = new Date(date);
    let value;
    typeValue = typeValue ? typeValue : 'number';
    const translate = function (s) {
        return s;
    };
    switch (component) {
        case '"month"':
        case 'month':
            d.setDate(d.getDate() + 1);
            const numberMonth = d.getMonth();
            var monthNames = [translate("January"), translate("February"), translate("March"), translate("April"), translate("May"), translate("June"),
                translate("July"), translate("August"), translate("September"), translate("October"), translate("November"), translate("December")];
            if (typeValue == '"text"' || typeValue == 'text') {
                value = monthNames[numberMonth];
            }
            if (typeValue == '"number"' || typeValue == 'number') {
                value = numberMonth + 1;
            }
            break;
        case '"day"':
        case 'day':
            if (typeValue == '"text"' || typeValue == 'text') {
                let numberDay = d.getDay();
                var daysNames = [translate("Sunday"), translate("Monday"), translate("Tuesday"), translate("Wednesday"), translate("Thursday"),
                    translate("Friday"), translate("Saturday")];
                if (numberDay + 1 == 7) {
                    numberDay = 0;
                    value = daysNames[numberDay];
                }
                else {
                    value = daysNames[numberDay + 1];
                }
                var p = new Date(date);
                p.setDate(p.getDate() + 1);
                numberDay = p.getDate();
                value = value + " " + (0, NumberToText_1.numtoTxt)(numberDay);
            }
            if (typeValue == '"number"' || typeValue == 'number') {
                d.setDate(d.getDate() + 1);
                value = d.getDate();
            }
            break;
        case '"week"':
        case 'week':
            var onejan = new Date(d.getFullYear(), 0, 1);
            let week = Math.ceil((((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
            if (week >= 53) {
                week = 1;
            }
            if (typeValue == '"text"' || typeValue == 'text') {
                value = (0, NumberToText_1.numtoTxt)(week);
            }
            if (typeValue == '"number"' || typeValue == 'number') {
                value = week;
            }
            if (value == 53) {
                value = 1;
            }
            break;
        case '"year"':
        case 'year':
            d.setDate(d.getDate() + 1);
            let numberYear = d.getFullYear();
            if (typeValue == '"text"' || typeValue == 'text') {
                value = (0, NumberToText_1.numtoTxt)(numberYear);
            }
            if (typeValue == '"number"' || typeValue == 'number') {
                value = numberYear;
            }
            break;
    }
    return value;
};
exports.getDateComponent = getDateComponent;
const week = function (date, mode) {
    date = date.replace(/-/g, "/");
    let firstWeek = 0, janOne, firstDay, weekNumber;
    var dMoment = new Date(date.substring(0, 10));
    firstDay = janOne = new Date(dMoment.getFullYear(), 0, 1);
    let tzOffset = janOne.getTimezoneOffset();
    dMoment.setMinutes(dMoment.getMinutes() + tzOffset);
    janOne.setMinutes(janOne.getMinutes() + tzOffset);
    firstDay.setMinutes(janOne.getMinutes() + tzOffset);
    let dif = 0;
    switch (mode) {
        case 1:
            if (janOne.getDay() != 0) {
                firstWeek = -1;
                dif = 7 - janOne.getDay();
            }
            break;
        case 2:
            if (janOne.getDay() != 1) {
                firstWeek = -1;
                dif = janOne.getDay() == 0 ? 1 : 8 - janOne.getDay();
            }
            break;
    }
    if (dif != 0)
        firstDay.setMinutes(firstDay.getMinutes() + dif * 60 * 24);
    weekNumber = Math.ceil((((dMoment.getTime() - firstDay.getTime()) / 86400000) + 1) / 7);
    if (weekNumber >= 1) {
        return weekNumber;
    }
    else {
        let dec31 = '' + (dMoment.getFullYear() - 1) + '/' + 12 + '/' + 31;
        return (0, exports.week)(dec31, mode);
    }
};
exports.week = week;
const getDateFromString = (sDate) => {
    try {
        // El espacio hace que '2023-10-31' regrese el dia correcto y no '2023-10-30'
        const date = DateFNS.parseISO(sDate);
        if (!date.getDate()) {
            return null;
        }
        return date;
    }
    catch (error) {
        return null;
    }
};
exports.getDateFromString = getDateFromString;
/**
 *
 * @param type
 * @param increment Negative or positive
 * @param sDate
 * @returns
 */
const AddDate = (type, increment, sDate) => {
    let result = (0, exports.getDateFromString)(sDate);
    if (!result) {
        return null;
    }
    let options = {};
    increment = +increment;
    type = type.toLowerCase().replace(/'/g, "") + 's';
    if (['days', 'months', 'years', 'hours', 'minutes'].includes(type)) {
        options = { [type]: Math.abs(increment) };
    }
    if (increment > 0) {
        result = DateFNS.add(result, options);
    }
    else {
        result = DateFNS.sub(result, options);
    }
    return result;
};
exports.AddDate = AddDate;
const dateDifference = (sDate1, sDate2, type) => {
    var _a;
    type = type.toLowerCase().replace(/'/g, "") + 's';
    type = ((_a = type.at(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + type.substring(1);
    let date1 = (0, exports.getDateFromString)(sDate1);
    let date2 = (0, exports.getDateFromString)(sDate2);
    let result = null;
    if (!date1 || !date2) {
        return null;
    }
    if (['Days', 'Months', 'Years', 'Hours', 'Minutes'].includes(type)) {
        //DateFNS.`differenceInDays`
    }
    return result;
};
exports.dateDifference = dateDifference;
