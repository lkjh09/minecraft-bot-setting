const fs = require("fs-extra");
const path = require("path");

class ServerManager {

    constructor() {

        this.root = path.join(process.cwd(), "servers");

        fs.ensureDirSync(this.root);

    }

    async create(name) {

        const dir = path.join(this.root, name);

        if (await fs.pathExists(dir))
            throw new Error("Server already exists.");

        await fs.ensureDir(dir);

        await fs.writeJson(path.join(dir, "server.json"), {

            name,
            status: "offline",
            ram: "2G",
            jar: "",
            created: Date.now()

        }, { spaces: 4 });

        await fs.writeFile(path.join(dir, "eula.txt"), "eula=true");

        return dir;

    }

    async list() {

        return await fs.readdir(this.root);

    }

}

module.exports = new ServerManager();
