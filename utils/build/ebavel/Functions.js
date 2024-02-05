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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functions = void 0;
const Utils = __importStar(require("./utils"));
const formatDate = (date) => {
    const monthNumber = date.getMonth() + 1;
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
};
const Functions = class {
    constructor() { }
    fnIf(condition, paramTrue, paramFalse) {
        return condition ? paramTrue : paramFalse;
    }
    fnConcat() {
        return [...arguments].filter(t => typeof t == 'string').join('');
    }
    fnLeft(s, end) {
        return s.substring(0, end);
    }
    fnRight(s, end) {
        return s.substring(s.length - end);
    }
    fnMid(s, start, end) {
        if (!end) {
            return s;
        }
        return s.substring(start - 1, end);
    }
    fnRound(number, precision) {
        return +(number.toFixed(precision));
    }
    fnTrim(s) {
        return s.trim();
    }
    fnGetmonth(d) {
        let date = Utils.getDateFromString(d);
        if (!date) {
            return undefined;
        }
        const month = date.getMonth() + 1;
        return month ? month : 0;
    }
    fnDatecomponent(date, component, typeValue) {
        return Utils.getDateComponent(date, component, typeValue);
    }
    fnInmonth(sDate, monthNumber) {
        let date = Utils.getDateFromString(sDate);
        if (!date) {
            return undefined;
        }
        return date.getMonth() + 1 == monthNumber;
    }
    fnCurrentdate() {
        const date = new Date();
        return formatDate(date);
    }
    fnCurrentdatetime() {
        const date = new Date();
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${this.fnCurrentdate()} ${hours}:${minutes}`;
    }
    fnWeek(date, mode) {
        return Utils.week(date, typeof mode == 'string' ? parseInt(mode) : mode);
    }
    fnWeekday(sDate) {
        const date = Utils.getDateFromString(sDate);
        if (!date) {
            return undefined;
        }
        return date.getDay();
    }
    fnWeekdayname(sDate) {
        const weekday = this.fnWeekday(sDate);
        if (!weekday) {
            return weekday;
        }
        return Utils.daysNames[weekday];
    }
    fnCurrenttime() {
        return this.fnCurrentdatetime();
    }
    fnCurrentlocation() {
        return 0;
    }
    /**
     *
     * @param type Use 'day', 'month' or 'year'
     * @param increment
     * @param sDate YYYY-MM-DD
     */
    fnDateadd(type, increment, sDate) {
        const result = Utils.AddDate(type, increment, sDate);
        if (!result) {
            return undefined;
        }
        return formatDate(result);
    }
    fnDatesub(type, increment, sDate) {
        const result = Utils.AddDate(type, +increment * -1, sDate);
        if (!result) {
            return undefined;
        }
        return formatDate(result);
    }
    fnDatedif(date1, date2, type) {
        Utils.dateDifference(date1, date2, type);
    }
    fnDatediff(date1, date2, type) {
        Utils.dateDifference(date1, date2, type);
    }
    fnEval() {
    }
    fnUsername() {
    }
    fnLongname() {
    }
    fnMoney() {
    }
    fnAppid() {
    }
    fnCount() {
    }
    fnGethistorycount() {
    }
    fnGethistorydata() {
    }
    fnValue() {
    }
    fnChoicetostring() {
    }
    fnText() {
    }
    fnGetdistance() {
    }
    fnSupervisorn() {
    }
    fnGetvalue(sField, sFilter) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const [{ form, field }] = Utils.GetFieldsFromString(sField);
            sFilter = Utils.replaceValuesFilter(sFilter, this.form, this.model);
            const url = new URL(`data/${form}`, this.endpoint.url);
            url.search = new URLSearchParams(Object.assign(Object.assign({}, this.endpoint.params), { '$filter': sFilter, '$select': field })).toString();
            let response, payload;
            try {
                response = yield fetch(url, {
                    headers: this.endpoint.headers
                });
                payload = yield response.json();
            }
            catch (error) {
                throw new Error(`Query Fetch: An error has occured: "${response === null || response === void 0 ? void 0 : response.status}" url:"${url}"`);
            }
            return (_a = payload === null || payload === void 0 ? void 0 : payload.payload) === null || _a === void 0 ? void 0 : _a.collection[0][field];
        });
    }
};
exports.Functions = Functions;
