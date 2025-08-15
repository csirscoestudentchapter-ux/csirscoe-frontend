import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Users, Trophy, Rocket } from 'lucide-react';
const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  const features = [{
    icon: Code,
    title: "Technical Excellence",
    description: "Fostering cutting-edge programming skills and software development expertise"
  }, {
    icon: Users,
    title: "Community Building",
    description: "Creating a network of passionate technologists and future industry leaders"
  }, {
    icon: Trophy,
    title: "Innovation Focus",
    description: "Encouraging research, development, and breakthrough technological solutions"
  }, {
    icon: Rocket,
    title: "Career Growth",
    description: "Providing professional development opportunities and industry connections"
  }];
  return <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '2s'
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
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CSI RSCOE</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">To empower students with technical excellence, leadership, and innovation by fostering a collaborative environment that nurtures creativity, professional development, and lifelong learning in the field of Computer Science and Information Technology</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
          opacity: 0,
          y: 50
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 50
        }} transition={{
          duration: 0.8,
          delay: index * 0.2
        }} className="gradient-card p-6 rounded-xl card-hover group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>)}
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="text-center">
          <div className="gradient-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">To bridge the gap between academic knowledge and industry needs by conducting workshops, seminars, and hands-on sessions on emerging technologies.


To cultivate problem-solving, leadership, and team-building skills through participation in technical competitions, hackathons, and collaborative projects.


To promote research and innovation by encouraging students to explore real-world challenges and contribute to impactful technological solutions.


To create an inclusive and vibrant technical community that nurtures talent, embraces diversity, and promotes ethical practices in computing.


To establish collaborations with industry professionals and CSI National Body to provide students with exposure, mentorship, and career opportunities.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">Innovation</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">Excellence</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">Collaboration</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">Growth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default About;