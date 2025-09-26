import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    //{ icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    //{ icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/csi-rscoe-student-chapter/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/csirscoe?igsh=OGxyd3pwZHQ3MHoy', label: 'Instagram' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-muted/20 border-t border-border">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* CSI Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/uploads/csi.png"  
                  alt="CSI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-lg text-foreground">CSI RSCOE</h3>
                <p className="text-sm text-muted-foreground">Student Chapter</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
             Driven by students, powered by ideas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-playfair font-semibold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {['About CSI', 'Events', 'Team', 'Blogs', 'Projects'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link}</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-playfair font-semibold text-lg text-foreground">Connect With Us</h3>
            <p className="text-muted-foreground text-sm">
              CSI RSCOE TATHAWADE
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary/10 border border-border rounded-xl flex items-center justify-center group transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-muted-foreground text-sm">
                © 2025 CSI RSCOE Student Chapter. All rights reserved.
              </p>
            </div>

            {/* CSI Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Powered by</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src="/uploads/csi.png"   
                      alt="CSI Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Computer Society of India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
