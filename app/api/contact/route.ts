import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY,
);

type ContactPayload = {
  formType?: "general" | "project";

  name?: string;
  firstName?: string;
  lastName?: string;

  email?: string;
  phone?: string;
  company?: string;

  subject?: string;

  message?: string;
  description?: string;

  projectType?: string;
  budget?: string;
  timeline?: string;

  website?: string;
  goals?: string;

  services?: string[];

  referralSource?: string;
};

/* =========================================================
   HELPERS
========================================================= */

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function displayValue(
  value: string,
  fallback = "Not provided",
) {
  return value
    ? escapeHtml(value)
    : fallback;
}

function formatLabel(value: string) {
  if (!value) {
    return "Not provided";
  }

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

/* =========================================================
   EMAIL SHELL
========================================================= */

function emailShell(
  title: string,
  subtitle: string,
  content: string,
) {
  return `
    <!DOCTYPE html>

    <html>
      <head>
        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#f4f5f7;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
          color:#07111f;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="
            width:100%;
            background:#f4f5f7;
            padding:40px 16px;
          "
        >
          <tr>
            <td align="center">

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  max-width:680px;
                  background:#ffffff;
                  border-radius:24px;
                  overflow:hidden;
                "
              >

                <!-- HEADER -->

                <tr>
                  <td
                    style="
                      background:#07111f;
                      padding:32px;
                    "
                  >
                    <div
                      style="
                        font-size:34px;
                        font-weight:900;
                        letter-spacing:-2px;
                      "
                    >
                      <span
                        style="
                          color:#03CEA4;
                        "
                      >
                        T
                      </span>

                      <span
                        style="
                          color:#EAC435;
                        "
                      >
                        C
                      </span>

                      <span
                        style="
                          color:#FB4D3D;
                        "
                      >
                        E
                      </span>
                    </div>

                    <h1
                      style="
                        margin:
                          24px 0 8px;
                        color:#ffffff;
                        font-size:26px;
                        line-height:1.2;
                      "
                    >
                      ${escapeHtml(title)}
                    </h1>

                    <p
                      style="
                        margin:0;
                        color:
                          rgba(
                            255,
                            255,
                            255,
                            0.55
                          );
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      ${escapeHtml(subtitle)}
                    </p>
                  </td>
                </tr>

                <!-- CONTENT -->

                <tr>
                  <td
                    style="
                      padding:32px;
                    "
                  >
                    ${content}
                  </td>
                </tr>

                <!-- FOOTER -->

                <tr>
                  <td
                    style="
                      padding:
                        22px 32px;
                      border-top:
                        1px solid
                        #eeeeee;
                      color:#777777;
                      font-size:12px;
                      line-height:1.6;
                    "
                  >
                    Submitted through
                    The Creative Explorer
                    website.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/* =========================================================
   FIELD ROW
========================================================= */

function fieldRow(
  label: string,
  value: string,
) {
  return `
    <div
      style="
        margin-bottom:22px;
      "
    >
      <div
        style="
          margin-bottom:6px;
          color:#777777;
          font-size:11px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:1px;
        "
      >
        ${escapeHtml(label)}
      </div>

      <div
        style="
          color:#07111f;
          font-size:15px;
          line-height:1.7;
        "
      >
        ${displayValue(value)}
      </div>
    </div>
  `;
}

/* =========================================================
   PROJECT EMAIL
========================================================= */

function projectEmailTemplate(
  data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
    referralSource: string;
  },
) {
  const content = `
    ${fieldRow(
      "Name",
      data.name,
    )}

    ${fieldRow(
      "Email",
      data.email,
    )}

    ${fieldRow(
      "Phone",
      data.phone,
    )}

    ${fieldRow(
      "Company / Brand",
      data.company,
    )}

    ${fieldRow(
      "Project Type",
      formatLabel(
        data.projectType,
      ),
    )}

    ${fieldRow(
      "Estimated Budget",
      formatLabel(
        data.budget,
      ),
    )}

    ${fieldRow(
      "Preferred Timeline",
      formatLabel(
        data.timeline,
      ),
    )}

    ${fieldRow(
      "How they heard about TCE",
      data.referralSource,
    )}

    <div
      style="
        margin-top:30px;
        padding:24px;
        background:#f7f8f8;
        border-radius:18px;
        border-left:
          4px solid
          #03CEA4;
      "
    >
      <div
        style="
          margin-bottom:10px;
          color:#777777;
          font-size:11px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:1px;
        "
      >
        Project Brief
      </div>

      <div
        style="
          color:#07111f;
          font-size:15px;
          line-height:1.8;
          white-space:pre-wrap;
        "
      >
        ${escapeHtml(
          data.message,
        )}
      </div>
    </div>
  `;

  return emailShell(
    "New Project Enquiry",
    `A new project enquiry was submitted by ${data.name}.`,
    content,
  );
}

/* =========================================================
   GENERAL EMAIL
========================================================= */

function generalEmailTemplate(
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  },
) {
  const content = `
    ${fieldRow(
      "Name",
      data.name,
    )}

    ${fieldRow(
      "Email",
      data.email,
    )}

    ${fieldRow(
      "Subject",
      data.subject,
    )}

    <div
      style="
        margin-top:30px;
        padding:24px;
        background:#f7f8f8;
        border-radius:18px;
        border-left:
          4px solid
          #EAC435;
      "
    >
      <div
        style="
          margin-bottom:10px;
          color:#777777;
          font-size:11px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:1px;
        "
      >
        Message
      </div>

      <div
        style="
          color:#07111f;
          font-size:15px;
          line-height:1.8;
          white-space:pre-wrap;
        "
      >
        ${escapeHtml(
          data.message,
        )}
      </div>
    </div>
  `;

  return emailShell(
    "New Website Enquiry",
    `A new enquiry was submitted by ${data.name}.`,
    content,
  );
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: Request,
) {
  try {
    if (
      !process.env.RESEND_API_KEY
    ) {
      console.error(
        "RESEND_API_KEY is missing.",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /* -----------------------------------------------------
       READ REQUEST
    ----------------------------------------------------- */

    const body =
      (await request.json()) as ContactPayload;

    console.log(
      "CONTACT REQUEST:",
      body,
    );

    /* -----------------------------------------------------
       NORMALIZE FIELDS
    ----------------------------------------------------- */

    const formType =
      clean(body.formType) ===
      "project"
        ? "project"
        : "general";

    /*
     * Accept either:
     *
     * name
     *
     * OR
     *
     * firstName + lastName
     */

    const firstName =
      clean(body.firstName);

    const lastName =
      clean(body.lastName);

    const name =
      clean(body.name) ||
      [firstName, lastName]
        .filter(Boolean)
        .join(" ");

    const email =
      clean(body.email)
        .toLowerCase();

    const phone =
      clean(body.phone);

    const company =
      clean(body.company);

    const subject =
      clean(body.subject);

    /*
     * Accept either:
     *
     * message
     *
     * OR
     *
     * description
     */

    const message =
      clean(body.message) ||
      clean(body.description);

    const projectType =
      clean(body.projectType);

    const budget =
      clean(body.budget);

    const timeline =
      clean(body.timeline);

    const referralSource =
      clean(
        body.referralSource,
      );

    /* -----------------------------------------------------
       DEBUG
    ----------------------------------------------------- */

    console.log(
      "CONTACT NORMALIZED:",
      {
        formType,
        name,
        email,
        phone,
        company,
        subject,
        messageLength:
          message.length,
        projectType,
        budget,
        timeline,
        referralSource,
      },
    );

    /* -----------------------------------------------------
       BASIC VALIDATION
    ----------------------------------------------------- */

    if (
      !name ||
      !email ||
      !message
    ) {
      console.error(
        "CONTACT VALIDATION FAILED:",
        {
          hasName: Boolean(name),
          hasEmail:
            Boolean(email),
          hasMessage:
            Boolean(message),
        },
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide your name, email address and project details.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    /* -----------------------------------------------------
       PROJECT VALIDATION
    ----------------------------------------------------- */

    if (
      formType === "project" &&
      !projectType
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select a project type.",
        },
        {
          status: 400,
        },
      );
    }

    /* -----------------------------------------------------
       PROJECT EMAIL
    ----------------------------------------------------- */

    if (
      formType === "project"
    ) {
      const {
        data,
        error,
      } =
        await resend.emails.send({
          from:
            "The Creative Explorer <website@thecreativexplorer.com>",

          to: [
            "info@thecreativexplorer.com",
          ],

          replyTo: email,

          subject:
            `New TCE Project Enquiry — ${name}`,

          html:
            projectEmailTemplate(
              {
                name,
                email,
                phone,
                company,
                projectType,
                budget,
                timeline,
                message,
                referralSource,
              },
            ),
        });

      if (error) {
        console.error(
          "RESEND PROJECT ERROR:",
          error,
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "We couldn't send your project enquiry. Please try again.",
          },
          {
            status: 500,
          },
        );
      }

      console.log(
        "PROJECT EMAIL SENT:",
        data,
      );

      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you. Your project enquiry has been received.",
        },
        {
          status: 200,
        },
      );
    }

    /* -----------------------------------------------------
       GENERAL CONTACT
    ----------------------------------------------------- */

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a subject.",
        },
        {
          status: 400,
        },
      );
    }

    const {
      data,
      error,
    } =
      await resend.emails.send({
        from:
          "The Creative Explorer <website@thecreativexplorer.com>",

        to: [
          "info@thecreativexplorer.com",
        ],

        replyTo: email,

        subject:
          `TCE Enquiry — ${subject}`,

        html:
          generalEmailTemplate(
            {
              name,
              email,
              subject,
              message,
            },
          ),
      });

    if (error) {
      console.error(
        "RESEND GENERAL ERROR:",
        error,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "We couldn't send your message. Please try again.",
        },
        {
          status: 500,
        },
      );
    }

    console.log(
      "GENERAL EMAIL SENT:",
      data,
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you. Your message has been sent.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "CONTACT_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your enquiry.",
      },
      {
        status: 500,
      },
    );
  }
}