import { LANGUAGES } from "@nextep/core/models/Language";
import {
    CheckBoxSelection as TicketComponentCheckBoxSelection,
    DropdownSelection as TicketComponentDropdownSelection,
    Header as TicketComponentHeader,
    InputNumber as TicketComponentNumber,
    InputText as TicketComponentInputText,
    Label as TicketComponentLabel,
    RadioSelection as TicketComponentRadioSelection,
    Section as TicketComponentSection,
    TicketComponent,
    TicketComponentSectionValue,
    TicketComponentValueType,
} from "@nextep/core/models/TicketComponent";

import Label from "./label.lite";
import InputText from "./input-text.lite";

export default function Section(props) {
    return (
        <div class="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center">
            {(props.component as TicketComponentSection).getValue()
                .getValue()
                .map(
                    (
                        element: TicketComponent<
                            TicketComponentValueType
                        >,
                    ) => {
                        console.log(
                            props.component,
                            `section element: ${JSON.stringify(element)}`,
                        );
                        switch (element.getName()) {
                            case TicketComponentLabel.name:
                                return (
                                    <Label
                                        key={element.getId()}
                                        language={props.language}
                                        component={element}
                                    >
                                    </Label>
                                );
                            case TicketComponentInputText.name:
                                return (
                                    <InputText
                                        key={element.getId()}
                                        language={props.language}
                                        component={element}
                                    >
                                    </InputText>
                                );
                            default:
                                console.warn(
                                    `unknown component type ${element.getName()}`,
                                );
                        }
                    },
                )}
        </div>
    );
}
