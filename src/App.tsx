import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Halaman
import Index from "./pages/Index";
import LevelPage from "./pages/LevelPage";
import FlashcardPage from "./pages/FlashcardPage";
import ProgressPage from "./pages/ProgressPage";
import MaterialPage from "./pages/MaterialPage";
import ExamPages from "@/pages/ExamPages"; // Halaman Ujian Real-Time
import PlannerPage from "./pages/PlannerPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import QuizPage from "./pages/QuizPages";
import DictionaryPage from "./pages/DictPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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

          {/* Rute Materi (Belajar Teori & Tips Ujian) */}
          {/* Menangani /material/A1, /material/B1, dan /material/EXAM_A1 */}
          <Route path="/material/:levelId" element={<MaterialPage />} />

          {/* Rute Simulasi Ujian (Timer & Soal Interaktif) */}
          {/* Ini yang kemarin kurang/salah, makanya Not Found */}
          <Route path="/simulation/:examId" element={<ExamPages />} />

          <Route path="/quiz/:levelId" element={<QuizPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />

          {/* Halaman 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;