const cloudinary = require("cloudinary").v2;

// Replace with your actual env variables or hardcode temporarily for testing
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dts4ac0uo",
    api_key: process.env.CLOUDINARY_API_KEY || "244662932374649",
    api_secret: process.env.CLOUDINARY_API_SECRET || "SwmEmz4kl8FUJLhgcLDLIb-N0Cw",
});

console.log("Testing Cloudinary credentials...");

cloudinary.api.ping()
    .then(res => {
        console.log("Credentials are valid!");
        console.log(res);
    })
    .catch(err => {
        console.error("Credentials are invalid or connection failed!");
        console.error(err);
    });
