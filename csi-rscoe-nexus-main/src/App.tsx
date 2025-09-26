import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import AllBlogs from "./pages/AllBlogs";
import AllEvents from "./pages/AllEvents";
import BlogDetails from "./pages/BlogDetails";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blogs" element={<AllBlogs />} />
              <Route path="/events" element={<AllEvents />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/register" element={<Registration />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
