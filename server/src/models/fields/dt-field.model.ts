import { Field, CommonFieldOptions } from "../field.model";

export class DtField extends Field {
  autoNow: boolean;
  autoNowAdd: boolean;

  constructor(
    commonFields: CommonFieldOptions,
    autoNow: boolean,
    autoNowAdd: boolean
  ) {
    super(commonFields);
    this.autoNow = autoNow;
    this.autoNowAdd = autoNowAdd;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const args = [
      this.createArgString("auto_now", this.boolToString(this.autoNow), false),
      this.createArgString(
        "auto_now_add",
        this.boolToString(this.autoNowAdd),
        false
      ),
      super.commonOptionsToString(),
    ];
    return `${fieldName} = models.${this.fieldType}(${args.join(",")})`;
  }
}
