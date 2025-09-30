import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, User, Clock, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  createdAt?: string;
  readTime?: string;
  image?: string;
  category?: string;
}

const Blogs: React.FC = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [fullScaleImage, setFullScaleImage] = useState<string | null>(null);

  // Static blog data with B1-B5 images
  const staticBlogs: BlogPost[] = [
    {
      id: 1,
      title: "OpenAI Introduces ChatGPT Go at Just $4.6 in India  ",
      excerpt: "",
      author: "Kshitij Thorat",
      createdAt: "2025-09-08",
      //readTime: "5 min read",
      image: "/uploads/B1.jpg",
      category: "ChatGPT"
    },
    {
      id: 2,
      title: "SpaceX Hits Century of Falcon 9 Launches in 2025",
      excerpt: "",
      author: "Ayush",
      createdAt: "2025-08-16",
     // readTime: "8 min read",
      image: "/uploads/B2.jpg",
      category: "SpaceX"
    },
    {
      id: 3,
      title: "Made in India Chips: Driving AI, Robotics, and IoT Future",
      excerpt: "",
      author: "Lazina",
      createdAt: "2025-08-31",
      //readTime: "6 min read",
      image: "/uploads/B3.jpg",
      category: "Electronics"
    },
    {
      id: 4,
      title: "UPI Breaks All Records in October 2025",
      excerpt: "",
      author: "Hitesh",
      createdAt: "2025-10-05",
      //readTime: "7 min read",
      image: "/uploads/B4.jpg",
      category: "UPI"
    },
    {
      id: 5,
      title: "SuperComputers: India's Edge in AI",
      excerpt: "",
      author: "Mansi Chaudhari",
      createdAt: "2022-10-12",
      //readTime: "9 min read",
      image: "/uploads/B5.jpg",
      category: "SuperComputers"
    }
  ];

  useEffect(() => {
    // Immediately show static blogs
    console.log('Loading static blogs:', staticBlogs);
    setBlogs(staticBlogs);
    
    const load = async () => {
      try {
        const res = await fetch('https://csi-backend-4.onrender.com/api/public/blogs');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            console.log('Loaded blogs from API:', data);
            setBlogs(data);
          }
        }
      } catch (err) {
        console.error('Failed to load blogs from API, using static blogs', err);
      }
    };
    load();
  }, []);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="blogs" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Latest <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tech News</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights from our tech community
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => scroll('left')} className="border-primary text-primary hover:gradient-primary hover:text-primary-foreground">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => scroll('right')} className="border-primary text-primary hover:gradient-primary hover:text-primary-foreground">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {blogs.length > 0 ? (
          <div ref={scrollRef} className="horizontal-scroll flex gap-6 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            {blogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 scroll-snap-start"
              >
                <Card className="gradient-card border-none card-hover group overflow-hidden h-full">
                  <div className="relative overflow-hidden cursor-pointer" onClick={() => setFullScaleImage(post.image || '/placeholder.svg')}>
                    <img
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.log('Image failed to load:', post.image);
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                      onLoad={() => console.log('Image loaded successfully:', post.image)}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">Click to view full scale</p>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-playfair font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center text-xl text-muted-foreground font-medium py-12">
            Blogs are brewing! Check back soon for fresh tech insights.
          </div>
        )}

      </div>


      {/* Full Scale Image Modal */}
      {fullScaleImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-hidden"
          onClick={() => setFullScaleImage(null)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative max-w-7xl max-h-full overflow-auto">
            <img
              src={fullScaleImage}
              alt="Full scale blog image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10"
              onClick={(e) => {
                e.stopPropagation();
                setFullScaleImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
