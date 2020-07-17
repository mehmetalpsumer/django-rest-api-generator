import { Field, CommonFieldOptions } from "../field.model";

export class DecimalField extends Field {
  maxDigits?: number | null;
  decimalPlaces?: number | null;
  defaultValue: string;
  hasDefault: boolean;

  constructor(
    commonFields: CommonFieldOptions,
    maxDigits: number | undefined,
    decimalPlaces: number | undefined,
    defaultValue: string,
    hasDefault: boolean,
  ) {
    super(commonFields);
    this.maxDigits = maxDigits;
    this.decimalPlaces = decimalPlaces;
    this.defaultValue = defaultValue ? defaultValue.toString() : "";
    this.hasDefault = hasDefault;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();

    const args = [
      this.createArgString("max_digits", this.maxDigits, false),
      this.createArgString("decimal_places", this.decimalPlaces, false),
      this.commonOptionsToString(),
    ];

    const defaultValueStr = this.createArgString(
      "default",
      this.defaultValue,
      true
    );
    if (defaultValueStr && this.hasDefault) {
      args.push(defaultValueStr);
    }

    return `${fieldName} = models.DecimalField(${args.join(",")})`;
  }
}
