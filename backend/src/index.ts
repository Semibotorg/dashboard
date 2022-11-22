import { config } from "dotenv";
config();
import { createApp } from "./utils/createApp";
const PORT = process.env.PORT;

async function main() {
  try {
    const app = createApp();
    app.listen(PORT, () => console.log(`listening on [${PORT}] port`));
  } catch (err) {
    console.log(err);
  }
}

main();
