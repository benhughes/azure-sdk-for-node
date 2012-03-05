
var azure = require('../../lib/azure');
var testCommon = require('./testcommon');

var auth = {
  keyfile: './certs/priv.pem',
  certfile: './certs/pub.pem'
}

var inputNames = {
  subscriptionId: '167a0c69-cb6f-4522-ba3e-d3bdc9c504e1',
  imageName: 'testjsImage',
  mediaLink: 'http://sergei.blob.core.azure-preview.com/vhdstore/a5ca38048c2440b59e3166590f22b5aaXX.vhd'
};

var svcmgmt = azure.createServiceManagementService(inputNames.subscriptionId, auth);

svcmgmt.createOSImage(inputNames.imageName, inputNames.mediaLink, function(error, response) {
  if (error) {
    testCommon.showErrorResponse(error);
  } else {
    if (response && response.isSuccessful) {
      if (response.statusCode == 200) {
        console.log('OK');
      } else {
        console.log('Pending');
        console.log('RequestID: ' + response.headers['x-ms-request-id']);
      }
    } else {
      console.log('Unexpected');
    }
  }
});

