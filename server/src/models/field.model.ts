interface CommonFieldOptions {
  name: string;
  fieldType: string;
  isNull?: boolean;
  isBlank?: boolean;
  editable?: boolean;
  helpText?: string;
  isPrimaryKey?: boolean;
  isUnique?: boolean;
}

const defaultOptions: CommonFieldOptions = {
  name: "default_field",
  fieldType: "TextField",
  isNull: false,
  isBlank: false,
  isPrimaryKey: false,
  isUnique: false,
};

class Field {
  fieldType: string;
  name: string;
  isNull?: boolean;
  isBlank?: boolean;
  isRequired?: boolean;
  isUnique?: boolean;
  isPrimaryKey?: boolean;

  constructor(commonFields: CommonFieldOptions) {
    this.fieldType = commonFields.fieldType;
    this.name = commonFields.name;
    this.isNull = commonFields.isNull || defaultOptions.isNull;
    this.isBlank = commonFields.isBlank || defaultOptions.isBlank;
    this.isUnique = commonFields.isUnique || defaultOptions.isUnique;
    this.isPrimaryKey =
      commonFields.isPrimaryKey || defaultOptions.isPrimaryKey;
  }

  public formatFieldName(): string {
    return this.name
      .toLowerCase()
      .replace(" ", "_")
      .replace(/[^a-z|_]/gi, "");
  }

  public commonOptionsToString(): string {
    const options = [
      `null=${this.boolToString(this.isNull)}`,
      `blank=${this.boolToString(this.isBlank)}`,
      `unique=${this.boolToString(this.isUnique)}`,
      `primary_key=${this.boolToString(this.isPrimaryKey)}`,
    ];
    return options.join(",");
  }

  public boolToString(bool: boolean | undefined | null) {
    if (!bool) return "False";
    return bool == true ? "True" : "False";
  }

  public createArgString(name: string, value: any, qutoes: boolean): string | null {
    if (!name || !value) {
      return null;
    }

    return qutoes ? `${name}='${value}'` : `${name}=${value}`;
  }
}

export { Field, CommonFieldOptions };
