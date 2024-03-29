import { Compiler } from '@ebavel/bnf';
import { IBaseModel } from "./utils";
import { IEvaluatorOptions, IEndpoint } from "./Functions";
export declare const Evaluator: {
    new (options: IEvaluatorOptions): {
        [x: string]: any;
        endpoint: IEndpoint | null;
        form: string | null;
        model: IBaseModel;
        compiler: Compiler;
        _result: {
            formula: string;
            value: any;
            error?: any;
        };
        cal(formula: string): Promise<any>;
        setRules(): void;
        eval(formula: string): Promise<any>;
        getValueModel(prop: string): any;
        fnIf(condition: any, paramTrue: any, paramFalse: any): any;
        fnConcat(): string;
        fnLeft(s: string, end: number): string;
        fnRight(s: string, end: number): string;
        fnMid(s: string, start: number, end?: number | undefined): string;
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
