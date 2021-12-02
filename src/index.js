require("./initial")();
const { Page } = require("../models/index");
const { crawl } = require("./crawler");
require("../models").sequelize.sync();
async function start() {
  const itdata = crawl();
  let data = await itdata.next();

  while (!data.done) {
    //console.log(data.value)
    const old = await Page.findByPk(data.value.url);
    //console.log("\\n".replace("\n","232323"))
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
start();
