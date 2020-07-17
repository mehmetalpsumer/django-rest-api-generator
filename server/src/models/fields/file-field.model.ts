import { Field, CommonFieldOptions } from "../field.model";

export class FileField extends Field {
  maxLength: number | undefined;
  uploadTo?: string | undefined;

  constructor(
    commonFields: CommonFieldOptions,
    maxLength: number | undefined,
    uploadTo: string | undefined
  ) {
    super(commonFields);
    this.maxLength = maxLength;
    this.uploadTo = uploadTo;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const args = [
      this.createArgString("max_length", this.maxLength, false),
      this.createArgString("upload_to", this.uploadTo, true),
      this.commonOptionsToString()
    ];
    return `${fieldName} = models.FileField(${args.join(",")})`;
  }
}
