import { NumberField } from '../number-field.model';

it("doesnt write default value when it is null", () => {
  const commonFields = {
    name: "number_field",
    fieldType: "IntegerField"
  };

  const intField = new NumberField(commonFields, null, false);

  expect(intField.toString()).not.toContain(`default=null`);
});
