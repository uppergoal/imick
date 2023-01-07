import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(import.meta.url);
const rootPath = path.join(__dirname, "..", "..", "..");

export default rootPath;
