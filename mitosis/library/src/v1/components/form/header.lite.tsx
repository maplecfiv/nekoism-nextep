import { LANGUAGES } from "@nextep/core/v1/models/Language";
import {
    Header as TicketComponentHeader,
    HEADER_LEVELS,
} from "@nextep/core/v1/models/workflow/TicketComponent";

export default function Header(props) {
    const header: TicketComponentHeader = props.component;
    const language: LANGUAGES = props.language;

    const renderHeader = (header: TicketComponentHeader) => {
        const cssClasses = "text-base/7 font-semibold text-gray-900";
        switch (header.getLevel()) {
            case HEADER_LEVELS.H1:
                return (
                    <h1 class={cssClasses}>
                        {header.getValue().getLabel(language)}
                    </h1>
                );
            case HEADER_LEVELS.H2:
                return (
                    <h2 class={cssClasses}>
                        {header.getValue().getLabel(language)}
                    </h2>
                );
            case HEADER_LEVELS.H3:
                return (
                    <h3 class={cssClasses}>
                        {header.getValue().getLabel(language)}
                    </h3>
                );
            case HEADER_LEVELS.H4:
                return (
                    <h4 class={cssClasses}>
                        {header.getValue().getLabel(language)}
                    </h4>
                );
            case HEADER_LEVELS.H5:
                return (
                    <h5 class={cssClasses}>
                        {header.getValue().getLabel(language)}
                    </h5>
                );
            case HEADER_LEVELS.H6:
                return (
                    <h6 class={cssClasses}>
                        {header.getValue().getLabel(language)}
                    </h6>
                );
        }
    };

    return (
        <div>
            {renderHeader(header)}
        </div>
    );
}
