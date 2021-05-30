export const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatRecord = (key, record) => {
  if (key === "date") {
    return new Date(record).getLocaleDateString();
  }
  return isNaN(record) || record > 10000000 ? record : Math.round(record * 100) / 100;
};

export const makeColumn = key => {
  const c = {
    title: capitalize(key),
    dataIndex: key,
    key,
    render: record => formatRecord(key, record),
  };
  return c;
};
