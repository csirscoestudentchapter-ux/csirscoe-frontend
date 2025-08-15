import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Team from '@/components/Team';
import Blogs from '@/components/Blogs';
import Contact from '@/components/Contact';
import LoginModal from '@/components/LoginModal';

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation onLoginClick={() => setIsLoginModalOpen(true)} />
      <Hero />
      <About />
      <Events />
      <Team />
      <Blogs />
      <Contact />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
