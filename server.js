const app = require("./app");
const PORT = process.env.PORT || 3000;
const createTables = require("./config/migration");

createTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Server aktif pada localhost:${PORT}`);
  });
});
