"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Verify_token, { AccessPageProps } from "../utils/verify-token";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    async function verify_token() {
      const access = localStorage.getItem("access");
      const isAuthenticated = await Verify_token({ access } as AccessPageProps);
      if (!isAuthenticated) {
        router.push("/admin/auth/login");
      }
    }
    verify_token();
  }, [router]);

  return <>{children}</>;
}
