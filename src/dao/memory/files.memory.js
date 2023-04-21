import fs from "fs";
import __dirname from "../../dirname.js";

class FilesManager {
  constructor(file) {
    this.path = `${__dirname}/files/${file}`;
    this.path2 = `${process.cwd()}/src/files/${file}`;
  }

  async loadItems() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path);
      const response = JSON.parse(data);
      return response;
    }
    return `cannot find file in this path ${this.path}`;
  }
}

export default FilesManager;