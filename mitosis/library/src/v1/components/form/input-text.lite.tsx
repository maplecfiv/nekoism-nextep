import {
    Label as TicketComponentLabel,
    InputText as TicketComponentInputText,
    TicketComponentLabelValue,
} from "@nextep/core/v1/models/workflow/TicketComponent";

import Label from "./label.lite";
import { useStore } from "@builder.io/mitosis";

export default function InputText(props) {

    const state = useStore({
        _value: '',
        get value() {
            return state._value;
        },
        setInputValue(inputValue: number) {
            state._value = inputValue;
        }
    });
    
    return (
        <label className="form-control w-full ">
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
                type="text"
                onChange={state.setInputValue}
                value={(props.component as TicketComponentInputText).getValue().getValue()}
                placeholder={props.component.getOption().placeHolder?.get(
                    props.language,
                ) ?? ""}
                className="input input-bordered w-full "
            />
        </label>
    );
}
