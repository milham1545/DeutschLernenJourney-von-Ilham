import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Bookmark, BookmarkCheck } from "lucide-react";
import { Vocabulary } from "@/data/lessons";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  vocabulary: Vocabulary;
  index: number;
  total: number;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

const FlashCard = ({ vocabulary, index, total, isBookmarked, onBookmark }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(vocabulary.german);
    utterance.lang = "de-DE";
    window.speechSynthesis.speak(utterance);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.();
  };

  return (
    <div
      className="perspective-1000 h-[400px] w-full max-w-xl mx-auto cursor-pointer group select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-all duration-500 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* --- SISI DEPAN (JERMAN) --- */}
        <div className="absolute inset-0 w-full h-full backface-hidden z-10">
          <Card className="w-full h-full border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white flex flex-col items-center justify-center p-8 relative">
            
            {/* Tombol-tombol Aksi (HANYA MUNCUL DI DEPAN) */}
            {/* Kita sembunyikan opacity-nya kalau dibalik biar ga jadi hantu */}
            <div className={cn(
              "absolute top-4 right-4 flex gap-2 z-20 transition-opacity duration-200",
              isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
              
              {/* Tombol Audio */}
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full hover:bg-slate-100 w-10 h-10" 
                onClick={playAudio}
              >
                <Volume2 className="w-6 h-6 text-blue-600" />
              </Button>
              
              {/* Tombol Save / Bookmark */}
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-full hover:bg-yellow-50 w-10 h-10 transition-colors", 
                  isBookmarked ? "text-yellow-500 hover:bg-red-50 hover:text-red-500" : "text-slate-300 hover:text-yellow-500"
                )} 
                onClick={handleBookmarkClick}
                title={isBookmarked ? "Hapus dari simpanan" : "Simpan kata"}
              >
                {isBookmarked ? <BookmarkCheck className="w-6 h-6 fill-current" /> : <Bookmark className="w-6 h-6" />}
              </Button>
            </div>

            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Bahasa Jerman
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-center text-foreground break-words max-w-full">
              {vocabulary.german}
            </h2>
            <p className="absolute bottom-6 text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
              Ketuk untuk membalik
            </p>
          </Card>
        </div>

        {/* --- SISI BELAKANG (INDONESIA) --- */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 z-10">
          <Card className="w-full h-full border-4 border-blue-600 shadow-[8px_8px_0px_0px_#2563eb] bg-blue-600 text-white flex flex-col items-center justify-center p-8 relative">
            
            {/* BERSIH: Tidak ada tombol apapun di sini */}
            

            <span className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-4 border-b-2 border-blue-400/30 pb-1">
              Artinya
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-center break-words leading-tight">
              {vocabulary.indonesian}
            </h2>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default FlashCard;