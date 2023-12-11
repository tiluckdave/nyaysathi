import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  cookieName: "webauthn-token",
  password: process.env.COOKIE_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionAPI(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSession(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}