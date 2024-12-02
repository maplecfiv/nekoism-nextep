import {
    CheckBoxSelection as TicketComponentCheckBoxSelection
} from "@nextep/core/v1/models/workflow/TicketComponent";
import { useStore } from "@builder.io/mitosis";

export default function CheckBoxSelection(props) {

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
            <div className="form-control">
                <label
                    class="block checked:bg-blue-500"
                >
                    {props.component.getValue().getLabel(
                        props.language,
                    )}
                </label>

            </div>
            <div className="form-control">
                {
                    (props.component as TicketComponentCheckBoxSelection).getOption().values?.map((optionValue, index) => {
                        return (
                            <label key={`${props.component.getId()}-${index}`} className="label cursor-pointer" for={`${props.component.getId()}-${index}`}>
                                <span className="label-text">{optionValue.getLabel(
                                    props.language,
                                )}</span>
                                <input type="checkbox" id={`${props.component.getId()}-${index}`} name={props.component.getId()} value={optionValue.getValue()} className="checkbox" />
                            </label>
                        );
                    })
                }

            </div>
        </>
    );
}
