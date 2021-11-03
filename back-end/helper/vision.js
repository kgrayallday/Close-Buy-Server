/*****************************************
 * Before Using this module, you need to export your credential file in the terminal where you want to start the server
 * ex) export GOOGLE_APPLICATION_CREDENTIALS="/Users/sanghwanjeon/lighthouse/lighthouse_work/Close-Buy-Server/back-end/helper/closebuy-330703-3af7f5806615.json"
 *****************************************/
const vision = require('@google-cloud/vision');

exports.detectWebDesc = async (fileName) => {
// const detectWebDesc = async (fileName) => {

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  let returnVal = '';

  // Pretending to uploaded an image
  const [result] = await client.webDetection('./helper/couch.png');
  // const [result] = await client.webDetection('./couch.png');
  const webDetection = result.webDetection;
    console.log('----------------------------');
    console.log(webDetection.fullMatchingImages);
    console.log('----------------------------');    


  if (webDetection.fullMatchingImages.length) {
    console.log(
      `Full matches found: ${webDetection.fullMatchingImages.length}`
    );
    console.log('----------------------------');
    console.log(webDetection.fullMatchingImages);
    console.log('----------------------------');    
    webDetection.fullMatchingImages.forEach(image => {
      console.log(`  URL: ${image.url}`);
      console.log(`  Score: ${image.score}`);
    });
  }

  if (webDetection.partialMatchingImages.length) {
    console.log(
      `Partial matches found: ${webDetection.partialMatchingImages.length}`
    );
    webDetection.partialMatchingImages.forEach(image => {
      console.log(`  URL: ${image.url}`);
      console.log(`  Score: ${image.score}`);
    });
  }

  if (webDetection.bestGuessLabels.length) {
    console.log(
      `Best guess labels found: ${webDetection.bestGuessLabels.length}`
    );
    webDetection.bestGuessLabels.forEach(label => {
      console.log(`  Label: ${label.label}`);
      returnVal += label.label+' ';
    });
  }  

  if (webDetection.webEntities.length) {
    console.log(`Web entities found: ${webDetection.webEntities.length}`);
    webDetection.webEntities.forEach(webEntity => {
      console.log(`  Description: ${webEntity.description}`);
      console.log(`  Score: ${webEntity.score}`);
      if (webEntity.score > 0.48) returnVal += webEntity.description+' ';
      // console.log(returnVal);
    });
  }

  return returnVal;
}

// console.log(detectWebDesc()); 