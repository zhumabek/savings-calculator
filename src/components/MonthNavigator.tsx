import React from "react";
import moment from "moment"
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {currMonthName, currYear} from "../utils/helpers";

interface Props {
    value: moment.Moment,
    onChange(val: moment.Moment): void;
}

const MonthNavigator = ({value, onChange} : Props) => {
    function prevMonth() {
        return moment(value).subtract(1, "month");
    }

    function nextMonth() {
        return moment(value).add(1, "month");
    }

    function thisMonth() {
        return value.isSame(new Date(), "month");
    }

    return (
        <div>
            <InputGroup>
                <InputGroupAddon addonType="prepend"
                                 className="form__add-on pointer"
                                 onClick={() => !thisMonth() && onChange(prevMonth())}
                >
                    <InputGroupText>{"<"}</InputGroupText>
                </InputGroupAddon>
                <Input className="form__input border-left-none border-right-none background-white"
                       id="amount"
                       value={currMonthName(value) + ", " + currYear(value)}
                       disabled
                />
                <InputGroupAddon addonType="append"
                                 className="form__add-on pointer"
                                 onClick={() => onChange(nextMonth())}
                >
                    <InputGroupText>{">"}</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}

export default MonthNavigator;