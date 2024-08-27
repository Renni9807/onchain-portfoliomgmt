require("dotenv").config();
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const express = require("express");

const app = express();
const port = process.env.PORT || 5050;

// Setting up AWS S3 client using AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Fetch image from S3
app.get("/image/:key", async (req, res) => {
  const { key } = req.params;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  try {
    console.log("Requesting object with params:", params);
    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);
    const streamToBuffer = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });
    const buffer = await streamToBuffer(data.Body);
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    console.error("Error fetching the image:", err.message);
    res.status(500).send("Error fetching the image");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
