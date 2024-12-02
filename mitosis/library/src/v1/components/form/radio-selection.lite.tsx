import {
    RadioSelection as TicketComponentRadioSelection
} from "@nextep/core/v1/models/workflow/TicketComponent";
import { useStore } from "@builder.io/mitosis";

export default function RadioSelection(props) {

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
            {
                (props.component as TicketComponentRadioSelection).getOption().values?.map((optionValue, index) => {

                    return (
                        <div className="form-control" key={`${props.component.getId()}-${index}`}>
                            <label className="label cursor-pointer">
                                <span className="label-text">{optionValue.getLabel(props.language)}</span>
                            </label>
                            <input
                                id={`${props.component.getId()}-${index}`}
                                name={props.component.getId()}
                                type="radio"
                                class="radio checked:bg-blue-500"
                            />
                        </div>
                    );
                })
            }
        </>
    );
}
