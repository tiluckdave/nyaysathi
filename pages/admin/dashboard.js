import AdminDashboardWrapper from "@/components/AdminDashboardWrapper";
import { UserAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Dashboard() {
    const { user } = UserAuth();
    const router = useRouter();


    useEffect(() => {
        console.log(user);
        if (!user?.role == "admin") {
            router.push('/dashboard');
        }
    }, [user])

    if (!user) {
        return (
            <AdminDashboardWrapper>
                <h3>loading...</h3>
            </AdminDashboardWrapper>
        )
    }

    return (
        <AdminDashboardWrapper>
            <h1>Hello Admin</h1>
        </AdminDashboardWrapper>
    )
}
