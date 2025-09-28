import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Megaphone, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  FileText, 
  BarChart3,
  UserPlus,
  Activity,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "./ImageUpload";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image?: string;
  fee?: number;
  flyoverDescription?: string;
  details?: string;
  rulebookUrl?: string;
  qrCodeUrl?: string;
  whatsappGroupUrl?: string;
  registrationDeadline?: string;
}
type EventWithCount = Event & { registrationCount?: number };

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  createdAt: string;
  image?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  email?: string;
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<EventWithCount[]>([]);
  const [eventFilter, setEventFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
interface Registration {
  id: number;
  name: string;
  email: string;
  eventId: number;
  eventTitle: string;
  registrationDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  phone?: string;
  college?: string;
  year?: string;
  branch?: string;
  customFields?: Record<string, string>;
}

const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [selectedEventForRegs, setSelectedEventForRegs] = useState<Event | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "MEMBER" });
  const [announcementForm, setAnnouncementForm] = useState({ title: "", content: "" });
  const [eventForm, setEventForm] = useState({ 
    title: "", 
    description: "", 
    date: "", 
    location: "", 
    status: "upcoming" as 'upcoming' | 'ongoing' | 'completed',
    image: "",
    fee: 0,
    flyoverDescription: "",
    details: "",
    rulebookUrl: "",
    qrCodeUrl: "",
    whatsappGroupUrl: "",
    registrationDeadline: ""
  });
  const [blogForm, setBlogForm] = useState({ 
    title: "", 
    content: "", 
    excerpt: "", 
    author: "", 
    category: "", 
    readTime: "", 
    image: "" 
  });
  const [teamForm, setTeamForm] = useState({ 
    name: "", 
    role: "", 
    image: "", 
    linkedin: "", 
    email: "" 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [customFields, setCustomFields] = useState<Array<{label: string, type: string, required: boolean, options?: string}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
    fetchAnnouncements();
    fetchEvents();
    fetchBlogs();
    fetchTeam();
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/Admin/Announcements");
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchEvents = useCallback(async () => {
    try {
      let url = "https://csi-backend-4.onrender.com/api/admin/events";
      if (eventFilter === 'upcoming') url = "https://csi-backend-4.onrender.com/api/admin/events/upcoming";
      if (eventFilter === 'completed') url = "https://csi-backend-4.onrender.com/api/admin/events/completed";
      const response = await fetch(url);
      if (response.ok) {
        const data: EventWithCount[] = await response.json();
        // Fetch registration counts in parallel
        const counts = await Promise.all(
          data.map(async (e) => {
            try {
              const r = await fetch(`https://csi-backend-4.onrender.com/api/admin/events/${e.id}/registrations/count`);
              if (r.ok) { const n = await r.text(); return parseInt(n || '0', 10) || 0; }
            } catch {}
            return 0;
          })
        );
        setEvents(data.map((e, i) => ({ ...e, registrationCount: counts[i] })));
      } else {
        // If endpoint doesn't exist, use mock data for now
        setEvents([
          {
            id: 1,
            title: "TechFest 2024",
            description: "Annual technical symposium featuring coding competitions, tech talks, and innovative project showcases",
            date: "2024-03-15",
            location: "RSCOE Campus",
            attendees: "500+",
            status: "upcoming"
          }
        ]);
      }
    } catch (error) {
      // Use mock data if API fails
      setEvents([
        {
          id: 1,
          title: "TechFest 2024",
          description: "Annual technical symposium featuring coding competitions, tech talks, and innovative project showcases",
          date: "2024-03-15",
          location: "RSCOE Campus",
          attendees: "500+",
          status: "upcoming"
        }
      ]);
    }
  }, [eventFilter]);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        // If endpoint doesn't exist, use mock data for now
        setBlogs([
          {
            id: 1,
            title: "Getting Started with Machine Learning",
            content: "A comprehensive guide to machine learning fundamentals...",
            excerpt: "Learn the basics of ML and how to get started with your first project",
            author: "Tech Team",
            category: "Machine Learning",
            readTime: "5 min read",
            createdAt: "2024-01-15"
        }
        ]);
      }
    } catch (error) {
      // Use mock data if API fails
      setBlogs([
        {
          id: 1,
          title: "Getting Started with Machine Learning",
          content: "A comprehensive guide to machine learning fundamentals...",
          excerpt: "Learn the basics of ML and how to get started with your first project",
          author: "Tech Team",
          category: "Machine Learning",
          readTime: "5 min read",
          createdAt: "2024-01-15"
        }
      ]);
    }
  }, []);

  const openRegistrations = async (ev: Event) => {
    setSelectedEventForRegs(ev);
    setShowRegistrationsModal(true);
    setRegistrationsLoading(true);
    try {
      const res = await fetch(`https://csi-backend-4.onrender.com/api/admin/events/${ev.id}/registrations`);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      } else {
        setRegistrations([]);
      }
    } catch (e) {
      setRegistrations([]);
    } finally {
      setRegistrationsLoading(false);
    }
  };

  const downloadRegistrationsCsv = (ev: Event) => {
    window.open(`https://csi-backend-4.onrender.com/api/admin/events/${ev.id}/registrations.csv`, '_blank');
  };

  const fetchTeam = useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/admin/team");
      if (response.ok) {
        const data = await response.json();
        setTeam(data);
      } else {
        setTeam([]);
      }
    } catch (error) {
      setTeam([]);
    }
  }, []);

  const handleUserSubmit = async () => {
    setIsLoading(true);
    try {
      const url = editingUser 
        ? `https://csi-backend-4.onrender.com/api/admin/users/${editingUser.id}`
        : "https://csi-backend-4.onrender.com/api/admin/users";
      
      const method = editingUser ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: editingUser ? "User updated successfully" : "User created successfully",
        });
        setShowUserModal(false);
        setEditingUser(null);
        setUserForm({ name: "", email: "", password: "", role: "user" });
        fetchUsers();
      } else {
        const error = await response.text();
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnnouncementSubmit = async () => {
    setIsLoading(true);
    try {
      const url = editingAnnouncement
        ? `https://csi-backend-4.onrender.com/api/Admin/Announcements/${editingAnnouncement.id}`
        : "https://csi-backend-4.onrender.com/api/Admin/Announcements";
      const method = editingAnnouncement ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(announcementForm),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: editingAnnouncement ? "Announcement updated successfully" : "Announcement created successfully",
        });
        setShowAnnouncementModal(false);
        setAnnouncementForm({ title: "", content: "" });
        setEditingAnnouncement(null);
        fetchAnnouncements();
      } else {
        const error = await response.text();
        toast({ title: "Error", description: error || "Failed to save announcement", variant: "destructive" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save announcement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAnnouncement = async (id: number) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(`https://csi-backend-4.onrender.com/api/Admin/Announcements/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Success', description: 'Announcement deleted' });
        fetchAnnouncements();
      } else {
        const t = await res.text();
        toast({ title: 'Error', description: t || 'Failed to delete', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const handleEventSubmit = async () => {
    setIsLoading(true);
    try {
      // No image upload for events
      
      const url = editingEvent 
        ? `https://csi-backend-4.onrender.com/api/admin/events/${editingEvent.id}`
        : `https://csi-backend-4.onrender.com/api/admin/events`;
      const method = editingEvent ? "PUT" : "POST";
      const eventPayload = {
        ...eventForm,
        image: undefined,
        registrationFieldsJson: JSON.stringify(customFields)
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(eventPayload)
      });
      if (response.ok) {
        toast({ title: "Success", description: editingEvent ? "Event updated successfully" : "Event created successfully" });
        fetchEvents();
      } else {
        const errText = await response.text();
        toast({ title: "Error", description: errText || "Failed to save event", variant: "destructive" });
      }
      setShowEventModal(false);
      setEditingEvent(null);
      setEventForm({ title: "", description: "", date: "", location: "", status: "upcoming", image: "", fee: 0, flyoverDescription: "", rulebookUrl: "", registrationDeadline: "" });
      setCustomFields([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlogSubmit = async () => {
    setIsLoading(true);
    try {
      let imageUrl = blogForm.image;
      
      // Upload image if a new one is selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const url = editingBlog 
        ? `https://csi-backend-4.onrender.com/api/admin/blogs/${editingBlog.id}`
        : `https://csi-backend-4.onrender.com/api/admin/blogs`;
      const method = editingBlog ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({...blogForm, image: imageUrl})
      });
      if (response.ok) {
        toast({ title: "Success", description: editingBlog ? "Blog updated successfully" : "Blog created successfully" });
        fetchBlogs();
      } else {
        const errText = await response.text();
        toast({ title: "Error", description: errText || "Failed to save blog", variant: "destructive" });
      }
      setShowBlogModal(false);
      setEditingBlog(null);
      setBlogForm({ title: "", content: "", excerpt: "", author: "", category: "", readTime: "", image: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('https://csi-backend-4.onrender.com/api/upload', { method: 'POST', body: form });
      if (res.ok) {
        const data = await res.json();
        return data.url as string;
      }
    } catch (err) { console.error('upload failed', err); }
    return null;
  };

  const deleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const response = await fetch(`https://csi-backend-4.onrender.com/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
        fetchUsers();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (userId: number) => {
    try {
      const response = await fetch(`https://csi-backend-4.onrender.com/api/admin/users/${userId}/reset-password`, {
        method: "POST",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to reset password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password",
        variant: "destructive",
      });
    }
  };

  const deleteEvent = async (eventId: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const res = await fetch(`https://csi-backend-4.onrender.com/api/admin/events/${eventId}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: "Success", description: "Event deleted successfully" });
      fetchEvents();
    } else {
      toast({ title: "Error", description: "Failed to delete event", variant: 'destructive' });
    }
  };

  const deleteBlog = async (blogId: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const res = await fetch(`https://csi-backend-4.onrender.com/api/admin/blogs/${blogId}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: "Success", description: "Blog deleted successfully" });
      fetchBlogs();
    } else {
      toast({ title: "Error", description: "Failed to delete blog", variant: 'destructive' });
    }
  };

  const handleTeamSubmit = async () => {
    setIsLoading(true);
    try {
      let imageUrl = teamForm.image;
      
      // Upload image if a new one is selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const url = editingTeam 
        ? `https://csi-backend-4.onrender.com/api/admin/team/${editingTeam.id}`
        : `https://csi-backend-4.onrender.com/api/admin/team`;
      const method = editingTeam ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...teamForm, image: imageUrl})
      });
      if (response.ok) {
        toast({ title: "Success", description: editingTeam ? "Member updated" : "Member created" });
        fetchTeam();
      } else {
        toast({ title: "Error", description: "Failed to save member", variant: 'destructive' });
      }
      setShowTeamModal(false);
      setEditingTeam(null);
      setTeamForm({ name: "", role: "", image: "", linkedin: "", email: "" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save member", variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTeam = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    const res = await fetch(`https://csi-backend-4.onrender.com/api/admin/team/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: "Success", description: "Member deleted" });
      fetchTeam();
    } else {
      toast({ title: "Error", description: "Failed to delete member", variant: 'destructive' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/60 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                CSI Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">Welcome, {user?.name}</span>
              <Button onClick={onLogout} variant="outline" size="sm" className="border-slate-600 text-slate-100">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-800/60 backdrop-blur rounded-xl p-2 shadow-sm mb-8 border border-slate-700">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "users", label: "Users", icon: Users },
            { id: "announcements", label: "Announcements", icon: Megaphone },
            { id: "events", label: "Events", icon: Calendar },
            { id: "blogs", label: "Blogs", icon: FileText },
            { id: "team", label: "Team", icon: UserPlus },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className="flex items-center space-x-2 transition-all duration-200 text-slate-100"
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Users</p>
                        <p className="text-3xl font-bold">{users.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Announcements</p>
                        <p className="text-3xl font-bold">{announcements.length}</p>
                      </div>
                      <Megaphone className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Upcoming Events</p>
                        <p className="text-3xl font-bold">{events.filter(e => e.status === 'upcoming').length}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100 text-sm">Blog Posts</p>
                        <p className="text-3xl font-bold">{blogs.length}</p>
                      </div>
                      <FileText className="w-8 h-8 text-pink-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span>Recent Users</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {users.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">{user.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span>Upcoming Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {events.filter(e => e.status === 'upcoming').slice(0, 3).map((event) => (
                        <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <Button onClick={() => setShowUserModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              <div className="grid gap-6">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingUser(user);
                              setUserForm({ name: user.name, email: user.email, password: "", role: user.role });
                              setShowUserModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resetPassword(user.id)}
                          >
                            Reset Password
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
                <Button onClick={() => setShowAnnouncementModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Announcement
                </Button>
              </div>
              
              <div className="grid gap-6">
                {announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                          <p className="text-gray-600 mb-2 whitespace-pre-wrap">{announcement.content}</p>
                          <p className="text-sm text-gray-500">
                            Created: {new Date(announcement.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingAnnouncement(announcement);
                            setAnnouncementForm({ title: announcement.title, content: announcement.content });
                            setShowAnnouncementModal(true);
                          }}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteAnnouncement(announcement.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
                <Button onClick={() => setShowEventModal(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Filter:</span>
                <Button variant={eventFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setEventFilter('all')}>All</Button>
                <Button variant={eventFilter === 'upcoming' ? 'default' : 'outline'} size="sm" onClick={() => setEventFilter('upcoming')}>Upcoming</Button>
                <Button variant={eventFilter === 'completed' ? 'default' : 'outline'} size="sm" onClick={() => setEventFilter('completed')}>Completed</Button>
              </div>
              
              <div className="grid gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <span className="ml-2 text-xs text-gray-500">Regs: {event.registrationCount ?? 0}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>📍</span>
                              <span>{event.location}</span>
                            </div>
                            {/* Removed attendees display */}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openRegistrations(event)}
                          >
                            View Registrations
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadRegistrationsCsv(event)}
                          >
                            Download CSV
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingEvent(event);
                              setEventForm({
                                title: event.title,
                                description: event.description,
                                date: event.date,
                                location: event.location,
                                status: event.status,
                                image: event.image || "",
                                fee: (event as any).fee || 0,
                                flyoverDescription: (event as any).flyoverDescription || "",
                                details: (event as any).details || "",
                                rulebookUrl: (event as any).rulebookUrl || "",
                                qrCodeUrl: (event as any).qrCodeUrl || "",
                                whatsappGroupUrl: (event as any).whatsappGroupUrl || "",
                                registrationDeadline: (event as any).registrationDeadline || ""
                              });
                              setShowEventModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteEvent(event.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Registrations Modal */}
              <Dialog open={showRegistrationsModal} onOpenChange={setShowRegistrationsModal}>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Registrations {selectedEventForRegs ? `for ${selectedEventForRegs.title}` : ''}</DialogTitle>
                  </DialogHeader>
                  {registrationsLoading ? (
                    <div className="p-4 text-sm text-gray-600">Loading...</div>
                  ) : (
                    <div className="mt-2">
                      <div className="mb-3 text-sm text-gray-700">Total: {registrations.length}</div>
                      <div className="max-h-96 overflow-y-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr>
                              <th className="py-2 px-2 border-b">#</th>
                              <th className="py-2 px-2 border-b">Name</th>
                              <th className="py-2 px-2 border-b">Email</th>
                              <th className="py-2 px-2 border-b">Phone</th>
                              <th className="py-2 px-2 border-b">Department</th>
                              <th className="py-2 px-2 border-b">Year</th>
                            </tr>
                          </thead>
                          <tbody>
                            {registrations.map((r, idx) => (
                              <tr key={r.id || idx}>
                                <td className="py-2 px-2 border-b">{idx + 1}</td>
                                <td className="py-2 px-2 border-b">{r.name || ''}</td>
                                <td className="py-2 px-2 border-b">{r.email || ''}</td>
                                <td className="py-2 px-2 border-b">{r.phone || ''}</td>
                                <td className="py-2 px-2 border-b">{r.department || ''}</td>
                                <td className="py-2 px-2 border-b">{r.year || ''}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}

          {activeTab === "blogs" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                <Button onClick={() => setShowBlogModal(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Blog
                </Button>
              </div>
              
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{blog.title}</h3>
                            <Badge variant="outline">{blog.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{blog.excerpt}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <span>✍️</span>
                              <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>📅</span>
                              <span>{blog.createdAt}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>⏱️</span>
                              <span>{blog.readTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingBlog(blog);
                              setBlogForm({
                                title: blog.title,
                                content: blog.content,
                                excerpt: blog.excerpt,
                                author: blog.author,
                                category: blog.category,
                                readTime: blog.readTime,
                                image: blog.image || ""
                              });
                              setShowBlogModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteBlog(blog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Site settings and configuration options will be available here.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>

      {/* User Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            />
                         <select
               value={userForm.role}
               onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
               className="w-full p-2 border rounded-md"
             >
               <option value="MEMBER">Member</option>
               <option value="ADMIN">Admin</option>
             </select>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUserModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUserSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : (editingUser ? "Update" : "Create")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Announcement Modal */}
      <Dialog open={showAnnouncementModal} onOpenChange={setShowAnnouncementModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={announcementForm.title}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              value={announcementForm.content}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAnnouncementModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAnnouncementSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Event Title"
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
            />
            <Textarea
              placeholder="Event Description"
              value={eventForm.description}
              onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Removed Expected Attendees input */}
              <Input
                type="number"
                placeholder="Event Fee"
                value={eventForm.fee}
                onChange={(e) => setEventForm({ ...eventForm, fee: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Flyover Description"
                value={eventForm.flyoverDescription}
                onChange={(e) => setEventForm({ ...eventForm, flyoverDescription: e.target.value })}
              />
              <Input
                placeholder="Rulebook URL"
                value={eventForm.rulebookUrl}
                onChange={(e) => setEventForm({ ...eventForm, rulebookUrl: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Payment QR URL"
                value={eventForm.qrCodeUrl}
                onChange={(e) => setEventForm({ ...eventForm, qrCodeUrl: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <label className="text-sm">or Upload</label>
                <input type="file" accept="image/*" onChange={async (e)=>{
                  const file = e.target.files?.[0];
                  if(!file) return;
                  const url = await uploadImage(file);
                  if (url) setEventForm(f=>({ ...f, qrCodeUrl: url }));
                }} />
              </div>
            </div>
            <Textarea
              placeholder="Detailed Event Information"
              value={eventForm.details}
              onChange={(e) => setEventForm({ ...eventForm, details: e.target.value })}
              rows={4}
            />
            <Input
              placeholder="WhatsApp Group URL (optional)"
              value={eventForm.whatsappGroupUrl}
              onChange={(e) => setEventForm({ ...eventForm, whatsappGroupUrl: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={eventForm.status}
                onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as 'upcoming' | 'ongoing' | 'completed' })}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
              <Input
                type="date"
                placeholder="Registration Deadline"
                value={eventForm.registrationDeadline}
                onChange={(e) => setEventForm({ ...eventForm, registrationDeadline: e.target.value })}
              />
            </div>
            
            {/* Event image upload removed */}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Registration Fields</label>
              {customFields.map((field, index) => (
                <div key={index} className="flex items-end gap-2 border p-2 rounded">
                  <div className="flex-grow space-y-1">
                    <label className="block text-sm">Field Label</label>
                    <Input
                      value={field.label}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].label = e.target.value;
                        setCustomFields(newFields);
                      }}
                      placeholder="e.g., College Name"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <label className="block text-sm">Field Type</label>
                    <select
                      value={field.type}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].type = e.target.value;
                        setCustomFields(newFields);
                      }}
                      className="w-full p-2 border rounded"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="number">Number</option>
                      <option value="textarea">Textarea</option>
                      <option value="select">Select</option>
                      <option value="display">Display (Read-only)</option>
                    </select>
                  </div>
                  {field.type === 'select' && (
                    <div className="flex-grow space-y-1">
                      <label className="block text-sm">Options (comma-separated)</label>
                      <Input
                        value={field.options || ''}
                        onChange={(e) => {
                          const newFields = [...customFields];
                          newFields[index].options = e.target.value;
                          setCustomFields(newFields);
                        }}
                        placeholder="Option1, Option2"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="block text-sm">Required</label>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].required = e.target.checked;
                        setCustomFields(newFields);
                      }}
                      className="w-auto h-auto"
                    />
                  </div>
                  <Button type="button" variant="destructive" size="sm" onClick={() => {
                    setCustomFields(customFields.filter((_, i) => i !== index));
                  }}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => {
                setCustomFields([...customFields, { label: '', type: 'text', required: false, options: '' }]);
              }}>
                Add Custom Field
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEventModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleEventSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : (editingEvent ? "Update" : "Create")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blog Modal */}
      <Dialog open={showBlogModal} onOpenChange={setShowBlogModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog" : "Add New Blog"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Blog Title"
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
            />
            <Textarea
              placeholder="Blog Content"
              value={blogForm.content}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              rows={5}
            />
            <Input
              placeholder="Excerpt"
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Author"
                value={blogForm.author}
                onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={blogForm.category}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              />
            </div>
            <Input
              placeholder="Read Time (e.g. 5 min)"
              value={blogForm.readTime}
              onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Blog Image</label>
              <ImageUpload 
                onImageChange={setImageFile} 
                previewUrl={blogForm.image}
                className="mb-4"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBlogModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleBlogSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : (editingBlog ? "Update" : "Create")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
