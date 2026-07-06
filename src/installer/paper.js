const fs = require("fs-extra");
const path = require("path");

async function install(options){

    const folder = path.join(
        process.cwd(),
        "servers",
        options.name
    );

    await fs.ensureDir(folder);

    // Download paper.jar nanti di sini

    await fs.writeFile(
        path.join(folder,"eula.txt"),
        "eula=true"
    );

    await fs.writeJson(
        path.join(folder,"server.json"),
        {
            type:"paper",
            version:options.version,
            jar:"paper.jar",
            ram:"4G"
        },
        {spaces:4}
    );

}

module.exports={install};
