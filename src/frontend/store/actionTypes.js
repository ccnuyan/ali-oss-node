const types = {
};

export const asyncTypes = [
  'ASS_GET_UPLOADED',
  'ASS_UPLOAD_GET_TOKEN',
  'ASS_UPLOAD_PROGRESS',
  'ASS_UPLOAD',
];

asyncTypes.forEach((tp) => {
  types[`${tp}_START`] = `${tp}_START`;
  types[`${tp}_END`] = `${tp}_END`;
  types[`${tp}_ERROR`] = `${tp}_START`;
});

Object.keys(types).forEach((key) => {
  types[key] = key;
});

export default types;
