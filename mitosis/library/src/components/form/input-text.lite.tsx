import {
    Label as TicketComponentLabel,
    InputText as TicketComponentInputText,
    TicketComponentLabelValue,
} from "@nextep/core/models/TicketComponent";

import Label from "./label.lite";

export default function InputText(props) {
    return (
        <div class="col-span-full">
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
                    type="text"
                    value={(props.component as TicketComponentInputText).getValue().getValue()}
                    placeholder={props.component.getOption().placeHolder.get(
                        props.language,
                    ) ?? ""}
                    className="input input-bordered w-full max-w-xs"
                />
            </label>
        </div>
    );
}
