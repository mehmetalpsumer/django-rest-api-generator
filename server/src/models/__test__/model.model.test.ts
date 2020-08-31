import { Model } from "../model.model";

describe("Model model", () => {
  it("should convert model name to PascalCase", () => {
    const inputName = "my model";
    const pascalName = "MyModel";

    const newModel = new Model(inputName);
    expect(newModel.formatModelName(inputName)).toEqual(pascalName);
  });

  it("should get serializer name correctly", () => {
    const newModel = new Model("Test");
    expect(newModel.getSerializerName()).toEqual("TestSerializer");
  });

  it("should get API view names correctly", () => {
    const newModel = new Model("Test");
    expect(newModel.getDetailApiName()).toEqual("TestDetail");
    expect(newModel.getListApiName()).toEqual("TestList");
  });
});
