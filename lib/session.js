import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  cookieName: "webauthn-token",
  password: process.env.COOKIE_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionSSR(handler) {
    return withIronSessionSsr(handler, sessionOptions)
}

export function withSessionAPI(handler) {
    return withIronSessionApiRoute(handler, sessionOptions)
}