import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const Team: React.FC = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });
 const teamMembers = [{
    id: 1,
    name: "Kshitij Thorat",
    role: "President",
    image: "/uploads/kshitij.jpg",
    linkedin: "https://www.linkedin.com/in/kshitij-thorat-15july2005",
    email: "priya.sharma@student.rscoe.edu"
  }, {
    id: 2,
    name: "Manasi Chaudhary",
    role: "Vice President",
    image: "/uploads/mansi.jpg",
    linkedin: "https://www.linkedin.com/in/mansiy-c-62a6b2259",
    email: "arjun.patel@student.rscoe.edu"
  }, {
    id: 3,
    name: "Shivtej Rakhunde",
    role: "Tresurer",
    image: "/uploads/shivtej.jpg",
    linkedin: "https://www.linkedin.com/in/17shivtejrakhunde",
    email: "shivtejrakhunde@gmail.com"
  }, {
    id: 4,
    name: "Shweta Tate",
    role: "Secretary",
    image: "/uploads/shweta.jpg",
    linkedin: "https://www.linkedin.com/in/shweta-tate-a54712256",
    email: "karthik.kumar@student.rscoe.edu"
  }, {
    id: 5,
    name: "Mayur Bhavsar",
    role: "Technical Lead",
    image: "/uploads/mayur.png",
    linkedin: "https://www.linkedin.com/in/mayur-bhavsar-20699a250",
    email: "bhavsarmayur664@gmail.com"
  }, {
    id: 6,
    name: "Amey Mogre",
    role: "Event Management Lead",
    image: "/uploads/mogre.jpg",
    linkedin: "https://www.linkedin.com/in/amey-mogre-517a49291",
    email: "rohit.mehta@student.rscoe.edu"
  }, {
    id: 7,
    name: "Disha Kulkarni",
    role: "Design Lead",
    image: "/uploads/disha.jpg",
    linkedin: "https://www.linkedin.com/in/disha-kulkarni-profile",
    email: "kavya.nair@student.rscoe.edu"
  }, {
    id: 8,
    name: "Manasvi Ghotkar",
    role: "Documentation Lead",
    image: "/uploads/manasvi.jpg",
    linkedin: "https://www.linkedin.com/in/manasvi-ghotkar-a39822257",
    email: "vikram.joshi@student.rscoe.edu"
  }, {
    id: 9,
    name: "Prajakta Nalawade",
    role: "Social Media Lead",
    image: "/uploads/prajakta.jpg",
    linkedin: "https://www.linkedin.com/in/prajakta-nalawade",
    email: "isha.gupta@student.rscoe.edu"
  }
   // {
  //   id: 10,
  //   name: "Aditya Raj",
  //   role: "Web Developer",
  //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  //   linkedin: "https://linkedin.com/in/adityaraj",
  //   email: "aditya.raj@student.rscoe.edu"
  // }, {
  //   id: 11,
  //   name: "Pooja Iyer",
  //   role: "Design Lead",
  //   image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  //   linkedin: "https://linkedin.com/in/poojaiyer",
  //   email: "pooja.iyer@student.rscoe.edu"
  // }, {
  //   id: 12,
  //   name: "Rahul Verma",
  //   role: "Operations Manager",
  //   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  //   linkedin: "https://linkedin.com/in/rahulverma",
  //   email: "rahul.verma@student.rscoe.edu"
  // }
  ];
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  return <section id="team" className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '4s'
      }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div ref={ref} initial={{
        opacity: 0,
        y: 50
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Meet Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated leaders and innovators working together to build a thriving tech community
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

        {/* Horizontal scrolling team cards */}
        <div ref={scrollRef} className="horizontal-scroll flex gap-6 overflow-x-auto pb-4" style={{
        scrollSnapType: 'x mandatory'
      }}>
          {teamMembers.map((member, index) => <motion.div key={member.id} initial={{
          opacity: 0,
          x: 50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: 50
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} className="flex-shrink-0 w-80 scroll-snap-start">
              <Card className="gradient-card border-none card-hover group h-full">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative mb-4 mx-auto w-24 h-24">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-playfair font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    
                    <p className="text-primary font-medium mb-4">
                      {member.role}
                    </p>
                    
                    <div className="flex justify-center gap-3">
                      <motion.a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full transition-all duration-300" whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.95
                  }}>
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                      <motion.a href={`mailto:${member.email}`} className="p-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full transition-all duration-300" whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.95
                  }}>
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
            
        </div>

        {/* Scroll hint */}
     {/* Join Our Chapter Button */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.8, delay: 1 }}
  className="text-center mt-12"
>
  <Button
    size="lg"
    className="gradient-primary text-lg px-8 py-4 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
    onClick={() => {
      const joinSection = document.querySelector('#join');
      if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}
  >
    Join Our Chapter
  </Button>
</motion.div>

      </div>
    </section>;
};
export default Team;