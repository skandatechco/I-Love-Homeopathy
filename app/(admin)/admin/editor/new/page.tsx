import { Suspense } from "react";
import GitHubArticleEditor from "@/components/admin/GitHubArticleEditor";

export default function NewEditorPage() {
  return (
    <Suspense fallback={null}>
      <GitHubArticleEditor mode="new" />
    </Suspense>
  );
}
