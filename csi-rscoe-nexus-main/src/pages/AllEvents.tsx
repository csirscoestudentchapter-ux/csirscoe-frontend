import React, { useEffect, useState } from 'react';

const AllEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:8080/api/public/events');
      if (res.ok) setEvents(await res.json());
    })();
  }, []);
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(e => (
          <a key={e.id} href={`/events/${e.id}`} className="p-4 border rounded-lg hover:shadow">
            <img src={e.image || '/placeholder.svg'} alt={e.title} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{e.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;


