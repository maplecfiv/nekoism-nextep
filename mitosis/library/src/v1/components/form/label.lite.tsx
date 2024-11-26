import { Label as TicketComponentLabel } from "@nextep/core/v1/models/workflow/TicketComponent";

export default function Label(props) {
    return (
        <label
            for={props.componentFor ?? ""}
            class="block text-sm/6 font-medium text-gray-900"
        >
            {(props.component as TicketComponentLabel).getValue().getLabel(
                props.language,
            )}
        </label>
    );
}
