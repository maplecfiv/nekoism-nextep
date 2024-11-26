import {
    Label as TicketComponentLabel,
    InputNumber as TicketComponentInputNumber,
    TicketComponentLabelValue,
} from "@nextep/core/v1/models/workflow/TicketComponent";

import Label from "./label.lite";
import { useStore } from "@builder.io/mitosis";

export default function InputNumber(props) {

    const state = useStore({
        _value: 0,
        get value() {
            return state._value;
        },
        setInputValue(inputValue: number) {
            state._value = inputValue;
        }
    });

    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">
                    {props.component.getValue().getLabel(
                        props.language,
                    )}
                </span>
            </div>
            <input
                name={props.component.getId()}
                id={props.component.getId()}
                type="number"
                onBlur={state.setInputValue}
                value={(props.component as TicketComponentInputNumber).getValue().getValue()}
                placeholder={props.component.getOption().placeHolder.get(
                    props.language,
                ) ?? ""}
                className="input input-bordered w-full max-w-xs"
            />
        </label>
    );
}
