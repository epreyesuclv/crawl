"use strict";

let cheerio = require("cheerio");
let URL = require("url-parse");

const axios = require("axios");

const options = JSON.parse(process.env.options);

let START_URL = options.url;
let MAX_PAGES_TO_VISIT = options.maxdist;
let pagesVisited = {};
let numPagesVisited = 0;
let pagesToVisit = [];
let url = new URL(START_URL);
console.log(process.env);
let baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);

async function* crawl() {
  if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
    //console.log(data);
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  if (!pagesToVisit.length) return;
  let nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    // We've already visited this page, so repeat the crawl
    yield* await crawl();
  } else {
    // New page we haven't visited
    yield* visitPage(nextPage);
  }
  yield* await crawl();
}

async function* visitPage(url) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;
  let data;
  // Make the request
  console.log("Visiting page " + url);
  await axios.request({ url: url }).then(function (response) {
    // Check status code (200 is HTTP OK)
    //console.log(json(response.status));
    if (response.status !== 200) {
      return;
    }
    data = { url: url, title: "", text: "" };
    // Parse the document body
    let $ = cheerio.load(response.data);

    const arr = $("html").find("*");

    data.title = $("title").text();

    for (let elemt of arr) {
      //console.log($(elemt).text());
      //store here
      data.text += " " + $(elemt).text();
    }

    //console.log(body);
    //store here
    collectLinks($);
    // In this short program, our callback is just calling crawl()
  });

  //console.log('insadi crawler data',data);
  yield data;
}

function collectLinks($) {
  let anchorTag = $("a");
  // Links
  $(anchorTag).each((i, a) => {
    let fileUrl = $(a).attr("href");
    if (fileUrl) {
      let isRemoteRoute = /^http(?:s)?:\/\//.test(fileUrl);

      if (isRemoteRoute) pagesToVisit.push(fileUrl);
      else pagesToVisit.push(baseUrl + fileUrl);
    }
  });
}

module.exports = { crawl };
