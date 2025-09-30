/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "*";

  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Access-Control-Allow-Origin": origin },
    });
  }

  const { name, email, msg } = await req.json().catch(() => ({}));
  if (!name || !email || !msg) {
    return new Response("Invalid payload", { status: 400, headers: { "Access-Control-Allow-Origin": origin } });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return new Response("Missing email config", { status: 500, headers: { "Access-Control-Allow-Origin": origin } });

  const toRecipients = [
    "bhavsarmayur664@gmail.com",
    "vaibhavvyavahare20@gmail.com",
    "kshitijthorat15@gmail.com",
    "csirscoestudentchapter@gmail.com",
  ];

  const subject = `New Contact Us Message from ${name}  email:${email}`;
  const text = msg;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CSI RSCOE <no-reply@yourdomain.com>",
      to: toRecipients,
      subject,
      text,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    const e = await res.text();
    return new Response(`Email send failed: ${e}`, {
      status: 502,
      headers: { "Access-Control-Allow-Origin": origin },
    });
  }

  return new Response("Message sent successfully", {
    status: 200,
    headers: { "Access-Control-Allow-Origin": origin },
  });
});


