export default {
  rows: [
    {
      key: "Created date",
      getValue: (model) => {
        const date = model["created_date"];
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-gb");
      },
    },
    {
      key: "Created by",
      getValue: (model) => model.organization || "-",
      separator: ",",
    },
    {
      key: "Access",
      getValue: (model) => {
        return model.access || "-";
      },
    },
    {
      key: "Licence",
      getValue: (model) => {
        return model.license || "-";
      },
      separator: ",",
    },
    {
      key: "Modalities",
      getValue: (model) => {
        return model.modality || "-";
      },
      separator: ";",
    },
    {
      key: "Size",
      getValue: (model) => {
        return model.size || "-";
      },
    },
  ],
};
