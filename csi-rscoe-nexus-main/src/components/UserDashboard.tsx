import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Megaphone, 
  Calendar, 
  LogOut, 
  Bell, 
  Settings, 
  BookOpen, 
  Users, 
  Award,
  TrendingUp,
  Heart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface UserDashboardProps {
  user: any;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/Admin/Announcements");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CSI User Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user?.name}</p>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-6">
                  <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{user?.name}</h2>
                    <p className="text-blue-100 text-lg mb-3">{user?.email}</p>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {user?.role}
                      </Badge>
                      <div className="flex items-center space-x-1 text-blue-100">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">Premium Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Events</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Blogs Read</p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm">Achievements</p>
                    <p className="text-3xl font-bold">5</p>
                  </div>
                  <Award className="w-8 h-8 text-pink-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Network</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                  <span>Recent Announcements</span>
                  <Badge variant="outline" className="ml-auto">{announcements.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : announcements.length > 0 ? (
                  <div className="space-y-4">
                    {announcements.slice(0, 5).map((announcement, index) => (
                      <motion.div
                        key={announcement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <Bell className="w-4 h-4 mr-2 text-blue-500" />
                              {announcement.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {announcement.content}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>Important</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Read More
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Megaphone className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No announcements available</p>
                    <p className="text-sm">Check back later for updates!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions & Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-blue-50 hover:border-blue-200">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span>View Events</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-purple-50 hover:border-purple-200">
                    <BookOpen className="w-4 h-4 mr-3" />
                    <span>Read Blogs</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-green-50 hover:border-green-200">
                    <Users className="w-4 h-4 mr-3" />
                    <span>Join Community</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-pink-50 hover:border-pink-200">
                    <Heart className="w-4 h-4 mr-3" />
                    <span>Support CSI</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Events Attended</span>
                    <span className="font-semibold text-blue-600">8/12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Blogs Read</span>
                    <span className="font-semibold text-purple-600">8/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '53%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to get more involved?</h3>
                <p className="text-gray-600 mb-4">Join our upcoming events, contribute to blogs, and connect with fellow members!</p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Explore Events
                  </Button>
                  <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                    Write a Blog
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
