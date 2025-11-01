import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Discover from "./pages/Discover";
import MyBands from "./pages/MyBands";
import Hub from "./pages/Hub";
import Profile from "./pages/Profile";
import BandHuddle from "./pages/BandHuddle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/discover" 
              element={
                <ProtectedRoute>
                  <>
                    <Discover />
                    <BottomNav />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-bands" 
              element={
                <ProtectedRoute>
                  <>
                    <MyBands />
                    <BottomNav />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bands/:bandId" 
              element={
                <ProtectedRoute>
                  <>
                    <BandHuddle />
                    <BottomNav />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hub" 
              element={
                <ProtectedRoute>
                  <>
                    <Hub />
                    <BottomNav />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <>
                    <Profile />
                    <BottomNav />
                  </>
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
