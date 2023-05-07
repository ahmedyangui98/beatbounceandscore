const Tesseract = require('node-tesseract-ocr');

async function extractNumberFromImage(file) {
  const config = {
    lang: 'eng',
    oem: 1,
    psm: 3,
  };

  const result = await Tesseract.recognize(file, config);

  const pattern = /\d+/g;
  const matches = result.match(pattern);

  if (matches && matches.length > 0) {
    return matches[0];
  } else {
    return null;
  }
}
