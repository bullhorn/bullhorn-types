const axios = require("axios");
const fs = require("fs");
const Logger = require("loggy");

const { CORE_DEFINITION_TEMPLATE } = require("./templates/typings");

const EntityModelUrl =
  "http://tardis-backend.bh-bos2.bullhorn.com:8183/entity-model-streamer/getAllEntitiesWithAnnotation?annotation=BullhornEntity&overrideShouldBuild=true";

const sortByField = (field) => {
  return function compare(a, b) {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  };
};

const getEntityModels = () => {
  return axios(EntityModelUrl)
    .then((res) => res.data)
    .then((result) => {
      return Object.values(result)
        .filter(Boolean)
        .sort(sortByField("entityName"));
    });
};

const generate = async (config = {}) => {
  try {
    let dir = config.directory || "./typings";
    Logger.log(`retrieving metadata for each entity...`);
    let models = await getEntityModels();
    Logger.log(`parsing entity models...`);
    const types = models.map((model) => parseModelData(model));

    Logger.log(`writing templates...`);
    let deletables = types.filter(
      (i) => i && i.properties.find((p) => p.name === "isDeleted")
    );
    let tmp = CORE_DEFINITION_TEMPLATE({
      types: types,
      deletables: deletables,
    });
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`${dir}/index.ts`, tmp, (err) => {
      if (err) {
        Logger.error(err.message);
      }
      Logger.success(`Done!`);
    });
  } catch (err) {
    Logger.error("✗ An error occurred", err);
  }
};

const parseModelData = (model) => {
  if (!model) {
    Logger.error("Missing entity model");
    return;
  }

  Logger.log(`${model.entityName}`);
  let data = {
    type: model.entityName,
    properties: [],
    dependencies: new Set(),
    dynamic: false,
  };
  let hasCustomObjects = false;
  if (model.entityName.indexOf("CustomObject") >= 0) {
    data.dynamic = true;
  } else {
    for (let field of Object.values(model.fields).sort(
      sortByField("fieldName")
    )) {
      if (["OneToMany", "ManyToMany"].includes(field.associationType)) {
        data.properties.push({
          name: field.fieldName,
          type: `ToMany<${field.associatedEntityType}>`,
        });
        data.dependencies.add(field.associatedEntityType);
      } else if (["ManyToOne", "OneToOne"].includes(field.associationType)) {
        data.properties.push({
          name: field.fieldName,
          type: `${field.associatedEntityType}`,
        });
        data.dependencies.add(field.associatedEntityType);
      } else if (["id"].indexOf(field.fieldName) < 0) {
        switch (field.fieldType || "") {
          case "Integer":
          case "Double":
          case "Float":
          case "BigDecimal":
            data.properties.push({
              name: field.fieldName,
              type: "number",
            });
            break;
          case "Date":
          case "Timestamp":
            data.properties.push({
              name: field.fieldName,
              type: "Date",
            });
            break;
          case "String":
            data.properties.push({
              name: field.fieldName,
              type: "Strings",
            });
            break;
          case "Boolean":
            data.properties.push({
              name: field.fieldName,
              type: "boolean",
            });
            break;
          case "Address":
          case "Address1":
          case "AddressWithoutCountry":
            data.properties.push({
              name: field.fieldName,
              type: "Address",
            });
            break;
          default:
            break;
        }
      }
    }
  }
  return data;
};

generate({});
