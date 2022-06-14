const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
  });
  
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'myprofile-bucket',
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
// });
const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'myprofile-bucket',
      acl: 'public-read',
      key: function(req, file, cb){
          cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
      }
  })
});

// const upload = bucketName =>
//   multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: bucketName,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now() + '.' + file.originalname.split('.').pop());
//       },
//     }),
//   });

module.exports = upload;