import { r as reactExports, t as twMerge, c as clsx, j as jsxRuntimeExports, V as Viewport, R as Root2, A as Action, C as Close, X, T as Title, D as Description, a as cva, P as Provider, b as j, $ as $e, d as Content2, e as Provider$1, S as Slot, m as motion, L as LogIn, M as Menu, f as AnimatePresence, u as useScroll, g as useTransform, h as ArrowDown, i as useInView, k as Code, U as Users, l as Trophy, n as Rocket, o as useEmblaCarousel, p as ArrowLeft, q as ArrowRight, s as Calendar, v as MapPin, w as Clock, x as User, y as Award, z as ChevronLeft, B as ChevronRight, E as Linkedin, F as Mail, Z as ZoomIn, G as createClient, H as Send, I as Phone, J as MessageSquare, O as Overlay, K as Content, N as Close$1, Q as Title$1, W as Description$1, Y as Portal, _ as Root, a0 as Lock, a1 as ExternalLink, a2 as Instagram, a3 as Github, a4 as useNavigate, a5 as useParams, a6 as React, a7 as Upload, a8 as LogOut, a9 as ChartColumn, aa as Megaphone, ab as FileText, ac as UserPlus, ad as Settings, ae as Activity, af as Plus, ag as SquarePen, ah as Trash2, ai as useLocation, aj as QueryClient, ak as QueryClientProvider, al as BrowserRouter, am as Routes, an as Route, ao as createRoot } from "./vendor-Coh1S776.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = reactExports.useState(memoryState);
  reactExports.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = Provider;
const ToastViewport = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = reactExports.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = Root2.displayName;
const ToastAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = Action.displayName;
const ToastClose = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = Close.displayName;
const ToastTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = Title.displayName;
const ToastDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = j();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $e,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = Provider$1;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = Content2.displayName;
const AuthContext = reactExports.createContext(void 0);
const useAuth = () => {
  const context = reactExports.useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Navigation = ({ onLoginClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = reactExports.useState(false);
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About CSI", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Team", href: "#team" },
    { name: "Blogs", href: "#blogs" },
    { name: "Connect With Us", href: "#contact" }
  ];
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.nav,
    {
      initial: { y: -100 },
      animate: { y: 0 },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16 lg:h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex items-center space-x-3",
              whileHover: { scale: 1.05 },
              transition: { type: "spring", stiffness: 400, damping: 10 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/uploads/csi.png",
                    alt: "CSI RSCOE Logo",
                    className: "h-10 w-10 lg:h-12 lg:w-12"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg lg:text-xl font-playfair font-semibold text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leading-tight", children: "CSI RSCOE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm lg:text-base text-muted-foreground", children: "Student Chapter" })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center space-x-8", children: [
            menuItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                onClick: () => scrollToSection(item.href),
                className: "text-foreground hover:text-primary transition-colors duration-200 font-medium relative group",
                whileHover: { y: -2 },
                transition: { type: "spring", stiffness: 400, damping: 10 },
                children: [
                  item.name,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" })
                ]
              },
              item.name
            )),
            user ? user.role === "ADMIN" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-600", children: [
                "Welcome, ",
                user.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => window.location.href = "/dashboard",
                  variant: "default",
                  size: "sm",
                  className: "gradient-primary",
                  children: "Dashboard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: onLogout,
                  variant: "outline",
                  size: "sm",
                  className: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
                  children: "Logout"
                }
              )
            ] }) : null : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: onLoginClick,
                variant: "outline",
                size: "sm",
                className: "border-primary text-primary hover:gradient-primary hover:text-primary-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-2" }),
                  "Login"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "lg:hidden p-2 text-foreground hover:text-primary transition-colors",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              children: isMobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "lg:hidden bg-background/95 backdrop-blur-lg border-b border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-4 space-y-4", children: [
              menuItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  onClick: () => scrollToSection(item.href),
                  className: "block w-full text-left py-2 text-foreground hover:text-primary transition-colors",
                  whileHover: { x: 10 },
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                  children: item.name
                },
                item.name
              )),
              user ? user.role === "ADMIN" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-sm text-gray-600", children: [
                  "Welcome, ",
                  user.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => window.location.href = "/dashboard",
                    variant: "default",
                    size: "sm",
                    className: "w-full gradient-primary",
                    children: "Dashboard"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: onLogout,
                    variant: "outline",
                    size: "sm",
                    className: "w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
                    children: "Logout"
                  }
                )
              ] }) : null : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: onLoginClick,
                  variant: "outline",
                  size: "sm",
                  className: "w-full border-primary text-primary hover:gradient-primary hover:text-primary-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-2" }),
                    "Login"
                  ]
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
};
const Hero = () => {
  const containerRef = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  reactExports.useEffect(() => {
    const handleMouseMove = (e) => {
      const floatingElements = document.querySelectorAll(".floating-element");
      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = e.clientX * speed / 100;
        const y2 = e.clientY * speed / 100;
        element.style.transform = `translate(${x}px, ${y2}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, id: "home", className: "relative min-h-screen overflow-hidden gradient-hero", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: `floating-element absolute rounded-full bg-primary/10 floating-animation`, style: {
        width: `${Math.random() * 200 + 50}px`,
        height: `${Math.random() * 200 + 50}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.5}s`
      }, animate: {
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }, transition: {
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut"
      } }, i)),
      Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "floating-element absolute rounded-full", style: {
        width: "100px",
        height: "100px",
        left: `${20 + i * 20}%`,
        top: `${30 + i * 15}%`,
        background: `radial-gradient(circle, hsl(195 100% 50% / 0.3), transparent)`,
        filter: "blur(1px)"
      }, animate: {
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.1, 1]
      }, transition: {
        duration: 6 + i,
        repeat: Infinity,
        ease: "easeInOut"
      } }, `orb-${i}`))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
      y,
      opacity
    }, className: "relative z-10 flex items-center justify-center min-h-screen px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8, y: -20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 1, delay: 0.1 },
          className: "flex justify-center mb-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative",
              animate: {
                y: [0, -10, 0]
              },
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/uploads/csi.png",
                    alt: "CSI Logo",
                    className: "w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg",
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/20 rounded-full blur-md -z-10" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 50
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 1,
        delay: 0.2
      }, className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight", children: [
          "Driven by students,",
          "  ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: [
            " ",
            "Powered by ideas."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8", children: "A vibrant space for curious minds, bold thinkers, and passionate doers. At CSI RSCOE, students lead the way and ideas light the path forward." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        duration: 1,
        delay: 1.2
      }, className: "absolute bottom-8 left-1/2 transform -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { onClick: scrollToAbout, className: "text-primary hover:text-primary-glow transition-colors", animate: {
        y: [0, 10, 0]
      }, transition: {
        duration: 2,
        repeat: Infinity
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 32 }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" })
  ] });
};
const About = () => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  const features = [{
    icon: Code,
    title: "Technical Excellence",
    description: "Fostering cutting-edge programming skills and software development expertise"
  }, {
    icon: Users,
    title: "Community Building",
    description: "Creating a network of passionate technologists and future industry leaders"
  }, {
    icon: Trophy,
    title: "Innovation Focus",
    description: "Encouraging research, development, and breakthrough technological solutions"
  }, {
    icon: Rocket,
    title: "Career Growth",
    description: "Providing professional development opportunities and industry connections"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "py-20 bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl floating-animation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl floating-animation", style: {
        animationDelay: "2s"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref, initial: {
        opacity: 0,
        y: 50
      }, animate: isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }, transition: {
        duration: 0.8
      }, className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
          "About ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "CSI RSCOE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed", children: "To empower students with technical excellence, leadership, and innovation by fostering a collaborative environment that nurtures creativity, professional development, and lifelong learning in the field of Computer Science and Information Technology" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16", children: features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 50
      }, animate: isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }, transition: {
        duration: 0.8,
        delay: index * 0.2
      }, className: "gradient-card p-6 rounded-xl card-hover group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "w-8 h-8 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-playfair font-semibold text-foreground mb-3", children: feature.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: feature.description })
      ] }) }, feature.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 50
      }, animate: isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }, transition: {
        duration: 0.8,
        delay: 0.6
      }, className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6", children: "Our Mission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-6", children: "To bridge the gap between academic knowledge and industry needs by conducting workshops, seminars, and hands-on sessions on emerging technologies. To cultivate problem-solving, leadership, and team-building skills through participation in technical competitions, hackathons, and collaborative projects. To promote research and innovation by encouraging students to explore real-world challenges and contribute to impactful technological solutions. To create an inclusive and vibrant technical community that nurtures talent, embraces diversity, and promotes ethical practices in computing. To establish collaborations with industry professionals and CSI National Body to provide students with exposure, mentorship, and career opportunities." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 bg-primary/10 text-primary rounded-full font-medium", children: "Innovation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 bg-primary/10 text-primary rounded-full font-medium", children: "Excellence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 bg-primary/10 text-primary rounded-full font-medium", children: "Collaboration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 bg-primary/10 text-primary rounded-full font-medium", children: "Growth" })
        ] })
      ] }) })
    ] })
  ] });
};
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = reactExports.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
    const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
    const onSelect = reactExports.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = reactExports.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = reactExports.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = reactExports.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    reactExports.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    reactExports.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = reactExports.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = reactExports.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = reactExports.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const API_BASE_URL = "https://csi-backend-4.onrender.com";
const API_ENDPOINTS = {
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
  getEventRegistrations: (eventId) => `${API_BASE_URL}/api/admin/events/${eventId}/registrations`,
  getEventRegistrationsCount: (eventId) => `${API_BASE_URL}/api/admin/events/${eventId}/registrations/count`,
  getEventRegistrationsCSV: (eventId) => `${API_BASE_URL}/api/admin/events/${eventId}/registrations.csv`,
  getEventRegistrationSchema: (eventId) => `${API_BASE_URL}/api/admin/events/${eventId}/registration-schema`,
  getEventTeamAvailable: (eventId, teamName) => `${API_BASE_URL}/api/public/events/${eventId}/team-available?teamName=${encodeURIComponent(teamName)}`,
  registerForEvent: (eventId) => `${API_BASE_URL}/api/public/events/${eventId}/register`,
  updateUser: (userId) => `${API_BASE_URL}/api/admin/users/${userId}`,
  resetUserPassword: (userId) => `${API_BASE_URL}/api/admin/users/${userId}/reset-password`,
  updateAnnouncement: (announcementId) => `${API_BASE_URL}/api/Admin/Announcements/${announcementId}`,
  deleteAnnouncement: (announcementId) => `${API_BASE_URL}/api/Admin/Announcements/${announcementId}`,
  updateEvent: (eventId) => `${API_BASE_URL}/api/admin/events/${eventId}`,
  deleteEvent: (eventId) => `${API_BASE_URL}/api/admin/events/${eventId}`,
  updateBlog: (blogId) => `${API_BASE_URL}/api/admin/blogs/${blogId}`,
  deleteBlog: (blogId) => `${API_BASE_URL}/api/admin/blogs/${blogId}`,
  updateTeam: (teamId) => `${API_BASE_URL}/api/admin/team/${teamId}`,
  deleteTeam: (teamId) => `${API_BASE_URL}/api/admin/team/${teamId}`
};
const Events = () => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [events, setEvents] = reactExports.useState([]);
  const [showDetails, setShowDetails] = reactExports.useState(null);
  const [step, setStep] = reactExports.useState(1);
  const [registerFor, setRegisterFor] = reactExports.useState(null);
  const [customFields, setCustomFields] = reactExports.useState([]);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    teamName: "",
    memberNames: "",
    teamSize: "1",
    whatsappLink: "",
    email: "",
    phone: "",
    department: "",
    college: "",
    year: "",
    rbtNo: "",
    transactionId: "",
    transactionDetails: "",
    message: ""
  });
  const [teamAvailable, setTeamAvailable] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.EVENTS);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to load events", err);
      }
    };
    load();
  }, []);
  reactExports.useEffect(() => {
    const loadSchema = async () => {
      if (!registerFor) return;
      try {
        const res = await fetch(API_ENDPOINTS.getEventRegistrationSchema(registerFor.id));
        if (res.ok) {
          const text = await res.text();
          const arr = text ? JSON.parse(text) : [];
          setCustomFields(Array.isArray(arr) ? arr : []);
        } else {
          setCustomFields([]);
        }
      } catch (err) {
        setCustomFields([]);
      }
    };
    loadSchema();
  }, [registerFor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "events", className: "py-20 bg-muted/30 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl floating-animation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl floating-animation", style: { animationDelay: "3s" } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            ref,
            initial: { opacity: 0, y: 50 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
            transition: { duration: 0.8 },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
                "Upcoming ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Events" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Join us for exciting events, workshops, and competitions that will enhance your technical skills and expand your professional network." })
            ]
          }
        ),
        events.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { opts: { align: "start" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: events.map((event, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "md:basis-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 50 },
              animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
              transition: { duration: 0.8, delay: index * 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gradient-card border-none card-hover group overflow-hidden h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${event.status === "upcoming" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: event.status === "upcoming" ? "Upcoming" : "Past Event" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors", children: event.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground", children: event.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2 text-primary" }),
                      event.date
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mr-2 text-primary" }),
                      event.location
                    ] }),
                    event.qrCodeUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.qrCodeUrl, alt: "QR", className: "w-12 h-12 object-contain rounded border", onError: (e) => {
                        e.currentTarget.style.display = "none";
                      } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Scan and tap Register Now to submit Transaction ID" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full border-primary text-primary hover:gradient-primary hover:text-primary-foreground group",
                      onClick: () => setRegisterFor(event),
                      children: [
                        event.status === "upcoming" ? "Register Now" : "Register",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", onClick: () => setShowDetails(event), children: "View Details" }) })
                ] })
              ] })
            }
          ) }, event.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, {})
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-xl text-muted-foreground font-medium py-12", children: "Stay tuned for exciting upcoming events!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
            transition: { duration: 0.8, delay: 0.8 },
            className: "text-center mt-12",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", className: "border-primary text-primary hover:gradient-primary hover:text-primary-foreground", onClick: () => window.location.href = "/events", children: [
              "View All Events",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
            ] })
          }
        )
      ] })
    ] }),
    registerFor && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background w-full max-w-2xl rounded-xl shadow-xl p-6 overflow-auto max-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold mb-4", children: [
        "Register for ",
        registerFor.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: step === 1 ? "font-semibold text-primary" : "text-muted-foreground", children: "Step 1: Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "›" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: step === 2 ? "font-semibold text-primary" : "text-muted-foreground", children: "Step 2: Payment" })
      ] }),
      (() => {
        const rb = ((registerFor == null ? void 0 : registerFor.rulebookUrl) || "").toLowerCase();
        const derived = (registerFor == null ? void 0 : registerFor.qrCodeUrl) || (registerFor == null ? void 0 : registerFor.image) || (rb.match(/\.(png|jpe?g)$/) ? registerFor == null ? void 0 : registerFor.rulebookUrl : "");
        if (registerFor) {
          registerFor.qrUrl = derived || "/uploads/QRcode.jpg";
        }
        return null;
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-muted-foreground", children: "Number of Team Members" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input",
              value: form.teamSize,
              onChange: (e) => setForm({ ...form, teamSize: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "Team Members: 1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "Team Members: 2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "Team Members: 3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "Team Members: 4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "Team Members: 5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-muted-foreground", children: "WhatsApp Group Link (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input",
              placeholder: "https://chat.whatsapp.com/...",
              value: form.whatsappLink,
              onChange: (e) => setForm({ ...form, whatsappLink: e.target.value })
            }
          )
        ] }),
        customFields.map((field, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: field.type === "textarea" ? "md:col-span-2" : "", children: field.type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input",
            value: form[field.label] || "",
            onChange: (e) => setForm({ ...form, [field.label]: e.target.value }),
            required: field.required,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: field.label }),
              (field.options || "").split(",").map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.trim(), children: opt.trim() }, opt))
            ]
          }
        ) : field.type === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input",
            placeholder: field.label,
            value: form[field.label] || "",
            onChange: (e) => setForm({ ...form, [field.label]: e.target.value }),
            required: field.required
          }
        ) : field.type === "display" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "p-2 border rounded w-full opacity-70 bg-background text-foreground placeholder:text-muted-foreground border-input",
            placeholder: field.label,
            value: form[field.label] || "",
            readOnly: true
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input",
            placeholder: field.label,
            value: form[field.label] || "",
            onChange: (e) => setForm({ ...form, [field.label]: e.target.value }),
            required: field.required
          }
        ) }, index))
      ] }),
      (() => {
        const size = Math.max(1, Math.min(5, parseInt(form.teamSize || "1", 10) || 1));
        const inputs = [];
        for (let i = 1; i <= size; i++) {
          const key = `member_${i}`;
          inputs.push(
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm text-muted-foreground block mb-1", children: [
                "Member ",
                i,
                " Name"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input",
                  placeholder: `Enter member ${i} full name`,
                  value: form[key] || "",
                  onChange: (e) => setForm({ ...form, [key]: e.target.value })
                }
              )
            ] }, key)
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: inputs });
      })(),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 p-4 border rounded bg-white flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm mb-3 text-center", children: "Scan to pay" }),
        (registerFor == null ? void 0 : registerFor.qrUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: registerFor.qrUrl, alt: "Payment QR", className: "w-72 h-72 md:w-80 md:h-80 object-contain", onError: (e) => {
            e.currentTarget.style.display = "none";
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: registerFor.qrUrl, target: "_blank", className: "text-primary underline", children: "Open QR in new tab" }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground text-center", children: "QR not available for this event." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm text-center", children: (() => {
          const findVal = (keys) => {
            var _a;
            for (const k of keys) {
              const key = (_a = customFields.find((f) => f.label.toLowerCase() === k.toLowerCase())) == null ? void 0 : _a.label;
              if (key && form[key]) return form[key];
            }
            return "";
          };
          const upiId = findVal(["UPI ID", "UPI", "UPI Id"]);
          const upiNumber = findVal(["UPI Number", "UPI Phone", "Payment Number", "Phone"]);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            upiId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "UPI ID: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: upiId })
            ] }),
            upiNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "UPI Number: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: upiNumber })
            ] }),
            !upiId && !upiNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Pay using the QR above, then enter Transaction ID below." })
          ] });
        })() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Your Name", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Team Name", value: form.teamName, onChange: (e) => {
          setForm({ ...form, teamName: e.target.value });
          setTeamAvailable(null);
        }, onBlur: async () => {
          if (!registerFor || !form.teamName.trim()) return;
          try {
            const res = await fetch(API_ENDPOINTS.getEventTeamAvailable(registerFor.id, form.teamName));
            if (res.ok) {
              const txt = await res.text();
              setTeamAvailable(txt === "true");
            }
          } catch {
          }
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded md:col-span-2 bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Member Names (comma-separated)", value: form.memberNames, onChange: (e) => setForm({ ...form, memberNames: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Email", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Mobile Number", value: form.phone, onChange: (e) => setForm({ ...form, phone: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Department", value: form.department, onChange: (e) => setForm({ ...form, department: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "College", value: form.college, onChange: (e) => setForm({ ...form, college: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Year", value: form.year, onChange: (e) => setForm({ ...form, year: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "RBT No", value: form.rbtNo, onChange: (e) => setForm({ ...form, rbtNo: e.target.value }) }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Transaction ID", value: form.transactionId, onChange: (e) => setForm({ ...form, transactionId: e.target.value }) }),
          (registerFor == null ? void 0 : registerFor.qrUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "After paying via QR, enter the transaction ID here." })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "p-2 border rounded md:col-span-1 bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Transaction Details", value: form.transactionDetails, onChange: (e) => setForm({ ...form, transactionDetails: e.target.value }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "p-2 border rounded md:col-span-2 bg-background text-foreground placeholder:text-muted-foreground border-input", placeholder: "Message (optional)", value: form.message, onChange: (e) => setForm({ ...form, message: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setRegisterFor(null);
          setStep(1);
        }, children: "Cancel" }),
        step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          if (!form.name.trim()) {
            alert("Please enter your name");
            return;
          }
          if (!form.email.trim()) {
            alert("Please enter email");
            return;
          }
          if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(form.email)) {
            alert("Invalid email");
            return;
          }
          if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s+/g, ""))) {
            alert("Enter 10-digit mobile number");
            return;
          }
          for (const f of customFields) {
            if (f.required && !form[f.label]) {
              alert(`Please fill ${f.label}`);
              return;
            }
          }
          setStep(2);
        }, children: "Next" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary text-primary-foreground", disabled: isSubmitting, onClick: async () => {
          setIsSubmitting(true);
          try {
            const emailOk = !form.email || /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(form.email);
            const phoneOk = !form.phone || /^[0-9]{10}$/.test(form.phone.replace(/\s+/g, ""));
            if (!emailOk) {
              alert("Invalid email");
              return;
            }
            if (!phoneOk) {
              alert("Invalid mobile number");
              return;
            }
            if (teamAvailable === false) {
              alert("Team name already taken for this event");
              return;
            }
            if ((registerFor == null ? void 0 : registerFor.qrCodeUrl) && !form.transactionId.trim()) {
              alert("Please enter Transaction ID after payment");
              return;
            }
            for (const f of customFields) {
              if (f.required && !form[f.label]) {
                alert(`Please fill ${f.label}`);
                return;
              }
            }
            const fd = new FormData();
            const customData = {};
            customFields.forEach((f) => {
              customData[f.label] = form[f.label] || "";
            });
            const teamSize = Math.max(1, Math.min(5, parseInt(form.teamSize || "1", 10) || 1));
            const members = [];
            for (let i = 1; i <= teamSize; i++) {
              const v = form[`member_${i}`];
              if (typeof v === "string" && v.trim()) members.push(v.trim());
            }
            const payload = { ...form, teamSize, memberNames: members.join(", "), whatsappGroupUrl: form.whatsappLink, customFieldsJson: JSON.stringify(customData) };
            fd.append("payload", new Blob([JSON.stringify(payload)], { type: "application/json" }));
            const res = await fetch(API_ENDPOINTS.registerForEvent(registerFor.id), { method: "POST", body: fd });
            if (res.ok) {
              const wa = form.whatsappLink || (registerFor == null ? void 0 : registerFor.whatsappGroupUrl);
              if (wa) {
                if (confirm("Registration successful! Do you want to join the WhatsApp group now?")) {
                  window.open(wa, "_blank");
                }
              } else {
                alert("Registration successful");
              }
              setRegisterFor(null);
              setStep(1);
            } else if (res.status === 409) {
              alert("Duplicate found: team/email/phone/transaction already registered");
            } else {
              const t = await res.text();
              alert(t || "Failed to register");
            }
          } finally {
            setIsSubmitting(false);
          }
        }, children: "Submit Registration" })
      ] })
    ] }) }),
    showDetails && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4", onClick: () => setShowDetails(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background w-full max-w-xl rounded-xl shadow-xl p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: showDetails.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground mb-4", children: showDetails.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm mb-2", children: [
        "Date: ",
        showDetails.date
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm mb-4", children: [
        "Location: ",
        showDetails.location
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
        (showDetails == null ? void 0 : showDetails.rulebookUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: showDetails.rulebookUrl, target: "_blank", className: "text-primary underline", children: "View Rulebook" }),
        showDetails.qrCodeUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: showDetails.qrCodeUrl, target: "_blank", className: "text-primary underline", children: "View Payment QR" })
      ] }),
      showDetails.qrCodeUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm mb-2", children: "Payment QR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: showDetails.qrCodeUrl, className: "w-48 h-48 object-contain border rounded", onError: (e) => {
          e.currentTarget.style.display = "none";
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowDetails(null), children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          setRegisterFor(showDetails);
          setShowDetails(null);
        }, children: "Register Now" })
      ] })
    ] }) })
  ] });
};
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const pastEventsData = [
  {
    id: 1,
    title: "OS And CN Workshop",
    description: "",
    date: "March 15, 2025",
    location: "Computer Department, RSCOE",
    participants: ["50+ Students from CS First Year"],
    photos: ["E1.1.jpg", "E1.2.jpg", "E1.3.jpg", "E1.4.jpg", "E1.5.jpg", "E1.6.jpg"],
    eventType: "Workshop",
    highlights: [
      "Computer Networks and Operating Systems"
    ],
    organizer: "CSI RSCOE Student Chapter",
    duration: "2 hours"
  },
  {
    id: 2,
    title: "Git and GitHub Session",
    description: "",
    date: "August 18, 2025",
    location: "Gmeet",
    participants: ["CSI Members"],
    photos: ["E2.1.png", "E2.2.png", "E2.3.png", "E2.4.png", "E2.5.png"],
    eventType: "Hands-on",
    highlights: [
      "Version Control Fundamentals"
    ],
    organizer: "CSI RSCOE Student Chapter",
    duration: "2 hours"
  },
  {
    id: 3,
    title: "First Year Induction Program",
    description: "",
    date: "September 10, 2025",
    location: "Main Auditorium, RSCOE",
    participants: ["First Year Students", "CSI Team"],
    photos: ["E3.1.jpg", "E3.2.jpg", "E3.3.jpg", "E3.4.jpg", "E3.5.jpg"],
    eventType: "Induction",
    highlights: [
      "Welcome New Students",
      "CSI Introduction",
      "Campus Orientation"
    ],
    organizer: "CSI RSCOE Student Chapter",
    duration: "1 hours"
  }
];
const PastEvents = () => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedEvent, setSelectedEvent] = reactExports.useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = reactExports.useState(0);
  const pastEvents = pastEventsData;
  const openGallery = (event, photoIndex = 0) => {
    setSelectedEvent(event);
    setCurrentPhotoIndex(photoIndex);
  };
  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentPhotoIndex(0);
  };
  const nextPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex(
        (prev) => prev === selectedEvent.photos.length - 1 ? 0 : prev + 1
      );
    }
  };
  const prevPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex(
        (prev) => prev === 0 ? selectedEvent.photos.length - 1 : prev - 1
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "past-events", className: "py-20 bg-background relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl floating-animation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl floating-animation", style: { animationDelay: "2s" } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            ref,
            initial: { opacity: 0, y: 50 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
            transition: { duration: 0.8 },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
                "Past ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Events" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6 overflow-x-auto pb-4 scrollbar-hide", children: pastEvents.map((event, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
            transition: { duration: 0.8, delay: index * 0.2 },
            className: "flex-shrink-0 w-80",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gradient-card border-none card-hover group overflow-hidden h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: event.eventType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      event.photos.length,
                      " Photos"
                    ] }),
                    event.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.duration })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors", children: event.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground", children: event.description }),
                event.organizer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Organized by ",
                    event.organizer
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2 text-primary" }),
                    event.date
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mr-2 text-primary" }),
                    event.location
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2 text-primary" }),
                    event.participants.join(", ")
                  ] }),
                  event.prize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 mr-2 text-primary" }),
                    event.prize
                  ] })
                ] }),
                event.highlights && event.highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-2", children: "Event Highlights" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: event.highlights.map((highlight, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: highlight }, idx)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full border-primary text-primary hover:gradient-primary hover:text-primary-foreground",
                    onClick: () => openGallery(event),
                    children: "View All Photos"
                  }
                )
              ] })
            ] })
          },
          event.id
        )) })
      ] })
    ] }),
    selectedEvent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-6xl max-h-[90vh] bg-background rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: selectedEvent.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Photo ",
            currentPhotoIndex + 1,
            " of ",
            selectedEvent.photos.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: closeGallery,
            className: "hover:bg-muted",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: `/uploads/${selectedEvent.photos[currentPhotoIndex]}`,
            alt: `${selectedEvent.title} - Photo ${currentPhotoIndex + 1}`,
            className: "max-w-full max-h-[60vh] object-contain rounded-lg",
            onError: (e) => {
              e.currentTarget.style.display = "none";
            }
          }
        ),
        selectedEvent.photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: prevPhoto,
              className: "absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-6 h-6" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: nextPhoto,
              className: "absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-6 h-6" })
            }
          )
        ] })
      ] }),
      selectedEvent.photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto", children: selectedEvent.photos.map((photo, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setCurrentPhotoIndex(index),
          className: `flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${index === currentPhotoIndex ? "border-primary" : "border-transparent hover:border-muted-foreground"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `/uploads/${photo}`,
              alt: `Thumbnail ${index + 1}`,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          )
        },
        index
      )) }) })
    ] }) })
  ] });
};
const Team = () => {
  const ref = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });
  const teamMembers = [{
    id: 1,
    name: "Kshitij Thorat",
    role: "President",
    image: "/uploads/kshitij.jpg",
    linkedin: "https://www.linkedin.com/in/kshitij-thorat-15july2005",
    email: "kshiitjthorat15@gmail.com"
  }, {
    id: 2,
    name: "Manasi Chaudhari",
    role: "Vice President",
    image: "/uploads/mansi.jpg",
    linkedin: "https://www.linkedin.com/in/mansiy-c-62a6b2259",
    email: "manasic864@gmail.com"
  }, {
    id: 3,
    name: "Shivtej Rakhunde",
    role: "Tresurer",
    image: "/uploads/shivtej.jpg",
    linkedin: "https://www.linkedin.com/in/17shivtejrakhunde",
    email: "shivtejrakhunde@gmail.com"
  }, {
    id: 4,
    name: "Shweta Tate",
    role: "Secretary",
    image: "/uploads/shweta.jpg",
    linkedin: "https://www.linkedin.com/in/shweta-tate-a54712256",
    email: "shwetatate30@gmail.com"
  }, {
    id: 5,
    name: "Mayur Bhavsar",
    role: "Technical Lead",
    image: "/uploads/mayur.png",
    linkedin: "https://www.linkedin.com/in/mayur-bhavsar-20699a250",
    email: "bhavsarmayur664@gmail.com"
  }, {
    id: 6,
    name: "Amey Mogre",
    role: "Event Management Lead",
    image: "/uploads/mogre.jpg",
    linkedin: "https://www.linkedin.com/in/amey-mogre-517a49291",
    email: "ameymogrepune@gmail.com"
  }, {
    id: 7,
    name: "Disha Kulkarni",
    role: "Design Lead",
    image: "/uploads/disha.jpg",
    linkedin: "https://www.linkedin.com/in/disha-kulkarni-profile",
    email: "dishakulkarni1912@gmail.com"
  }, {
    id: 8,
    name: "Manasvi Ghotkar",
    role: "Documentation Lead",
    image: "/uploads/manasvi.jpg",
    linkedin: "https://www.linkedin.com/in/manasvi-ghotkar-a39822257",
    email: "manasvighotkar99@gmail.com"
  }, {
    id: 9,
    name: "Prajakta Nalawade",
    role: "Social Media Lead",
    image: "/uploads/prajakta.jpg",
    linkedin: "https://www.linkedin.com/in/prajakta-nalawade",
    email: "nalawadeprajakta00@gmail.com"
  }];
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "team", className: "py-20 bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-animation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl floating-animation", style: {
        animationDelay: "4s"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref, initial: {
        opacity: 0,
        y: 50
      }, animate: isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }, transition: {
        duration: 0.8
      }, className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
          "Meet Our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Team" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Dedicated leaders and innovators working together to build a thriving tech community" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => scroll("left"), className: "border-primary text-primary hover:gradient-primary hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => scroll("right"), className: "border-primary text-primary hover:gradient-primary hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "horizontal-scroll flex gap-6 overflow-x-auto pb-4", style: {
        scrollSnapType: "x mandatory"
      }, children: teamMembers.map((member, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: 50
      }, animate: isInView ? {
        opacity: 1,
        x: 0
      } : {
        opacity: 0,
        x: 50
      }, transition: {
        duration: 0.6,
        delay: index * 0.1
      }, className: "flex-shrink-0 w-80 scroll-snap-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gradient-card border-none card-hover group h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4 mx-auto w-24 h-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: member.image.startsWith("http") ? member.image : member.image.startsWith("/") ? member.image : `/${member.image}`,
              alt: member.name,
              className: "w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300",
              onError: (e) => {
                e.currentTarget.src = "/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-playfair font-semibold text-foreground mb-2 group-hover:text-primary transition-colors", children: member.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium mb-4", children: member.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.a, { href: member.linkedin, target: "_blank", rel: "noopener noreferrer", className: "p-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full transition-all duration-300", whileHover: {
            scale: 1.1
          }, whileTap: {
            scale: 0.95
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.a, { href: `mailto:${member.email}`, className: "p-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary rounded-full transition-all duration-300", whileHover: {
            scale: 1.1
          }, whileTap: {
            scale: 0.95
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }) })
        ] })
      ] }) }) }) }, member.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.8, delay: 1 },
          className: "text-center mt-12",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "gradient-primary text-lg px-8 py-4 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform",
              onClick: () => {
                const joinSection = document.querySelector("#join");
                if (joinSection) {
                  joinSection.scrollIntoView({ behavior: "smooth" });
                }
              },
              children: "Join Our Chapter"
            }
          )
        }
      )
    ] })
  ] });
};
const Blogs = () => {
  const ref = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [blogs, setBlogs] = reactExports.useState([]);
  const [fullScaleImage, setFullScaleImage] = reactExports.useState(null);
  const staticBlogs = [
    {
      id: 1,
      title: "OpenAI Introduces ChatGPT Go at Just $4.6 in India  ",
      excerpt: "",
      author: "Kshitij Thorat",
      createdAt: "2025-09-08",
      //readTime: "5 min read",
      image: "/uploads/B1.jpg",
      category: "ChatGPT"
    },
    {
      id: 2,
      title: "SpaceX Hits Century of Falcon 9 Launches in 2025",
      excerpt: "",
      author: "Ayush",
      createdAt: "2025-08-16",
      // readTime: "8 min read",
      image: "/uploads/B2.jpg",
      category: "SpaceX"
    },
    {
      id: 3,
      title: "Made in India Chips: Driving AI, Robotics, and IoT Future",
      excerpt: "",
      author: "Lazina",
      createdAt: "2025-08-31",
      //readTime: "6 min read",
      image: "/uploads/B3.jpg",
      category: "Electronics"
    },
    {
      id: 4,
      title: "UPI Breaks All Records in October 2025",
      excerpt: "",
      author: "Hitesh",
      createdAt: "2025-10-05",
      //readTime: "7 min read",
      image: "/uploads/B4.jpg",
      category: "UPI"
    },
    {
      id: 5,
      title: "SuperComputers: India's Edge in AI",
      excerpt: "",
      author: "Mansi Chaudhari",
      createdAt: "2022-10-12",
      //readTime: "9 min read",
      image: "/uploads/B5.jpg",
      category: "SuperComputers"
    }
  ];
  reactExports.useEffect(() => {
    console.log("Loading static blogs:", staticBlogs);
    setBlogs(staticBlogs);
    const load = async () => {
      try {
        const res = await fetch("https://csi-backend-4.onrender.com/api/public/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            console.log("Loaded blogs from API:", data);
            setBlogs(data);
          }
        }
      } catch (err) {
        console.error("Failed to load blogs from API, using static blogs", err);
      }
    };
    load();
  }, []);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "blogs", className: "py-20 bg-muted/30 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl floating-animation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-animation", style: { animationDelay: "2s" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          ref,
          initial: { opacity: 0, y: 50 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
          transition: { duration: 0.8 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
              "Latest ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Tech News" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Stay updated with the latest trends, tutorials, and insights from our tech community" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => scroll("left"), className: "border-primary text-primary hover:gradient-primary hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => scroll("right"), className: "border-primary text-primary hover:gradient-primary hover:text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) })
      ] }),
      blogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "horizontal-scroll flex gap-6 overflow-x-auto pb-4", style: { scrollSnapType: "x mandatory" }, children: blogs.map((post, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 50 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 },
          transition: { duration: 0.6, delay: index * 0.1 },
          className: "flex-shrink-0 w-80 scroll-snap-start",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gradient-card border-none card-hover group overflow-hidden h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden cursor-pointer", onClick: () => setFullScaleImage(post.image || "/placeholder.svg"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: post.image || "/placeholder.svg",
                  alt: post.title,
                  className: "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110",
                  onError: (e) => {
                    console.log("Image failed to load:", post.image);
                    e.target.src = "/placeholder.svg";
                  },
                  onLoad: () => console.log("Image loaded successfully:", post.image)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold", children: post.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "w-4 h-4 text-white" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-medium", children: "Click to view full scale" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg font-playfair font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground line-clamp-3", children: post.excerpt })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.author })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.readTime })
              ] }) })
            ] })
          ] })
        },
        post.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-xl text-muted-foreground font-medium py-12", children: "Tech news is brewing! Check back soon for fresh updates." })
    ] }),
    fullScaleImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-hidden",
        onClick: () => setFullScaleImage(null),
        style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl max-h-full overflow-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: fullScaleImage,
              alt: "Full scale blog image",
              className: "max-w-full max-h-full object-contain rounded-lg shadow-2xl",
              onClick: (e) => e.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10",
              onClick: (e) => {
                e.stopPropagation();
                setFullScaleImage(null);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
            }
          )
        ] })
      }
    )
  ] });
};
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const supabaseUrl = "https://qzmnsrankbpqnuaxoyhp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bW5zcmFua2JwcW51YXhveWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODEyNDMsImV4cCI6MjA3NDY1NzI0M30.ZSHZPfiQNvXy-fAmcpePq_oYATpaIy4bQeJMKvG6u38";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
});
async function sendContactEmail(params) {
  const { data, error } = await supabase.functions.invoke("contact-email", {
    body: params
  });
  if (error) throw error;
  return data;
}
const Contact = () => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });
  const {
    toast: toast2
  } = useToast();
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast2({ title: "Validation error", description: "Please fill all fields.", variant: "destructive" });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast2({ title: "Invalid email", description: "Enter a valid email address.", variant: "destructive" });
        return;
      }
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        msg: formData.message
      });
      toast2({
        title: "Message Sent!",
        description: "Message delivered successfully"
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send message";
      toast2({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactInfo = [{
    icon: Mail,
    title: "Email Us",
    description: "csirscoestudentchapter@gmail.com",
    action: "mailto:csirscoestudentchapter@gmail.com"
  }, {
    icon: Phone,
    title: "Call Us",
    description: "+91 8530636252",
    action: "tel:+918530636252"
  }, {
    icon: MapPin,
    title: "Visit Us",
    description: "RSCOE Campus, Pune",
    action: "https://www.google.com/maps/place/JSPM+Rajarshi+Shahu+College+Of+Engineering+,+Tathawade/@18.6200922,73.7446225,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bbbc138acb7b:0x67043867a211a31d!8m2!3d18.6200922!4d73.7471974!16s%2Fg%2F11fly22nwc?entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D"
  }, {
    icon: MessageSquare,
    title: "Connect",
    description: "Follow us on social media",
    action: "https://www.linkedin.com/company/csi-rscoe-student-chapter/"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "py-20 bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-animation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl floating-animation", style: {
        animationDelay: "3s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/3 w-4 h-4 bg-primary/30 rotate-45 floating-animation", style: {
        animationDelay: "1s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/3 right-1/4 w-6 h-6 bg-secondary/30 rounded-full floating-animation", style: {
        animationDelay: "2s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-1/3 w-3 h-3 bg-primary/40 floating-animation", style: {
        animationDelay: "4s"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref, initial: {
        opacity: 0,
        y: 50
      }, animate: isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }, transition: {
        duration: 0.8
      }, className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
          "Connect ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "With Us" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Have questions or want to get involved? We'd love to hear from you. Reach out and let's build the future of technology together." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          x: -50
        }, animate: isInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: -50
        }, transition: {
          duration: 0.8,
          delay: 0.2
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gradient-card border-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-playfair font-semibold text-foreground", children: "Send us a Message" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", name: "name", placeholder: "Your Name", value: formData.name, onChange: handleChange, required: true, className: "bg-background/50 border-border focus:border-primary transition-colors" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", name: "email", placeholder: "Your Email", value: formData.email, onChange: handleChange, required: true, className: "bg-background/50 border-border focus:border-primary transition-colors" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { name: "message", placeholder: "Your Message", value: formData.message, onChange: handleChange, required: true, rows: 6, className: "bg-background/50 border-border focus:border-primary transition-colors resize-none" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: isSubmitting, className: "w-full gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300", children: [
              isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
                rotate: 360
              }, transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }, className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
              isSubmitting ? "Sending..." : "Send Message"
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: 50
        }, animate: isInView ? {
          opacity: 1,
          x: 0
        } : {
          opacity: 0,
          x: 50
        }, transition: {
          duration: 0.8,
          delay: 0.4
        }, className: "space-y-6", children: [
          contactInfo.map((info, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.a, { href: info.action, target: info.action.startsWith("http") ? "_blank" : "_self", rel: info.action.startsWith("http") ? "noopener noreferrer" : "", initial: {
            opacity: 0,
            y: 30
          }, animate: isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }, transition: {
            duration: 0.6,
            delay: 0.4 + index * 0.1
          }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gradient-card border-none card-hover group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(info.icon, { className: "w-6 h-6 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground group-hover:text-primary transition-colors", children: info.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: info.description })
            ] })
          ] }) }) }) }, info.title)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 30
          }, animate: isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }, transition: {
            duration: 0.8,
            delay: 0.8
          }, className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gradient-card border-none" }) })
        ] })
      ] })
    ] })
  ] });
};
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close$1, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title$1,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = Title$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description$1.displayName;
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [form, setForm] = reactExports.useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useState(false);
  const { toast: toast2 } = useToast();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast2({
          title: "Login Successful",
          description: data.message
        });
        onLoginSuccess(data.userDetails);
        onClose();
      } else {
        toast2({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast2({
        title: "Error",
        description: "Could not connect to server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "gradient-card border-none max-w-md rounded-2xl shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent", children: "Welcome Back" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "space-y-6 pt-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              disabled: isLoading,
              className: "w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5 mr-3", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
                ] }),
                "Continue with Google"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-background px-2 text-muted-foreground", children: "or continue with" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-3 text-gray-400 w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                name: "email",
                placeholder: "Email",
                value: form.email,
                onChange: handleChange,
                className: "w-full pl-10 pr-4 py-2 rounded-lg border bg-card text-foreground focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-3 text-gray-400 w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                name: "password",
                placeholder: "Password",
                value: form.password,
                onChange: handleChange,
                className: "w-full pl-10 pr-4 py-2 rounded-lg border bg-card text-foreground focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleLogin,
              disabled: isLoading,
              className: "w-full gradient-primary text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-2" }),
                isLoading ? "Logging in..." : "Login"
              ]
            }
          )
        ]
      }
    )
  ] }) }) });
};
const Footer = () => {
  const socialLinks = [
    //{ icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    //{ icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: "https://www.linkedin.com/company/csi-rscoe-student-chapter/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/csirscoe?igsh=OGxyd3pwZHQ3MHoy", label: "Instagram" },
    { icon: Github, href: "https://github.com", label: "GitHub" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative bg-gradient-to-br from-background via-background to-muted/20 border-t border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/uploads/csi.png",
                    alt: "CSI Logo",
                    className: "w-full h-full object-contain"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-playfair font-semibold text-lg text-foreground", children: "CSI RSCOE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Student Chapter" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Driven by students, powered by ideas." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-playfair font-semibold text-lg text-foreground", children: "Quick Links" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: ["About CSI", "Events", "Team", "Blogs", "Projects"].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `#${link.toLowerCase().replace(" ", "")}`,
                  className: "text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: link }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" })
                  ]
                }
              ) }, link)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.2 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-playfair font-semibold text-lg text-foreground", children: "Connect With Us" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "CSI RSCOE TATHAWADE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-3", children: socialLinks.map(({ icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.a,
                {
                  href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 bg-muted hover:bg-primary/10 border border-border rounded-xl flex items-center justify-center group transition-all duration-300",
                  whileHover: { y: -2, scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" })
                },
                label
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.5, delay: 0.3 },
          className: "pt-8 border-t border-border",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "© 2025 CSI RSCOE Student Chapter. All rights reserved." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Powered by" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/uploads/csi.png",
                    alt: "CSI Logo",
                    className: "w-full h-full object-contain"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Computer Society of India" })
              ] })
            ] }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute w-2 h-2 bg-primary/20 rounded-full",
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        },
        animate: {
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3]
        },
        transition: {
          duration: 3 + i,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      i
    )) })
  ] });
};
const Faculty = () => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const facultyMessages = [
    {
      id: 1,
      title: "HOD's Message",
      name: "Dr. Seema V. Kedar",
      designation: "Professor & HOD, Department of Computer Engineering",
      image: "/uploads/hod.png",
      message: "It gives me great pleasure to witness the inauguration of the CSI RSCOE Student Chapter under the Department of Computer Engineering. This chapter marks a new milestone in our journey toward academic excellence and technical innovation. The primary aim of this initiative is to enhance students’ professional skills, cultivate a culture of research and innovation, and bridge the gap between classroom learning and real-world applications. With the active support of our highly qualified faculty members and enthusiastic student team, I am confident that this chapter will provide a platform for knowledge sharing, industry interaction, and holistic development of our students. I wish the student members all the best for organizing impactful activities that will help shape the future leaders of the IT industry"
    },
    {
      id: 2,
      title: "Faculty Coordinator Message",
      name: "Dr. Pradnya Vikhar",
      designation: "Faculty Coordinator, CSI RSCOE Student Chapter",
      image: "/uploads/fac.png",
      message: "It is an honor to serve as the Faculty Coordinator of the CSI RSCOE Student Chapter. This initiative will not only expose students to the latest technologies and industry trends but also foster leadership, teamwork, and problem-solving skills.Our vision is to make this chapter a vibrant community where students actively engage in technical events, workshops, and competitions to enhance their knowledge and practical expertise. With the dedication of our student members and the guidance of the department, I am confident that the CSI RSCOE Student Chapter will evolve into a hub of learning, innovation, and excellence.I extend my best wishes to the entire team for a successful and impactful journey ahead."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "faculty", className: "py-20 bg-muted/30 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          ref,
          initial: { opacity: 0, y: 50 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
          transition: { duration: 0.8 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6", children: [
              "Faculty ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", children: "Messages" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Guidance and inspiration from our esteemed faculty members" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-6xl mx-auto", children: facultyMessages.map((faculty, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: index === 0 ? -50 : 50 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -50 : 50 },
          transition: { duration: 0.8, delay: index * 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gradient-card border-none card-hover h-full shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: (faculty.image || "").startsWith("http") ? faculty.image : (faculty.image || "").startsWith("/") ? faculty.image : `/${faculty.image}`,
                  alt: faculty.name,
                  className: "w-16 h-16 rounded-full object-cover border-4 border-primary/20",
                  onError: (e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-playfair font-semibold text-primary mb-2", children: faculty.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold text-foreground mb-1", children: faculty.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: faculty.designation })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-muted-foreground leading-relaxed italic", children: [
              '"',
              faculty.message,
              '"'
            ] })
          ] }) })
        },
        faculty.id
      )) })
    ] })
  ] });
};
const Announcements = () => {
  const [announcements, setAnnouncements] = reactExports.useState([]);
  const [visibleIndex, setVisibleIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("https://csi-backend-4.onrender.com/api/public/announcements");
        const data = await res.json();
        setAnnouncements(data.reverse());
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchAnnouncements();
  }, []);
  reactExports.useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setVisibleIndex((prev) => (prev + 1) % announcements.length);
      }, 6e3);
      return () => clearInterval(interval);
    }
  }, [announcements]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 right-6 z-50 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: announcements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 50, scale: 0.9 },
      transition: { duration: 0.4 },
      className: "relative max-w-sm p-4 rounded-2xl shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setAnnouncements((prev) => prev.filter((_, i) => i !== visibleIndex)),
            className: "absolute top-2 right-2 text-white hover:text-gray-200",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: announcements[visibleIndex].title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2", children: announcements[visibleIndex].content }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs opacity-80", children: new Date(announcements[visibleIndex].createdAt).toLocaleString() })
      ]
    },
    announcements[visibleIndex].id
  ) }) });
};
const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const handleLoginSuccess = (userData) => {
    login(userData);
    navigate("/dashboard");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Navigation,
      {
        onLoginClick: () => setIsLoginModalOpen(true),
        user,
        onLogout: () => {
          logout();
          navigate("/");
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-grow space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Events, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PastEvents, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Faculty, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Team, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Blogs, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoginModal,
      {
        isOpen: isLoginModalOpen,
        onClose: () => setIsLoginModalOpen(false),
        onLoginSuccess: handleLoginSuccess
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Announcements, {})
  ] });
};
const AllBlogs = () => {
  const [blogs, setBlogs] = reactExports.useState([]);
  const [fullScaleImage, setFullScaleImage] = reactExports.useState(null);
  const staticBlogs = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt: "Learn the fundamentals of web development and build your first website from scratch.",
      author: "Tech Team",
      createdAt: "2024-01-15",
      readTime: "5 min read",
      image: "/uploads/B1.jpg",
      category: "Web Development",
      content: `
        <h2>Introduction to Web Development</h2>
        <p>Web development is an exciting field that combines creativity with technical skills. Whether you're building a simple personal website or a complex web application, understanding the fundamentals is crucial.</p>
        
        <h3>HTML: The Structure</h3>
        <p>HTML (HyperText Markup Language) forms the backbone of every web page. It provides the structure and content that browsers display. Learning HTML is your first step into web development.</p>
        
        <h3>CSS: The Styling</h3>
        <p>CSS (Cascading Style Sheets) brings your HTML to life with colors, layouts, and animations. It's what makes websites look beautiful and professional.</p>
        
        <h3>JavaScript: The Interactivity</h3>
        <p>JavaScript adds interactivity to your websites. From simple form validations to complex single-page applications, JavaScript is the language of the web.</p>
        
        <h3>Getting Started</h3>
        <p>Start with the basics: HTML, CSS, and JavaScript. Practice by building small projects and gradually work your way up to more complex applications. The key is consistent practice and staying updated with the latest web technologies.</p>
      `
    },
    {
      id: 2,
      title: "Introduction to Machine Learning",
      excerpt: "Discover the world of artificial intelligence and machine learning algorithms.",
      author: "AI Team",
      createdAt: "2024-01-20",
      readTime: "8 min read",
      image: "/uploads/B2.jpg",
      category: "Machine Learning",
      content: `
        <h2>What is Machine Learning?</h2>
        <p>Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task.</p>
        
        <h3>Types of Machine Learning</h3>
        <p><strong>Supervised Learning:</strong> Learning with labeled data, like predicting house prices based on features.</p>
        <p><strong>Unsupervised Learning:</strong> Finding patterns in data without labels, like customer segmentation.</p>
        <p><strong>Reinforcement Learning:</strong> Learning through interaction with an environment, like game AI.</p>
        
        <h3>Popular Algorithms</h3>
        <p>From linear regression to neural networks, ML algorithms solve different types of problems. Understanding when to use each algorithm is key to success.</p>
        
        <h3>Real-World Applications</h3>
        <p>Machine learning powers recommendation systems, image recognition, natural language processing, and autonomous vehicles. The possibilities are endless!</p>
      `
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices",
      excerpt: "Essential security measures to protect your digital assets and personal information.",
      author: "Security Team",
      createdAt: "2024-01-25",
      readTime: "6 min read",
      image: "/uploads/B3.jpg",
      category: "Cybersecurity",
      content: `
        <h2>Understanding Cybersecurity</h2>
        <p>In our digital age, cybersecurity is more important than ever. Protecting your data and systems from threats requires a proactive approach.</p>
        
        <h3>Password Security</h3>
        <p>Use strong, unique passwords for each account. Consider using a password manager to generate and store complex passwords securely.</p>
        
        <h3>Two-Factor Authentication</h3>
        <p>Enable 2FA wherever possible. This adds an extra layer of security by requiring a second form of verification.</p>
        
        <h3>Software Updates</h3>
        <p>Keep your operating system and applications updated. Security patches often fix vulnerabilities that could be exploited by attackers.</p>
        
        <h3>Network Security</h3>
        <p>Use secure networks, avoid public Wi-Fi for sensitive activities, and consider using a VPN for additional protection.</p>
      `
    },
    {
      id: 4,
      title: "Mobile App Development Trends",
      excerpt: "Explore the latest trends and technologies in mobile application development.",
      author: "Mobile Team",
      createdAt: "2024-01-30",
      readTime: "7 min read",
      image: "/uploads/B4.jpg",
      category: "Mobile Development",
      content: `
        <h2>The Mobile Revolution</h2>
        <p>Mobile apps have transformed how we interact with technology. From social media to banking, mobile applications are integral to our daily lives.</p>
        
        <h3>Cross-Platform Development</h3>
        <p>Frameworks like React Native, Flutter, and Xamarin allow developers to build apps for multiple platforms using a single codebase.</p>
        
        <h3>Progressive Web Apps</h3>
        <p>PWAs combine the best of web and mobile apps, offering native-like experiences through web browsers.</p>
        
        <h3>AI Integration</h3>
        <p>Machine learning and AI are being integrated into mobile apps for features like image recognition, voice assistants, and personalized recommendations.</p>
        
        <h3>Future Trends</h3>
        <p>5G technology, augmented reality, and IoT integration are shaping the future of mobile app development.</p>
      `
    },
    {
      id: 5,
      title: "Cloud Computing Fundamentals",
      excerpt: "Understanding cloud services and how they revolutionize modern computing.",
      author: "Cloud Team",
      createdAt: "2024-02-05",
      readTime: "9 min read",
      image: "/uploads/B5.jpg",
      category: "Cloud Computing",
      content: `
        <h2>What is Cloud Computing?</h2>
        <p>Cloud computing delivers computing services over the internet, including servers, storage, databases, networking, software, and analytics.</p>
        
        <h3>Service Models</h3>
        <p><strong>IaaS (Infrastructure as a Service):</strong> Virtual machines, storage, and networking.</p>
        <p><strong>PaaS (Platform as a Service):</strong> Development environments and tools.</p>
        <p><strong>SaaS (Software as a Service):</strong> Complete applications delivered over the internet.</p>
        
        <h3>Deployment Models</h3>
        <p>Public, private, and hybrid clouds offer different levels of control, security, and customization.</p>
        
        <h3>Benefits</h3>
        <p>Cost efficiency, scalability, flexibility, and automatic updates make cloud computing attractive for businesses of all sizes.</p>
        
        <h3>Major Providers</h3>
        <p>AWS, Microsoft Azure, and Google Cloud Platform are the leading cloud service providers, each offering unique advantages.</p>
      `
    }
  ];
  reactExports.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://csi-backend-4.onrender.com/api/public/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setBlogs(data);
          } else {
            setBlogs(staticBlogs);
          }
        } else {
          setBlogs(staticBlogs);
        }
      } catch (err) {
        console.error("Failed to load blogs from API, using static blogs", err);
        setBlogs(staticBlogs);
      }
    };
    load();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "lg",
            onClick: () => window.history.back(),
            className: "text-primary hover:text-primary-foreground hover:gradient-primary border-primary hover:border-primary-foreground px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 mr-2" }),
              "Back to Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-foreground", children: "All Articles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: blogs.map((post, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: index * 0.1 },
          className: "bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden cursor-pointer", onClick: () => setFullScaleImage(post.image || "/placeholder.svg"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: post.image || "/placeholder.svg",
                  alt: post.title,
                  className: "w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold", children: post.category }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-black/50 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "w-5 h-5 text-white" }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-foreground mb-3 line-clamp-2", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4 line-clamp-3", children: post.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.author })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.readTime })
                ] })
              ] })
            ] })
          ]
        },
        post.id
      )) })
    ] }),
    fullScaleImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-hidden",
        onClick: () => setFullScaleImage(null),
        style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl max-h-full overflow-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: fullScaleImage,
              alt: "Full scale blog image",
              className: "max-w-full max-h-full object-contain rounded-lg shadow-2xl",
              onClick: (e) => e.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10",
              onClick: (e) => {
                e.stopPropagation();
                setFullScaleImage(null);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
            }
          )
        ] })
      }
    )
  ] });
};
const AllEvents = () => {
  const [events, setEvents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    (async () => {
      const res = await fetch("https://csi-backend-4.onrender.com/api/public/events");
      if (res.ok) setEvents(await res.json());
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-6", children: "All Events" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/events/${e.id}`, className: "p-4 border rounded-lg hover:shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.image || "/placeholder.svg", alt: e.title, className: "w-full h-40 object-cover rounded mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: e.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: e.description })
    ] }, e.id)) })
  ] });
};
const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = reactExports.useState(null);
  const staticBlogs = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt: "Learn the fundamentals of web development and build your first website from scratch.",
      author: "Tech Team",
      createdAt: "2024-01-15",
      readTime: "5 min read",
      image: "/uploads/B1.jpg",
      category: "Web Development",
      content: `
        <h2>Introduction to Web Development</h2>
        <p>Web development is an exciting field that combines creativity with technical skills. Whether you're building a simple personal website or a complex web application, understanding the fundamentals is crucial.</p>
        
        <h3>HTML: The Structure</h3>
        <p>HTML (HyperText Markup Language) forms the backbone of every web page. It provides the structure and content that browsers display. Learning HTML is your first step into web development.</p>
        
        <h3>CSS: The Styling</h3>
        <p>CSS (Cascading Style Sheets) brings your HTML to life with colors, layouts, and animations. It's what makes websites look beautiful and professional.</p>
        
        <h3>JavaScript: The Interactivity</h3>
        <p>JavaScript adds interactivity to your websites. From simple form validations to complex single-page applications, JavaScript is the language of the web.</p>
        
        <h3>Getting Started</h3>
        <p>Start with the basics: HTML, CSS, and JavaScript. Practice by building small projects and gradually work your way up to more complex applications. The key is consistent practice and staying updated with the latest web technologies.</p>
      `
    },
    {
      id: 2,
      title: "Introduction to Machine Learning",
      excerpt: "Discover the world of artificial intelligence and machine learning algorithms.",
      author: "AI Team",
      createdAt: "2024-01-20",
      readTime: "8 min read",
      image: "/uploads/B2.jpg",
      category: "Machine Learning",
      content: `
        <h2>What is Machine Learning?</h2>
        <p>Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every task.</p>
        
        <h3>Types of Machine Learning</h3>
        <p><strong>Supervised Learning:</strong> Learning with labeled data, like predicting house prices based on features.</p>
        <p><strong>Unsupervised Learning:</strong> Finding patterns in data without labels, like customer segmentation.</p>
        <p><strong>Reinforcement Learning:</strong> Learning through interaction with an environment, like game AI.</p>
        
        <h3>Popular Algorithms</h3>
        <p>From linear regression to neural networks, ML algorithms solve different types of problems. Understanding when to use each algorithm is key to success.</p>
        
        <h3>Real-World Applications</h3>
        <p>Machine learning powers recommendation systems, image recognition, natural language processing, and autonomous vehicles. The possibilities are endless!</p>
      `
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices",
      excerpt: "Essential security measures to protect your digital assets and personal information.",
      author: "Security Team",
      createdAt: "2024-01-25",
      readTime: "6 min read",
      image: "/uploads/B3.jpg",
      category: "Cybersecurity",
      content: `
        <h2>Understanding Cybersecurity</h2>
        <p>In our digital age, cybersecurity is more important than ever. Protecting your data and systems from threats requires a proactive approach.</p>
        
        <h3>Password Security</h3>
        <p>Use strong, unique passwords for each account. Consider using a password manager to generate and store complex passwords securely.</p>
        
        <h3>Two-Factor Authentication</h3>
        <p>Enable 2FA wherever possible. This adds an extra layer of security by requiring a second form of verification.</p>
        
        <h3>Software Updates</h3>
        <p>Keep your operating system and applications updated. Security patches often fix vulnerabilities that could be exploited by attackers.</p>
        
        <h3>Network Security</h3>
        <p>Use secure networks, avoid public Wi-Fi for sensitive activities, and consider using a VPN for additional protection.</p>
      `
    },
    {
      id: 4,
      title: "Mobile App Development Trends",
      excerpt: "Explore the latest trends and technologies in mobile application development.",
      author: "Mobile Team",
      createdAt: "2024-01-30",
      readTime: "7 min read",
      image: "/uploads/B4.jpg",
      category: "Mobile Development",
      content: `
        <h2>The Mobile Revolution</h2>
        <p>Mobile apps have transformed how we interact with technology. From social media to banking, mobile applications are integral to our daily lives.</p>
        
        <h3>Cross-Platform Development</h3>
        <p>Frameworks like React Native, Flutter, and Xamarin allow developers to build apps for multiple platforms using a single codebase.</p>
        
        <h3>Progressive Web Apps</h3>
        <p>PWAs combine the best of web and mobile apps, offering native-like experiences through web browsers.</p>
        
        <h3>AI Integration</h3>
        <p>Machine learning and AI are being integrated into mobile apps for features like image recognition, voice assistants, and personalized recommendations.</p>
        
        <h3>Future Trends</h3>
        <p>5G technology, augmented reality, and IoT integration are shaping the future of mobile app development.</p>
      `
    },
    {
      id: 5,
      title: "Cloud Computing Fundamentals",
      excerpt: "Understanding cloud services and how they revolutionize modern computing.",
      author: "Cloud Team",
      createdAt: "2024-02-05",
      readTime: "9 min read",
      image: "/uploads/B5.jpg",
      category: "Cloud Computing",
      content: `
        <h2>What is Cloud Computing?</h2>
        <p>Cloud computing delivers computing services over the internet, including servers, storage, databases, networking, software, and analytics.</p>
        
        <h3>Service Models</h3>
        <p><strong>IaaS (Infrastructure as a Service):</strong> Virtual machines, storage, and networking.</p>
        <p><strong>PaaS (Platform as a Service):</strong> Development environments and tools.</p>
        <p><strong>SaaS (Software as a Service):</strong> Complete applications delivered over the internet.</p>
        
        <h3>Deployment Models</h3>
        <p>Public, private, and hybrid clouds offer different levels of control, security, and customization.</p>
        
        <h3>Benefits</h3>
        <p>Cost efficiency, scalability, flexibility, and automatic updates make cloud computing attractive for businesses of all sizes.</p>
        
        <h3>Major Providers</h3>
        <p>AWS, Microsoft Azure, and Google Cloud Platform are the leading cloud service providers, each offering unique advantages.</p>
      `
    }
  ];
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://csi-backend-4.onrender.com/api/public/blogs");
        if (res.ok) {
          const list = await res.json();
          const foundBlog2 = list.find((b) => String(b.id) === id);
          if (foundBlog2) {
            setBlog(foundBlog2);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load blog from API", err);
      }
      const foundBlog = staticBlogs.find((b) => String(b.id) === id);
      setBlog(foundBlog || null);
    })();
  }, [id]);
  if (!blog) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10", children: "Loading..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        className: "mb-6 text-primary hover:text-primary-foreground",
        onClick: () => window.history.back(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
          "Back to Blogs"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "prose dark:prose-invert max-w-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: blog.image || "/placeholder.svg",
            alt: blog.title,
            className: "w-full h-96 object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold", children: blog.category }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-foreground", children: blog.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-muted-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.author })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.readTime })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: blog.excerpt })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "prose dark:prose-invert max-w-none",
          dangerouslySetInnerHTML: { __html: blog.content || blog.excerpt }
        }
      )
    ] })
  ] });
};
const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = reactExports.useState(null);
  reactExports.useEffect(() => {
    (async () => {
      const res = await fetch("https://csi-backend-4.onrender.com/api/public/events");
      if (res.ok) {
        const list = await res.json();
        setEvent(list.find((e) => String(e.id) === id));
      }
    })();
  }, [id]);
  if (!event) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10", children: "Loading..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mb-4 text-primary underline", onClick: () => window.history.back(), children: "← Back" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.image || "/placeholder.svg", alt: event.title, className: "w-full h-80 object-cover rounded mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: event.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
      event.date,
      " • ",
      event.location
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", children: event.description }),
    event.status !== "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Event Photos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Coming soon: gallery of past event photos." })
    ] }),
    event.status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#register", className: "inline-block mt-6 px-4 py-2 border border-primary text-primary rounded hover:gradient-primary hover:text-primary-foreground", children: "Register Now" })
  ] });
};
const ImageUpload = ({ onImageChange, previewUrl, className = "" }) => {
  const [preview, setPreview] = reactExports.useState(previewUrl || null);
  React.useEffect(() => {
    setPreview(previewUrl || null);
  }, [previewUrl]);
  const handleImageChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };
  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative ${className}`, children: preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-md overflow-hidden border border-gray-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: preview,
        alt: "Preview",
        className: "w-full h-48 object-cover"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleRemoveImage,
        className: "absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-gray-400 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Click to upload" }),
        " or drag and drop"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "PNG, JPG or JPEG (max. 2MB)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "file",
        className: "hidden",
        accept: "image/png, image/jpeg, image/jpg",
        onChange: handleImageChange
      }
    )
  ] }) });
};
const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [users, setUsers] = reactExports.useState([]);
  const [announcements, setAnnouncements] = reactExports.useState([]);
  const [events, setEvents] = reactExports.useState([]);
  const [eventFilter, setEventFilter] = reactExports.useState("all");
  const [showRegistrationsModal, setShowRegistrationsModal] = reactExports.useState(false);
  const [registrations, setRegistrations] = reactExports.useState([]);
  const [registrationsLoading, setRegistrationsLoading] = reactExports.useState(false);
  const [selectedEventForRegs, setSelectedEventForRegs] = reactExports.useState(null);
  const [blogs, setBlogs] = reactExports.useState([]);
  const [team, setTeam] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showUserModal, setShowUserModal] = reactExports.useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = reactExports.useState(false);
  const [showEventModal, setShowEventModal] = reactExports.useState(false);
  const [showBlogModal, setShowBlogModal] = reactExports.useState(false);
  reactExports.useState(false);
  const [editingUser, setEditingUser] = reactExports.useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = reactExports.useState(null);
  const [editingEvent, setEditingEvent] = reactExports.useState(null);
  const [editingBlog, setEditingBlog] = reactExports.useState(null);
  reactExports.useState(null);
  const [userForm, setUserForm] = reactExports.useState({ name: "", email: "", password: "", role: "MEMBER" });
  const [announcementForm, setAnnouncementForm] = reactExports.useState({ title: "", content: "" });
  const [eventForm, setEventForm] = reactExports.useState({
    title: "",
    description: "",
    date: "",
    location: "",
    status: "upcoming",
    image: "",
    fee: 0,
    flyoverDescription: "",
    details: "",
    rulebookUrl: "",
    qrCodeUrl: "",
    whatsappGroupUrl: "",
    registrationDeadline: ""
  });
  const [blogForm, setBlogForm] = reactExports.useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    readTime: "",
    image: ""
  });
  reactExports.useState({
    name: "",
    role: "",
    image: "",
    linkedin: "",
    email: ""
  });
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [customFields, setCustomFields] = reactExports.useState([]);
  const { toast: toast2 } = useToast();
  const fetchUsers = reactExports.useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    }
  }, [toast2]);
  const fetchAnnouncements = reactExports.useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/Admin/Announcements");
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive"
      });
    }
  }, [toast2]);
  const fetchEvents = reactExports.useCallback(async () => {
    try {
      let url = "https://csi-backend-4.onrender.com/api/admin/events";
      if (eventFilter === "upcoming") url = "https://csi-backend-4.onrender.com/api/admin/events/upcoming";
      if (eventFilter === "completed") url = "https://csi-backend-4.onrender.com/api/admin/events/completed";
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const counts = await Promise.all(
          data.map(async (e) => {
            try {
              const r = await fetch(`https://csi-backend-4.onrender.com/api/admin/events/${e.id}/registrations/count`);
              if (r.ok) {
                const n = await r.text();
                return parseInt(n || "0", 10) || 0;
              }
            } catch (err) {
              console.error("Failed to fetch registration count", err);
            }
            return 0;
          })
        );
        setEvents(data.map((e, i) => ({ ...e, registrationCount: counts[i] })));
      } else {
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
  const fetchBlogs = reactExports.useCallback(async () => {
    try {
      const response = await fetch("https://csi-backend-4.onrender.com/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
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
  const openRegistrations = async (ev) => {
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
  const downloadRegistrationsCsv = (ev) => {
    window.open(`https://csi-backend-4.onrender.com/api/admin/events/${ev.id}/registrations.csv`, "_blank");
  };
  const fetchTeam = reactExports.useCallback(async () => {
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
  reactExports.useEffect(() => {
    fetchUsers();
    fetchAnnouncements();
    fetchEvents();
    fetchBlogs();
    fetchTeam();
  }, [fetchUsers, fetchAnnouncements, fetchEvents, fetchBlogs, fetchTeam]);
  const handleUserSubmit = async () => {
    setIsLoading(true);
    try {
      const url = editingUser ? `https://csi-backend-4.onrender.com/api/admin/users/${editingUser.id}` : "https://csi-backend-4.onrender.com/api/admin/users";
      const method = editingUser ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm)
      });
      if (response.ok) {
        toast2({
          title: "Success",
          description: editingUser ? "User updated successfully" : "User created successfully"
        });
        setShowUserModal(false);
        setEditingUser(null);
        setUserForm({ name: "", email: "", password: "", role: "user" });
        fetchUsers();
      } else {
        const error = await response.text();
        toast2({
          title: "Error",
          description: error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to save user",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleAnnouncementSubmit = async () => {
    setIsLoading(true);
    try {
      const url = editingAnnouncement ? `https://csi-backend-4.onrender.com/api/Admin/Announcements/${editingAnnouncement.id}` : "https://csi-backend-4.onrender.com/api/Admin/Announcements";
      const method = editingAnnouncement ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(announcementForm)
      });
      if (response.ok) {
        toast2({
          title: "Success",
          description: editingAnnouncement ? "Announcement updated successfully" : "Announcement created successfully"
        });
        setShowAnnouncementModal(false);
        setAnnouncementForm({ title: "", content: "" });
        setEditingAnnouncement(null);
        fetchAnnouncements();
      } else {
        const error = await response.text();
        toast2({ title: "Error", description: error || "Failed to save announcement", variant: "destructive" });
      }
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to save announcement",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const deleteAnnouncement = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await fetch(`https://csi-backend-4.onrender.com/api/Admin/Announcements/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast2({ title: "Success", description: "Announcement deleted" });
        fetchAnnouncements();
      } else {
        const t = await res.text();
        toast2({ title: "Error", description: t || "Failed to delete", variant: "destructive" });
      }
    } catch {
      toast2({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };
  const handleEventSubmit = async () => {
    setIsLoading(true);
    try {
      const url = editingEvent ? `https://csi-backend-4.onrender.com/api/admin/events/${editingEvent.id}` : `https://csi-backend-4.onrender.com/api/admin/events`;
      const method = editingEvent ? "PUT" : "POST";
      const eventPayload = {
        ...eventForm,
        image: void 0,
        registrationFieldsJson: JSON.stringify(customFields)
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(eventPayload)
      });
      if (response.ok) {
        toast2({ title: "Success", description: editingEvent ? "Event updated successfully" : "Event created successfully" });
        fetchEvents();
      } else {
        const errText = await response.text();
        toast2({ title: "Error", description: errText || "Failed to save event", variant: "destructive" });
      }
      setShowEventModal(false);
      setEditingEvent(null);
      setEventForm({ title: "", description: "", date: "", location: "", status: "upcoming", image: "", fee: 0, flyoverDescription: "", details: "", rulebookUrl: "", qrCodeUrl: "", whatsappGroupUrl: "", registrationDeadline: "" });
      setCustomFields([]);
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleBlogSubmit = async () => {
    setIsLoading(true);
    try {
      let imageUrl = blogForm.image;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      const url = editingBlog ? `https://csi-backend-4.onrender.com/api/admin/blogs/${editingBlog.id}` : `https://csi-backend-4.onrender.com/api/admin/blogs`;
      const method = editingBlog ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...blogForm, image: imageUrl })
      });
      if (response.ok) {
        toast2({ title: "Success", description: editingBlog ? "Blog updated successfully" : "Blog created successfully" });
        fetchBlogs();
      } else {
        const errText = await response.text();
        toast2({ title: "Error", description: errText || "Failed to save blog", variant: "destructive" });
      }
      setShowBlogModal(false);
      setEditingBlog(null);
      setBlogForm({ title: "", content: "", excerpt: "", author: "", category: "", readTime: "", image: "" });
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to save blog",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("https://csi-backend-4.onrender.com/api/upload", { method: "POST", body: form });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
    } catch (err) {
      console.error("upload failed", err);
    }
    return null;
  };
  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`https://csi-backend-4.onrender.com/api/admin/users/${userId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast2({
          title: "Success",
          description: "User deleted successfully"
        });
        fetchUsers();
      } else {
        toast2({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    }
  };
  const resetPassword = async (userId) => {
    try {
      const response = await fetch(`https://csi-backend-4.onrender.com/api/admin/users/${userId}/reset-password`, {
        method: "POST"
      });
      if (response.ok) {
        toast2({
          title: "Success",
          description: "Password reset successfully"
        });
      } else {
        toast2({
          title: "Error",
          description: "Failed to reset password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast2({
        title: "Error",
        description: "Failed to reset password",
        variant: "destructive"
      });
    }
  };
  const deleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const res = await fetch(`https://csi-backend-4.onrender.com/api/admin/events/${eventId}`, { method: "DELETE" });
    if (res.ok) {
      toast2({ title: "Success", description: "Event deleted successfully" });
      fetchEvents();
    } else {
      toast2({ title: "Error", description: "Failed to delete event", variant: "destructive" });
    }
  };
  const deleteBlog = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const res = await fetch(`https://csi-backend-4.onrender.com/api/admin/blogs/${blogId}`, { method: "DELETE" });
    if (res.ok) {
      toast2({ title: "Success", description: "Blog deleted successfully" });
      fetchBlogs();
    } else {
      toast2({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900/60 backdrop-blur border-b border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent", children: "CSI Admin Dashboard" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-300", children: [
          "Welcome, ",
          user == null ? void 0 : user.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onLogout, variant: "outline", size: "sm", className: "border-slate-600 text-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
          "Logout"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 bg-slate-800/60 backdrop-blur rounded-xl p-2 shadow-sm mb-8 border border-slate-700", children: [
        { id: "overview", label: "Overview", icon: ChartColumn },
        { id: "users", label: "Users", icon: Users },
        { id: "announcements", label: "Announcements", icon: Megaphone },
        { id: "events", label: "Events", icon: Calendar },
        { id: "blogs", label: "Blogs", icon: FileText },
        { id: "team", label: "Team", icon: UserPlus },
        { id: "settings", label: "Settings", icon: Settings }
      ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setActiveTab(tab.id),
          variant: activeTab === tab.id ? "default" : "ghost",
          className: "flex items-center space-x-2 transition-all duration-200 text-slate-100",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label })
          ]
        },
        tab.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          children: [
            activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-blue-500 to-blue-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 text-sm", children: "Total Users" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: users.length })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-blue-200" })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-green-500 to-green-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-100 text-sm", children: "Announcements" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: announcements.length })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-8 h-8 text-green-200" })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-purple-500 to-purple-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-purple-100 text-sm", children: "Upcoming Events" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: events.filter((e) => e.status === "upcoming").length })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-8 h-8 text-purple-200" })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-pink-500 to-pink-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-pink-100 text-sm", children: "Blog Posts" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: blogs.length })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-pink-200" })
                ] }) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-blue-600" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Recent Users" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: users.slice(0, 5).map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-semibold", children: user2.name.charAt(0) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: user2.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: user2.email })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: user2.role === "ADMIN" ? "default" : "secondary", children: user2.role })
                  ] }, user2.id)) }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-green-600" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upcoming Events" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: events.filter((e) => e.status === "upcoming").slice(0, 3).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-gray-900", children: event.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                      event.date,
                      " • ",
                      event.location
                    ] })
                  ] }, event.id)) }) })
                ] })
              ] })
            ] }),
            activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "User Management" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowUserModal(true), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                  "Add User"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: users.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: user2.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: user2.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block px-2 py-1 rounded-full text-xs font-medium ${user2.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`, children: user2.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => {
                        setEditingUser(user2);
                        setUserForm({ name: user2.name, email: user2.email, password: "", role: user2.role });
                        setShowUserModal(true);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => resetPassword(user2.id),
                      children: "Reset Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "sm",
                      onClick: () => deleteUser(user2.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }) }) }, user2.id)) })
            ] }),
            activeTab === "announcements" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Announcements" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAnnouncementModal(true), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                  "Add Announcement"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: announcements.map((announcement) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: announcement.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-2 whitespace-pre-wrap", children: announcement.content }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                    "Created: ",
                    new Date(announcement.createdAt).toLocaleDateString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                    setEditingAnnouncement(announcement);
                    setAnnouncementForm({ title: announcement.title, content: announcement.content });
                    setShowAnnouncementModal(true);
                  }, children: "Edit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", onClick: () => deleteAnnouncement(announcement.id), children: "Delete" })
                ] })
              ] }) }) }, announcement.id)) })
            ] }),
            activeTab === "events" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Event Management" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowEventModal(true), className: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                  "Add Event"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600", children: "Filter:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: eventFilter === "all" ? "default" : "outline", size: "sm", onClick: () => setEventFilter("all"), children: "All" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: eventFilter === "upcoming" ? "default" : "outline", size: "sm", onClick: () => setEventFilter("upcoming"), children: "Upcoming" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: eventFilter === "completed" ? "default" : "outline", size: "sm", onClick: () => setEventFilter("completed"), children: "Completed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: event.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getStatusColor(event.status), children: event.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-gray-500", children: [
                      "Regs: ",
                      event.registrationCount ?? 0
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-3", children: event.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.date })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📍" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.location })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2 ml-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => openRegistrations(event),
                      children: "View Registrations"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => downloadRegistrationsCsv(event),
                      children: "Download CSV"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => {
                        setEditingEvent(event);
                        setEventForm({
                          title: event.title,
                          description: event.description,
                          date: event.date,
                          location: event.location,
                          status: event.status,
                          image: event.image || "",
                          fee: event.fee || 0,
                          flyoverDescription: event.flyoverDescription || "",
                          details: event.details || "",
                          rulebookUrl: event.rulebookUrl || "",
                          qrCodeUrl: event.qrCodeUrl || "",
                          whatsappGroupUrl: event.whatsappGroupUrl || "",
                          registrationDeadline: event.registrationDeadline || ""
                        });
                        setShowEventModal(true);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "sm",
                      onClick: () => deleteEvent(event.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }) }) }, event.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showRegistrationsModal, onOpenChange: setShowRegistrationsModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl w-[95vw] p-4 sm:p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
                  "Registrations ",
                  selectedEventForRegs ? `for ${selectedEventForRegs.title}` : ""
                ] }) }),
                registrationsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-gray-600", children: "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 text-sm text-gray-700", children: [
                    "Total: ",
                    registrations.length
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-96 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 border-b", children: "#" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 border-b", children: "Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 border-b", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 border-b", children: "Phone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 border-b", children: "Branch" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-2 border-b", children: "Year" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: registrations.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 border-b", children: idx + 1 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 border-b", children: r.name || "" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 border-b", children: r.email || "" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 border-b", children: r.phone || "" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 border-b", children: r.branch || "" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-2 border-b", children: r.year || "" })
                    ] }, r.id || idx)) })
                  ] }) })
                ] })
              ] }) })
            ] }),
            activeTab === "blogs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Blog Management" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowBlogModal(true), className: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                  "Add Blog"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: blog.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: blog.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-3", children: blog.excerpt }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✍️" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.author })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📅" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.createdAt })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⏱️" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.readTime })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2 ml-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => {
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
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "destructive",
                      size: "sm",
                      onClick: () => deleteBlog(blog.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }) }) }, blog.id)) })
            ] }),
            activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Site settings and configuration options will be available here." }) }) })
            ] })
          ]
        },
        activeTab
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showUserModal, onOpenChange: setShowUserModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md w-[95vw] sm:w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingUser ? "Edit User" : "Add New User" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Name",
            value: userForm.name,
            onChange: (e) => setUserForm({ ...userForm, name: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "email",
            placeholder: "Email",
            value: userForm.email,
            onChange: (e) => setUserForm({ ...userForm, email: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "password",
            placeholder: "Password",
            value: userForm.password,
            onChange: (e) => setUserForm({ ...userForm, password: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: userForm.role,
            onChange: (e) => setUserForm({ ...userForm, role: e.target.value }),
            className: "w-full p-2 border rounded-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MEMBER", children: "Member" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ADMIN", children: "Admin" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowUserModal(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleUserSubmit, disabled: isLoading, children: isLoading ? "Saving..." : editingUser ? "Update" : "Create" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAnnouncementModal, onOpenChange: setShowAnnouncementModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md w-[95vw] sm:w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add New Announcement" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Title",
            value: announcementForm.title,
            onChange: (e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Content",
            value: announcementForm.content,
            onChange: (e) => setAnnouncementForm({ ...announcementForm, content: e.target.value }),
            rows: 4
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowAnnouncementModal(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAnnouncementSubmit, disabled: isLoading, children: isLoading ? "Saving..." : "Create" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showEventModal, onOpenChange: setShowEventModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl w-[95vw] p-4 sm:p-6 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingEvent ? "Edit Event" : "Add New Event" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Event Title",
            value: eventForm.title,
            onChange: (e) => setEventForm({ ...eventForm, title: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Event Description",
            value: eventForm.description,
            onChange: (e) => setEventForm({ ...eventForm, description: e.target.value }),
            rows: 3
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: eventForm.date,
              onChange: (e) => setEventForm({ ...eventForm, date: e.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Location",
              value: eventForm.location,
              onChange: (e) => setEventForm({ ...eventForm, location: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            placeholder: "Event Fee",
            value: eventForm.fee,
            onChange: (e) => setEventForm({ ...eventForm, fee: parseInt(e.target.value) || 0 })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Flyover Description",
              value: eventForm.flyoverDescription,
              onChange: (e) => setEventForm({ ...eventForm, flyoverDescription: e.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Rulebook URL",
              value: eventForm.rulebookUrl,
              onChange: (e) => setEventForm({ ...eventForm, rulebookUrl: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Detailed Event Information",
            value: eventForm.details,
            onChange: (e) => setEventForm({ ...eventForm, details: e.target.value }),
            rows: 4
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "WhatsApp Group URL (optional)",
            value: eventForm.whatsappGroupUrl,
            onChange: (e) => setEventForm({ ...eventForm, whatsappGroupUrl: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              value: eventForm.status,
              onChange: (e) => setEventForm({ ...eventForm, status: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "upcoming", children: "Upcoming" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ongoing", children: "Ongoing" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              placeholder: "Registration Deadline",
              value: eventForm.registrationDeadline,
              onChange: (e) => setEventForm({ ...eventForm, registrationDeadline: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Registration Fields" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => {
            setCustomFields([
              ...customFields,
              { label: "Team Members", type: "select", required: true, options: "1,2,3,4,5" }
            ]);
          }, children: "Add Team Members dropdown" }) }),
          customFields.map((field, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 border p-2 rounded", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm", children: "Field Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: field.label,
                  onChange: (e) => {
                    const newFields = [...customFields];
                    newFields[index].label = e.target.value;
                    setCustomFields(newFields);
                  },
                  placeholder: "e.g., College Name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm", children: "Field Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: field.type,
                  onChange: (e) => {
                    const newFields = [...customFields];
                    newFields[index].type = e.target.value;
                    setCustomFields(newFields);
                  },
                  className: "w-full p-2 border rounded",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "text", children: "Text" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "email", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "number", children: "Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "textarea", children: "Textarea" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "select", children: "Select" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "display", children: "Display (Read-only)" })
                  ]
                }
              )
            ] }),
            field.type === "select" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm", children: "Options (comma-separated)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: field.options || "",
                  onChange: (e) => {
                    const newFields = [...customFields];
                    newFields[index].options = e.target.value;
                    setCustomFields(newFields);
                  },
                  placeholder: "Option1, Option2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm", children: "Required" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: field.required,
                  onChange: (e) => {
                    const newFields = [...customFields];
                    newFields[index].required = e.target.checked;
                    setCustomFields(newFields);
                  },
                  className: "w-auto h-auto"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", size: "sm", onClick: () => {
              setCustomFields(customFields.filter((_, i) => i !== index));
            }, children: "Remove" })
          ] }, index)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => {
            setCustomFields([...customFields, { label: "", type: "text", required: false, options: "" }]);
          }, children: "Add Custom Field" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowEventModal(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleEventSubmit, disabled: isLoading, children: isLoading ? "Saving..." : editingEvent ? "Update" : "Create" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBlogModal, onOpenChange: setShowBlogModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl w-[95vw] p-4 sm:p-6 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingBlog ? "Edit Blog" : "Add New Blog" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Blog Title",
            value: blogForm.title,
            onChange: (e) => setBlogForm({ ...blogForm, title: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Blog Content",
            value: blogForm.content,
            onChange: (e) => setBlogForm({ ...blogForm, content: e.target.value }),
            rows: 5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Excerpt",
            value: blogForm.excerpt,
            onChange: (e) => setBlogForm({ ...blogForm, excerpt: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Author",
              value: blogForm.author,
              onChange: (e) => setBlogForm({ ...blogForm, author: e.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Category",
              value: blogForm.category,
              onChange: (e) => setBlogForm({ ...blogForm, category: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Read Time (e.g. 5 min)",
            value: blogForm.readTime,
            onChange: (e) => setBlogForm({ ...blogForm, readTime: e.target.value })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Blog Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImageUpload,
            {
              onImageChange: setImageFile,
              previewUrl: blogForm.image,
              className: "mb-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowBlogModal(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleBlogSubmit, disabled: isLoading, children: isLoading ? "Saving..." : editingBlog ? "Update" : "Create" })
        ] })
      ] })
    ] }) })
  ] });
};
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  reactExports.useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/");
      return;
    }
    if (user.role !== "ADMIN") {
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate]);
  if (!isAuthenticated || !user || user.role !== "ADMIN") {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { user, onLogout: handleLogout });
};
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bW5zcmFua2JwcW51YXhveWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODEyNDMsImV4cCI6MjA3NDY1NzI0M30.ZSHZPfiQNvXy-fAmcpePq_oYATpaIy4bQeJMKvG6u38", "VITE_SUPABASE_URL": "https://qzmnsrankbpqnuaxoyhp.supabase.co" };
const RegistrationForm = ({ event, onClose, onSuccess, standalone = false }) => {
  useAuth();
  const [fields, setFields] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    college: "RSCOE",
    branch: "",
    year: ""
  });
  const [busy, setBusy] = reactExports.useState(false);
  const [successOpen, setSuccessOpen] = reactExports.useState(false);
  const [whatsappLink, setWhatsappLink] = reactExports.useState(void 0);
  const teamSizeValue = (() => {
    const v = String(form["Team Members"] ?? "").trim();
    const n = parseInt(v || "1", 10);
    if (Number.isFinite(n) && n >= 1 && n <= 10) return n;
    return 1;
  })();
  reactExports.useEffect(() => {
    if (event) {
      const load = async () => {
        try {
          const res = await fetch(API_ENDPOINTS.getEventRegistrationSchema(event.id));
          if (res.ok) {
            const text = await res.text();
            const arr = text ? JSON.parse(text) : [];
            setFields(Array.isArray(arr) ? arr : []);
            const init = { ...form };
            (Array.isArray(arr) ? arr : []).forEach((f) => {
              if (f.label === "Event Fee") init[f.label] = event.fee || 0;
              else if (!init[f.label]) init[f.label] = "";
            });
            setForm(init);
          }
        } catch {
        }
      };
      load();
    } else if (standalone) {
      setFields([
        { label: "Full Name", type: "text", required: true },
        { label: "Email", type: "email", required: true },
        { label: "Phone", type: "tel", required: true },
        { label: "College", type: "text", required: true },
        { label: "Branch", type: "select", required: true, options: "Computer,IT,ENTC,Mechanical,Civil,Other" },
        { label: "Year", type: "select", required: true, options: "FE,SE,TE,BE" }
      ]);
    }
  }, [event == null ? void 0 : event.id, standalone]);
  const submit = async () => {
    setBusy(true);
    try {
      if (event) {
        const members = [];
        for (let i = 1; i <= teamSizeValue; i++) {
          const key = `Member ${i} Name`;
          const v = (form[key] ?? "").toString().trim();
          if (v) members.push(v);
        }
        const customFieldsJson = JSON.stringify(form);
        const payload = {
          name: form["Full Name"] || form.name,
          email: form["Email"] || form.email,
          phone: form["Phone"] || form.phone,
          college: form["College"] || form.college,
          year: form["Year"] || form.year,
          department: form["Branch"] || form.branch,
          teamSize: form["Team Members"] ? teamSizeValue : void 0,
          memberNames: members.length ? members.join(", ") : form["Member Names"] || form.memberNames,
          customFieldsJson
        };
        const fd = new FormData();
        fd.append("payload", new Blob([JSON.stringify(payload)], { type: "application/json" }));
        const res = await fetch(API_ENDPOINTS.registerForEvent(event.id), { method: "POST", body: fd });
        if (res.ok) {
          onSuccess && onSuccess();
          const whatsapp = form["WhatsApp Group URL"] || form.whatsappGroupUrl;
          setWhatsappLink(whatsapp);
          setSuccessOpen(true);
        } else {
          if (res.status === 409) {
            alert("Duplicate registration detected (email/phone/team).");
          } else if (res.status === 400) {
            alert("Invalid data. Please check your email/phone.");
          } else {
            const t = await res.text();
            alert(t || "Failed to register for event");
          }
        }
      } else {
        const payload = {
          name: form["Full Name"] || form.name,
          email: form["Email"] || form.email,
          phone: form["Phone"] || form.phone,
          college: form["College"] || form.college,
          branch: form["Branch"] || form.branch,
          year: form["Year"] || form.year
        };
        const res = await fetch(API_ENDPOINTS.REGISTER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const msg = await res.text();
          alert(msg || "Registration successful! Welcome to CSI Club!");
          const whatsappEnv = __vite_import_meta_env__ == null ? void 0 : __vite_import_meta_env__.VITE_WHATSAPP_GROUP_URL;
          setWhatsappLink(whatsappEnv);
          onSuccess && onSuccess();
          setSuccessOpen(true);
        } else {
          const t = await res.text();
          alert(t || "Failed to register for club");
        }
      }
    } finally {
      setBusy(false);
    }
  };
  const requiredTeamSize = (() => {
    const v = String(form["Team Size"] ?? form["Required Team Size"] ?? "").trim();
    const n = parseInt(v || "0", 10);
    return Number.isFinite(n) && n > 0 && n <= 10 ? n : 0;
  })();
  const leaderRequired = (() => {
    const v = String(form["Leader Required"] ?? "").trim().toLowerCase();
    return v === "true" || v === "yes" || v === "1";
  })();
  const validateForm = () => {
    for (const field of fields) {
      if (field.required && !form[field.label]) {
        return false;
      }
    }
    if (event && requiredTeamSize > 0) {
      for (let i = 1; i <= requiredTeamSize; i++) {
        const name = String(form[`Member ${i} Name`] ?? "").trim();
        const email = String(form[`Member ${i} Email`] ?? "").trim();
        const phone = String(form[`Member ${i} Phone`] ?? "").trim();
        if (!name && !email && !phone) return false;
      }
      if (leaderRequired) {
        const leader = parseInt(String(form["Team Leader"] ?? "").trim() || "0", 10);
        if (!leader || leader < 1 || leader > requiredTeamSize) return false;
      }
    }
    return true;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-4 ${standalone ? "p-6 bg-white rounded-lg shadow-md max-w-md mx-auto" : ""}`, children: [
    standalone && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "CSI Club Registration" }),
    fields.map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: f.label }),
      f.type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
          value: form[f.label] || "",
          onChange: (e) => setForm({ ...form, [f.label]: e.target.value }),
          required: f.required,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "", children: [
              "Select ",
              f.label
            ] }),
            (f.options || "").split(",").map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.trim(), children: o.trim() }, o))
          ]
        }
      ) : f.type === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
          placeholder: `Enter ${f.label.toLowerCase()}`,
          value: form[f.label] || "",
          onChange: (e) => setForm({ ...form, [f.label]: e.target.value }),
          required: f.required
        }
      ) : f.type === "display" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "p-2 border rounded w-full opacity-70",
          placeholder: f.label,
          value: form[f.label] || "",
          readOnly: true
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: f.type,
          className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
          placeholder: `Enter ${f.label.toLowerCase()}`,
          value: form[f.label] || "",
          onChange: (e) => setForm({ ...form, [f.label]: e.target.value }),
          required: f.required
        }
      )
    ] }, idx)),
    event && requiredTeamSize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: Array.from({ length: requiredTeamSize }).map((_, i) => {
        const idx = i + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-gray-600 mb-1", children: `Member ${idx} Name` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
                placeholder: `Enter Member ${idx} Name`,
                value: (form[`Member ${idx} Name`] ?? "").toString(),
                onChange: (e) => setForm({ ...form, [`Member ${idx} Name`]: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-gray-600 mb-1", children: `Member ${idx} Email` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
                placeholder: `Enter Member ${idx} Email`,
                value: (form[`Member ${idx} Email`] ?? "").toString(),
                onChange: (e) => setForm({ ...form, [`Member ${idx} Email`]: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-gray-600 mb-1", children: `Member ${idx} Phone` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
                placeholder: `Enter Member ${idx} Phone`,
                value: (form[`Member ${idx} Phone`] ?? "").toString(),
                onChange: (e) => setForm({ ...form, [`Member ${idx} Phone`]: e.target.value })
              }
            )
          ] })
        ] }, idx);
      }) }),
      leaderRequired && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Team Leader" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary",
            value: (form["Team Leader"] ?? "").toString(),
            onChange: (e) => setForm({ ...form, ["Team Leader"]: e.target.value }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Leader" }),
              Array.from({ length: requiredTeamSize }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i + 1, children: `Member ${i + 1}` }, i + 1))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "px-4 py-2 rounded border hover:bg-gray-100 transition-colors",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
          disabled: busy || !validateForm(),
          onClick: submit,
          children: busy ? "Processing..." : "Register"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: successOpen, onOpenChange: (open) => {
      setSuccessOpen(open);
      if (!open) {
        onClose();
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Registration Successful" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "You have been registered successfully." })
      ] }),
      whatsappLink ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Join the WhatsApp group for further updates:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: whatsappLink,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center justify-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700",
            children: "Open WhatsApp Group"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No WhatsApp link provided." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "px-4 py-2 rounded border hover:bg-gray-100 transition-colors",
          onClick: () => setSuccessOpen(false),
          children: "Close"
        }
      ) })
    ] }) })
  ] });
};
const Registration = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  const handleSuccess = () => {
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-2", children: "Join CSI RSCOE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Become a member of the Computer Society of India - RSCOE Chapter and get access to exclusive events, workshops, and networking opportunities." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegistrationForm,
      {
        onClose: handleClose,
        onSuccess: handleSuccess,
        standalone: true
      }
    )
  ] }) });
};
const NotFound = () => {
  const location = useLocation();
  reactExports.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const queryClient = new QueryClient();
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster$1, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Index, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/blogs", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AllBlogs, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/events", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AllEvents, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/blogs/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogDetails, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/events/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(EventDetails, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/register", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Registration, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {}) })
    ] }) })
  ] }) }) });
};
createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
