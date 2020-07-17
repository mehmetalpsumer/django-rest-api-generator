import { Field, CommonFieldOptions } from "../field.model";

export class NoArgField extends Field {
  constructor(commonFields: CommonFieldOptions) {
    super(commonFields);
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const fieldType = this.fieldType;
    const args = [
      this.commonOptionsToString()
    ];

    return `${fieldName} = models.${fieldType}(${args.join(",")})`;
  }
}
