import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Events: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const events = [
    {
      id: 1,
      title: "TechFest 2024",
      description: "Annual technical symposium featuring coding competitions, tech talks, and innovative project showcases",
      date: "March 15-17, 2024",
      location: "RSCOE Campus",
      attendees: "500+",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "upcoming"
    },
    {
      id: 2,
      title: "AI/ML Workshop Series",
      description: "Hands-on workshops covering machine learning fundamentals, deep learning, and practical AI applications",
      date: "February 10-12, 2024",
      location: "Computer Lab A",
      attendees: "150+",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Hackathon Championship",
      description: "48-hour coding marathon where teams build innovative solutions to real-world problems",
      date: "January 20-22, 2024",
      location: "Innovation Hub",
      attendees: "200+",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "past"
    },
    {
      id: 4,
      title: "Industry Connect",
      description: "Networking event with industry professionals, featuring guest lectures and career guidance sessions",
      date: "April 5, 2024",
      location: "Auditorium",
      attendees: "300+",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "upcoming"
    }
  ];

  return (
    <section id="events" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '3s' }} />
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
            Upcoming <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us for exciting events, workshops, and competitions that will enhance your technical skills 
            and expand your professional network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* 
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="gradient-card border-none card-hover group overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'upcoming' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      {event.attendees} Expected Attendees
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:gradient-primary hover:text-primary-foreground group"
                    disabled={event.status === 'past'}
                  >
                    {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))} 
          */}

          {/* Temporary message */}
          <div className="col-span-full text-center text-xl text-muted-foreground font-medium py-12">
            Stay tuned for exciting upcoming events!
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="border-primary text-primary hover:gradient-primary hover:text-primary-foreground">
            View All Events
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
