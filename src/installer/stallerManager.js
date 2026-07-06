// InstallerManager.js

module.exports.install = async (type, options) => {

    switch(type){

        case "paper":
            return require("./paper").install(options);

        case "purpur":
            return require("./purpur").install(options);

        case "fabric":
            return require("./fabric").install(options);

        case "forge":
            return require("./forge").install(options);

        case "neoforge":
            return require("./neoforge").install(options);

        case "vanilla":
            return require("./vanilla").install(options);

        case "arclight":
            return require("./arclight").install(options);

        case "mohist":
            return require("./mohist").install(options);

        case "magma":
            return require("./magma").install(options);

        default:
            throw new Error("Unknown Server Type");

    }

}
