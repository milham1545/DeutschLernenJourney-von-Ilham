import { useState, useEffect } from "react";

export type ActivityType = "word" | "doc" | "quiz" | "system";

export interface Activity {
  id: number;
  type: ActivityType;
  description: string;
  timestamp: number; // Format waktu (Date.now())
}

export const useActivityLog = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load log saat pertama kali dibuka
  useEffect(() => {
    const saved = localStorage.getItem("user_activities");
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, []);

  // Fungsi untuk menambah log baru
  const logActivity = (type: ActivityType, description: string) => {
    const newActivity: Activity = {
      id: Date.now(),
      type,
      description,
      timestamp: Date.now(),
    };

    setActivities((prev) => {
      // Simpan max 20 aktivitas terakhir saja biar memori aman
      const updated = [newActivity, ...prev].slice(0, 20);
      localStorage.setItem("user_activities", JSON.stringify(updated));
      return updated;
    });
  };

  // Helper: Ubah timestamp jadi "2 jam yang lalu"
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  return { activities, logActivity, formatTimeAgo };
};