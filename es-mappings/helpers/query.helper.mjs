export const getMultiMatchQuery = (query, fields = [], opts = {}) => {
  return {
    multi_match: {
      query,
      fields,
      ...opts,
    },
  };
};

export const getBooleanQuery = (path, query) => {
  return {
    term: {
      [path]: query,
    },
  };
};
