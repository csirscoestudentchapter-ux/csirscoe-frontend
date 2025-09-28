// API Configuration
// Update this URL when deploying to different environments

const API_BASE_URL = 'https://csi-backend-4.onrender.com';

export const API_ENDPOINTS = {
  // Public endpoints
  EVENTS: `${API_BASE_URL}/api/public/events`,
  BLOGS: `${API_BASE_URL}/api/public/blogs`,
  ANNOUNCEMENTS: `${API_BASE_URL}/api/public/announcements`,
  CONTACT: `${API_BASE_URL}/api/public/contactus`,
  REGISTER: `${API_BASE_URL}/api/public/register`,
  
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  
  // Admin endpoints
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_ANNOUNCEMENTS: `${API_BASE_URL}/api/Admin/Announcements`,
  ADMIN_EVENTS: `${API_BASE_URL}/api/admin/events`,
  ADMIN_BLOGS: `${API_BASE_URL}/api/admin/blogs`,
  ADMIN_TEAM: `${API_BASE_URL}/api/admin/team`,
  UPLOAD: `${API_BASE_URL}/api/upload`,
  
  // Helper functions
  getEventRegistrations: (eventId: number) => `${API_BASE_URL}/api/admin/events/${eventId}/registrations`,
  getEventRegistrationsCount: (eventId: number) => `${API_BASE_URL}/api/admin/events/${eventId}/registrations/count`,
  getEventRegistrationsCSV: (eventId: number) => `${API_BASE_URL}/api/admin/events/${eventId}/registrations.csv`,
  getEventRegistrationSchema: (eventId: number) => `${API_BASE_URL}/api/admin/events/${eventId}/registration-schema`,
  getEventTeamAvailable: (eventId: number, teamName: string) => `${API_BASE_URL}/api/public/events/${eventId}/team-available?teamName=${encodeURIComponent(teamName)}`,
  registerForEvent: (eventId: number) => `${API_BASE_URL}/api/public/events/${eventId}/register`,
  updateUser: (userId: number) => `${API_BASE_URL}/api/admin/users/${userId}`,
  resetUserPassword: (userId: number) => `${API_BASE_URL}/api/admin/users/${userId}/reset-password`,
  updateAnnouncement: (announcementId: number) => `${API_BASE_URL}/api/Admin/Announcements/${announcementId}`,
  deleteAnnouncement: (announcementId: number) => `${API_BASE_URL}/api/Admin/Announcements/${announcementId}`,
  updateEvent: (eventId: number) => `${API_BASE_URL}/api/admin/events/${eventId}`,
  deleteEvent: (eventId: number) => `${API_BASE_URL}/api/admin/events/${eventId}`,
  updateBlog: (blogId: number) => `${API_BASE_URL}/api/admin/blogs/${blogId}`,
  deleteBlog: (blogId: number) => `${API_BASE_URL}/api/admin/blogs/${blogId}`,
  updateTeam: (teamId: number) => `${API_BASE_URL}/api/admin/team/${teamId}`,
  deleteTeam: (teamId: number) => `${API_BASE_URL}/api/admin/team/${teamId}`,
};

export default API_BASE_URL;
