const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');

const googleCloudStorage = new Storage({
  projectId: 'fbs-func-test',
  keyFilename: 'rn-func.json',
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = JSON.parse(request.body);
    fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', error => {
      console.log(error);
      return response.status(500).json({ error })
    });
    const uuid = UUID();
    const bucket = googleCloudStorage.bucket('fbs-func-test.appspot.com');
    
    return bucket.upload('/tmp/uploaded-image.jpg', {
      destination: '/places/' + uuid + '.jpg',
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          contentType: 'image/jpeg',
          firebaseStorageDownloadTokens: uuid,
        }
      }
      },
      (error, file) => {
        if (!error) {
          return response.status(201).json({
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid
          });
        } else {
          return response.status(500).json({ error });
        }
      }
    )
  });
});
