
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  author_name: string;
  publish_date: string;
  categories: string[];
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug]);

  const fetchBlogPost = async (postSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', postSlug)
        .single();
      
      if (error) throw error;
      if (data && typeof data === 'object' && 'id' in data) {
        setPost(data as BlogPost);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading blog post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src={post.cover_image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200"}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-6 text-gray-500 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.publish_date)}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author_name}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.categories.map((category, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
