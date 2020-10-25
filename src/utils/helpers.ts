import * as moment from "moment"

export function currMonthName(date: moment.Moment) {
    return date.format("MMMM");
}

export function currYear(date: moment.Moment) {
    return date.format("YYYY");
}

export function convertToNumberCurrency(value: string){
    return Number(value.replace(/,/g, ''));
}

export function convertToStringCurrency(value: number){
    return value.toLocaleString();
}

