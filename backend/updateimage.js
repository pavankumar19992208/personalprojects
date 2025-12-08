const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const recipes = JSON.parse(fs.readFileSync("recipes.json", "utf-8"));

async function fetchImage(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // For ArchanasKitchen – usually main image has og:image meta tag
    let imageUrl = $('meta[property="og:image"]').attr("content");

    // fallback: look for main recipe image
    if (!imageUrl) {
      imageUrl =
        $(".article-image img").attr("src") || $("img").first().attr("src");
    }

    return imageUrl || null;
  } catch (err) {
    console.error("❌ Error fetching:", url, err.message);
    return null;
  }
}

async function updateAll() {
  for (const recipe of recipes) {
    if (!recipe["URL"]) continue;
    console.log(`🔍 Fetching image for: ${recipe["TranslatedRecipeName"]}`);
    const img = await fetchImage(recipe["URL"]);

    if (img) {
      recipe["image-url"] = img.startsWith("http")
        ? img
        : `https://www.archanaskitchen.com${img}`;
      console.log(`✅ Updated: ${recipe["TranslatedRecipeName"]}`);
    } else {
      console.log(`⚠️ No image found for: ${recipe["TranslatedRecipeName"]}`);
    }
  }

  fs.writeFileSync("recipes-updated.json", JSON.stringify(recipes, null, 2));
  console.log("🎉 Done! Updated recipes saved to recipes-updated.json");
}

updateAll();
