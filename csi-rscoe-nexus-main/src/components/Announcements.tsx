import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/public/announcements");
        const data = await res.json();
        setAnnouncements(data.reverse()); // latest first
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchAnnouncements();
  }, []);

  // Auto switch announcements every 6 seconds
  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setVisibleIndex((prev) => (prev + 1) % announcements.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [announcements]);

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      <AnimatePresence>
        {announcements.length > 0 && (
          <motion.div
            key={announcements[visibleIndex].id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-sm p-4 rounded-2xl shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
          >
            {/* Close Button */}
            <button
              onClick={() => setAnnouncements((prev) => prev.filter((_, i) => i !== visibleIndex))}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold">{announcements[visibleIndex].title}</h3>
            <p className="text-sm mt-2">{announcements[visibleIndex].content}</p>

            <div className="mt-3 text-xs opacity-80">
              {new Date(announcements[visibleIndex].createdAt).toLocaleString()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Announcements;
