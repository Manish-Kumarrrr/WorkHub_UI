import arcjet, { validateEmail } from "@arcjet/next";
import { NextResponse } from "next/server";

export async function POST(req) {
    const aj = arcjet({
        key: process.env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
        rules: [
          validateEmail({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            // block disposable, invalid, and email addresses with no MX records
            block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
          }),
        ],
      });

    const data = await req.json();
  const decision = await aj.protect(req, {
    email: data.email,
  });

  if (decision.isDenied()) {
    console.warn("Fake Email")
    return NextResponse.json({ detail: "Use Genuine Mail" }, { status: 403 });
  }
  return NextResponse.redirect('http://localhost:8085/v1/auth/register');
}
