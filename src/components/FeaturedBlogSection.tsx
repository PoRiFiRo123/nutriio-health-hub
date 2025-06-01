
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  cover_image: string;
  author_name: string;
  publish_date: string;
  slug: string;
  featured: boolean;
}

const FeaturedBlogSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs' as any)
        .select('*')
        .eq('featured', true)
        .order('publish_date', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      setFeaturedPosts(data || []);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const navigateToPost = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  if (loading || featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-green-600">Health Tips</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest insights on nutrition, wellness, and healthy living from our experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featuredPosts.map((post) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigateToPost(post.slug)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.cover_image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.publish_date)}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author_name}
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.summary}
                </p>
                
                <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/blog')}
            className="bg-green-600 hover:bg-green-700"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogSection;
