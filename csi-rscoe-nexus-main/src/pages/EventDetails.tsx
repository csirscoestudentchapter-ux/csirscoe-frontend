import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch('https://csi-backend-4.onrender.com/api/public/events');
      if (res.ok) {
        const list = await res.json();
        setEvent(list.find((e: any) => String(e.id) === id));
      }
    })();
  }, [id]);
  if (!event) return <div className="container mx-auto px-4 py-10">Loading...</div>;
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <button className="mb-4 text-primary underline" onClick={() => window.history.back()}>← Back</button>
      <img src={event.image || '/placeholder.svg'} alt={event.title} className="w-full h-80 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-muted-foreground mb-6">{event.date} • {event.location}</p>
      <p className="mb-6">{event.description}</p>
      {event.status !== 'upcoming' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Event Photos</h2>
          <p className="text-sm text-muted-foreground">Coming soon: gallery of past event photos.</p>
        </div>
      )}
      {event.status === 'upcoming' && (
        <a href="#register" className="inline-block mt-6 px-4 py-2 border border-primary text-primary rounded hover:gradient-primary hover:text-primary-foreground">Register Now</a>
      )}
    </div>
  );
};

export default EventDetails;


