import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Faculty: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const facultyMessages = [
     {
      id: 1,
      title: "HOD's Message",
      name: "Dr. Seema V. Kedar",
      designation: "Professor & HOD, Department of Computer Engineering",
      image: "/uploads/hod.png",
            message: "It gives me great pleasure to witness the inauguration of the CSI RSCOE Student Chapter under the Department of Computer Engineering. This chapter marks a new milestone in our journey toward academic excellence and technical innovation. The primary aim of this initiative is to enhance students’ professional skills, cultivate a culture of research and innovation, and bridge the gap between classroom learning and real-world applications. With the active support of our highly qualified faculty members and enthusiastic student team, I am confident that this chapter will provide a platform for knowledge sharing, industry interaction, and holistic development of our students. I wish the student members all the best for organizing impactful activities that will help shape the future leaders of the IT industry"

    }
    ,
    {
      id: 2,
      title: "Faculty Coordinator Message",
      name: "Dr. Pradnya Vikhar",
      designation: "Faculty Coordinator, CSI RSCOE Student Chapter",
      image: "/uploads/fac.png",
            message: "It is an honor to serve as the Faculty Coordinator of the CSI RSCOE Student Chapter. This initiative will not only expose students to the latest technologies and industry trends but also foster leadership, teamwork, and problem-solving skills.Our vision is to make this chapter a vibrant community where students actively engage in technical events, workshops, and competitions to enhance their knowledge and practical expertise. With the dedication of our student members and the guidance of the department, I am confident that the CSI RSCOE Student Chapter will evolve into a hub of learning, innovation, and excellence.I extend my best wishes to the entire team for a successful and impactful journey ahead."


    },
   
  ];

  return (
    <section id="faculty" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
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
            Faculty <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Messages</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Guidance and inspiration from our esteemed faculty members
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {facultyMessages.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="gradient-card border-none card-hover h-full shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <img
                        src={(faculty.image || '').startsWith('http') ? faculty.image : ((faculty.image || '').startsWith('/') ? faculty.image : `/${faculty.image}`)}
                        alt={faculty.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                        onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-primary mb-2">
                        {faculty.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {faculty.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {faculty.designation}
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="text-muted-foreground leading-relaxed italic">
                    "{faculty.message}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;