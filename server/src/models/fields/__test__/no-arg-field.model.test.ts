import { NoArgField } from '../no-arg-field.model';
import { CommonFieldOptions } from '../../field.model';


it("creates duration field string correctly with no args", () => {
  const commonFields: CommonFieldOptions = {
    name: 'no_arg_field',
    fieldType: 'DurationField'
  };

  const durationField = new NoArgField(commonFields);
  const commonOptionsStr =
    "null=False,blank=False,unique=False,primary_key=False";
  const fieldStr = `${commonFields.name} = models.${commonFields.fieldType}(${commonOptionsStr})`;
  expect(durationField.toString()).toEqual(fieldStr);
});

it("creates auto field string correctly with no args", () => {
  const commonFields: CommonFieldOptions = {
    name: "no_arg_field",
    fieldType: "AutoField",
  };

  const autoField = new NoArgField(commonFields);
  const commonOptionsStr =
    "null=False,blank=False,unique=False,primary_key=False";
  const fieldStr = `${commonFields.name} = models.${commonFields.fieldType}(${commonOptionsStr})`;
  expect(autoField.toString()).toEqual(fieldStr);
});

it("creates big auto field string correctly with no args", () => {
  const commonFields: CommonFieldOptions = {
    name: "no_arg_field",
    fieldType: "BigAutoField",
  };

  const autoField = new NoArgField(commonFields);
  const commonOptionsStr =
    "null=False,blank=False,unique=False,primary_key=False";
  const fieldStr = `${commonFields.name} = models.${commonFields.fieldType}(${commonOptionsStr})`;
  expect(autoField.toString()).toEqual(fieldStr);
});

it("creates small auto field string correctly with no args", () => {
  const commonFields: CommonFieldOptions = {
    name: "no_arg_field",
    fieldType: "SmallAutoField",
  };

  const autoField = new NoArgField(commonFields);
  const commonOptionsStr =
    "null=False,blank=False,unique=False,primary_key=False";
  const fieldStr = `${commonFields.name} = models.${commonFields.fieldType}(${commonOptionsStr})`;
  expect(autoField.toString()).toEqual(fieldStr);
});

it("creates no arg field string correctly with args", () => {
  const commonFields: CommonFieldOptions = {
    name: "no_arg_field",
    fieldType: "SmallAutoField",
    isNull: true,
    isPrimaryKey: true
  };

  const autoField = new NoArgField(commonFields);
  const commonOptionsStr =
    "null=True,blank=False,unique=False,primary_key=True";
  const fieldStr = `${commonFields.name} = models.${commonFields.fieldType}(${commonOptionsStr})`;
  expect(autoField.toString()).toEqual(fieldStr);
});
