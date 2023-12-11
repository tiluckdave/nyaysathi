import * as crypto from 'crypto';
import { verifyRegistrationResponse } from "@simplewebauthn/server";

const HOST_SETTINGS = {
    expectedOrigin: "https://nyaysathi.vercel.app",
    expectedRPID: "nyaysathi.vercel.app",
  };

function clean(str) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function generateChallenge() {
  return clean(crypto.randomBytes(32).toString("base64"));
}

// Helper function to translate values between
// `@github/webauthn-json` and `@simplewebauthn/server`
function binaryToBase64url(bytes) {
  let str = "";

  bytes.forEach((charCode) => {
    str += String.fromCharCode(charCode);
  });

  return btoa(str);
}

export async function verifyCredentials(request) {

  const challenge = request.session.challenge ?? "";
  const credential = request.body.cred ?? "";

  if (credential == null) {
    throw new Error("Invalid Credentials");
  }

  let verification;

  verification = await verifyRegistrationResponse({
    response: credential,
    expectedChallenge: challenge,
    requireUserVerification: false,
    ...HOST_SETTINGS,
  });

  if (!verification.verified) {
    throw new Error("Invalid Credentials - Registration verification failed.");
  }

  const { credentialID, credentialPublicKey } =
    verification.registrationInfo;

  if (credentialID == null || credentialPublicKey == null) {
    throw new Error("Registration failed");
  }

  return {
    credentialID: clean(binaryToBase64url(credentialID)),
    publicKey: Buffer.from(credentialPublicKey).toString("base64"),
  };
}