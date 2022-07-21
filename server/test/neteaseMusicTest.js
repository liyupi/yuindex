const { cloudsearch } = require("NeteaseCloudMusicApi");

async function main() {
  try {
    const result = await cloudsearch({
      keywords: "你好",
    });
    console.log(result.body.result.songs);
  } catch (error) {
    console.log(error);
  }
}

main();
