import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroButton } from '@/components/ui/hero-button';
import { ArrowDown } from 'lucide-react';
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = e.clientX * speed / 100;
        const y = e.clientY * speed / 100;
        (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div ref={containerRef} id="home" className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        {Array.from({
        length: 6
      }).map((_, i) => <motion.div key={i} className={`floating-element absolute rounded-full bg-primary/10 floating-animation`} style={{
        width: `${Math.random() * 200 + 50}px`,
        height: `${Math.random() * 200 + 50}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.5}s`
      }} animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }} transition={{
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} />)}

        {/* Glowing orbs */}
        {Array.from({
        length: 4
      }).map((_, i) => <motion.div key={`orb-${i}`} className="floating-element absolute rounded-full" style={{
        width: '100px',
        height: '100px',
        left: `${20 + i * 20}%`,
        top: `${30 + i * 15}%`,
        background: `radial-gradient(circle, hsl(195 100% 50% / 0.3), transparent)`,
        filter: 'blur(1px)'
      }} animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 6 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }} />)}
      </div>

      {/* Parallax Content */}
      <motion.div style={{
      y,
      opacity
    }} className="relative z-10 flex items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.2
        }} className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
              Empowering Future{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tech Leaders
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">Join a vibrant student chapter where learning meets opportunity. We connect students with industry experts, hands-on experiences, and a strong technical community.</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.6
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            
            
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 1.2
        }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.button onClick={scrollToAbout} className="text-primary hover:text-primary-glow transition-colors" animate={{
            y: [0, 10, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              <ArrowDown size={32} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </div>;
};
export default Hero;