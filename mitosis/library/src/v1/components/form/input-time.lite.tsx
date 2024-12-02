import {
    InputTime as TicketComponentInputTime
} from "@nextep/core/v1/models/workflow/TicketComponent";
import { useStore } from "@builder.io/mitosis";

export default function InputTime(props) {

    const state = useStore({
        _value: '',
        get value() {
            return state._value;
        },
        setInputValue(inputValue: string) {
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
                type="time"
                onChange={state.setInputValue}
                value={(props.component as TicketComponentInputTime).getValue().getValue()}
                placeholder={props.component.getOption().placeHolder?.get(
                    props.language,
                ) ?? ""}
                className="input input-bordered w-full "
            />
        </label>
    );
}
