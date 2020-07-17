import { writeFileSync, readFileSync } from 'fs';
import { projectsRoot } from './project.model';
import { Field } from './field.model';

export class Model {
  name: string;
  depth: number;
  fields: Field[];

  constructor(name: string, fields: Field[] = [], depth: number = 0) {
    this.name = name;
    this.fields = fields;
    this.depth = depth;
  }

  public fieldsToString(): string {
    return this.fields.map((f) => "\t" + f.toString()).join("\n");
  }

  public formatModelName(modelName: string): string {
    return modelName
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
      .replace(/[^a-z]/gi, "");
  }

  public getSerializerName(): string {
    const modelName = this.formatModelName(this.name);
    return `${modelName}Serializer`;
  }

  public getListApiName(): string {
    const modelName = this.formatModelName(this.name);
    return `${modelName}List`;
  }

  public getDetailApiName(): string {
    const modelName = this.formatModelName(this.name);
    return `${modelName}Detail`;
  }

  public getPath(): string {
    return this.name
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  public toString(): string {
    const modelName = this.formatModelName(this.name);
    const fields = this.fieldsToString();
    return `\nclass ${modelName}(models.Model):\n${fields}\n`;
  }

  public toSerializerString(): string {
    const modelName = this.formatModelName(this.name);

    return `class ${this.getSerializerName()}(serializers.ModelSerializer):
              class Meta:
                model = models.${modelName}
                fields = '__all__'
                depth = ${this.depth}`;
  }

  public toListApiString(): string {
    const modelName = this.formatModelName(this.name);

    return `class ${this.getListApiName()}(generics.ListCreateAPIView):
              queryset = models.${modelName}.objects.all()
              serializer_class = serializers.${this.getSerializerName()}
              filter_backends = [filters.SearchFilter, filters.OrderingFilter]
              search_fields = [${this.fields
                .map((field) => `'${field.formatFieldName()}'`)
                .join(",")}]`;
  }

  public toDetailApiString(): string {
    const modelName = this.formatModelName(this.name);

    return `class ${this.getDetailApiName()}(generics.RetrieveUpdateDestroyAPIView):
              queryset = models.${modelName}.objects.all()
              serializer_class = serializers.${this.getSerializerName()}
              lookup_url_kwarg = 'id'`;
  }

  public getListApiPath(): string {
    return `path('${this.getPath()}/', api.${this.getListApiName()}.as_view()),`;
  }

  public getDetailApiPath(): string {
    return `path('${this.getPath()}/<id>/', api.${this.getDetailApiName()}.as_view()),`;
  }

  public async create(projectName: string, appName: string): Promise<void> {
    const filePath = `${projectsRoot}/${projectName}/${appName}/models.py`;
    const currentFileContent = readFileSync(filePath);
    writeFileSync(filePath, currentFileContent + this.toString());
  }
}
