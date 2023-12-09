import React from "react";
import Image from 'next/image'
import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const { user, googleSignIn } = UserAuth();

    const handleSignIn = async () => {
        try {
          await googleSignIn();
        } catch (error) {
          console.log(error);
        }
      };

    if(user) {
        router.push('/');
    }

    return (
        <main>
            <div className="w-full flex flex-col justify-center items-center h-full my-36">
                <Image src="/logo.png" width={350} height ={350} alt="Logo" />
            </div>
            <div className="fixed bottom-0 bg-gray-100 w-full h-72 flex flex-col justify-around items-center">
                <button className="flex gap-4 justify-center items-center text-2xl font-bold px-8 py-4 bg-white outline-none border-none rounded-xl" onClick={handleSignIn}>
                    <Image src="/google.png" width={28} height={28} alt="google logo" />
                    Continue with Google
                </button>

                <p className="font-bold">Learn More&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Privacy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Terms</p>
            </div>
        </main>
    )
}