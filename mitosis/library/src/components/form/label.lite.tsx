import { LANGUAGES } from "@nextep/core/models/Language";
import { Label as TicketItemLabel } from "@nextep/core/models/TicketItem";

export function Label(props) {
    const label: TicketItemLabel = props.component;
    const language: LANGUAGES = props.language;

    return (
        <div>
            <p class="mt-1 text-sm/6 text-gray-600">
                {label.getValue().getLabel(language)}
            </p>
        </div>
    );
}
