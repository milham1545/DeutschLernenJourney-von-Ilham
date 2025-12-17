import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// --- PERBAIKAN DISINI: Menambahkan semua icon yang dipakai ---
import { 
  Loader2, UploadCloud, ShieldAlert, FileJson, LogOut, Plus, Trash2, Edit2, Search, 
  Layers, BookOpen, Crown, BookText, FileCode, Sparkles, LayoutDashboard, Database,
  Menu, X, Home, ArrowLeft, UserCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Tipe Data
type Level = { id: string; title: string; description: string };
type Lesson = { id: string; title: string; slug: string; level_id: string; order_index: number };
type Vocab = { id: string; german: string; indonesian: string; example: string; lesson_id: string };
type CourseMaterialDB = { id: string; title: string; section_id: string; level_id: string; order_index: number; content: any };

const AdminPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State Global
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [activeMenu, setActiveMenu] = useState<"dashboard" | "vocab" | "material" | "import">("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("Admin");

  // Data State
  const [levels, setLevels] = useState<Level[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [materials, setMaterials] = useState<CourseMaterialDB[]>([]);
  
  // Stats
  const [stats, setStats] = useState({ levels: 0, lessons: 0, vocabs: 0, materials: 0 });

  // Selection State
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  
  // Import State
  const [importType, setImportType] = useState<"vocab" | "material">("vocab");
  const [jsonInput, setJsonInput] = useState("");

  // UI State
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [materialDialogOpen, setMaterialDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<"level" | "lesson" | "vocab">("vocab");
  
  // Form Inputs
  const [formData, setFormData] = useState({
    id: "", title: "", description: "", slug: "", order_index: 0,
    german: "", indonesian: "", example: ""
  });

  const [materialForm, setMaterialForm] = useState({
    id: "", title: "", section_id: "", level_id: "A1", order_index: 0,
    contentJson: "[]"
  });

  // 1. CEK ROLE & INIT
  useEffect(() => {
    const checkRole = async () => {
      if (!user) { setIsCheckingRole(false); return; }
      const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      
      if (user.user_metadata?.full_name) {
          setFullName(user.user_metadata.full_name);
      }

      if (data?.role === "admin") {
        setIsAdmin(true);
        fetchLevels();
        fetchStats();
      }
      setIsCheckingRole(false);
    };
    checkRole();
  }, [user]);

  // 2. FETCH DATA & STATS
  const fetchStats = async () => {
      const { count: cLevels } = await supabase.from("levels").select("*", { count: "exact", head: true });
      const { count: cLessons } = await supabase.from("lessons").select("*", { count: "exact", head: true });
      const { count: cVocabs } = await supabase.from("vocabularies").select("*", { count: "exact", head: true });
      const { count: cMaterials } = await supabase.from("course_materials").select("*", { count: "exact", head: true });
      setStats({ 
          levels: cLevels || 0, 
          lessons: cLessons || 0, 
          vocabs: cVocabs || 0, 
          materials: cMaterials || 0 
      });
  };

  const fetchLevels = async () => {
    const { data } = await supabase.from("levels").select("*").order("id");
    if (data) setLevels(data);
  };

  const fetchLessons = async (levelId: string) => {
    setIsLoadingData(true);
    const { data } = await supabase.from("lessons").select("*").eq("level_id", levelId).order("order_index");
    if (data) setLessons(data);
    setIsLoadingData(false);
  };

  const fetchVocabs = async (lessonId: string) => {
    setIsLoadingData(true);
    const { data } = await supabase.from("vocabularies").select("*").eq("lesson_id", lessonId).order("german");
    if (data) setVocabs(data);
    setIsLoadingData(false);
  };

  const fetchMaterials = async (levelId: string) => {
    setIsLoadingData(true);
    const { data } = await supabase.from("course_materials").select("*").eq("level_id", levelId).order("order_index");
    if (data) setMaterials(data);
    setIsLoadingData(false);
  };

  // Efek Berantai
  useEffect(() => {
    if (selectedLevelId) {
        if (activeMenu === "vocab") {
            fetchLessons(selectedLevelId);
            setSelectedLessonId(null);
            setVocabs([]);
        } else if (activeMenu === "material") {
            fetchMaterials(selectedLevelId);
        }
    }
  }, [selectedLevelId, activeMenu]);

  useEffect(() => {
    if (selectedLessonId && activeMenu === "vocab") fetchVocabs(selectedLessonId);
  }, [selectedLessonId]);


  // 3. CRUD LOGIC
  const handleSave = async () => {
    setIsUploading(true);
    try {
      let error = null;
      if (formType === "vocab") {
        if (!selectedLessonId) throw new Error("Pilih Bab dulu!");
        const payload = { german: formData.german, indonesian: formData.indonesian, example: formData.example, lesson_id: selectedLessonId };
        if (editingItem) {
            const { error: err } = await supabase.from("vocabularies").update(payload).eq("id", editingItem.id);
            error = err;
        } else {
            const { error: err } = await supabase.from("vocabularies").insert(payload);
            error = err;
        }
        if (!error) fetchVocabs(selectedLessonId);
      } else if (formType === "lesson") {
        if (!selectedLevelId) throw new Error("Pilih Level dulu!");
        const payload = { title: formData.title, slug: formData.slug, order_index: formData.order_index, level_id: selectedLevelId };
        if (editingItem) {
            const { error: err } = await supabase.from("lessons").update(payload).eq("id", editingItem.id);
            error = err;
        } else {
            const { error: err } = await supabase.from("lessons").insert(payload);
            error = err;
        }
        if (!error) fetchLessons(selectedLevelId);
      }
      if (error) throw error;
      toast({ title: "Berhasil! ✅", description: "Data berhasil disimpan." });
      setDialogOpen(false);
      resetForm();
      fetchStats();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveMaterial = async () => {
      setIsUploading(true);
      try {
          let parsedContent;
          try {
              parsedContent = JSON.parse(materialForm.contentJson);
          } catch (e) {
              throw new Error("Format JSON Konten Salah!");
          }

          const payload = {
              level_id: materialForm.level_id,
              section_id: materialForm.section_id,
              title: materialForm.title,
              order_index: materialForm.order_index,
              content: parsedContent
          };

          let error = null;
          if (editingItem) {
              const { error: err } = await supabase.from("course_materials").update(payload).eq("id", editingItem.id);
              error = err;
          } else {
              const { error: err } = await supabase.from("course_materials").insert(payload);
              error = err;
          }

          if (error) throw error;
          
          toast({ title: "Materi Tersimpan! 📚", description: "Database diperbarui." });
          setMaterialDialogOpen(false);
          if (selectedLevelId) fetchMaterials(selectedLevelId);
          fetchStats();

      } catch (err: any) {
          toast({ variant: "destructive", title: "Gagal Simpan", description: err.message });
      } finally {
          setIsUploading(false);
      }
  };

  const handleDelete = async (id: string, type: "vocab" | "lesson" | "material") => {
    if (!confirm("Yakin hapus? Data tidak bisa dikembalikan.")) return;
    try {
        if (type === "vocab") {
            await supabase.from("vocabularies").delete().eq("id", id);
            if (selectedLessonId) fetchVocabs(selectedLessonId);
        } else if (type === "lesson") {
            await supabase.from("lessons").delete().eq("id", id);
            if (selectedLevelId) fetchLessons(selectedLevelId);
        } else if (type === "material") {
            await supabase.from("course_materials").delete().eq("id", id);
            if (selectedLevelId) fetchMaterials(selectedLevelId);
        }
        toast({ title: "Terhapus", description: "Data sudah hilang." });
        fetchStats();
    } catch (err) { console.error(err); }
  };

  // --- TOOLS ---
  const openEditDialog = (item: any, type: "vocab" | "lesson") => {
    setFormType(type);
    setEditingItem(item);
    setFormData({ ...formData, ...item });
    setDialogOpen(true);
  };

  const openCreateDialog = (type: "vocab" | "lesson") => {
    setFormType(type);
    setEditingItem(null);
    resetForm();
    setDialogOpen(true);
  };

  const openMaterialDialog = (item: any | null) => {
      setEditingItem(item);
      if (item) {
          setMaterialForm({
              id: item.id,
              title: item.title,
              section_id: item.section_id,
              level_id: item.level_id,
              order_index: item.order_index,
              contentJson: JSON.stringify(item.content, null, 2)
          });
      } else {
          setMaterialForm({
              id: "", title: "", section_id: "", level_id: selectedLevelId || "A1", order_index: 0,
              contentJson: '[\n  { "type": "text", "content": "Tulis materi di sini..." }\n]'
          });
      }
      setMaterialDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ id: "", title: "", description: "", slug: "", order_index: 0, german: "", indonesian: "", example: "" });
  };

  const handleSmartImport = async () => {
    if (!jsonInput) return;
    setIsUploading(true);
    try {
        const data = JSON.parse(jsonInput);
        
        if (importType === "vocab") {
            if (!data.level_id || !data.title || !data.slug) throw new Error("JSON Vocab Invalid. Butuh level_id, title, slug.");
            const { data: lesson, error } = await supabase.from("lessons").upsert({
                level_id: data.level_id, slug: data.slug, title: data.title, order_index: 99
            }, { onConflict: 'slug' }).select().single();
            if (error) throw error;
            if (data.vocabulary?.length) {
                const vocabPayload = data.vocabulary.map((v: any) => ({ 
                    lesson_id: lesson.id, german: v.german, indonesian: v.indonesian, example: v.example 
                }));
                const { error: vocabErr } = await supabase.from("vocabularies").insert(vocabPayload);
                if (vocabErr) throw vocabErr;
            }
            toast({ title: "Import Berhasil", description: `Bab '${data.title}' berhasil ditambahkan.` });
        } else {
            if (!data.level_id || !data.section_id || !data.content) throw new Error("JSON Materi Invalid. Butuh section_id, content.");
            const { error } = await supabase.from("course_materials").upsert({
                level_id: data.level_id, section_id: data.section_id, title: data.title,
                order_index: data.order_index || 99, content: data.content,
                tips: data.tips || [], resources: data.resources || []
            }, { onConflict: 'section_id' });
            if (error) throw error;
            toast({ title: "Import Berhasil", description: `Materi '${data.title}' berhasil disimpan.` });
        }
        setJsonInput("");
        fetchStats();
    } catch (e: any) {
        toast({ variant: "destructive", title: "Gagal Import", description: e.message });
    } finally {
        setIsUploading(false);
    }
  };

  const getPlaceholder = () => {
      if (importType === "vocab") {
          return `{
  "level_id": "A1",
  "title": "Judul Bab",
  "slug": "judul_bab_unik",
  "vocabulary": [
    { "german": "Apfel", "indonesian": "Apel", "example": "Ich esse..." }
  ]
}`;
      } else {
          return `{
  "level_id": "A1",
  "section_id": "unik_id_materi",
  "title": "Judul Materi",
  "order_index": 1,
  "content": [
    { "type": "text", "content": "Halo dunia." },
    { "type": "table", "headers": ["A", "B"], "rows": [["1", "2"]] }
  ],
  "tips": ["Tips 1"],
  "resources": []
}`;
      }
  };

  if (isCheckingRole) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin h-10 w-10 text-slate-800"/></div>;
  if (!user || !isAdmin) return <div className="h-screen flex items-center justify-center">Access Denied</div>;

  return (
    // FIX: Full Page Overlay to hide global header (Z-index high + fixed)
    <div className="fixed inset-0 z-[99999] flex bg-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR (Diperbarui: Posisi Kanan untuk Mobile & Tablet, Kiri untuk Desktop Large) */}
      {/* Overlay Backdrop Mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={cn(
          "fixed lg:relative z-50 h-full w-72 flex flex-col transition-transform duration-300 ease-in-out bg-white border-l lg:border-r lg:border-l-0 border-slate-200 shadow-2xl lg:shadow-none",
          // LOGIKA CSS UTAMA DIPERBAIKI UNTUK TABLET:
          // md (Tablet): Masih dianggap 'mobile' (hidden by default, muncul dari kanan)
          // lg (Desktop): Baru muncul permanen di kiri
          "right-0 lg:left-0 lg:right-auto", 
          mobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-1.5 rounded">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">Admin<span className="text-slate-400">Panel</span></span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden"><X className="w-5 h-5"/></button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
              <button onClick={() => {setActiveMenu("dashboard"); setMobileMenuOpen(false)}} className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all", activeMenu === "dashboard" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50")}>
                  <Home className="w-4 h-4"/> Dashboard
              </button>
              
              <div className="my-6 border-t border-slate-100"></div>
              
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Content</p>
              <button onClick={() => {setActiveMenu("vocab"); setMobileMenuOpen(false)}} className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all", activeMenu === "vocab" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50")}>
                  <Database className="w-4 h-4"/> Database Kosakata
              </button>
              <button onClick={() => {setActiveMenu("material"); setMobileMenuOpen(false)}} className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all", activeMenu === "material" ? "bg-green-50 text-green-700" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50")}>
                  <BookText className="w-4 h-4"/> Materi Bacaan
              </button>

              <div className="my-6 border-t border-slate-100"></div>
              
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">System</p>
              <button onClick={() => {setActiveMenu("import"); setMobileMenuOpen(false)}} className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all", activeMenu === "import" ? "bg-purple-50 text-purple-700" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50")}>
                  <FileJson className="w-4 h-4"/> Import JSON
              </button>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button onClick={() => navigate("/")} className="w-full flex items-center gap-2 text-slate-500 hover:text-black text-sm font-medium mb-3 px-2">
                  <ArrowLeft className="w-4 h-4"/> Kembali ke Website
              </button>
              <div className="flex items-center gap-3 px-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-slate-500"/>
                  </div>
                  <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">{fullName}</p>
                      <p className="text-[10px] text-slate-500 truncate">Administrator</p>
                  </div>
                  <button onClick={() => { signOut(); navigate("/login"); }} className="text-slate-400 hover:text-red-500"><LogOut className="w-4 h-4"/></button>
              </div>
          </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
          
          {/* Mobile & Tablet Header (< 1024px) */}
          <div className="lg:hidden px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-1.5 rounded-lg">
                    <Crown className="w-4 h-4 text-white fill-white" />
                  </div>
                  <span className="font-black text-lg text-slate-900 tracking-tight">Admin<span className="text-purple-600">.Dash</span></span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 active:scale-95 transition-transform"
              >
                <Menu className="w-6 h-6"/>
              </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="max-w-6xl mx-auto pb-20">
                  
                  {/* --- 1. DASHBOARD --- */}
                  {activeMenu === "dashboard" && (
                      <div className="space-y-8 animate-in fade-in duration-500">
                          <div className="flex flex-col gap-1">
                              <h1 className="text-3xl font-bold text-slate-900">Selamat Datang, {fullName.split(" ")[0]}.</h1>
                              <p className="text-slate-500">Berikut adalah ringkasan konten pembelajaran saat ini.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {[
                                  { label: "Level Aktif", val: stats.levels, icon: Crown, color: "text-blue-600", bg: "bg-blue-50" },
                                  { label: "Total Bab", val: stats.lessons, icon: Layers, color: "text-green-600", bg: "bg-green-50" },
                                  { label: "Kosakata", val: stats.vocabs, icon: BookOpen, color: "text-yellow-600", bg: "bg-yellow-50" },
                                  { label: "Materi Bacaan", val: stats.materials, icon: BookText, color: "text-purple-600", bg: "bg-purple-50" },
                              ].map((item, i) => (
                                  <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                                      <CardContent className="p-6 flex items-center gap-4">
                                          <div className={cn("p-3 rounded-xl", item.bg, item.color)}>
                                              <item.icon className="w-6 h-6"/>
                                          </div>
                                          <div>
                                              <p className="text-2xl font-bold text-slate-900">{item.val}</p>
                                              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.label}</p>
                                          </div>
                                      </CardContent>
                                  </Card>
                              ))}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                                  <CardContent className="p-8">
                                      <div className="mb-6">
                                          <h3 className="text-xl font-bold mb-2">Ingin menambah data massal?</h3>
                                          <p className="text-slate-400 text-sm">Gunakan fitur import JSON untuk mempercepat proses input materi dan kosakata.</p>
                                      </div>
                                      <Button onClick={() => setActiveMenu("import")} className="bg-white text-black hover:bg-slate-200 font-bold border-0">
                                          Mulai Import JSON
                                      </Button>
                                  </CardContent>
                              </Card>
                          </div>
                      </div>
                  )}

                  {/* --- 2. VOCAB MANAGER --- */}
                  {activeMenu === "vocab" && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center justify-between">
                              <h2 className="text-2xl font-bold text-slate-900">Kelola Kosakata</h2>
                          </div>

                          <Card className="border shadow-sm">
                              <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <Label className="text-xs uppercase text-slate-500 font-bold">Pilih Level</Label>
                                      <Select onValueChange={(val) => setSelectedLevelId(val)}>
                                          <SelectTrigger className="h-11 bg-slate-50 border-slate-200"><SelectValue placeholder="Pilih Level..." /></SelectTrigger>
                                          <SelectContent>{levels.map(l => <SelectItem key={l.id} value={l.id}>{l.id} - {l.title}</SelectItem>)}</SelectContent>
                                      </Select>
                                  </div>
                                  <div className="space-y-2">
                                      <Label className="text-xs uppercase text-slate-500 font-bold">Pilih Bab</Label>
                                      <Select disabled={!selectedLevelId} onValueChange={(val) => setSelectedLessonId(val)} value={selectedLessonId || ""}>
                                          <SelectTrigger className="h-11 bg-slate-50 border-slate-200"><SelectValue placeholder={isLoadingData ? "Loading..." : "Pilih Bab..."} /></SelectTrigger>
                                          <SelectContent>{lessons.map(l => <SelectItem key={l.id} value={l.id}>{l.title}</SelectItem>)}</SelectContent>
                                      </Select>
                                  </div>
                              </CardContent>
                          </Card>

                          {selectedLevelId && !selectedLessonId && (
                              <Card className="border shadow-sm">
                                  <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
                                      <h3 className="font-bold text-slate-700">Daftar Bab ({selectedLevelId})</h3>
                                      <Button onClick={() => openCreateDialog("lesson")} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold"><Plus className="w-4 h-4 mr-1"/> Bab Baru</Button>
                                  </div>
                                  <Table>
                                      <TableHeader><TableRow><TableHead>Index</TableHead><TableHead>Judul</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                                      <TableBody>
                                          {lessons.map(ls => (
                                              <TableRow key={ls.id}>
                                                  <TableCell className="font-bold text-slate-500">#{ls.order_index}</TableCell>
                                                  <TableCell className="font-medium">{ls.title}</TableCell>
                                                  <TableCell className="text-right space-x-2">
                                                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEditDialog(ls, "lesson")}><Edit2 className="w-4 h-4 text-slate-500"/></Button>
                                                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDelete(ls.id, "lesson")}><Trash2 className="w-4 h-4 text-red-500"/></Button>
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </Card>
                          )}

                          {selectedLessonId && (
                              <Card className="border shadow-sm">
                                  <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
                                      <h3 className="font-bold text-slate-700">Daftar Kata</h3>
                                      <Button onClick={() => openCreateDialog("vocab")} size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold"><Plus className="w-4 h-4 mr-1"/> Kata Baru</Button>
                                  </div>
                                  <Table>
                                      <TableHeader><TableRow><TableHead>Jerman</TableHead><TableHead>Indonesia</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                                      <TableBody>
                                          {vocabs.map(v => (
                                              <TableRow key={v.id}>
                                                  <TableCell className="font-bold text-blue-700">{v.german}</TableCell>
                                                  <TableCell>{v.indonesian}</TableCell>
                                                  <TableCell className="text-right space-x-2">
                                                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEditDialog(v, "vocab")}><Edit2 className="w-4 h-4 text-slate-500"/></Button>
                                                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDelete(v.id, "vocab")}><Trash2 className="w-4 h-4 text-red-500"/></Button>
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                              </Card>
                          )}
                      </div>
                  )}

                  {/* --- 3. MATERIAL MANAGER --- */}
                  {activeMenu === "material" && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <h2 className="text-2xl font-bold text-slate-900">Content Management</h2>
                              <div className="flex gap-2 bg-white p-1 rounded-lg border shadow-sm">
                                  {levels.map(l => (
                                      <button key={l.id} onClick={() => { setSelectedLevelId(l.id); fetchMaterials(l.id); }} className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all", selectedLevelId === l.id ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50")}>{l.id}</button>
                                  ))}
                              </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <button onClick={() => openMaterialDialog(null)} className="h-[180px] rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 gap-3 group">
                                  <div className="p-3 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors"><Plus className="w-6 h-6"/></div>
                                  <span className="font-bold text-sm">Buat Materi Baru</span>
                              </button>

                              {materials.map((mat) => (
                                  <div key={mat.id} className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all group flex flex-col">
                                      <div className="flex justify-between items-start mb-3">
                                          <span className="px-2 py-1 bg-slate-100 text-[10px] font-mono font-bold text-slate-500 rounded">{mat.section_id}</span>
                                          <span className="text-xs font-bold text-slate-300">#{mat.order_index}</span>
                                      </div>
                                      <h3 className="font-bold text-lg leading-snug mb-6 line-clamp-2 text-slate-800 group-hover:text-blue-600 transition-colors">{mat.title}</h3>
                                      <div className="mt-auto flex gap-2 pt-4 border-t border-slate-50">
                                          <Button onClick={() => openMaterialDialog(mat)} variant="outline" size="sm" className="flex-1 h-9 text-xs font-bold">Edit</Button>
                                          <Button onClick={() => handleDelete(mat.id, "material")} variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4"/></Button>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* --- 4. IMPORT --- */}
                  {activeMenu === "import" && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                          <h2 className="text-2xl font-bold text-slate-900">Import JSON</h2>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                              <Card className="lg:col-span-1 border-0 shadow-sm h-fit">
                                  <CardContent className="p-6 space-y-4">
                                      <div className="space-y-2">
                                          <Label className="text-xs font-bold uppercase text-slate-500">Tipe Data</Label>
                                          <Select value={importType} onValueChange={(val: any) => setImportType(val)}>
                                              <SelectTrigger className="font-bold"><SelectValue /></SelectTrigger>
                                              <SelectContent><SelectItem value="vocab">KOSAKATA</SelectItem><SelectItem value="material">MATERI</SelectItem></SelectContent>
                                          </Select>
                                      </div>
                                      <div className="bg-slate-50 p-4 rounded-lg border text-xs font-mono text-slate-600 overflow-auto max-h-[400px]">
                                          <p className="font-bold mb-2 text-slate-400">Template:</p>
                                          <pre className="whitespace-pre-wrap break-words">{getPlaceholder()}</pre>
                                      </div>
                                  </CardContent>
                              </Card>
                              <Card className="lg:col-span-2 border-0 shadow-sm flex flex-col">
                                  <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base font-bold flex items-center gap-2"><FileCode className="w-4 h-4"/> Editor</CardTitle></CardHeader>
                                  <CardContent className="p-0 flex-1 flex flex-col">
                                      <Textarea 
                                          className="flex-1 min-h-[400px] border-0 rounded-none p-6 font-mono text-xs focus-visible:ring-0 bg-white"
                                          placeholder="// Paste JSON di sini..."
                                          value={jsonInput}
                                          onChange={(e) => setJsonInput(e.target.value)}
                                          spellCheck={false}
                                      />
                                      <div className="p-4 border-t bg-slate-50 flex justify-end">
                                          <Button onClick={handleSmartImport} disabled={isUploading || !jsonInput} className="font-bold bg-black text-white hover:bg-slate-800">
                                              {isUploading ? <Loader2 className="animate-spin w-4 h-4 mr-2"/> : <UploadCloud className="w-4 h-4 mr-2"/>}
                                              Proses Import
                                          </Button>
                                      </div>
                                  </CardContent>
                              </Card>
                          </div>
                      </div>
                  )}

              </div>
          </div>
      </main>

      {/* --- DIALOG EDIT FORM --- */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-xl">
              <DialogHeader><DialogTitle>{editingItem ? "Edit Data" : "Tambah Baru"}</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                  {formType === "vocab" ? (
                      <>
                          <div className="space-y-1"><Label className="text-xs font-bold text-slate-500">Jerman</Label><Input value={formData.german} onChange={e => setFormData({...formData, german: e.target.value})} className="font-bold"/></div>
                          <div className="space-y-1"><Label className="text-xs font-bold text-slate-500">Indonesia</Label><Input value={formData.indonesian} onChange={e => setFormData({...formData, indonesian: e.target.value})} className="font-bold"/></div>
                          <div className="space-y-1"><Label className="text-xs font-bold text-slate-500">Contoh</Label><Textarea value={formData.example} onChange={e => setFormData({...formData, example: e.target.value})} /></div>
                      </>
                  ) : (
                      <>
                          <div className="space-y-1"><Label className="text-xs font-bold text-slate-500">Judul Bab</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="font-bold"/></div>
                          <div className="space-y-1"><Label className="text-xs font-bold text-slate-500">Slug</Label><Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="font-mono text-sm"/></div>
                          <div className="space-y-1"><Label className="text-xs font-bold text-slate-500">Urutan</Label><Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} /></div>
                      </>
                  )}
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleSave} disabled={isUploading}>Simpan</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* --- DIALOG MATERI JSON --- */}
      <Dialog open={materialDialogOpen} onOpenChange={setMaterialDialogOpen}>
          <DialogContent className="max-w-4xl w-[95vw] h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl border-0 shadow-2xl bg-white">
              <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between bg-slate-50/50">
                  <DialogTitle className="flex items-center gap-2"><FileCode className="w-5 h-5 text-purple-600"/> JSON Content Editor</DialogTitle>
              </DialogHeader>
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  <div className="w-full md:w-80 bg-white p-6 overflow-y-auto border-r space-y-4">
                      <div className="space-y-1"><Label className="text-xs font-bold">Judul</Label><Input value={materialForm.title} onChange={e => setMaterialForm({...materialForm, title: e.target.value})} className="font-bold"/></div>
                      <div className="space-y-1"><Label className="text-xs font-bold">Section ID</Label><Input value={materialForm.section_id} onChange={e => setMaterialForm({...materialForm, section_id: e.target.value})} className="font-mono text-xs"/></div>
                      <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1"><Label className="text-xs font-bold">Urutan</Label><Input type="number" value={materialForm.order_index} onChange={e => setMaterialForm({...materialForm, order_index: parseInt(e.target.value)})} /></div>
                          <div className="space-y-1"><Label className="text-xs font-bold">Level</Label><Select value={materialForm.level_id} onValueChange={(val) => setMaterialForm({...materialForm, level_id: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{levels.map(l => <SelectItem key={l.id} value={l.id}>{l.id}</SelectItem>)}</SelectContent></Select></div>
                      </div>
                  </div>
                  <div className="flex-1 bg-slate-950 p-0 relative flex flex-col">
                      <div className="absolute top-0 right-0 bg-white/10 text-white text-[10px] font-mono px-3 py-1 font-bold z-10">RAW JSON</div>
                      <Textarea className="flex-1 font-mono text-sm bg-transparent text-green-400 border-none resize-none p-6 focus-visible:ring-0 leading-relaxed" value={materialForm.contentJson} onChange={e => setMaterialForm({...materialForm, contentJson: e.target.value})} spellCheck={false} />
                  </div>
              </div>
              <DialogFooter className="px-6 py-4 border-t bg-white">
                  <Button variant="outline" onClick={() => setMaterialDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleSaveMaterial} disabled={isUploading} className="bg-green-600 hover:bg-green-700 text-white">Simpan Materi</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminPage;