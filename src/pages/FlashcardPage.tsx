import { useState, useEffect, useCallback } from "react";
// Import Icon lengkap
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, List, Layers, Trash2, Volume2 } from "lucide-react";
import { levels, getFlashcardsForLevel, Vocabulary } from "@/data/lessons";
import { saveLastCardPosition, loadLastCardPosition } from "@/utils/progress";
import FlashCard from "@/components/FlashCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/hooks/useDictionary"; 
// Import Card component untuk tampilan List
import { Card, CardContent } from "@/components/ui/card";

const FlashcardPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("A1");
  const [currentIndex, setCurrentIdx] = useState(0);
  const [flashcards, setFlashcards] = useState<Vocabulary[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  // State Mode Tampilan
  const [viewMode, setViewMode] = useState<"deck" | "list">("deck");

  // Panggil Hook Dictionary (Ambil saveWord, isSaved, words, dan removeWord)
  const { saveWord, isSaved, words, removeWord } = useDictionary();

  // Filter kata disimpan per Level
  const savedWordsForLevel = words.filter(w => w.source === `Flashcard ${selectedLevel}`);

  useEffect(() => {
    const cards = getFlashcardsForLevel(selectedLevel);
    setFlashcards(cards);
    
    // Load posisi card hanya kalau mode deck
    if (viewMode === "deck") {
        const savedIndex = loadLastCardPosition(selectedLevel);
        setCurrentIdx(Math.min(savedIndex, cards.length - 1));
    }
    
    setIsShuffled(false);
  }, [selectedLevel, viewMode]);

  useEffect(() => {
    if (flashcards.length > 0 && viewMode === "deck") {
      saveLastCardPosition(selectedLevel, currentIndex);
    }
  }, [currentIndex, selectedLevel, flashcards.length, viewMode]);

  const goToNext = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  }, [currentIndex, flashcards.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIdx(randomIndex);
  }, [flashcards.length]);

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIdx(0);
    setIsShuffled(true);
  };

  const resetOrder = () => {
    const cards = getFlashcardsForLevel(selectedLevel);
    setFlashcards(cards);
    setCurrentIdx(0);
    setIsShuffled(false);
  };

  // --- LOGIKA BARU (TOGGLE SIMPAN/HAPUS) ---
  const handleBookmark = () => {
    const currentCard = flashcards[currentIndex]; 
    if (currentCard) {
      // Cek apakah sudah disimpan?
      if (isSaved(currentCard.german)) {
        // JIKA SUDAH -> Cari ID-nya lalu HAPUS
        const wordToDelete = words.find(w => w.german === currentCard.german);
        if (wordToDelete) {
          removeWord(wordToDelete.id);
        }
      } else {
        // JIKA BELUM -> SIMPAN
        saveWord(currentCard.german, currentCard.indonesian, `Flashcard ${selectedLevel}`);
      }
    }
  };
  
  const playAudio = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    window.speechSynthesis.speak(u);
  };

  // Keyboard navigation
  useEffect(() => {
    if (viewMode === "list") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "r" || e.key === "R") goToRandom();
      if (e.key === "s" || e.key === "S") handleBookmark(); 
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, goToRandom, currentIndex, flashcards, viewMode, words]); // Tambah words ke dependency

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b-4 border-foreground bg-secondary sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-0">
                <span className="bg-foreground text-background px-4 py-2">FLASHCARD</span>
            </h1>

            {/* KONTROL LEVEL & MODE TAMPILAN */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Level Buttons */}
                <div className="flex gap-2">
                    {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => { setSelectedLevel(level.id); setCurrentIdx(0); setViewMode("deck"); }}
                        className={cn(
                        "px-4 py-2 font-bold border-4 border-foreground transition-all text-sm",
                        selectedLevel === level.id
                            ? "bg-foreground text-background shadow-sm"
                            : "bg-card hover:bg-accent"
                        )}
                    >
                        {level.id}
                    </button>
                    ))}
                </div>

                <div className="h-8 w-1 bg-foreground/20 hidden md:block"></div>

                {/* Toggle Deck / List */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode("deck")}
                        className={cn(
                            "p-2 border-2 border-foreground rounded font-bold flex items-center gap-2 transition-all",
                            viewMode === "deck" ? "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-transparent opacity-50 hover:opacity-100"
                        )}
                        title="Mode Kartu"
                    >
                        <Layers size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                            "p-2 border-2 border-foreground rounded font-bold flex items-center gap-2 transition-all relative",
                            viewMode === "list" ? "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-transparent opacity-50 hover:opacity-100"
                        )}
                        title="Daftar Disimpan"
                    >
                        <List size={20} />
                        {savedWordsForLevel.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-black font-bold">
                                {savedWordsForLevel.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
          </div>
          
          {isShuffled && viewMode === "deck" && (
            <div className="mt-4 inline-block px-3 py-1 bg-accent border-2 border-foreground text-sm">
              🔀 Mode acak aktif
            </div>
          )}
        </div>
      </section>

      {/* Progress Bar Area (Hanya Muncul di Mode Deck) */}
      {viewMode === "deck" && (
        <section className="container mx-auto px-4">
            {flashcards.length > 0 ? (
            <>
                <div className="mt-8 max-w-lg mx-auto">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Kartu {currentIndex + 1}</span>
                    <span>{flashcards.length} total</span>
                </div>
                <div className="h-3 bg-accent border-2 border-foreground">
                    <div
                    className="h-full bg-foreground transition-all"
                    style={{
                        width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
                    }}
                    />
                </div>
                </div>
            </>
            ) : (
            <div className="text-center py-12 border-4 border-foreground mt-8">
                <p className="text-xl text-muted-foreground">Tidak ada flashcard untuk level ini.</p>
            </div>
            )}
        </section>
      )}

      {/* MAIN CONTENT AREA */}
      <section className="container mx-auto px-4 py-12">
        
        {/* === MODE 1: DECK (KARTU) === */}
        {viewMode === "deck" && flashcards.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <FlashCard
              key={`${selectedLevel}-${currentIndex}-${flashcards[currentIndex]?.german}`}
              vocabulary={flashcards[currentIndex]}
              index={currentIndex}
              total={flashcards.length}
              isBookmarked={isSaved(flashcards[currentIndex]?.german)}
              onBookmark={handleBookmark}
            />

            {/* Controls */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="w-full sm:w-auto"
              >
                <ChevronLeft size={20} className="mr-2" />
                Sebelumnya
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={goToRandom}
                className="w-full sm:w-auto"
              >
                <Shuffle size={20} className="mr-2" />
                Acak
              </Button>
              
              <Button
                size="lg"
                onClick={goToNext}
                disabled={currentIndex === flashcards.length - 1}
                className="w-full sm:w-auto"
              >
                Selanjutnya
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </div>

            {/* Additional Controls */}
            <div className="mt-6 flex justify-center gap-4">
              {!isShuffled ? (
                <Button variant="outline" onClick={shuffleCards}>
                  <Shuffle size={16} className="mr-2" />
                  Acak Semua Kartu
                </Button>
              ) : (
                <Button variant="outline" onClick={resetOrder}>
                  <RotateCcw size={16} className="mr-2" />
                  Reset Urutan
                </Button>
              )}
            </div>

            {/* Keyboard Hints (Hidden di Mobile/Tablet) */}
            <div className="mt-8 text-center text-sm text-muted-foreground hidden lg:block">
              <p className="font-mono">
                Gunakan tombol <kbd className="px-2 py-1 bg-accent border border-foreground rounded text-xs mx-1">←</kbd>
                <kbd className="px-2 py-1 bg-accent border border-foreground rounded text-xs mx-1">→</kbd> untuk navigasi,
                <kbd className="px-2 py-1 bg-accent border border-foreground rounded text-xs mx-1">R</kbd> untuk acak,
                <kbd className="px-2 py-1 bg-accent border border-foreground rounded text-xs mx-1">S</kbd> untuk simpan/hapus
              </p>
            </div>
          </div>
        )}

        {/* === MODE 2: LIST (DAFTAR SIMPANAN) === */}
        {viewMode === "list" && (
            <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
                <div className="mb-6 flex justify-between items-end border-b-2 border-slate-200 pb-4">
                    <div>
                        <h2 className="text-2xl font-black uppercase">Disimpan ({selectedLevel})</h2>
                        <p className="text-slate-500 text-sm">Kata sulit yang kamu simpan dari level {selectedLevel}.</p>
                    </div>
                </div>

                {savedWordsForLevel.length > 0 ? (
                    <div className="grid gap-3">
                        {savedWordsForLevel.map((word) => (
                            <Card key={word.id} className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => playAudio(word.german)}
                                            className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                                        >
                                            <Volume2 size={18} />
                                        </button>
                                        <div>
                                            <h3 className="text-lg font-black">{word.german}</h3>
                                            <p className="text-slate-500 font-medium">{word.indo}</p>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => removeWord(word.id)}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-xl">
                        <List className="w-12 h-12 mx-auto text-slate-200 mb-2" />
                        <p className="text-slate-500 font-bold">Belum ada kata disimpan di Level {selectedLevel}.</p>
                        <p className="text-sm text-slate-400 mt-1">Tekan tombol bookmark pada kartu untuk menyimpan.</p>
                        <Button 
                            variant="link" 
                            className="mt-2 text-blue-600 font-bold"
                            onClick={() => setViewMode("deck")}
                        >
                            Kembali ke Kartu
                        </Button>
                    </div>
                )}
            </div>
        )}

      </section>
    </div>
  );
};

export default FlashcardPage;