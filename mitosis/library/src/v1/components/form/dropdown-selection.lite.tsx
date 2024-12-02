import {
    DropdownSelection as TicketComponentDropdownSelection
} from "@nextep/core/v1/models/workflow/TicketComponent";
import { useStore } from "@builder.io/mitosis";

export default function DropdownSelection(props) {

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
        <>
            <label
                for={props.component.getId()}
                class="form-control w-full"
            >

                <div className="label">
                    <span className="label-text">{props.component.getValue().getLabel(
                        props.language,
                    )}</span>
                </div>

                <select
                    id={props.component.getId()}
                    name={props.component.getId()}
                    class="select select-bordered"
                >
                    {
                        (props.component as TicketComponentDropdownSelection).getOption().values?.map((optionValue, index) => {
                            return (
                                <option key={`${props.component.getId()}-${index}`} value={optionValue.getValue()}>{optionValue.getLabel(props.language)}</option>)
                        })
                    }
                </select>
            </label>
        </>
    );
}
