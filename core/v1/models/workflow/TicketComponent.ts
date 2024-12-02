import { DataObject, DataObjectType } from "../DataObject";
import { LANGUAGES } from "../Language";

export type FormElementType = DataObjectType & {
    elementId:string,
    labelMap: Map<LANGUAGES, string>,
    type: string,
    option?: any,
    parent?: string
}

export type InputOption = {}

export class FormElement extends DataObject {
    constructor(private readonly formElementType: FormElementType) {
        super(formElementType as DataObjectType)
    }
    public getType() {
        return this.formElementType.type;
    }
    public getLabelMap(): Map<LANGUAGES, string> {
        return this.formElementType.labelMap;
    }
    public getOption(): unknown {
        return this.formElementType.option ?? {};
    }
    public getElementId():string{
        return this.formElementType.elementId
    }
}

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

    public getValue(): TicketComponent<TicketComponentValueType>[] {
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

    public getValue(): Section[] {
        return this.value;
    }

    public getName(): string {
        return TicketComponentFormValue.name
    }
}

export class TicketComponentSelectableValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {
        super(labelMap);
    }

    public getValue(): string {
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

    public getValue(): string {
        return this.value;
    }

    public getName(): string {
        return TicketComponentTextValue.name
    }
}

export class TicketComponentDateValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {
        super(labelMap);
    }

    public getValue(): string {
        return this.value;
    }
    public getName(): string {
        return TicketComponentDateValue.name
    }
}

export class TicketComponentTimeValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {
        super(labelMap);
    }

    public getValue(): string {
        return this.value;
    }
    public getName(): string {
        return TicketComponentTimeValue.name
    }
}

export class TicketComponentFileValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {
        super(labelMap);
    }

    public getValue(): string {
        return this.value;
    }
    public getName(): string {
        return TicketComponentFileValue.name
    }
}

export class TicketComponentUrlValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {
        super(labelMap);
    }

    public getValue(): string {
        return this.value;
    }
    public getName(): string {
        return TicketComponentUrlValue.name
    }
}
export class TicketComponentNumberValue extends TicketComponentValueType {
    constructor(
        labelMap: Map<LANGUAGES, string>,
        private value: number,
    ) {
        super(labelMap);
    }

    public getValue(): number {
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

    public getValue(): never {
        throw new Error(`Unsupported operation.  Please use labelMap to represent label content`)
    }
    public getName(): string {
        return TicketComponentLabelValue.name
    }
}

export abstract class TicketComponent<T extends TicketComponentValueType> {
    constructor(
        private id: string,
        private value: T,
    ) { }

    public getId(): string { return this.id; }

    public abstract getName(): string;

    public getValue<T>() {
        return this.value;
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
            content.getValue(),
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }

    public getLevel(): HEADER_LEVELS {
        return this.level;
    }
}


export type FormOption = InputOption & {
    columns?: number
}
export class Form extends TicketComponent<TicketComponentFormValue> {

    public static readonly KEY_ELEMENTS: string = "elements";
    constructor(
        id: string,
        value: TicketComponentFormValue,
        private options: FormOption = {}
    ) {
        super(id,
            value
        );
    }
    public getName(): string {
        return `${Form.name}`;
    }

    public getOptions(): FormOption {
        return this.options;
    }
}

export class Label extends TicketComponent<TicketComponentLabelValue> {
    public static readonly KEY_CONTENT: string = "content";
    constructor(
        id: string,
        value: TicketComponentLabelValue,
    ) {
        super(id,
            value
        );
    }

    public getName(): string {
        return `${Label.name}`;
    }
}

export type InputFileOption = InputOption & {
    acceptedExtensions?: string[],
    acceptedFileSize?: number,
    isMultiple?: boolean
}

export class InputFile extends TicketComponent<TicketComponentFileValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentFileValue,
        private options: InputFileOption = {
            acceptedExtensions: [],
            acceptedFileSize: -1,
            isMultiple: true
        },
    ) {
        super(id,
            value
        );
    }
    public getName(): string {
        return `${InputFile.name}`;
    }
    public getOption() {
        return this.options;
    }
}

export type InputUrlOption = InputOption & {
    number?: number,
    maxLength?: number,
    pattern?: string,
    placeHolder?: Map<LANGUAGES, string>
}

export class InputUrl extends TicketComponent<TicketComponentUrlValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentUrlValue,
        private options: InputUrlOption = {},
    ) {
        super(id,
            value
        );
    }
    public getName(): string {
        return `${InputUrl.name}`;
    }
    public getOption() {
        return this.options;
    }
}

export type InputTextOption = InputOption & {
    number?: number,
    maxLength?: number,
    shouldSecure?: boolean,
    allowAlpha?: boolean,
    allowDigit?: boolean,
    allowSymbol?: boolean,
    allowLeadingSpace?: boolean,
    allowTrailingSpace?: boolean,
    allowMiddleSpace?: boolean,
    placeHolder?: Map<LANGUAGES, string>
}

export class InputText extends TicketComponent<TicketComponentTextValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentTextValue,
        private options: InputTextOption = {},
    ) {
        super(id,
            value
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

export type InputNumberOption = InputOption & {
    minNumber?: number,
    maxNumber?: number,
    allowNegative?: boolean,
    allowFloatingPoint?: FLOATING_POINT_OPTIONS,
    placeHolder?: Map<LANGUAGES, string>
}
export class InputNumber extends TicketComponent<TicketComponentNumberValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentNumberValue,
        private option: InputNumberOption = {},
    ) {
        super(id,
            value
        );
    }
    public getName(): string {
        return `${InputNumber.name}`;
    }
    public getOption(): InputNumberOption {
        return this.option;
    }
}

export type InputDateOption = InputOption & {
    minDate?: string,
    maxDate?: string,
    step?: number
}
export class InputDate extends TicketComponent<TicketComponentDateValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentDateValue,
        private option: InputDateOption = {},
    ) {
        super(id,
            value
        );
    }
    public getName(): string {
        return `${InputDate.name}`;
    }
    public getOption(): InputDateOption {
        return this.option;
    }
}

export type InputTimeOption = InputOption & {
    minDate?: string,
    maxDate?: string,
    step?: number
}
export class InputTime extends TicketComponent<TicketComponentTimeValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentTimeValue,
        private option: InputTimeOption = {},
    ) {
        super(id,
            value
        );
    }
    public getName(): string {
        return `${InputTime.name}`;
    }
    public getOption(): InputTimeOption {
        return this.option;
    }
}

export type SelectableOption = InputOption & {
    isMultiple?: boolean,
    values?: TicketComponentSelectableValue[]
}
abstract class Selectable extends TicketComponent<TicketComponentSelectableValue> {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        id: string,
        value: TicketComponentSelectableValue,
        private option: SelectableOption = {},

    ) {
        super(id,
            value,
        );
    }
    public abstract getName(): string;

    public getOption(): SelectableOption {
        return this.option;
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
        value: TicketComponentSectionValue
    ) {
        super(id,
            value,
        );
    }
    public getName(): string {
        return `${Section.name}`;
    }
}
