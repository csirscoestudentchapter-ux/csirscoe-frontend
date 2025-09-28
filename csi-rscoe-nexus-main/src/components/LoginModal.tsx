import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/config/api";
//import RegisterModal from "./RegisterModal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "Login Successful",
          description: data.message,
        });
        onLoginSuccess(data.userDetails);
        onClose();
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="gradient-card border-none max-w-md rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome Back 
            </DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 pt-4"
          >
            <p className="text-center text-muted-foreground">
               
            </p>

            {/* Google Login */}
            <Button
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
  <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={form.email}
    onChange={handleChange}
    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-card text-foreground focus:ring-2 focus:ring-primary"
  />
</div>

<div className="relative">
  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-card text-foreground focus:ring-2 focus:ring-primary"
  />
</div>


            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full gradient-primary text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            {/* Switch to Register
            <p className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  setIsRegisterOpen(true);
                }}
                className="text-primary font-semibold hover:underline"
              >
                Register here
              </button>
            </p> */}
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Register Modal
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} /> */}
    </>
  );
};

export default LoginModal;
