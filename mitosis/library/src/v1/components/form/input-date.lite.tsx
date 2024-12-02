import {
    InputDate as TicketComponentInputDate
} from "@nextep/core/v1/models/workflow/TicketComponent";
import { useStore } from "@builder.io/mitosis";

export default function InputDate(props) {

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
                type="date"
                onChange={state.setInputValue}
                value={(props.component as TicketComponentInputDate).getValue().getValue()}
                placeholder={props.component.getOption().placeHolder?.get(
                    props.language,
                ) ?? ""}
                className="input input-bordered w-full "
            />
        </label>
    );
}
