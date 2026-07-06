import AdminContent from "@/components/admin/admin-content";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
}