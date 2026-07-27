import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return Response.json(
        {
          error: "Missing paramsToSign",
        },
        {
          status: 400,
        },
      );
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
      console.error("CLOUDINARY_API_SECRET is missing");

      return Response.json(
        {
          error: "Cloudinary API secret is not configured",
        },
        {
          status: 500,
        },
      );
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret,
    );

    return Response.json({
      signature,
    });
  } catch (error) {
    console.error("Cloudinary signature error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to sign Cloudinary upload",
      },
      {
        status: 500,
      },
    );
  }
}