import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Users, Trophy, Rocket, Target, Eye, ListChecks, Sparkles } from 'lucide-react';
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
        delay: 0.4
      }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aim */}
          <div className="gradient-card p-8 rounded-2xl h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Chapter Aim</h3>
            </div>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">The aim of the chapter is to foster an environment where students in the department can efficiently develop and utilize the latest technologies in the IT field, enhancing their career prospects and contributing to society.</p>
          </div>

          {/* Vision */}
          <div className="gradient-card p-8 rounded-2xl h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary-glow rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Chapter Vision</h3>
            </div>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">To promote research, encourage knowledge sharing, support continuous learning, and enhance career development for all students in the department.</p>
          </div>

          {/* Mission */}
          <div className="gradient-card p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Chapter Mission</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground text-base md:text-lg">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Organize seminars, workshops, and expert lectures to raise awareness about recent industrial trends.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Arrange various competitions and encourage students to demonstrate their skillsets.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Inspire and support new industry entrants, helping them integrate into the IT community.
              </li>
            </ul>
          </div>

          {/* Objectives */}
          <div className="gradient-card p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary-glow rounded-lg flex items-center justify-center">
                <ListChecks className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Chapter Objectives</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground text-base md:text-lg">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Provide exposure to industry professionals to help shape career paths.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Complement technical reviews with the latest technologies.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Offer certification and training programs at discounted rates.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                Present an excellent opportunity for nomination as the Best Student Paper in CSI Communications.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default About;