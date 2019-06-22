const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');

const googleCloudStorage = new Storage({
  projectId: 'fbs-func-test',
  keyFilename: 'rn-func.json',
});

admin.initializeApp({
  credential: admin.credential.cert(require('./rn-func.json'))
});

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
      console.log('No token present');
      response.status(403).json({error: 'Unathorized'});
      return;
    }
    const token = request.headers.authorization.split('Bearer ')[1];
    
    admin.auth().verifyIdToken(token)
      .then(verifiedToken => {
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
                  uuid,
                  imagePath: '/places/' +  uuid + '.jpg',
              });
            } else {
              console.log(error);
              return response.status(500).json({ error });
            }
          }
        )
      })
      .catch(error => {
        console.log('Token is invalid ', error);
        response.status(403).json({error: 'Unathorized'});
      });
  });
});

exports.deleteImage = functions.database.ref('/places/{placeId}').onDelete(snapshot => {
  const placeData = snapshot.val();
  const imagePath = placeData.imagePath;

  const bucket = googleCloudStorage.bucket('fbs-func-test.appspot.com');
  return bucket.file(imagePath).delete();
});
