import {
    InputUrl as TicketComponentInputUrl
} from "@nextep/core/v1/models/workflow/TicketComponent";

import { useStore } from "@builder.io/mitosis";

export default function InputUrl(props) {

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
                type="url"
                onChange={state.setInputValue}
                value={(props.component as TicketComponentInputUrl).getValue().getValue()}
                placeholder={props.component.getOption().placeHolder?.get(
                    props.language,
                ) ?? ""}
                className="input input-bordered w-full "
            />
        </label>
    );
}
