import "server-only";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

let sesClient: SESv2Client | null = null;

function getSesClient() {
  if (!sesClient) {
    sesClient = new SESv2Client({
      region: process.env.AWS_REGION
    });
  }

  return sesClient;
}

export async function sendLeadEmail(lead: Record<string, unknown>) {
  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.SES_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error("Missing SES email configuration");
  }

  const subject = `New OmniLend lead: ${String(lead.division)}`;

  const text = `
New OmniLend lead received.

Division: ${String(lead.division)}
Name: ${String(lead.name)}
Email: ${String(lead.email)}
Phone: ${lead.phone ? String(lead.phone) : "Not provided"}
Budget: ${lead.budget ? String(lead.budget) : "Not provided"}
Interest: ${lead.serviceInterest ? String(lead.serviceInterest) : "Not provided"}

Message:
${String(lead.message)}

Source:
${lead.sourcePath ? String(lead.sourcePath) : "Unknown"}

Created:
${String(lead.createdAt)}
`;

  await getSesClient().send(
    new SendEmailCommand({
      FromEmailAddress: fromEmail,
      Destination: {
        ToAddresses: [toEmail]
      },
      Content: {
        Simple: {
          Subject: {
            Data: subject
          },
          Body: {
            Text: {
              Data: text
            }
          }
        }
      }
    })
  );
}
