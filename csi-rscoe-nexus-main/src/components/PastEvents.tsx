import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Users, X, ChevronLeft, ChevronRight, Clock, Award, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pastEventsData, PastEvent } from '@/data/pastEvents';

const PastEvents: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Use data from the external file
  const pastEvents = pastEventsData;

  const openGallery = (event: PastEvent, photoIndex: number = 0) => {
    setSelectedEvent(event);
    setCurrentPhotoIndex(photoIndex);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedEvent.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedEvent.photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <section id="past-events" className="py-20 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl floating-animation" />
          <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
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
              Past <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
             
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex-shrink-0 w-80"
              >
                <Card className="gradient-card border-none card-hover group overflow-hidden h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {event.eventType}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{event.photos.length} Photos</span>
                        {event.duration && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{event.duration}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {event.description}
                    </CardDescription>
                    {event.organizer && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <User className="w-3 h-3" />
                        <span>Organized by {event.organizer}</span>
                      </div>
                    )}
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
                        {event.participants.join(", ")}
                      </div>
                      {event.prize && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Award className="w-4 h-4 mr-2 text-primary" />
                          {event.prize}
                        </div>
                      )}
                    </div>

                    {/* Event Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Event Highlights</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}


                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:gradient-primary hover:text-primary-foreground"
                      onClick={() => openGallery(event)}
                    >
                      View All Photos
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Photo {currentPhotoIndex + 1} of {selectedEvent.photos.length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeGallery}
                className="hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="relative flex items-center justify-center p-4">
              <img
                src={`/uploads/${selectedEvent.photos[currentPhotoIndex]}`}
                alt={`${selectedEvent.title} - Photo ${currentPhotoIndex + 1}`}
                className="max-w-full max-h-[60vh] object-contain rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Navigation Arrows */}
              {selectedEvent.photos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {selectedEvent.photos.length > 1 && (
              <div className="p-4 border-t">
                <div className="flex gap-2 overflow-x-auto">
                  {selectedEvent.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentPhotoIndex
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <img
                        src={`/uploads/${photo}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PastEvents;
