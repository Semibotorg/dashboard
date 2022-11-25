import { config } from "dotenv";
config();
import { createApp } from "./utils";
const PORT = process.env.PORT;
import cls from 'cli-color'
async function main() {
  try {
    const app = await createApp();
    app.listen(PORT, () => console.log(`${cls.green('[EXPRESS]')} listening on [${cls.red(PORT)}] port`));
  } catch (err) {
    console.log(`${cls.red('[EXPRESS]')} Error`);
    console.log(err)
  }
}

main();
