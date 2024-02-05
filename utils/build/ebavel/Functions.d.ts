import { IBaseModel } from "./utils";
export type IEndpoint = {
    url: string;
    params?: {
        [key: string]: string;
    };
    headers?: {
        [key: string]: string;
    };
};
export type IEvaluatorOptions = {
    endpoint: IEndpoint;
    model: IBaseModel;
    form: string;
};
export declare const Functions: {
    new (): {
        [x: string]: any;
        fnIf(condition: any, paramTrue: any, paramFalse: any): any;
        fnConcat(): string;
        fnLeft(s: string, end: number): string;
        fnRight(s: string, end: number): string;
        fnMid(s: string, start: number, end?: number): string;
        fnRound(number: number, precision: number): number;
        fnTrim(s: string): string;
        fnGetmonth(d: string): number | undefined;
        fnDatecomponent(date: string, component: string, typeValue: string): any;
        fnInmonth(sDate: string, monthNumber: string | number): boolean | undefined;
        fnCurrentdate(): string;
        fnCurrentdatetime(): string;
        fnWeek(date: string, mode: string | number): number;
        fnWeekday(sDate: string): number | undefined;
        fnWeekdayname(sDate: string): string | number | undefined;
        fnCurrenttime(): string;
        fnCurrentlocation(): number;
        /**
         *
         * @param type Use 'day', 'month' or 'year'
         * @param increment
         * @param sDate YYYY-MM-DD
         */
        fnDateadd(type: string, increment: string | number, sDate: string): string | undefined;
        fnDatesub(type: string, increment: string | number, sDate: string): string | undefined;
        fnDatedif(date1: string, date2: string, type: string): void;
        fnDatediff(date1: string, date2: string, type: string): void;
        fnEval(): void;
        fnUsername(): void;
        fnLongname(): void;
        fnMoney(): void;
        fnAppid(): void;
        fnCount(): void;
        fnGethistorycount(): void;
        fnGethistorydata(): void;
        fnValue(): void;
        fnChoicetostring(): void;
        fnText(): void;
        fnGetdistance(): void;
        fnSupervisorn(): void;
        fnGetvalue(sField: string, sFilter: string): Promise<any>;
    };
};
