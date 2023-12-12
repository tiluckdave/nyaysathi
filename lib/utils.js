import * as crypto from 'crypto';
import { verifyRegistrationResponse, verifyAuthenticationResponse } from "@simplewebauthn/server";
import { findOneByEmail } from './db';
import { UserAuth } from '@/lib/auth';

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

function base64ToArray(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[ i ] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export async function login(request) {
    const { signInWithBiometric } = UserAuth();
    const challenge = request.session.challenge ?? "";
    const credential = request.body.credential ?? "";
    const email = request.body.email ?? "";

    if (credential?.id == null) {
        throw new Error("Invalid Credentials");
    }

    const user = await findOneByEmail(email);
    if (user.credentials.length == 0) {
        throw new Error("Invalid Credentials");
    }

    let verification;

    try {
        verification = await verifyAuthenticationResponse({
            response: credential,
            expectedChallenge: challenge,
            requireUserVerification: true,
            authenticator: {
                credentialID: user.credentials[ 0 ].credentialID,
                credentialPublicKey: base64ToArray(user.credentials[ 0 ].publicKey),
            },
            ...HOST_SETTINGS,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }

    if (!verification.verified) {
        throw new Error("Login verification Failed");
    }
    signInWithBiometric(user);
    return user.uid;
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
        requireUserVerification: true,
        ...HOST_SETTINGS,
    });

    if (!verification.verified) {
        throw new Error("Invalid Credentials - Registration verification failed.");
    }

    const { credentialID, credentialPublicKey } =
        verification.registrationInfo ?? {};

    if (credentialID == null || credentialPublicKey == null) {
        throw new Error("Registration failed");
    }

    return {
        credentialID: clean(binaryToBase64url(credentialID)),
        publicKey: Buffer.from(credentialPublicKey).toString("base64"),
    };
}