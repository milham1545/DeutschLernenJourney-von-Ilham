import { useState, useEffect } from "react";

export const useProgramProgress = () => {
  // State menyimpan ID dokumen yang sudah dicentang
  // Contoh: ["ap_passport", "fsj_cv"]
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Load dari LocalStorage saat pertama kali dibuka
  useEffect(() => {
    const saved = localStorage.getItem("mein_weg_progress");
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Fungsi Toggle (Centang/Uncentang)
  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      let newItems;
      if (prev.includes(id)) {
        newItems = prev.filter((item) => item !== id); // Hapus
      } else {
        newItems = [...prev, id]; // Tambah
      }
      
      // Simpan otomatis
      localStorage.setItem("mein_weg_progress", JSON.stringify(newItems));
      return newItems;
    });
  };

  const isChecked = (id: string) => checkedItems.includes(id);

  // Hitung persentase progress untuk suatu program
  const getProgress = (requirementIds: string[]) => {
    if (requirementIds.length === 0) return 0;
    const checkedCount = requirementIds.filter(id => checkedItems.includes(id)).length;
    return Math.round((checkedCount / requirementIds.length) * 100);
  };

  return { checkedItems, toggleItem, isChecked, getProgress };
};