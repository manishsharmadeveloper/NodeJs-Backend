const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.model");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    // Resize and compress image before uploading to ImageKit
    const processedImage = await sharp(req.file.buffer)
      .resize({
        width: 2000,
        height: 2000,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
      })
      .toBuffer();

    // Upload processed image instead of original image
    const result = await uploadFile(processedImage);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);

    return res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();

    return res.status(200).json({
      message: "Posts fetched Successfully",
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

module.exports = app;
