export const getMultiMatchQuery = (query, fields = [], opts = {}) => {
  return {
    multi_match: {
      query,
      fields,
      ...opts,
    },
  };
};
