import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { API_ENDPOINTS } from '@/config/api';
const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast({ title: 'Validation error', description: 'Please fill all fields.', variant: 'destructive' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast({ title: 'Invalid email', description: 'Enter a valid email address.', variant: 'destructive' });
        return;
      }
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          msg: formData.message 
        }),
      });

      const resultText = await response.text();
      if (response.ok) {
        const message = resultText || 'Message delivered successfully';
        toast({
          title: "Message Sent!",
          description: message,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const err = resultText || 'Server error or invalid data';
        toast({
          title: "Failed to send",
          description: err,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not connect to backend",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactInfo = [{
    icon: Mail,
    title: "Email Us",
    description: "csirscoestudentchapter@gmail.com",
    action: "mailto:csirscoestudentchapter@gmail.com"
  }, {
    icon: Phone,
    title: "Call Us",
    description: "+91 8530636252",
    action: "tel:+918530636252"
  }, {
    icon: MapPin,
    title: "Visit Us",
    description: "RSCOE Campus, Pune",
    action: "https://www.google.com/maps/place/JSPM+Rajarshi+Shahu+College+Of+Engineering+,+Tathawade/@18.6200922,73.7446225,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bbbc138acb7b:0x67043867a211a31d!8m2!3d18.6200922!4d73.7471974!16s%2Fg%2F11fly22nwc?entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D"
  }, {
    icon: MessageSquare,
    title: "Connect",
    description: "Follow us on social media",
    action: "https://www.linkedin.com/company/csi-rscoe-student-chapter/"
  }];
  return <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '3s'
      }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary/30 rotate-45 floating-animation" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-secondary/30 rounded-full floating-animation" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-primary/40 floating-animation" style={{
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
            Connect <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">With Us</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you. 
            Reach out and let's build the future of technology together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -50
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <Card className="gradient-card border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair font-semibold text-foreground">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="bg-background/50 border-border focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="bg-background/50 border-border focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows={6} className="bg-background/50 border-border focus:border-primary transition-colors resize-none" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                    {isSubmitting ? <motion.div animate={{
                    rotate: 360
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }} className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: 50
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="space-y-6">
            {contactInfo.map((info, index) => <motion.a key={info.title} href={info.action} target={info.action.startsWith('http') ? '_blank' : '_self'} rel={info.action.startsWith('http') ? 'noopener noreferrer' : ''} initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }} transition={{
            duration: 0.6,
            delay: 0.4 + index * 0.1
          }} className="block">
                <Card className="gradient-card border-none card-hover group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {info.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>)}

            {/* Additional Information */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="mt-8">
              <Card className="gradient-card border-none">
                
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Contact;