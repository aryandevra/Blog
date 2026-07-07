// Centralized application configuration loaded from Vite environment variables
const conf = Object.freeze({
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

  tinyMceKey: String(import.meta.env.VITE_TINYMCE_KEY),
});

export default conf;
