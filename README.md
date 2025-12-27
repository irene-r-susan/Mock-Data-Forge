### 🚀Mock Data Forge

Mock Data Forge is a schema-driven mock data generator that works as both:
- # 🌐 Web Application (browser-based)
- # 🖥 Command Line Interface (CLI) (Node.js)

It allows you to generate realistic mock data using JSON schemas, supporting:
- primitive types
- nested objects
- arrays
- constraints like min, max, and count

Powered by Faker.js.

## ✨ Features

- Single Core Engine
Same data generation logic is shared between browser and CLI.

- Schema-Driven
Define your data structure using simple JSON.

- Nested Objects
Objects can be nested infinitely.

- Dynamic Arrays
Control array size and item constraints.

- CLI Support
Generate thousands of records directly into .json files.

## 🛠 Installation & Setup

1️⃣ Clone the repository
git clone <your-repo-url>
cd mock-data-forge

2️⃣ Install dependencies
npm install

3️⃣ Environment Requirement

Node.js v18+

Uses ES Modules ("type": "module" in package.json)

## 🖥 Command Line Interface (CLI)

Generate mock data directly from the terminal using a schema file.

Usage
node index.js schema.json --count=<number> --out=<output-file>

Examples

🔹 Log one record to console : 

node index.js schema.json


🔹 Generate 100 records and save to file :

node index.js schema.json --count=100 --out=results.json

## 🌐 Web Interface

The web UI allows interactive schema creation and editing.

🔹 How to run :

Open index.html in your browser
(or use Live Server in VS Code)

🔹 How it works :

Add fields using the input + dropdown
Or manually edit the schema JSON
Click Generate
Copy or inspect generated data

## 🛠 Tech Stack

- HTML, CSS
- JavaScript (ES Modules)
- Faker.js (@faker-js/faker)
- Node.js (for CLI)

📁 Project Structure
Mock-Data-Forge/
│
├── index.html        # Web UI
├── script.js         # Frontend logic
├── generator.js     # Core schema parser & generator
├── index.js         # CLI entry point
├── schema.json      # Sample schema
├── package.json
└── README.md

📜 Schema Guide

1️⃣ Primitive Types

Use a string value to represent simple data types.

{
  "name": "name",
  "email": "email",
  "isActive": "boolean",
  "userId": "uuid"
}

2️⃣ Numbers with Constraints (Integer / Float)

Use an object with:
- type
- min
- max

{
  "age": {
    "type": "integer",
    "min": 18,
    "max": 60
  },
  "rating": {
    "type": "float",
    "min": 0,
    "max": 5
  }
}

3️⃣ Nested Objects

Objects are written naturally as JSON objects.

{
  "profile": {
    "name": "name",
    "email": "email",
    "phone": "phone"
  }
}


✔ Objects can be nested infinitely.

4️⃣ Arrays with Count

Arrays require:
- type: "array"
- count
- items

Array of primitives
{
  "tags": {
    "type": "array",
    "count": 3,
    "items": {
      "type": "name"
    }
  }
}

Array of numbers with constraints
{
  "scores": {
    "type": "array",
    "count": 5,
    "items": {
      "type": "float",
      "min": 0,
      "max": 10
    }
  }
}

5️⃣ Array of Objects
{
  "users": {
    "type": "array",
    "count": 2,
    "items": {
      "name": "name",
      "email": "email",
      "age": {
        "type": "integer",
        "min": 20,
        "max": 40
      }
    }
  }
}

✅ Supported Data Types

* name
* email
* uuid
* boolean
* number
* integer
* float
* phone
* date
* image_url
* file_url

