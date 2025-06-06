
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Stories from "./frontend/pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Journalists from "./pages/Journalists";
import JournalistDetail from "./pages/JournalistDetail";
import ReadingList from "./pages/ReadingList";
import About from "./pages/About";
import JournalistDashboard from "./pages/JournalistDashboard";
import CreateStory from "./pages/CreateStory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/journalists" element={<Journalists />} />
          <Route path="/journalists/:id" element={<JournalistDetail />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/about" element={<About />} />
          <Route path="/journalist-dashboard/*" element={<JournalistDashboard />} />
          <Route path="/create-story" element={<CreateStory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
