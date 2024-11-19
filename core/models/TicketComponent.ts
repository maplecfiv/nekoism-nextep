import { LANGUAGES } from "./Language";
export abstract class TicketComponentValueType {

    constructor(
        private labelMap: Map<LANGUAGES, string>
    ) { }

    public abstract getValue(): unknown;

    public getLabel(language: LANGUAGES) {
        return this.labelMap.get(language);
    }

    public getLabels(): Map<LANGUAGES, string> {
        return this.labelMap;
    }

    public abstract getName(): string;

}

export class TicketComponentSectionValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: TicketComponent<TicketComponentValueType>[],
    ) {
        super(labelMap);
    }

    public getValue() {
        return this.value;
    }

    public getName(): string {
        return TicketComponentSectionValue.name
    }
}
export class TicketComponentFormValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: Section[],
    ) {
        super(labelMap);
    }

    public getValue() {
        return this.value;
    }

    public getName(): string {
        return TicketComponentFormValue.name
    }
}

export class TicketComponentSelectableValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: (string | number)[],
    ) {
        super(labelMap);
    }

    public getValue() {
        return this.value;
    }

    public getName(): string {
        return TicketComponentSelectableValue.name
    }
}
export class TicketComponentTextValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {
        super(labelMap);
    }

    public getValue() {
        return this.value;
    }

    public getName(): string {
        return TicketComponentTextValue.name
    }
}
export class TicketComponentNumberValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: number,
    ) {
        super(labelMap);
    }

    public getValue() {
        return this.value;
    }
    public getName(): string {
        return TicketComponentNumberValue.name
    }
}
export class TicketComponentLabelValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>
    ) {
        super(labelMap);
    }

    public getValue() {
        throw new Error(`Unsupported operation.  Please use labelMap to represent label content`)
    }
    public getName(): string {
        return TicketComponentLabelValue.name
    }
}

export abstract class TicketComponent<T extends TicketComponentValueType> {
    constructor(
        private id: string,
        private values: T[],
    ) { }

    public getId(): string { return this.id; }

    public abstract getName(): string;

    public getValues<T>() {
        return this.values;
    }

    public getValue<T>() {
        if (this.values.length < 1) {
            throw new Error(`${this.getName} not initialized`);
        }
        return this.values[0];
    }
}

export enum HEADER_LEVELS {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    H7,
}

export class Header extends TicketComponent<TicketComponentLabelValue> {
    public static readonly KEY_CONTENT: string = "content";
    constructor(
        id: string,
        private level: HEADER_LEVELS,
        content: Label,
    ) {
        super(
            id,
            [content.getValue()],
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }

    public getLevel(): HEADER_LEVELS {
        return this.level;
    }
}


export type FormOption = {
    columns: number
}
export class Form extends TicketComponent<TicketComponentFormValue> {

    public static readonly KEY_ELEMENTS: string = "elements";
    constructor(
        id: string,
        private value: TicketComponentFormValue,
        private options: FormOption = {
            columns: 1
        }
    ) {
        super(id,
            [value]
        );
    }
    public getName(): string {
        return `${Form.name}`;
    }

    public getOptions(): FormOption {
        return this.options;
    }

    public getValue() {
        return this.value;
    }
}

export class Label extends TicketComponent<TicketComponentLabelValue> {
    public static readonly KEY_CONTENT: string = "content";
    constructor(
        id: string,
        private content: TicketComponentLabelValue,
    ) {
        super(id,
            [content]
        );
    }

    public getContent() {
        return this.content;
    }

    public getName(): string {
        return `${Label.name}`;
    }
}

export type InputTextOption = {
    number: number,
    maxLength: number,
    shouldSecure: boolean,
    allowAlpha: boolean,
    allowDigit: boolean,
    allowSymbol: boolean,
    allowLeadingSpace: boolean,
    allowTrailingSpace: boolean,
    allowMiddleSpace: boolean,
    placeHolder: Map<LANGUAGES, string>
}

export class InputText extends TicketComponent<TicketComponentTextValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentTextValue,
        private options: InputTextOption = {
            number: 0,
            maxLength: 0,
            shouldSecure: false,
            allowAlpha: false,
            allowDigit: false,
            allowSymbol: false,
            allowLeadingSpace: false,
            allowTrailingSpace: false,
            allowMiddleSpace: false,
            placeHolder: new Map<LANGUAGES, string>()
        },
    ) {
        super(id,
            [value]
        );
    }
    public getName(): string {
        return `${InputText.name}`;
    }
    public getOption() {
        return this.options;
    }
}

export enum FLOATING_POINT_OPTIONS {
    F0,
    F1,
    F2,
}

export type InputNumberOption = {
    minNumber: number,
    maxNumber: number,
    allowNegative: boolean,
    allowFloatingPoint: FLOATING_POINT_OPTIONS,
    placeHolder: Map<LANGUAGES, string>
}
export class InputNumber extends TicketComponent<TicketComponentNumberValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentNumberValue,
        private option: InputNumberOption = {
            minNumber: 0,
            maxNumber: 0,
            allowNegative: false,
            allowFloatingPoint: FLOATING_POINT_OPTIONS.F0,
            placeHolder: new Map<LANGUAGES, string>()
        },
    ) {
        super(id,
            [value]
        );
    }
    public getName(): string {
        return `${InputNumber.name}`;
    }
    public getOption(): InputNumberOption {
        return this.option;
    }
}
abstract class Selectable extends TicketComponent<TicketComponentSelectableValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        private isMultiple: boolean,
        values: TicketComponentSelectableValue[],
    ) {
        super(id,
            values,
        );
    }
    public getIsMultiple(): boolean {
        return this.isMultiple;
    }
}
export class RadioSelection extends Selectable {
    public getName(): string {
        return `${RadioSelection.name}`;
    }
}

export class CheckBoxSelection extends Selectable {
    public getName(): string {
        return `${CheckBoxSelection.name}`;
    }
}

export class DropdownSelection extends Selectable {
    public getName(): string {
        return `${DropdownSelection.name}`;
    }
}

export class Section extends TicketComponent<TicketComponentSectionValue> {
    public static readonly KEY_ELEMENTS: string = "elements";
    constructor(
        id: string,
        private value: TicketComponentSectionValue
    ) {
        super(id,
            [value],
        );
    }
    public getName(): string {
        return `${Section.name}`;
    }

    public getValue<T>(): TicketComponentSectionValue {
        return this.value;
    }
}
