module.exports = {
	contactEmail(body){
		return `<!doctype html>
		<html>
		<!-- HTML based off of https://github.com/leemunroe/responsive-html-email-template -->
		<head>
		<meta name="viewport" content="width=device-width">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>A Message via Porteloper</title>
		<style>
		@media only screen and (max-width: 620px) {
			table[class=body] h1 {
				font-size: 28px !important;
				margin-bottom: 10px !important;
			}
			table[class=body] p,
			table[class=body] ul,
			table[class=body] ol,
			table[class=body] td,
			table[class=body] span,
			table[class=body] a {
				font-size: 16px !important;
			}
			table[class=body] .wrapper,
			table[class=body] .article {
				padding: 10px !important;
			}
			table[class=body] .content {
				padding: 0 !important;
			}
			table[class=body] .container {
				padding: 0 !important;
				width: 100% !important;
			}
			table[class=body] .main {
				border-left-width: 0 !important;
				border-radius: 0 !important;
				border-right-width: 0 !important;
			}
			table[class=body] .btn table {
				width: 100% !important;
			}
			table[class=body] .btn a {
				width: 100% !important;
			}
			table[class=body] .img-responsive {
				height: auto !important;
				max-width: 100% !important;
				width: auto !important;
			}
		}
		@media all {
			.ExternalClass {
				width: 100%;
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div {
				line-height: 100%;
			}
			.alx a {
				color: inherit !important;
				font-family: inherit !important;
				font-size: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
				text-decoration: none !important;
			}
		}
		</style>
		</head>
		<body class="" style="background-color: #fff; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 15px; line-height: 1.1; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
		<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #eee;">
		<tr>
		<td style="font-family: sans-serif; font-size: 15px; vertical-align: top;">&nbsp;</td>
		<td class="container" style="font-family: sans-serif; font-size: 15px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
		<div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 600px; padding: 10px;">
		<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Porteloper Contact</span>
		<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
		<tr>
		<td class="wrapper" style="font-family: sans-serif; font-size: 15px; vertical-align: top; box-sizing: border-box; padding: 20px;">
		<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
		<tr>
		<td style="font-family: sans-serif; font-size: 15px; vertical-align: top;">
		<h5 style="font-family: sans-serif; font-size: 20px; font-weight: normal; margin: 0; Margin-bottom: 5px; text-align: center;">Contact Form Filled Out</h5>
		<p style="font-family: sans-serif; font-size: 13px; font-weight: normal; margin: 0; Margin-bottom: 20px; text-align: center">Somebody has reached out to you via Porteloper.</p>
		<p style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; Margin-bottom: 10px; text-align: left"><span style="font-weight: bold;">From Name</span>: ${body.fromName}</p>
		<p style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; Margin-bottom: 10px; text-align: left"><span style="font-weight: bold;">From Email</span>: ${body.fromEmail}</p>
		<p style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; Margin-bottom: 10px; text-align: left"><span style="font-weight: bold;">About</span>: ${body.about}</p>
		<p style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; Margin-bottom: 10px; text-align: left"><span style="font-weight: bold;">Message</span>: ${body.message}</p>
		</td>
		</tr>
		</table>
		</td>
		</tr>
		</table>
		<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
		<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
		<tr>
		<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #777; text-align: center;">
		<span class="alx" style="color: #777; font-size: 12px; text-align: center;">Message from Porteloper</span>
		</td>
		</tr>
		<tr>
		<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #777; text-align: center;">
		<span class="alx" style="color: #777; font-size: 12px; text-align: center;">Don't want to receive these messages? Turn off emails in your user settings.</span>
		</td>
		</tr>
		</table>
		</div>
		</div>
		</td>
		<td style="font-size: 15px;">&nbsp;</td>
		</tr>
		</table>
		</body>
		</html>`
	}
}