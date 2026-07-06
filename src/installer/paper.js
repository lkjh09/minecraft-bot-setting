const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

async function install(options) {

    const {
        name,
        version
    } = options;

    const serverDir = path.join(process.cwd(), "servers", name);

    await fs.ensureDir(serverDir);

    // Ambil versi terbaru Paper
    const versionInfo = await axios.get(
        `https://fill.papermc.io/v3/projects/paper/versions/${version}`
    );

    if (!versionInfo.data.builds.length)
        throw new Error("Version tidak ditemukan.");

    const build = versionInfo.data.builds.at(-1);

    const downloadUrl =
        `https://fill.papermc.io/v3/projects/paper/versions/${version}/builds/${build.id}/downloads/${build.downloads.server.name}`;

    console.log("Downloading:", downloadUrl);

    const response = await axios({
        url: downloadUrl,
        method: "GET",
        responseType: "stream"
    });

    const writer = fs.createWriteStream(
        path.join(serverDir, "paper.jar")
    );

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });

    await fs.writeFile(
        path.join(serverDir, "eula.txt"),
        "eula=true"
    );

    await fs.writeFile(
        path.join(serverDir, "server.properties"),
        "motd=Discord Minecraft Server\nonline-mode=true"
    );

    await fs.writeJson(
        path.join(serverDir, "server.json"),
        {
            name,
            type: "paper",
            version,
            jar: "paper.jar",
            java: "java",
            ram: "4G",
            port: 25565
        },
        {
            spaces: 4
        }
    );

    return true;

}

module.exports = {
    install
};
