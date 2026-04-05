import { Suspense } from "react";
import GitHubArticleEditor from "@/components/admin/GitHubArticleEditor";

export default function EditorPage() {
  return (
    <Suspense fallback={null}>
      <GitHubArticleEditor mode="edit" />
    </Suspense>
  );
}
