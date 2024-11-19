import {
    Label as TicketComponentLabel,
    InputNumber as TicketComponentInputNumber,
    TicketComponentLabelValue,
} from "@nextep/core/models/TicketComponent";

import Label from "./label.lite";

export default function InputNumber(props) {
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
                    type="number"
                    value={(props.component as TicketComponentInputNumber).getValue().getValue()}
                    placeholder={props.component.getOption().placeHolder.get(
                        props.language,
                    ) ?? ""}
                    className="input input-bordered w-full max-w-xs"
                />
            </label>
        </div>
    );
}
