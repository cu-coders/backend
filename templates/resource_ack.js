"use strict";
const year = new Date().getFullYear();
exports.getTemplate = (userEmail, name) => {
  const message = {
    from: process.env.EMAIL_SENDER,
    to: userEmail,
    subject: "Resource Submission",
    text: `Dear ${name},\n\nThank you for sharing resources with us.`,
    html: `<!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                }

                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }

                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }

                p {
                    line-height: inherit
                }

                @media (max-width:520px) {
                    .row-content {
                        width: 100% !important;
                    }

                    .column .border {
                        display: none;
                    }

                    .stack .column {
                        width: 100%;
                        display: block;
                    }
                }
            </style>
        </head>

        <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
                <tbody>
                    <tr>
                        <td>
                            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td>
                                                                        <div style="font-family: Georgia, 'Times New Roman', serif">
                                                                            <div style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #00d2b9; line-height: 1.2;">
                                                                                <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:38px;"><span style="font-size:38px;">Thank You</span></span></p>
                                                                                <p style="margin: 0; font-size: 14px; text-align: center;"><em><span style="color:#555555;font-size:80px;"><span style="font-size:80px;"><span style="font-size:80px;">${name}</span></span></span></em></p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td style="width:100%;padding-right:0px;padding-left:0px;">
                                                                        <div align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/82/ezgif-3-44cb0c8bbf.gif" style="display: block; height: auto; border: 0; width: 375px; max-width: 100%;" width="375" alt="Image" title="Image"></div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:20px;">
                                                                        <div style="font-family: Georgia, 'Times New Roman', serif">
                                                                            <div style="font-family: Georgia, Times, 'Times New Roman', serif; font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                <p style="margin: 0; font-size: 12px; text-align: center;"><em><span style="font-size:34px;">You shared the valuable resources with Us</span></em></p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td style="padding-bottom:5px;">
                                                                        <div style="font-family: Georgia, 'Times New Roman', serif">
                                                                            <div style="font-size: 12px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 14.399999999999999px; color: #00d2b9; line-height: 1.2;">
                                                                                <p style="margin: 0; font-size: 12px; text-align: center;"><span style="font-size:22px;"><span style="font-size:22px;">...we sent you lot of happiness to you &amp; your family</span></span></p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td>
                                                                        <div style="font-family: sans-serif">
                                                                            <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #989898; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                <p style="margin: 0; font-size: 14px; text-align: center;">I believe we each walk our paths so we can learn and share those lessons with others. We feel so blessed to have you with us.&nbsp;</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table class="button_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                <tr>
                                                                    <td>
                                                                        <div align="center">
                                                                            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://main.cuchapter.tech/calender" style="height:42px;width:163px;v-text-anchor:middle;" arcsize="0%" stroke="false" fillcolor="#00d2b9"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="https://main.cuchapter.tech/calender" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#00d2b9;border-radius:0px;width:auto;border-top:0px solid #A5CEA3;border-right:0px solid #A5CEA3;border-bottom:0px solid #A5CEA3;border-left:0px solid #A5CEA3;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Wanna Meet Us?</span></span></a>
                                                                            <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #00d2b9;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <div class="spacer_block" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F2F8F9;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px solid #5ACEE1; padding-top: 5px; padding-bottom: 5px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                            <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td>
                                                                        <div style="font-family: sans-serif">
                                                                            <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                <p style="margin: 0; font-size: 14px; text-align: center;">© Copyright 2019 - ${year}, CU-Coders. All Rights Reserved.</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table><!-- End -->
        </body>
    </html>`,
  };
  return message;
};
