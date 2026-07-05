const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

class ServerProcess {

    constructor() {
        this.processes = new Map();
    }

    async start(name) {

        if (this.processes.has(name))
            throw new Error("Server sudah berjalan.");

        const dir = path.join(process.cwd(), "servers", name);

        if (!(await fs.pathExists(dir)))
            throw new Error("Server tidak ditemukan.");

        const config = await fs.readJson(path.join(dir, "server.json"));

        if (!config.jar)
            throw new Error("Jar server belum diatur.");

        const child = spawn("java", [
            `-Xms${config.ram}`,
            `-Xmx${config.ram}`,
            "-jar",
            config.jar,
            "nogui"
        ], {
            cwd: dir
        });

        this.processes.set(name, child);

        child.stdout.on("data", data => {
            console.log(`[${name}] ${data}`);
        });

        child.stderr.on("data", data => {
            console.error(`[${name}] ${data}`);
        });

        child.on("exit", code => {
            console.log(`${name} berhenti (${code})`);
            this.processes.delete(name);
        });

        return true;
    }

    stop(name) {

        const proc = this.processes.get(name);

        if (!proc)
            throw new Error("Server tidak berjalan.");

        proc.stdin.write("stop\n");

        return true;
    }

    restart(name) {

        this.stop(name);

        setTimeout(() => {
            this.start(name);
        }, 5000);

        return true;
    }

}

module.exports = new ServerProcess();
