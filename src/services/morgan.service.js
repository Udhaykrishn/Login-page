import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const dir = "Logger";
const directoryPath = path.join(
  path.dirname(path.dirname(fileURLToPath(import.meta.url))),
  dir
);
function createLogger() {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

const accessLog = path.join(directoryPath, "access.log");

function createAccessLogStream() {
  if (fs.existsSync(accessLog)) {
    fs.writeFile(accessLog, "", "utf-8", (err) => {
      if (err) console.log(err);
    });
  }
  const accessLogStream = fs.createWriteStream(accessLog, { flags: "a" });
  return accessLogStream;
}

export { createAccessLogStream, createLogger };
