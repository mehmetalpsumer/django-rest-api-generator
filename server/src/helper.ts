import * as sh from "shelljs";
import { Project, ProjectJson } from "./models/project.model";
import { App } from "./models/app.model";
import { Model } from "./models/model.model";
import {
  StringField,
  NumberField,
  DtField,
  BooleanField,
  DecimalField,
  FileField,
  ForeignKeyField,
  NoArgField
} from "./models/fields/index";


const parseJsonProject = (projectJson: ProjectJson): Project => {
  console.log(projectJson);
  const project = new Project(projectJson.name, projectJson.port);
  const appJson = projectJson.app;
  const app = new App(appJson.name);

  for (let j = 0; j < appJson.models.length; j++) {
    const modelJson = appJson.models[j];
    const model = new Model(modelJson.name);

    for (let k = 0; k < modelJson.fields.length; k++) {
      const fieldJson = modelJson.fields[k];

      switch (fieldJson.commonOptions.fieldType) {
        case "AutoField":
        case "BigAutoField":
        case "DurationField":
        case "SmallAutoField":
          model.fields.push(new NoArgField(fieldJson.commonOptions));
          break;
        case "BigIntegerField":
        case "IntegerField":
        case "PositiveIntegerField":
        case "PositiveSmallIntegerField":
        case "SmallIntegerField":
          model.fields.push(
            new NumberField(fieldJson.commonOptions, fieldJson.defaultValue, fieldJson.hasDefault!)
          );
          break;
        case "CharField":
        case "EmailField":
        case "SlugField":
        case "TextField":
        case "URLField":
          model.fields.push(
            new StringField(
              fieldJson.commonOptions,
              fieldJson.maxLength,
              fieldJson.defaultValue,
              fieldJson.hasDefault
            )
          );
          break;
        case "DateField":
        case "DateTimeField":
        case "TimeField":
          model.fields.push(
            new DtField(
              fieldJson.commonOptions,
              fieldJson.autoNow || false,
              fieldJson.autoNowAdd || false
            )
          );
          break;
        case "DecimalField":
          model.fields.push(
            new DecimalField(
              fieldJson.commonOptions,
              fieldJson.maxDigits,
              fieldJson.decimalPlaces,
              fieldJson.defaultValue,
              fieldJson.hasDefault!
            )
          );
          break;
        case "BooleanField":
          model.fields.push(
            new BooleanField(
              fieldJson.commonOptions,
              fieldJson.defaultValue,
              fieldJson.hasDefault!
            )
          );
          break;
        case "FileField":
          model.fields.push(
            new FileField(
              fieldJson.commonOptions,
              fieldJson.maxLength,
              fieldJson.uploadTo
            )
          );
          break;
        case "ForeignKeyField":
          model.fields.push(
            new ForeignKeyField(
              fieldJson.commonOptions,
              fieldJson.model!,
              fieldJson.onDelete!
            )
          );
          break;
        default:
          break;
      }
    }

    app.models.push(model);
  }
  project.app = app;

  return project;
};

const execCmd = async (cmd: string[], action: string) => {
  console.log(`=> Action: ${action}...`);
  const runCmd = sh.exec(cmd.join(" "));

  if (!runCmd.stderr) {
    console.log(`=> Completed: ${action}!`);
  } else {
    console.log(`=> Error: ${action}`);
    throw new Error(action);
  }
};

const slugify = (text: string, separator: string = "_") => {
  let slug = text.toString().toLowerCase().trim();

  const sets = [
    { to: "a", from: "[ÀÁÂÃÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]" },
    { to: "ae", from: "[Ä]" },
    { to: "c", from: "[ÇĆĈČ]" },
    { to: "d", from: "[ÐĎĐÞ]" },
    { to: "e", from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]" },
    { to: "g", from: "[ĜĞĢǴ]" },
    { to: "h", from: "[ĤḦ]" },
    { to: "i", from: "[ÌÍÎÏĨĪĮİỈỊ]" },
    { to: "j", from: "[Ĵ]" },
    { to: "ij", from: "[Ĳ]" },
    { to: "k", from: "[Ķ]" },
    { to: "l", from: "[ĹĻĽŁ]" },
    { to: "m", from: "[Ḿ]" },
    { to: "n", from: "[ÑŃŅŇ]" },
    { to: "o", from: "[ÒÓÔÕØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]" },
    { to: "oe", from: "[ŒÖ]" },
    { to: "p", from: "[ṕ]" },
    { to: "r", from: "[ŔŖŘ]" },
    { to: "s", from: "[ŚŜŞŠ]" },
    { to: "ss", from: "[ß]" },
    { to: "t", from: "[ŢŤ]" },
    { to: "u", from: "[ÙÚÛŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]" },
    { to: "ue", from: "[Ü]" },
    { to: "w", from: "[ẂŴẀẄ]" },
    { to: "x", from: "[ẍ]" },
    { to: "y", from: "[ÝŶŸỲỴỶỸ]" },
    { to: "z", from: "[ŹŻŽ]" },
    { to: "-", from: "[·/_,:;']" },
  ];

  sets.forEach((set) => {
    slug = slug.replace(new RegExp(set.from, "gi"), set.to);
  });

  slug = slug
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

  if (typeof separator !== "undefined" && separator !== "-") {
    slug = slug.replace(/-/g, separator);
  }

  return slug;
}

export { parseJsonProject, execCmd, slugify };
