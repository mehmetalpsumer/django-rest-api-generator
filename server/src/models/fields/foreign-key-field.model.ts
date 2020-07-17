import { Field, CommonFieldOptions } from '../field.model';

export class ForeignKeyField extends Field {
  fkModel: string;
  onDelete: string;

  constructor(
    commonFields: CommonFieldOptions,
    fkModel: string,
    onDelete: string
  ) {
    super(commonFields);
    this.fkModel = fkModel;
    this.onDelete = onDelete;
  }

  public toString(): string {
    const fieldName = this.formatFieldName();
    const args = [
      `'${this.fkModel}'`,
      this.createArgString("on_delete", this.onDelete, true),
      this.commonOptionsToString(),
    ];

    return `${fieldName} = models.ForeignKey(${args.join(",")})`;
  }
}
