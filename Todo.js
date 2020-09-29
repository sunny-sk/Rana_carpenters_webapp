// TODO:// feed back form
// TODO:// Meet our creators

// modern designs
// 20+ experience

const x = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("123");
  }, 1000);
});

const y = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("123");
  }, 1200);
});

async function init() {
  try {
    const result = await Promise.all([y, x]);
    console.log(result);
  } catch (error) {
    console.log("Df", error);
  }
}

init();
