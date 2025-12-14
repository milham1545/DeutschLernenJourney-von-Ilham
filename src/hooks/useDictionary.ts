import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast"; // Pastikan path ini sesuai dengan hook toast kamu

export type SavedWord = {
  id: number;
  german: string;
  indo: string;
  source?: string; // Asal kata (Flashcard / Manual)
  addedAt: string;
};

export const useDictionary = () => {
  const [words, setWords] = useState<SavedWord[]>([]);

  // 1. Load data dari LocalStorage saat aplikasi mulai
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mein_woerterbuch");
      if (saved) {
        try {
          setWords(JSON.parse(saved));
        } catch (e) {
          console.error("Gagal load dictionary", e);
        }
      }
    }
  }, []);

  // 2. Cek apakah kata sudah ada (Case insensitive)
  const isSaved = (germanText: string) => {
    return words.some((w) => w.german.toLowerCase() === germanText.toLowerCase());
  };

  // 3. Fungsi Simpan Kata
  const saveWord = (german: string, indo: string, source: string = "Manual") => {
    if (!german.trim() || !indo.trim()) return;

    if (isSaved(german)) {
      toast({
        title: "Sudah Ada! 😅",
        description: `Kata "${german}" sudah tersimpan di kamus.`,
        variant: "default",
      });
      return;
    }

    const newWord: SavedWord = {
      id: Date.now(),
      german: german.trim(),
      indo: indo.trim(),
      source,
      addedAt: new Date().toLocaleDateString("id-ID"),
    };

    const updatedList = [newWord, ...words];
    setWords(updatedList);
    localStorage.setItem("mein_woerterbuch", JSON.stringify(updatedList));
    
    toast({
      title: "Tersimpan! 📖",
      description: `"${german}" masuk ke Kamus Saya.`,
      className: "bg-green-500 text-white border-2 border-black font-bold",
    });
  };

  // 4. Fungsi Hapus Kata
  const removeWord = (id: number) => {
    const updatedList = words.filter((w) => w.id !== id);
    setWords(updatedList);
    localStorage.setItem("mein_woerterbuch", JSON.stringify(updatedList));
    
    toast({
      title: "Dihapus 🗑️",
      description: "Kata telah dihapus dari kamus.",
    });
  };

  return { words, saveWord, removeWord, isSaved };
};