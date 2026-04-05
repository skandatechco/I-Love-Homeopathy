import { AdminSessionGuard } from "@/components/admin/AdminSessionGuard";

export default function AdminEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminSessionGuard />
      {children}
    </>
  );
}
