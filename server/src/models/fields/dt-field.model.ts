import { Field, CommonFieldOptions } from "../field.model";

export class DtField extends Field {
  autoNow: boolean;
  autoAddNow: boolean;

  constructor(
    commonFields: CommonFieldOptions,
    autoNow: boolean,
    autoAddNow: boolean
  ) {
    super(commonFields);
    this.autoNow = autoNow;
    this.autoAddNow = autoAddNow;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const args = [
      this.createArgString("auto_now", this.boolToString(this.autoNow), false),
      this.createArgString(
        "auto_add_now",
        this.boolToString(this.autoAddNow),
        false
      ),
      super.commonOptionsToString(),
    ];
    return `${fieldName} = models.${this.fieldType}(${args.join(",")})`;
  }
}
