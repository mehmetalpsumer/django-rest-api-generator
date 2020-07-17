import { Field, CommonFieldOptions } from "../field.model";

export class NumberField extends Field {
  defaultValue?: number | null;
  hasDefault: boolean;

  constructor(commonFields: CommonFieldOptions, defaultValue: number | null, hasDefault: boolean) {
    super(commonFields);
    this.defaultValue = defaultValue ? defaultValue : null;
    this.hasDefault = hasDefault;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const fieldType = this.fieldType;
    const defaultValueStr = this.createArgString("default", this.defaultValue, false);

    const args = [
      this.commonOptionsToString(),
    ];

    if (defaultValueStr && this.hasDefault) {
      args.push(defaultValueStr);
    }
    return `${fieldName} = models.${fieldType}(${args./*filter(Boolean).*/join(",")})`;
  }
}
