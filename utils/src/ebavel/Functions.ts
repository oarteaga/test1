import * as Utils from "./utils"
import { IBaseModel } from "./utils"

export type IEndpoint = {
    url: string,
    params?: { [key: string]: string }
    headers?: { [key: string]: string }
}
export type IEvaluatorOptions = {
    endpoint: IEndpoint,
    model: IBaseModel,
    form: string
}

const formatDate = (date: Date): string => {
    const monthNumber = date.getMonth() + 1
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${date.getFullYear()}-${month}-${day}`
}

export const Functions = class {
    [x: string]: any

    constructor() { }

    fnIf(condition: any, paramTrue: any, paramFalse: any) {
        return condition ? paramTrue : paramFalse
    }

    fnConcat() {
        return [...arguments].filter(t => typeof t == 'string').join('')
    }

    fnLeft(s: string, end: number) {
        return s.substring(0, end)
    }

    fnRight(s: string, end: number) {
        return s.substring(s.length - end)
    }

    fnMid(s: string, start: number, end?: number) {
        if (!end) {
            return s
        }
        return s.substring(start - 1, end)
    }

    fnRound(number: number, precision: number) {
        return +(number.toFixed(precision))
    }

    fnTrim(s: string) {
        return s.trim()
    }

    fnGetmonth(d: string) {
        let date = Utils.getDateFromString(d)
        if (!date) {
            return undefined
        }
        const month = date.getMonth() + 1
        return month ? month : 0
    }

    fnDatecomponent(date: string, component: string, typeValue: string) {
        return Utils.getDateComponent(date, component, typeValue)
    }

    fnInmonth(sDate: string, monthNumber: string | number) {
        let date = Utils.getDateFromString(sDate)
        if (!date) {
            return undefined
        }
        return date.getMonth() + 1 == monthNumber
    }

    fnCurrentdate(): string {
        const date = new Date()
        return formatDate(date)
    }

    fnCurrentdatetime() {
        const date = new Date()
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

        return `${this.fnCurrentdate()} ${hours}:${minutes}`
    }

    fnWeek(date: string, mode: string | number) {
        return Utils.week(date, typeof mode == 'string' ? parseInt(mode) : mode)
    }

    fnWeekday(sDate: string) {
        const date = Utils.getDateFromString(sDate)
        if (!date) {
            return undefined
        }

        return date.getDay()
    }

    fnWeekdayname(sDate: string) {
        const weekday = this.fnWeekday(sDate)
        if (!weekday) {
            return weekday
        }

        return Utils.daysNames[weekday]

    }

    fnCurrenttime() {
        return this.fnCurrentdatetime()
    }

    fnCurrentlocation() {
        return 0
    }

    /**
     * 
     * @param type Use 'day', 'month' or 'year'
     * @param increment 
     * @param sDate YYYY-MM-DD
     */
    fnDateadd(type: string, increment: string | number, sDate: string) {
        const result = Utils.AddDate(type, increment, sDate)

        if (!result) {
            return undefined
        }

        return formatDate(result)
    }

    fnDatesub(type: string, increment: string | number, sDate: string) {
        const result = Utils.AddDate(type, +increment * -1, sDate)

        if (!result) {
            return undefined
        }

        return formatDate(result)
    }

    fnDatedif(date1: string, date2: string, type: string) {
        Utils.dateDifference(date1, date2, type)
    }

    fnDatediff(date1: string, date2: string, type: string) {
        Utils.dateDifference(date1, date2, type)
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

    async fnGetvalue(sField: string, sFilter: string) {
        const [{ form, field }] = Utils.GetFieldsFromString(sField)
        sFilter = Utils.replaceValuesFilter(sFilter, this.form, this.model)

        const url = new URL(`data/${form}`, this.endpoint.url)
        url.search = new URLSearchParams({ ...this.endpoint.params, '$filter': sFilter, '$select': field }).toString();

        let response, payload: any

        try {
            response = await fetch(url, {
                headers: this.endpoint.headers
            })
            payload = await response.json();
        } catch (error) {
            throw new Error(`Query Fetch: An error has occured: "${response?.status}" url:"${url}"`);
        }

        return payload?.payload?.collection[0][field]
    }
}