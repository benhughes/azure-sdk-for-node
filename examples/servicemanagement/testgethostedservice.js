
var azure = require('../../lib/azure');
var testCommon = require('./testcommon');

var auth = {
  keyfile: './certs/priv.pem',
  certfile: './certs/pub.pem'
}

var inputNames = {
  subscriptionId: '167a0c69-cb6f-4522-ba3e-d3bdc9c504e1',
  serviceName: 'testjsService'
};


var svcmgmt = azure.createServiceManagementService(inputNames.subscriptionId, auth);

svcmgmt.getHostedService(inputNames.serviceName, function(error, response) {
  if (error) {
    testCommon.showErrorResponse(error);
  } else {
    if (response && response.isSuccessful && response.body) {
      var rsp = response.body;
      console.log('ServiceName: ' + rsp.ServiceName);
      console.log('Description: ' + rsp.HostedServiceProperties.Description);
      console.log('Location: ' + rsp.HostedServiceProperties.Location);
      console.log('AffinityGroup: ' + rsp.HostedServiceProperties.AffinityGroup);
      console.log('Label: ' + rsp.HostedServiceProperties.Label);
    } else {
      console.log('Unexpected');
    }
  }
});

