import { LANGUAGES } from "./Language";
import { Ticket } from "./Ticket";

export interface TicketItemValueType {}

export class TicketItemSelectableValueType implements TicketItemValueType {}
export class TicketItemTextValueType implements TicketItemValueType {}
export class TicketItemLabelValueType implements TicketItemValueType {}
export class TicketItemNumberValueType implements TicketItemValueType {}
export class TicketItemSectionValueType implements TicketItemValueType {}

export class TicketItemValue {
    constructor(
        private valueType: TicketItemValueType,
        private labelMap: Map<LANGUAGES, string>,
        private value: string,
    ) {}

    public getValue():string{
        return this.value;
    }

    public getLabel(language:LANGUAGES){
        return this.labelMap.get(language);
    }
}

export abstract class TicketItem {
    constructor(
        private values: Map<string, TicketItemValue[]>,
    ) {}

    public abstract getName(): string;

    protected getValues(key: string): TicketItemValue[] {
        return this.values.get(key) ?? [];
    }

    public getValue(): TicketItemValue {
        if (!this.values.has(this.getName())) {
            throw new Error(`${this.getName()} not initialized`);
        }
        return this.values.get(this.getName())![0];
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

export class Header extends TicketItem {
    public static readonly KEY_CONTENT: string = "content";
    constructor(
        private id: string,
        private level: HEADER_LEVELS,
        content: Label,
    ) {
        super(
            new Map([
                [Header.KEY_CONTENT, [content.getValue()]],
            ]),
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }

    public getLevel():HEADER_LEVELS{
        return this.level;
    }
}
export class Label extends TicketItem {
    public static readonly KEY_CONTENT: string = "content";
    constructor(
        private id: string,
        content: Label,
    ) {
        super(
            new Map([
                [Header.KEY_CONTENT, [content.getValue()]],
            ]),
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }
}

export class InputTextOption {
    private minLength: number;
    private maxLength: number;
    private shouldSecure: boolean;
    private allowAlpha: boolean;
    private allowDigit: boolean;
    private allowSymbol: boolean;
    private allowLeadingSpace: boolean;
    private allowTrailingSpace: boolean;
    private allowMiddleSpace: boolean;

    constructor() {
        this.minLength = 0;
        this.maxLength = 0;
        this.shouldSecure = false;
        this.allowAlpha = false;
        this.allowDigit = false;
        this.allowSymbol = false;
        this.allowLeadingSpace = false;
        this.allowTrailingSpace = false;
        this.allowMiddleSpace = false;
    }
}
export class InputText extends TicketItem {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        private id: string,
        private option: InputTextOption,
        value: TicketItemValue,
    ) {
        super(
            new Map([[InputText.KEY_VALUE, [value]]]),
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }
    public getOption(): InputTextOption {
        return this.option;
    }
}

export enum FLOATING_POINT_OPTIONS {
    F0,
    F1,
    F2,
}

export class InputNumberOption {
    private minNumber: number;
    private maxNumber: number;
    private allowNegative: boolean;
    private allowFloatingPoint: FLOATING_POINT_OPTIONS;

    constructor() {
        this.minNumber = 0;
        this.maxNumber = 0;
        this.allowNegative = false;
        this.allowFloatingPoint = FLOATING_POINT_OPTIONS.F0;
    }
}
export class InputNumber extends TicketItem {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        private id: string,
        private option: InputNumberOption,
        value: TicketItemValue,
    ) {
        super(
            new Map([[InputText.KEY_VALUE, [value]]]),
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }
    public getOption(): InputNumberOption {
        return this.option;
    }
}
class Selectable extends TicketItem {
    public static readonly KEY_VALUE: string = "value";
    constructor(
        private id: string,
        private isMultiple: boolean,
        values: TicketItemValue[],
    ) {
        super(
            new Map([[InputText.KEY_VALUE, values]]),
        );
    }
    public getName(): string {
        return `${Header.name}`;
    }
    public getIsMultiple(): boolean {
        return this.isMultiple;
    }
}
export class RadioSelection extends Selectable {}

export class CheckBoxSelection extends Selectable {}

export class DropdownSelection extends Selectable {}

export class Section extends TicketItem {
    public static readonly KEY_TITLE: string = "title";
    public static readonly KEY_DESCCRIPTION: string = "description";
    constructor(
        private id: string,
        title: Header,
        description: Label,
    ) {
        super(
            new Map([
                [Section.KEY_TITLE, [title.getValue()]],
                [
                    Section.KEY_DESCCRIPTION,
                    [description.getValue()],
                ],
            ]),
        );
    }
    public getName(): string {
        return `${Section.name}`;
    }
}
