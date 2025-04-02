// Supabase configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // Tables configuration
  tables: {
    members: 'members',
    dues: 'member_dues',
    news: 'news',
    events: 'events',
    notifications: 'notifications',
  },
  
  // Storage buckets for media files
  storage: {
    avatars: 'avatars',
    news: 'news_images',
    documents: 'documents',
  }
}

export default supabaseConfig;
