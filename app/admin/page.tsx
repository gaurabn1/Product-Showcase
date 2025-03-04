import Image from "next/image";
import AuthGuard from "./components/auth-guard";

export default function Page() {
  return (
    <AuthGuard>
      <main className="p-4 flex flex-col h-screen md:justify-center items-center gap-4" >
        <Image src="/images/admin.png" className="lg:w-max lg:h-max" alt="Logo" width={100} height={100} />
        <div>
          <h1 className="text-3xl font-bold">Welcome to the Admin Page</h1>
          <p className="mt-4">This is where you can manage your website.</p>
        </div>
      </main>
    </AuthGuard>
  )
};
