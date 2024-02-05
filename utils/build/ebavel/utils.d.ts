export type IBaseModel = {
    [key: string]: any;
};
export declare const daysNames: string[];
export declare const GetFieldsFromString: (aString: string, sForm?: string) => {
    form: string;
    field: string;
}[];
export declare const replaceValuesFilter: (filter: string, sectionName: string, model: IBaseModel) => string;
/**
 * Get date component
 * @param date
 * @param component month, day, week, year
 * @param typeValue number, text
 * @returns
 */
export declare const getDateComponent: (date: string, component: string, typeValue: string) => any;
export declare const week: (date: string, mode: number) => number;
export declare const getDateFromString: (sDate: string) => Date | null;
/**
 *
 * @param type
 * @param increment Negative or positive
 * @param sDate
 * @returns
 */
export declare const AddDate: (type: string, increment: string | number, sDate: string) => Date | null;
export declare const dateDifference: (sDate1: string, sDate2: string, type: string) => Date | null;
