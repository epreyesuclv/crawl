const commandLineArgs = require("command-line-args");

// args definition
const optionDefinitions = [
  { name: "maxdist", type: Number, defaultValue: 2 },
  { name: "bdname", type: String, defaultValue: "sqlite.bd" },
  {
    name: "url",
    type: String,
    defaultValue: "http://localhost:4000/flowers",
  },
];
let options;

try {
  options = commandLineArgs(optionDefinitions);
} catch (err) {
  console.log(err);
}

process.env.bdname = options.bdname

const {  Page } = require("../models/index");
const { crawl, init ,} = require("./crawler");


async function start() {
  const itdata = crawl();
  let data = await itdata.next();
  console.log();

  while (!data.done) {
    //console.log(data.value)
    const old = await Page.findByPk(data.value.url);

    if (!old) {
      await Page.create({
        url: data.value.url,

        title: data.value.title,
        text: data.value.text,
      }).catch((err) => {
        console.log(err);
      });
    }
    data = await itdata.next();
    //console.log(data);
    //console.log((await Page.findAll()).length);
  }
}
init(options.url,options.maxdist)
start();
