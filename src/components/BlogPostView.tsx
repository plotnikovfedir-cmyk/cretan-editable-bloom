import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPostViewProps {
  postId: string;
  postSlug: string;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ postId, postSlug }) => {
  useEffect(() => {
    const trackView = async () => {
      try {
        // Get client IP and user agent
        const userAgent = navigator.userAgent;
        
        // Insert view record
        await supabase
          .from('blog_post_views')
          .insert({
            post_id: postId,
            user_agent: userAgent
          });
      } catch (error) {
        // Silently fail - analytics shouldn't break the user experience
      }
    };

    // Track view after a short delay to ensure user is actually reading
    const timer = setTimeout(trackView, 2000);

    return () => clearTimeout(timer);
  }, [postId]);

  return null; // This component doesn't render anything
};