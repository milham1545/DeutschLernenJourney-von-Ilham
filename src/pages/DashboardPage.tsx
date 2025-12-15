import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDictionary } from "@/hooks/useDictionary";
import { useProgramProgress } from "@/hooks/useProgramProgress"; 
import { useActivityLog } from "@/hooks/useActivityLog";
import { programs } from "@/data/programs"; // Data program lengkap
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LogOut, BookOpen, Map as MapIcon, GraduationCap, Settings, 
  ExternalLink, CheckCircle2, History, Loader2, Eye, EyeOff, Dices 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Import Dialog Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DashboardPage = () => {
  const { user, signOut, updateProfile, loading } = useAuth(); 
  const { words } = useDictionary(); 
  const { getProgress } = useProgramProgress();
  const { activities, formatTimeAgo } = useActivityLog();
  const navigate = useNavigate();

  // STATE: Target Level
  const currentLevel = user?.user_metadata?.target_level || "A1";

  // --- STATE FORM EDIT PROFILE ---
  const [openDialog, setOpenDialog] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLevel, setEditLevel] = useState("A1");
  const [editPassword, setEditPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(""); 

  // --- STATE PILIHAN PROGRAM (DASHBOARD WIDGET) ---
  // Default ke Au Pair kalau belum ada pilihan
  const [viewProgram, setViewProgram] = useState("aupair");

  useEffect(() => {
    if (user && openDialog) {
      setEditName(user.user_metadata.full_name || "");
      setEditLevel(user.user_metadata.target_level || "A1");
      setTempAvatar(user.user_metadata.avatar_url || "");
      setEditPassword(""); 
    }
  }, [user, openDialog]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const regenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${randomSeed}`;
    setTempAvatar(newUrl);
  };

  const handleSaveProfile = async () => {
    const { error } = await updateProfile({
        fullName: editName,
        targetLevel: editLevel,
        avatarUrl: tempAvatar,
        password: editPassword.length > 0 ? editPassword : undefined 
    });

    if (!error) {
        setOpenDialog(false);
    }
  };

  // --- LOGIKA PROGRESS REAL-TIME ---
  const currentProg = programs[viewProgram];
  // Hitung persentase berdasarkan ID requirements program yang dipilih
  const reqIds = currentProg?.requirements.map(r => r.id) || [];
  const progPercent = getProgress(reqIds);

  const totalWords = words.length;
  const masteryLevel = totalWords > 100 ? "B1 Intermediate" : totalWords > 50 ? "A2 Elementary" : "A1 Beginner";

  // Helper Grouping untuk Dropdown Dashboard
  const groupedPrograms = {
    "Program Sosial (Gap Year)": Object.values(programs).filter(p => p.category === "social"), // FSJ & FOJ Masuk sini
    "Edukasi & Bahasa": Object.values(programs).filter(p => !p.category && p.id !== "aus_general" && p.id !== "aupair"), // Studium, dll
    "Au Pair": Object.values(programs).filter(p => p.id === "aupair"),
    "Kesehatan (Medis)": Object.values(programs).filter(p => p.category === "health"),
    "Teknik & IT": Object.values(programs).filter(p => p.category === "tech"),
    "Bisnis & Admin": Object.values(programs).filter(p => p.category === "business"),
    "Gastro & Hotel": Object.values(programs).filter(p => p.category === "gastro"),
    "Handwerk & Logistik": Object.values(programs).filter(p => p.category === "craft" || p.category === "logistics"),
    "Sains": Object.values(programs).filter(p => p.category === "science"),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      
      {/* HEADER BACKGROUND */}
      <div className="h-48 bg-slate-900 w-full relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* === KOLOM KIRI: PROFILE === */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-white p-6 text-center flex flex-col items-center">
                  
                  {/* AVATAR (Tanpa Icon Setting) */}
                  <div className="relative mb-4">
                     <Avatar className="w-32 h-32 border-4 border-foreground shadow-lg">
                        <AvatarImage src={user.user_metadata.avatar_url} />
                        <AvatarFallback className="text-4xl font-black bg-yellow-400 text-black">
                            {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 uppercase">
                    {user.user_metadata.full_name || "User"}
                  </h2>
                  <p className="text-slate-500 font-medium mb-2">{user.email}</p>
                  
                  <span className="mb-6 px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-full text-xs font-black uppercase tracking-widest">
                    Target: {currentLevel}
                  </span>

                  {/* TOMBOL EDIT PROFILE */}
                  <div className="w-full space-y-2">
                     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full border-2 font-bold hover:bg-slate-50">
                                <Settings className="w-4 h-4 mr-2"/> Edit Profile
                            </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-md border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase">Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Ubah informasi akun, level, dan password kamu di sini.
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                                <div className="flex flex-col items-center gap-3">
                                    <Avatar className="w-24 h-24 border-4 border-foreground">
                                        <AvatarImage src={tempAvatar} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <Button size="sm" variant="outline" onClick={regenerateAvatar} className="text-xs font-bold border-2">
                                        <Dices className="w-3 h-3 mr-2" /> Ganti Avatar
                                    </Button>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="name" className="font-bold">Nama Lengkap</Label>
                                    <Input 
                                        id="name" 
                                        value={editName} 
                                        onChange={(e) => setEditName(e.target.value)} 
                                        className="font-bold border-2"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label className="font-bold">Target Level</Label>
                                    <Select value={editLevel} onValueChange={setEditLevel}>
                                        <SelectTrigger className="w-full font-bold border-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A1" className="font-bold">A1 - Pemula</SelectItem>
                                            <SelectItem value="A2" className="font-bold">A2 - Dasar</SelectItem>
                                            <SelectItem value="B1" className="font-bold">B1 - Menengah</SelectItem>
                                            <SelectItem value="B2" className="font-bold">B2 - Mahir</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="pass" className="font-bold">Password Baru <span className="text-slate-400 font-normal text-xs">(Opsional)</span></Label>
                                    <div className="relative">
                                        <Input 
                                            id="pass" 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="Isi jika ingin mengganti"
                                            value={editPassword}
                                            onChange={(e) => setEditPassword(e.target.value)}
                                            className="font-bold border-2 pr-10"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-slate-400 hover:text-black"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="w-full font-bold border-2" onClick={() => setOpenDialog(false)}>
                                    Batal
                                </Button>
                                <Button onClick={handleSaveProfile} className="w-full font-bold bg-yellow-400 text-black hover:bg-yellow-500 border-2 border-black" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin mr-2"/> : "Simpan"}
                                </Button>
                            </div>
                        </DialogContent>
                     </Dialog>
                     
                     <Button 
                        variant="destructive" 
                        className="w-full font-bold border-2 border-black"
                        onClick={handleSignOut}
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Keluar
                     </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* === KOLOM KANAN: DASHBOARD UTAMA === */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. KARTU UTAMA (2 GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* A. TOTAL KATA */}
                <Card className="border-4 border-foreground bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all cursor-default">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest opacity-70 mb-1">Total Hafalan</p>
                            <h3 className="text-5xl font-black">{totalWords}</h3>
                            <p className="text-xs font-bold mt-2">Estimasi: {masteryLevel}</p>
                        </div>
                        <BookOpen className="w-16 h-16 opacity-20" />
                    </CardContent>
                </Card>

                {/* B. PROGRESS MEIN WEG (DYNAMIC DROPDOWN) */}
                <Card className="border-4 border-foreground bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                    <CardHeader className="pb-2 pt-4 px-4 flex flex-col space-y-3">
                        <div className="flex items-center gap-2">
                            <MapIcon className="w-5 h-5 text-blue-600"/> 
                            <span className="font-black text-sm uppercase">Cek Progress:</span>
                        </div>
                        
                        {/* DROPDOWN DINAMIS SEMUA PROGRAM */}
                        <select 
                            className="w-full text-sm font-bold bg-slate-100 border-2 border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-500 transition-colors cursor-pointer"
                            value={viewProgram}
                            onChange={(e) => setViewProgram(e.target.value)}
                        >
                            {Object.entries(groupedPrograms).map(([groupName, progs]) => (
                                progs.length > 0 && (
                                    <optgroup key={groupName} label={groupName}>
                                        {progs.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.title}
                                            </option>
                                        ))}
                                    </optgroup>
                                )
                            ))}
                        </select>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                        <div className="flex items-end gap-2 mb-2">
                            <span className={
                                `text-4xl font-black ${progPercent === 100 ? 'text-green-600' : 'text-blue-600'}`
                            }>
                                {progPercent}%
                            </span>
                            <span className="text-sm font-bold text-slate-400 mb-1">Dokumen Lengkap</span>
                        </div>
                        
                        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div 
                                className={`h-full transition-all duration-1000 ease-out ${progPercent === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                                style={{ width: `${progPercent}%` }}
                            ></div>
                        </div>
                        
                        <p className="text-xs text-slate-500 mt-3 font-medium line-clamp-1">
                            {currentProg?.title || "Program tidak ditemukan"}
                        </p>

                        <Link to="/mein-weg" className="text-xs font-bold text-blue-600 hover:underline mt-1 inline-flex items-center gap-1">
                            Lihat Checklist <ExternalLink className="w-3 h-3"/>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* 2. ACTIVITY FEED */}
            <Card className="border-4 border-foreground bg-white">
                <CardHeader className="border-b-2 border-slate-100 bg-slate-50 flex flex-row items-center gap-2">
                     <History className="w-5 h-5 text-slate-500"/>
                     <CardTitle className="text-lg font-black">Aktivitas Terakhir</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {activities.length > 0 ? (
                        <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                            {activities.map((act) => (
                                <div key={act.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                                        act.type === 'word' ? 'bg-yellow-100 border-yellow-300 text-yellow-700' :
                                        act.type === 'doc' ? 'bg-blue-100 border-blue-300 text-blue-700' :
                                        'bg-slate-100 border-slate-300 text-slate-700'
                                    }`}>
                                        {act.type === 'word' && <BookOpen className="w-4 h-4"/>}
                                        {act.type === 'doc' && <CheckCircle2 className="w-4 h-4"/>}
                                        {act.type === 'quiz' && <GraduationCap className="w-4 h-4"/>}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 text-sm leading-tight">{act.description}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                            {formatTimeAgo(act.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-slate-400">
                            <p>Belum ada aktivitas.</p>
                            <p className="text-xs">Mulai belajar untuk melihat riwayat di sini.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;