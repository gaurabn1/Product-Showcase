'use client'
import Image from "next/image";
import Verify_token, { AccessPageProps } from "./verify_token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    async function verify_token() {
      const access = localStorage.getItem('access')
      const isAuthenticated = await Verify_token({ access } as AccessPageProps)
      if (!isAuthenticated) {
        router.push('/admin/auth/login')
      }
    }
    verify_token()
  }, [router])

  return (
    <main className="p-4 flex flex-col h-screen md:justify-center items-center gap-4" >
      <Image src="/images/admin.png" className="lg:w-max lg:h-max" alt="Logo" width={100} height={100} />
      <div>
        <h1 className="text-3xl font-bold">Welcome to the Admin Page</h1>
        <p className="mt-4">This is where you can manage your website.</p>
      </div>
    </main>

  )
};
