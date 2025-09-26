# CSI RSCOE Frontend

This is the frontend application for the CSI RSCOE Student Chapter website with integrated authentication and dashboard functionality.

## Features

### Authentication

- User login with email and password
- Role-based access control (Admin/User)
- Persistent authentication using localStorage
- Automatic redirection to appropriate dashboard

### Admin Dashboard

- **User Management**: Create, edit, delete users
- **Password Reset**: Reset user passwords
- **Announcements**: Create and manage site announcements
- **Settings**: Site configuration (placeholder for future features)

### User Dashboard

- **Profile Overview**: Display user information and stats
- **Recent Announcements**: View latest announcements
- **Quick Actions**: Access to various site features

### Public Features

- **Responsive Design**: Mobile-friendly interface
- **Announcements Display**: Real-time announcements from backend
- **Contact Form**: Send messages to administrators
- **Team Information**: Display faculty and student team details

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:8081](http://localhost:8081) in your browser

## Backend Integration

The frontend integrates with the Spring Boot backend API:

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `GET /api/admin/users` - Get all users (Admin only)
- `POST /api/admin/users` - Create new user (Admin only)
- `PUT /api/admin/users/{id}` - Update user (Admin only)
- `DELETE /api/admin/users/{id}` - Delete user (Admin only)
- `POST /api/admin/users/{id}/reset-password` - Reset user password (Admin only)

### Announcements Endpoints

- `GET /api/Admin/Announcements` - Get all announcements
- `POST /api/Admin/Announcements` - Create new announcement (Admin only)

## User Roles

### Admin

- Full access to all features
- Can manage users and announcements
- Access to admin dashboard

### User

- View announcements
- Access to user dashboard
- Limited functionality

## File Structure

```
src/
├── components/
│   ├── AdminDashboard.tsx      # Admin dashboard component
│   ├── UserDashboard.tsx       # User dashboard component
│   ├── LoginModal.tsx          # Login modal
│   ├── Navigation.tsx          # Navigation bar
│   ├── Announcements.tsx       # Announcements display
│   └── ui/                     # UI components
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── pages/
│   ├── Index.tsx               # Main landing page
│   ├── Dashboard.tsx           # Dashboard routing
│   └── NotFound.tsx            # 404 page
└── App.tsx                     # Main app component
```

## Usage

### For Users

1. Visit the website
2. Click "Login" in the navigation
3. Enter your credentials
4. Access your personalized dashboard

### For Administrators

1. Login with admin credentials
2. Access admin dashboard
3. Manage users and announcements
4. Monitor site activity

## Development

### Adding New Features

1. Create components in `src/components/`
2. Add routes in `src/App.tsx`
3. Update navigation if needed
4. Test with both user and admin roles

### Styling

- Uses Tailwind CSS for styling
- Custom gradient classes for visual appeal
- Responsive design patterns

### State Management

- React Context for authentication
- Local storage for persistence
- Component-level state for UI interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the CSI RSCOE Student Chapter.
