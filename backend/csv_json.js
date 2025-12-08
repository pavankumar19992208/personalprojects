const csv = require("csvtojson");
const fs = require("fs");

csv()
  .fromFile("./recipes.csv")
  .then((json) => {
    fs.writeFileSync("./recipes.json", JSON.stringify(json, null, 2));
    console.log("Saved as recipes.json");
  });
