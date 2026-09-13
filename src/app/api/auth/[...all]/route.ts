import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import findIp from "@arcjet/ip";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [shield({ mode: "LIVE" })],
  characteristics: ["userIdOrIp"],
});

const emailSettings = {
  deny: ["DISPOSABLE", "NO_MX_RECORDS", "INVALID"],
} satisfies EmailOptions;

const restrictiveRateLimitSettings = {
  mode: "LIVE",
  interval: "10m",
  max: 30,
} satisfies SlidingWindowRateLimitOptions<[]>;

const laxRateLimitingSettings = {
  mode: "LIVE",
  interval: "5m",
  max: 30,
} satisfies SlidingWindowRateLimitOptions<[]>;

const detectBotSettings = {
  mode: "LIVE",
  allow: [],
} satisfies BotOptions;

const authHandlers = toNextJsHandler(auth);

export const { GET } = authHandlers;

export async function POST(req: Request) {
  const clonedRequest = req.clone();
  const decision = await checkArcJect(req);

  if (decision?.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return Response.json(
        {
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    } else if (decision.reason.isEmail()) {
      let message = "";

      if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Invalid domain email";
      }
      return Response.json({ message }, { status: 400 });
    } else {
      return new Response(null, { status: 403 });
    }
  }
  return authHandlers.POST(clonedRequest);
}

async function checkArcJect(req: Request) {
  const body = await (req.json() as unknown);

  const session = await auth.api.getSession({ headers: req.headers });

  const userIdOrIp = session?.user.id || findIp(req) || "127.0.0.1";

  if (req.url.includes("/auth/sign-up/email")) {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: detectBotSettings,
            rateLimit: restrictiveRateLimitSettings,
          }),
        )
        .protect(req, { email: body.email, userIdOrIp: userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(detectBotSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(req, { userIdOrIp });
    }
  } else {
    return aj
      .withRule(detectBot(detectBotSettings))
      .withRule(slidingWindow(laxRateLimitingSettings))
      .protect(req, { userIdOrIp });
  }
}
