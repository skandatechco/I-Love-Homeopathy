import { auth } from "@clerk/nextjs/server";
import { uploadImageFile } from "@/lib/github-api";

export const runtime = "nodejs";

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = sanitizeFilename(file.name);
  const base64Content = buffer.toString("base64");
  await uploadImageFile(filename, base64Content);

  return Response.json({ url: `/uploads/${filename}` });
}
