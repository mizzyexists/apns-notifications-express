const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');
const app = express();
var apn = require('@parse/node-apn');

// START SERVER
app.listen(process.env.API_PORT, () => {
    console.log("-------------- Mizzy'S APNs Server --------------")
    console.log("---------------- Ver. 1.0 ----------------")
    console.log(`------- API listening on PORT ` + process.env.API_PORT + ' -------')
  });

app.use('/uploads', express.static('server/uploads'));

var apnOptions = {
token: {
    key: "",
    keyId: "",
    teamId: ""
},
production: false
};

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 1;
note.sound = "default";
note.alert = "This is a custom notification!";
note.body = "This is the body!";
note.contentAvailable = 1;
note.payload = {
    'from': 'test app',
};
note.topic = "dev.mizzy.testapp";

var apnProvider = new apn.Provider(apnOptions);
let deviceToken = "";

apnProvider.send(note, deviceToken).then( (result) => {
    if(result.sent.length < 1){
        console.table({
            message: "Notification Failed",
            device: result.failed[0].device,
            status: result.failed[0].status,
            reason: result.failed[0].response.reason
        });
    } else {
        console.log("Notification Sent!");
    }
}, (err) => {
    console.log(err);
});
