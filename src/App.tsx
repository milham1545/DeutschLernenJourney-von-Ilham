import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext"; // 1. Import Context

// Import Halaman
import Index from "./pages/Index";
import LevelPage from "./pages/LevelPage";
import FlashcardPage from "./pages/FlashcardPage";
import ProgressPage from "./pages/ProgressPage";
import MaterialPage from "./pages/MaterialPage";
import ExamPages from "@/pages/ExamPages"; 
import PlannerPage from "./pages/PlannerPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import QuizPage from "./pages/QuizPages";
import DictionaryPage from "./pages/DictPages"; // Tetap pakai DictPages sesuai kodemu

// 2. Import Halaman Baru
import MeinWegPage from "@/pages/MeinWegPage";

// Import Halaman Auth (YANG BARU DIBUAT)
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";

import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        
        <ScrollToTop />
        
        {/* 3. BUNGKUS DENGAN AUTHPROVIDER DI SINI */}
        <AuthProvider>
            
            {/* Header ditaruh di sini agar muncul di semua halaman */}
            <Header />
            
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Rute Belajar Kosakata */}
              <Route path="/level/:levelId" element={<LevelPage />} />
              
              {/* Rute Flashcard */}
              <Route path="/flashcard" element={<FlashcardPage />} />
              
              {/* Rute Progress/Statistik */}
              <Route path="/progress" element={<ProgressPage />} />
              
              {/* Rute Study Planner */}
              <Route path="/planner" element={<PlannerPage />} />

              {/* Rute Materi */}
              <Route path="/material/:levelId" element={<MaterialPage />} />

              {/* Rute Simulasi Ujian */}
              <Route path="/simulation/:examId" element={<ExamPages />} />

              <Route path="/quiz/:levelId" element={<QuizPage />} />
              <Route path="/dictionary" element={<DictionaryPage />} />
              
              {/* Rute Mein Weg (BARU) */}
              <Route path="/mein-weg" element={<MeinWegPage />} />

              {/* Rute Auth (Login & Register) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Halaman 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

        </AuthProvider>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;