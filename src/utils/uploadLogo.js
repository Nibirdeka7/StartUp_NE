import { supabase } from "./supabaseClient";

export default async function uploadStartupLogo(file, startupName) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const fileExt = file.name.split(".").pop();
  const fileName = `${startupName.toLowerCase()}-${Date.now()}.${fileExt}`;

  const filePath = `${user.id}/startups/${fileName}`;

  const { error } = await supabase.storage
    .from("startup-logos")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  return filePath; // ✅ STORE ONLY PATH
}
