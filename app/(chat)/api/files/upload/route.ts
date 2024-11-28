import { auth } from "@/app/(auth)/auth";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  let session = await auth();

  if (!session) {
    return Response.redirect("/login");
  }

  const { user } = session;

  if (!user) {
    return Response.redirect("/login");
  }

  const { url, fields } = await put(`${user.email}/${filename}`, {
    access: 'public',
    handleUploadUrl: '/api/files/process',
  });

  return Response.json({ url, fields });
}

