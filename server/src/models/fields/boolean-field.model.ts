import { Field, CommonFieldOptions } from "../field.model";

export class BooleanField extends Field {
  defaultValue: boolean;
  hasDefault: boolean;

  constructor(commonFields: CommonFieldOptions, defaultValue: boolean, hasDefault: boolean) {
    super(commonFields);
    this.defaultValue = defaultValue;
    this.hasDefault = hasDefault;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const args = [
      this.commonOptionsToString()
    ];

    const defaultValueStr = this.createArgString(
      "default",
      this.boolToString(this.defaultValue),
      false
    );

    if (this.hasDefault && defaultValueStr) {
      args.push(defaultValueStr);
    }
    
    return `${fieldName} = models.BooleanField(${args.join(",")})`;
  }
}
