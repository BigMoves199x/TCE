import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email and message are required.",
        },
        {
          status: 400,
        },
      );
    }

    console.log("CONTACT FORM SUBMISSION:", {
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received.",
    });
  } catch (error) {
    console.error(
      "CONTACT FORM ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your message.",
      },
      {
        status: 500,
      },
    );
  }
}