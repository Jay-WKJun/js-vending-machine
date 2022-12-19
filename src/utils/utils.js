export function entryObject(object) {
  if (typeof object !== 'object') { throw new Error('only Object parameter can be used by entryObject function'); }

  return Object.entries(object);
}

export function mapObjectValues(object, callback) {
  const res = {};

  entryObject(object).map(([key, val], i) => {
    res[key] = callback(val, i);
  });

  return res;
}
