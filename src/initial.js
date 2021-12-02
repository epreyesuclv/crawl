//this file is only for load arguments

const commandLineArgs = require("command-line-args");


module.exports = () => {
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
  console.log("initial", options);
  process.env["options"] = JSON.stringify(options);

};
