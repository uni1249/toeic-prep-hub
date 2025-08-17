
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PracticeTests from "./pages/PracticeTests";
import TestSetup from "./pages/TestSetup";
import TestInterface from "./pages/TestInterface";
import TestCreator from "./pages/TestCreator";
import TestCategories from "./pages/TestCategories";
import Flashcards from "./pages/Flashcards";
import FlashcardSet from "./pages/FlashcardSet";
import FlashcardStudy from "./pages/FlashcardStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import Progress from "./pages/Progress";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCategories from "./pages/AdminCategories";
import AdminQuestions from "./pages/AdminQuestions";
import AdminTests from "./pages/AdminTests";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import TestResults from "./pages/TestResults";
import Maintenance from "./pages/Maintenance";

const queryClient = new QueryClient();

const App = () => {
  // Check maintenance mode from environment variable
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'ON';
  
  // If maintenance mode is ON, only show maintenance page
  if (isMaintenanceMode) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Maintenance />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="questions" element={<AdminQuestions />} />
              <Route path="tests" element={<AdminTests />} />
            </Route>
            
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories" element={<TestCategories />} />
                    <Route path="/practice-tests" element={<PracticeTests />} />
                    <Route path="/test-setup/:testId" element={<TestSetup />} />
                    <Route path="/test/:testId" element={<TestInterface />} />
                    <Route path="/test-results/:resultId" element={<TestResults />} />
                    <Route path="/test-creator" element={<TestCreator />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/flashcards/:setId" element={<FlashcardSet />} />
                    <Route path="/flashcards/:setId/study" element={<FlashcardStudy />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:postId" element={<BlogPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
