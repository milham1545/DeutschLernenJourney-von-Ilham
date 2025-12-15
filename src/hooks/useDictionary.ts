import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast"; // Pastikan path ini sesuai dengan projectmu (bisa @/hooks/use-toast)

export interface SavedWord {
  id: number;
  german: string;
  indo: string;
  source?: string;
  timestamp: number;
}

export const useDictionary = () => {
  // PERBAIKAN: Inisialisasi dengan Array Kosong [], bukan data dummy
  const [words, setWords] = useState<SavedWord[]>([]);

  // 1. Load data dari LocalStorage saat pertama kali dibuka
  useEffect(() => {
    const saved = localStorage.getItem("my_dictionary");
    if (saved) {
      try {
        setWords(JSON.parse(saved));
      } catch (error) {
        console.error("Gagal load data kamus:", error);
        setWords([]);
      }
    }
  }, []);

  // 2. Setiap kali 'words' berubah, simpan otomatis ke LocalStorage
  useEffect(() => {
    // Cek panjang array agar tidak menimpa data yang belum terload
    // (Tapi karena inisialisasi [], logic ini aman untuk LocalStorage sederhana)
    localStorage.setItem("my_dictionary", JSON.stringify(words));
  }, [words]);

  // Fungsi Simpan Kata
  const saveWord = (german: string, indo: string, source: string = "Manual") => {
    // Cek duplikat (Case insensitive)
    const isExist = words.some((w) => w.german.toLowerCase() === german.toLowerCase());
    
    if (isExist) {
      toast({
        title: "Sudah tersimpan",
        description: `Kata "${german}" sudah ada di koleksi.`,
      });
      return;
    }

    const newWord: SavedWord = {
      id: Date.now(), // Gunakan timestamp sebagai ID unik
      german,
      indo,
      source,
      timestamp: Date.now(),
    };

    setWords((prev) => [newWord, ...prev]); // Tambah ke paling atas
    
    toast({
      title: "Tersimpan!",
      description: `"${german}" berhasil ditambahkan ke koleksi.`,
    });
  };

  // Fungsi Hapus Kata
  const removeWord = (id: number) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
    toast({
      title: "Dihapus",
      description: "Kata telah dihapus dari koleksi.",
    });
  };

  // Cek status apakah kata sudah disimpan (untuk UI tombol bookmark)
  const isSaved = (german: string) => {
    return words.some((w) => w.german.toLowerCase() === german.toLowerCase());
  };

  return { words, saveWord, removeWord, isSaved };
};