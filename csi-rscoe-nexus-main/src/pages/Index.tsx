import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Team from '@/components/Team';
import Blogs from '@/components/Blogs';
import Contact from '@/components/Contact';
import LoginModal from '@/components/LoginModal';
import Footer from '@/components/Footer';
import Faculty from '@/components/Faculty';
import Announcements from "@/components/Announcements";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const handleLoginSuccess = (userData: any) => {
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation 
        onLoginClick={() => setIsLoginModalOpen(true)}
        user={user}
        onLogout={() => {
          logout();
          navigate('/');
        }}
      />

      <main className="flex-grow space-y-12">
        <Hero />
        
        {/* Announcements Section
        <section id="announcements" className="container mx-auto px-6">
          <Announcements />
        </section> */}

        <About />
        <Events />
        <Faculty />
        <Team />
        <Blogs />
        <Contact />
      </main>

      <Footer />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Announcements />
    </div>
  );
};

export default Index;
