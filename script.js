

import { generate } from "./generator.js";

const schema = {};

window.clearSchema=function () {
  if (!confirm("Clear the schema and output?")) return;

  document.getElementById("schemaOutput").value = "{}";
  document.getElementById("resultOutput").textContent = "{}";
}

window.copyOutput = function () {
  const output = document.getElementById("resultOutput").textContent;

  if (!output || output === "{}") {
    alert("Nothing to copy");
    return;
  }

  navigator.clipboard.writeText(output)
    .then(() => alert("Copied to clipboard"))
    .catch(() => alert("Copy failed"));
};

window.copySchema = function () {
  navigator.clipboard.writeText(
    document.getElementById("schemaOutput").value
  );
  alert("Schema copied");
};



function addField() {
  const name = document.getElementById("fieldName").value.trim();
  const type = document.getElementById("fieldType").value;

  if (!name) {
    alert("Field name required");
    return;
  }

  schema[name] = type;

  document.getElementById("schemaOutput").textContent =
    JSON.stringify(schema, null, 2);

  document.getElementById("fieldName").value = "";
}


function generateData() {
  const schemaText = document.getElementById("schemaOutput").value;
  let schema;
  try {
    schema = JSON.parse(schemaText);
  } catch (e) {
    alert("Invalid JSON in schema!");
    return;
  }

  const data = generate(schema);

  document.getElementById("resultOutput").textContent =
    JSON.stringify(data, null, 2);
}




window.addField = addField;
window.generateData = generateData;
