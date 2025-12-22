// src/utils/blogUtils.js
import { supabase } from "./supabaseClient";

// Function to check if user can create/edit blogs
export const canUserCreateBlog = (userRole) => {
  return ['admin', 'founder'].includes(userRole);
};

// Function to check if user can edit specific blog
export const canUserEditBlog = (blogData, currentUser) => {
  if (!currentUser || !blogData) return false;
  
  // Admins can edit any blog
  if (currentUser.role === 'admin') return true;
  
  // Only the author can edit their blog (for founders)
  return blogData.author_id === currentUser.id;
};

// Function to check if user can view pro content
export const canUserViewProContent = (user) => {
  // For now, check if user has pro membership
  // You'll need to add this field to your users table
  return user?.is_pro_member || user?.role === 'admin';
};

// Function to generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Function to calculate read time
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Function to upload blog cover image
export const uploadBlogImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blog-covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading blog image:', error);
    throw error;
  }
};