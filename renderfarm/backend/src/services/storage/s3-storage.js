// backend/src/services/storage/s3-storage.js
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  s3ForcePathStyle: true
});

module.exports = {
  async uploadFile(bucket, key, buffer) {
    return s3.upload({
      Bucket: bucket,
      Key: key,
      Body: buffer,
    }).promise();
  },

  async downloadFile(bucket, key) {
    return s3.getObject({ Bucket: bucket, Key: key }).promise();
  }
};
