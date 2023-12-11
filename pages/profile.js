import React, { useEffect, useState } from "react";
import DashBoardWrapper from "@/components/DashBoardWrapper";
import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { PiFingerprintSimpleBold } from "react-icons/pi";
import { supported, create } from "@github/webauthn-json";
import { generateChallenge, verifyCredentials } from "@/lib/utils";
import { withSessionSSR } from "@/lib/session";
import { addCredential } from "@/lib/db";


export default function Profile({ challenge }) {
    const router = useRouter();
    const { user } = UserAuth();

    const [ support, setSupport ] = useState(false);
    const [ error, setError ] = useState(null);

    const handleRegister = async (event) => {
        event.preventDefault();

        const cred = await create({
            publicKey: {
                challenge: challenge,
                rp: {
                    name: "WebAuthn Demo",
                    id: router.hostname,
                },
                user: {
                    id: user.uid,
                    name: user.email,
                    displayName: user.displayName,
                },
                pubKeyCredParams: [ { alg: -7, type: "public-key" } ],
                timeout: 600000,
                attestation: "direct",
                authenticatorSelection: {
                    residentKey: "required",
                    userVerification: "required",
                },
            },
        });

       


        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.uid, name: user.email, displayName: user.displayName, cred }),
        }).then((response) => response.json())
        .then((data) => {
                if (data.userId) {
                    router.push("/dashboard");
                } else {
                    setError(data.message);
                }
            }
            );
    };

    useEffect(() => {
        const checkAvailability = async () => {
            const available =
                await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setSupport(available && supported());
        };
        checkAvailability();
    }, []);


    return <DashBoardWrapper page="profile">
        <h1>Profile</h1>
        <p>Hi {user?.displayName}!</p>
        <p>Your email is {user?.email}.</p>
        {support && <Button leftIcon={<PiFingerprintSimpleBold />} onClick={handleRegister} size='md' width={"100%"} >
            Add Biometric
        </Button>}
        {error && <p>{error}</p>}
    </DashBoardWrapper>;
}

export const getServerSideProps = withSessionSSR(async function ({ req, res }) {
    const challenge = generateChallenge();
    req.session.challenge = challenge;
    await req.session.save();
    return { props: { challenge } };
});