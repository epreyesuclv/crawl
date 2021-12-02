Beta Crwaler
===========
this is a crawler for testing purpose.

Installation
===========
you need to install the follow dependency first:

* "axios": "^0.24.0"

* "cheerio": "^1.0.0-rc.10",
* "command-line-args": "^5.2.0",
* "sequelize": "^6.12.0-alpha.1",
* "sequelize-cli": "^6.3.0",
* "sqlite3": "^5.0.2"


you can install all this simple running
```
npm install
```
if you want to change database default name you need to use --bdname parameter

Example
-------
```
npm run crawl -- --bdname=myotherdbname.bd
```
if you want to change the inital url you need to use --url

Example
-------
```
npm run crawl -- --url=https://initialpage.com
```
if you want to change the max recursion search you can do as follow:

Example
---
```
npm run dev crawl -- --maxdist=3
```

Of course you can use all parameters at once, like this:

Example
---
```
npm run crawl -- --url=http://initalpage.com --maxdist=3 --bdname=myothername.bd
```

The crawler store text, title and url searched from the web in the sqlite database file inside the database/ directory
