



export function generate(schema,providedFaker=null) {

  const f = providedFaker || (typeof window !== 'undefined' ? window.faker : null);

  if (!f) {
    throw new Error("Faker not found. In Node, pass it to generate(). In Browser, ensure window.faker exists.");
  }

  const generators = {
    name: () => f.person.fullName(),
    email: () => f.internet.email(),
    boolean: () => f.datatype.boolean(),
    uuid: () => f.string.uuid(),
    integer: (min = 0, max = 100) => Math.floor(Math.random() * (max - min) + min),
    float: (min = 0, max = 100) => Math.random() * (max - min) + min,
    phone: () => f.phone.number({ style: 'national' }),
    date: () => f.date.anytime(),
    number: () => f.number.float({ min: 0, max: 100 }),
    image_url: () => f.image.avatar(),
    file_url: () => f.system.filePath()
  };

  function resolveValue(val, keyHint = "") {
    if (typeof val === 'string') {
      if (val in generators) return generators[val]();
      throw new Error(`Unknown data type "${val}" for key "${keyHint}"`);
    }

    if (Array.isArray(val)) {
      if (val.length !== 1) throw new Error(`Array schema for "${keyHint}" must have exactly one item`);
      return Array.from({ length: 3 }, () => resolveValue(val[0], keyHint));
    }

    if (typeof val === 'object' && val !== null) {
      if ("type" in val) {
        const { type: TYPE, min, max, count, items, fields } = val;

        if (TYPE === "integer" || TYPE === "float") {
          if (min === undefined || max === undefined) {
            throw new Error(`${TYPE} for "${keyHint}" requires min and max`);
          }
          return generators[TYPE](min, max);
        }

        if (TYPE === "array") {
          if (typeof count !== "number") throw new Error(`Array "${keyHint}" requires numeric "count"`);
          if (!items) throw new Error(`Array type for "${keyHint}" requires "items"`);
          return Array.from({ length: count }, () => resolveValue(items, keyHint));
        }

        if (TYPE === "object") {
          if (!fields) throw new Error(`Object "${keyHint}" requires "fields"`);
          return generate(fields,f); 
        }

        if (TYPE in generators) return generators[TYPE]();
      }

      return generate(val,f);
    }

    throw new Error(`Invalid schema definition for key "${keyHint}"`);
  }

  if (typeof schema !== 'object' || schema === null || Array.isArray(schema)) {
    throw new Error("Schema must be a non-null object");
  }

  const result = {};
  for (const key in schema) {
    result[key] = resolveValue(schema[key], key);
  }

  return result;
}