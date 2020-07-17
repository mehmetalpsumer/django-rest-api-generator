import { Field, CommonFieldOptions } from "../field.model";

export class StringField extends Field {
  maxLength: number | undefined;
  defaultValue?: string;
  hasDefault?: boolean;

  constructor(
    commonFields: CommonFieldOptions,
    maxLength: number | undefined,
    defaultValue: string | undefined,
    hasDefault?: boolean | undefined
  ) {
    super(commonFields);
    this.maxLength = maxLength;
    this.defaultValue = defaultValue ? defaultValue.toString() : "";
    this.hasDefault = hasDefault;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const fieldType = this.fieldType;
    const defaultValue = this.createArgString("default", this.defaultValue, true);

    const args = [
      this.commonOptionsToString(),
    ];

    if (this.hasDefault && defaultValue) {
      args.push(defaultValue);
    }

    if (fieldType !== "TextField") {
      args.push(this.createArgString("max_length", this.maxLength, false)!);
    }

    return `${fieldName} = models.${fieldType}(${args.join(',')})`;
  }
}
