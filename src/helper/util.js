export const filter = (data, filterName, filterType, defaultFilter) => {
  if (filterName === defaultFilter) return [...data];
  else
    return [
      ...data.filter((e) => {
        if (typeof e === "object") {
          return e[filterType] === filterName;
        } else {
          return e === filterName;
        }
      }),
    ];
};
