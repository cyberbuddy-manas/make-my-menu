import AWS from "aws-sdk";

const SES_CONFIG = {
  accessKeyI: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  region : process.env.AWS_REGION,
};

const ses = new AWS.SES(SES_CONFIG);

export const sendEmail = ({recipients, subject, template, ccRecipients}) => {
  // console.log("first", recipients, subject, template, ccRecipients);
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Destination: {
          ToAddresses: recipients, // Email address/addresses that you want to send your email
          CcAddresses: ccRecipients || []
        },
        Message: {
          Body: {
            Html: {
              // HTML Format of the email
              Charset: "UTF-8",
              Data: template
            }
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject
          }
        },
        Source: "no-reply@makemymenu.online"
      };
      const sendEmail = async () => await ses.sendEmail(params).promise();
      sendEmail();
      resolve("Email sent successfully");
    } catch (error) {
        console.log("error", error);
      return reject(error);
    }
  });
};