
import fs from "fs";

import {generate} from "./generator.js";
import { faker } from "@faker-js/faker";

let results=[];
const a=process.argv;
let N=-1;
let f="";
if(a.length<3)
{
    console.log("Error : no json file added");
    process.exit(1);
}
if(a.length>3)
{
const n=a.length;

for(var i=3;i<a.length;i++)
{
const str=a[i];

if(str.startsWith('--count'))  
{
 N=Number(str.split("=")[1]);
}
else if(str.startsWith('--out'))  
{
 f=(str.split("=",2)[1]);
}


}

}

const userArgs = a[2];// this is ['schema.json,] an array
// console.log(userArgs);

 let myContent = fs.readFileSync(userArgs, 'utf8');// this is schema.json


const schema=JSON.parse(myContent);

// const schema=JSON.parse(fs.readFileSync(userArgs[0],"utf8"));
//  console.log(schema);
if(N!=-1)
{
    for(let i=0;i<N;i++)
    {
    const output =generate(schema,faker);
    if(f=="")
    {
    console.log(output);
    }
    else{
       
        results.push(output);
    }
   }
}
else
{
   const output =generate(schema,faker);
   if(f=="")
   {
    console.log(output); 
   }
   else
   {
    results.push(output);
   }
}

if(f!="")
{
    fs.writeFileSync(f, JSON.stringify(results, null, 2));
}


