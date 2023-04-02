const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dgutr5eq6",
  api_key: "152876175362556",
  api_secret: "w3smoYvzK-l2LC9sTu2t4i0Xr2E"
});


// Upload

 const uploadFiles = async (files) => {
  const listOfImages = [];
  for (const file of files) {
    const url = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "album",
    });
    console.log(`$urls ====> ${url}`);
    listOfImages.push({ url: url.url, publicId: url.public_id });
  }
  // await files.map(async (e) => {
  //   const url = await cloudinary.uploader.upload(e.tempFilePath, {
  //     folder: "products",
  //   });
  //   console.log(`$urls ====> ${url}`);
  //   listOfImages.push(url);
  // });
  console.log(`$urlsLIST ====> ${listOfImages}`);
  return listOfImages;
};

module.exports = uploadFiles