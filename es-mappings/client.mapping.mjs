export const clientMappings = {
  properties: {
    companyName: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
        autocomplete: { type: "text", analyzer: "autocomplete" },
      },
    },
    roC: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    companyStatus: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    companyActivity: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    cin: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
        autocomplete: { type: "text", analyzer: "autocomplete" },
      },
    },
    category: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    subCategory: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    companyClass: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    state: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    pinCode: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    country: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    address: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    email: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
        autocomplete: { type: "text", analyzer: "autocomplete" },
      },
    },
  },
};
