const admin = require("firebase-admin");
const dotenv = require("dotenv");
const { duration } = require("moment-timezone");
dotenv.config({ path: "./config.env" });
// Initialize the Firebase Admin SDK with the service account

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // handle line breaks correctly
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSAL_DOMAIN,
};

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const client = require("twilio")(accountSid, authToken);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendPushNotification = (req, res, next) => {
  const { title, body, fcm_token } = req.body;

  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        action: "emergency",
      },
      token: fcm_token,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return res.status(200).send({
          message: "Notification sent successfully",
          response: response,
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        return res.status(500).send({
          message: "Error sending push notification.",
          errCause: error.message,
        });
      });
  } catch (error) {
    return res.status(404).json({
      message: "Error sending push notification.",
      errCause: error.message,
    });
  }
};

exports.makeCall = async (req, res, next) => {
  try {
    client.calls.create(
      {
        url: "http://demo.twilio.com/docs/voice.xml",
        to: `+91${req.body.phoneNumber}`,
        from: process.env.TWILIO_NUMBER,
      },
      function (err, call) {
        if (err) {
          return res.status(404).json({
            message: "Error while making call.",
            errCause: err.message,
          });
        } else {
          return res.status(200).json({
            message: "Call initiated successfully",
            callSid: call.sid,
          });
        }
      }
    );
  } catch (error) {
    return res.status(404).json({
      message: "Error sending push notification.",
      errCause: error.message,
    });
  }
};

exports.triggerRecording = async (req, res, next) => {
  try {
    const { fcm_token, duration, title, data } = req.body;

    console.log({ fcm_token, duration });

    const message = {
      notification: {
        title: title,
        body: data,
      },
      data: {
        duration: duration.toString(),
        action: "audioRecording",
      },
      token: fcm_token,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return res.status(200).send({
          message: "Notification sent successfully",
          response: response,
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        return res.status(500).send({
          message: "Error sending push notification.",
          errCause: error.message,
        });
      });
  } catch (err) {
    return res.status(404).json({
      message: "Error while triggering recording.",
      errCause: err.message,
    });
  }
};
exports.triggerVideoRecording = async (req, res, next) => {
  try {
    const { fcm_token, duration, title, body } = req.body;

    console.log({ fcm_token, duration });

    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        duration: duration.toString(),
        action: "startRecording",
      },
      token: fcm_token,
    };

    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return res.status(200).send({
          message: "Notification sent successfully",
          response: response,
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        return res.status(500).send({
          message: "Error sending push notification.",
          errCause: error.message,
        });
      });
  } catch (err) {
    return res.status(404).json({
      message: "Error while triggering recording.",
      errCause: err.message,
    });
  }
};
