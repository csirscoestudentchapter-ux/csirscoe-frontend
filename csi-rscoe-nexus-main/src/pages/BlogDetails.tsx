import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  createdAt?: string;
  readTime?: string;
  image?: string;
  category?: string;
  content?: string;
}

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  // Static blog data with B1-B5 images
  const staticBlogs: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt: "Learn the fundamentals of web development and build your first website from scratch.",
      author: "Tech Team",
      createdAt: "2024-01-15",
      readTime: "5 min read",
      image: "/uploads/B1.jpg",
      category: "Web Development",
      content: `
        <h2>Introduction to Web Development</h2>
        <p>Web development is an exciting field that combines creativity with technical skills. Whether you're building a simple personal website or a complex web application, understanding the fundamentals is crucial.</p>
        
        <h3>HTML: The Structure</h3>
        <p>HTML (HyperText Markup Language) forms the backbone of every web page. It provides the structure and content that browsers display. Learning HTML is your first step into web development.</p>
        
        <h3>CSS: The Styling</h3>
        <p>CSS (Cascading Style Sheets) brings your HTML to life with colors, layouts, and animations. It's what makes websites look beautiful and professional.</p>
        
        <h3>JavaScript: The Interactivity</h3>
        <p>JavaScript adds interactivity to your websites. From simple form validations to complex single-page applications, JavaScript is the language of the web.</p>
        
        <h3>Getting Started</h3>
        <p>Start with the basics: HTML, CSS, and JavaScript. Practice by building small projects and gradually work your way up to more complex applications. The key is consistent practice and staying updated with the latest web technologies.</p>
      `
    },
    {
      id: 2,
      title: "Introduction to Machine Learning",
      excerpt: "Discover the world of artificial intelligence and machine learning algorithms.",
      author: "AI Team",
      createdAt: "2024-01-20",
      readTime: "8 min read",
      image: "/uploads/B2.jpg",
      category: "Machine Learning",
      content: `
        <h2>What is Machine Learning?</h2>
        <p>Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task.</p>
        
        <h3>Types of Machine Learning</h3>
        <p><strong>Supervised Learning:</strong> Learning with labeled data, like predicting house prices based on features.</p>
        <p><strong>Unsupervised Learning:</strong> Finding patterns in data without labels, like customer segmentation.</p>
        <p><strong>Reinforcement Learning:</strong> Learning through interaction with an environment, like game AI.</p>
        
        <h3>Popular Algorithms</h3>
        <p>From linear regression to neural networks, ML algorithms solve different types of problems. Understanding when to use each algorithm is key to success.</p>
        
        <h3>Real-World Applications</h3>
        <p>Machine learning powers recommendation systems, image recognition, natural language processing, and autonomous vehicles. The possibilities are endless!</p>
      `
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices",
      excerpt: "Essential security measures to protect your digital assets and personal information.",
      author: "Security Team",
      createdAt: "2024-01-25",
      readTime: "6 min read",
      image: "/uploads/B3.jpg",
      category: "Cybersecurity",
      content: `
        <h2>Understanding Cybersecurity</h2>
        <p>In our digital age, cybersecurity is more important than ever. Protecting your data and systems from threats requires a proactive approach.</p>
        
        <h3>Password Security</h3>
        <p>Use strong, unique passwords for each account. Consider using a password manager to generate and store complex passwords securely.</p>
        
        <h3>Two-Factor Authentication</h3>
        <p>Enable 2FA wherever possible. This adds an extra layer of security by requiring a second form of verification.</p>
        
        <h3>Software Updates</h3>
        <p>Keep your operating system and applications updated. Security patches often fix vulnerabilities that could be exploited by attackers.</p>
        
        <h3>Network Security</h3>
        <p>Use secure networks, avoid public Wi-Fi for sensitive activities, and consider using a VPN for additional protection.</p>
      `
    },
    {
      id: 4,
      title: "Mobile App Development Trends",
      excerpt: "Explore the latest trends and technologies in mobile application development.",
      author: "Mobile Team",
      createdAt: "2024-01-30",
      readTime: "7 min read",
      image: "/uploads/B4.jpg",
      category: "Mobile Development",
      content: `
        <h2>The Mobile Revolution</h2>
        <p>Mobile apps have transformed how we interact with technology. From social media to banking, mobile applications are integral to our daily lives.</p>
        
        <h3>Cross-Platform Development</h3>
        <p>Frameworks like React Native, Flutter, and Xamarin allow developers to build apps for multiple platforms using a single codebase.</p>
        
        <h3>Progressive Web Apps</h3>
        <p>PWAs combine the best of web and mobile apps, offering native-like experiences through web browsers.</p>
        
        <h3>AI Integration</h3>
        <p>Machine learning and AI are being integrated into mobile apps for features like image recognition, voice assistants, and personalized recommendations.</p>
        
        <h3>Future Trends</h3>
        <p>5G technology, augmented reality, and IoT integration are shaping the future of mobile app development.</p>
      `
    },
    {
      id: 5,
      title: "Cloud Computing Fundamentals",
      excerpt: "Understanding cloud services and how they revolutionize modern computing.",
      author: "Cloud Team",
      createdAt: "2024-02-05",
      readTime: "9 min read",
      image: "/uploads/B5.jpg",
      category: "Cloud Computing",
      content: `
        <h2>What is Cloud Computing?</h2>
        <p>Cloud computing delivers computing services over the internet, including servers, storage, databases, networking, software, and analytics.</p>
        
        <h3>Service Models</h3>
        <p><strong>IaaS (Infrastructure as a Service):</strong> Virtual machines, storage, and networking.</p>
        <p><strong>PaaS (Platform as a Service):</strong> Development environments and tools.</p>
        <p><strong>SaaS (Software as a Service):</strong> Complete applications delivered over the internet.</p>
        
        <h3>Deployment Models</h3>
        <p>Public, private, and hybrid clouds offer different levels of control, security, and customization.</p>
        
        <h3>Benefits</h3>
        <p>Cost efficiency, scalability, flexibility, and automatic updates make cloud computing attractive for businesses of all sizes.</p>
        
        <h3>Major Providers</h3>
        <p>AWS, Microsoft Azure, and Google Cloud Platform are the leading cloud service providers, each offering unique advantages.</p>
      `
    }
  ];

  useEffect(() => {
    (async () => {
      try {
      const res = await fetch('http://localhost:8080/api/public/blogs');
      if (res.ok) {
        const list = await res.json();
          const foundBlog = list.find((b: any) => String(b.id) === id);
          if (foundBlog) {
            setBlog(foundBlog);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load blog from API', err);
      }
      
      // Fallback to static blogs
      const foundBlog = staticBlogs.find(b => String(b.id) === id);
      setBlog(foundBlog || null);
    })();
  }, [id]);

  if (!blog) return <div className="container mx-auto px-4 py-10">Loading...</div>;
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6 text-primary hover:text-primary-foreground" 
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blogs
      </Button>
      
      <article className="prose dark:prose-invert max-w-none">
        <div className="relative overflow-hidden rounded-lg mb-8">
          <img 
            src={blog.image || '/placeholder.svg'} 
            alt={blog.title} 
            className="w-full h-96 object-cover" 
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
              {blog.category}
            </span>
          </div>
        </div>
        
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{blog.title}</h1>
          <div className="flex items-center gap-6 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed">{blog.excerpt}</p>
        </header>
        
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
        />
      </article>
    </div>
  );
};

export default BlogDetails;


