import { Suspense } from "react";
import LoginPageClient from "@/components/admin/LoginPageClient";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageClient />
    </Suspense>
  );
}
