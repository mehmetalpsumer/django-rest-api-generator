import { Field } from '../field.model';

it("formats field name with snake_case", () => {
  const name1 = "Field Name";
  const formattedName1 = "field_name";

  const name2 = "fieldName";
  const formattedName2 = "fieldname";

  const name3 = "field Name";
  const formattedName3 = "field_name";

  const field1 = new Field({ name: name1, fieldType: 'CharField' });
  const field2 = new Field({ name: name2, fieldType: 'CharField' });
  const field3 = new Field({ name: name3, fieldType: "CharField" });

  expect(field1.formatFieldName()).toEqual(formattedName1);
  expect(field2.formatFieldName()).toEqual(formattedName2);
  expect(field3.formatFieldName()).toEqual(formattedName3);
});

it("converts common options to string correctly", () => {
  const commonOptionsStr =
    "null=False,blank=False,unique=False,primary_key=False";
  const field = new Field({ name: "field", fieldType: "CharField" });
  expect(field.commonOptionsToString()).toEqual(commonOptionsStr);
});

it("converts boolean values to Python equivalent", () => {
  const field = new Field({ name: "field", fieldType: "CharField" });

  expect(field.boolToString(true)).toEqual("True");
  expect(field.boolToString(false)).toEqual("False");
  expect(field.boolToString(undefined)).toEqual("False");
});
