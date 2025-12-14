import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Book, Volume2, Loader2, Save, Sparkles, Languages, Quote, List, ExternalLink } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import { generateDeclension, determineArticle, guessGender } from "@/utils/grammarGenerator";
import { useDebounce } from "@/hooks/useDebounce";
// Import fungsi suggestion baru
import { fetchWiktionaryData, getWiktionarySuggestions, WikiData } from "@/services/wiktionary"; 
import { toast } from "@/hooks/use-toast";

interface DictionaryData extends WikiData {
  germanWord: string;
  translation: string;
  gender: "m" | "f" | "n" | null;
  grammar: any;
}

const DictionaryPage = () => {
  const { saveWord } = useDictionary();
  
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300); // Delay ngetik
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DictionaryData | null>(null);

  // --- 1. LIVE SUGGESTION DARI WIKTIONARY ---
  useEffect(() => {
    const getSuggestions = async () => {
      // Hanya cari saran jika query minimal 2 huruf
      if (debouncedQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      
      // Panggil API OpenSearch Wiktionary
      const list = await getWiktionarySuggestions(debouncedQuery);
      setSuggestions(list);
      if (list.length > 0) setShowSuggestions(true);
    };

    getSuggestions();
  }, [debouncedQuery]);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- 2. EKSEKUSI PENCARIAN (SAAT KLIK SUGGESTION) ---
  const performSearch = async (selectedWord: string) => {
    setQuery(selectedWord); // Update input box jadi kata yg dipilih
    setShowSuggestions(false); // Tutup dropdown
    setLoading(true);
    setData(null);

    try {
      // A. Ambil Data Detail dari Wiktionary
      // Karena user memilih dari list, ejaan & huruf besar/kecil PASTI BENAR.
      const wikiData = await fetchWiktionaryData(selectedWord);

      // B. Terjemahan Indo (MyMemory)
      let translation = "Terjemahan tidak ditemukan";
      try {
        const resTrans = await fetch(`https://api.mymemory.translated.net/get?q=${selectedWord}&langpair=de|id`);
        const jsonTrans = await resTrans.json();
        if (jsonTrans.responseData.translatedText) {
          translation = jsonTrans.responseData.translatedText;
        }
      } catch (e) { /* Silent fail */ }

      // C. Grammar
      const detectedGender = guessGender(selectedWord);
      const grammarTables = detectedGender ? generateDeclension(selectedWord, detectedGender) : null;

      if (!wikiData && translation === "Terjemahan tidak ditemukan") {
        throw new Error("Data kosong");
      }

      setData({
        germanWord: selectedWord,
        translation: translation,
        gender: detectedGender,
        grammar: grammarTables,
        definitions: wikiData?.definitions.length ? wikiData.definitions : ["Definisi detail belum tersedia."],
        examples: wikiData?.examples.length ? wikiData.examples : [],
        synonyms: wikiData?.synonyms.length ? wikiData.synonyms : []
      });

    } catch (error) {
      toast({
        title: "Tidak Ditemukan 😔",
        description: `Maaf, data untuk "${selectedWord}" belum lengkap di database kami.`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (data) {
      const article = data.gender ? determineArticle(data.gender) : "";
      const fullWord = article ? `${article} ${data.germanWord}` : data.germanWord;
      saveWord(fullWord, data.translation, "Wiktionary Pro");
    }
  };

  const playAudio = () => {
    if (data?.germanWord) {
      const u = new SpeechSynthesisUtterance(data.germanWord);
      u.lang = "de-DE";
      window.speechSynthesis.speak(u);
    }
  };

  const getGenderBadge = (g: string | null) => {
    if (g === "m") return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase border border-blue-200">Der (Mas)</span>;
    if (g === "f") return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase border border-red-200">Die (Fem)</span>;
    if (g === "n") return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase border border-green-200">Das (Neu)</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER & SEARCH */}
      <div className="bg-blue-950 text-white py-10 border-b-4 border-foreground relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 flex items-center justify-center gap-3">
            <Book className="w-8 h-8 text-yellow-400" /> Wörterbuch Pro
          </h1>
          
          {/* SEARCH CONTAINER */}
          <div ref={searchContainerRef} className="max-w-xl mx-auto relative z-50">
            <div className="relative">
              <Input 
                placeholder="Ketik kata (cth: Li...)" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-6 pr-14 rounded-xl text-black text-lg font-bold border-4 border-blue-300 focus-visible:ring-0 focus-visible:border-yellow-400 shadow-xl"
              />
              <Button 
                size="icon" 
                className="absolute right-2 top-2 rounded-lg w-10 h-10 bg-blue-600 hover:bg-blue-700"
                onClick={() => performSearch(query)} // Fallback kalau user langsung enter
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </Button>
            </div>

            {/* SUGGESTION DROPDOWN (INTI FITUR) */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-foreground rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 text-left max-h-80 overflow-y-auto">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => performSearch(sug)} // KLIK -> CARI
                    className="w-full text-left px-6 py-3 hover:bg-blue-50 text-slate-800 font-bold border-b last:border-b-0 border-slate-100 flex items-center gap-2 group"
                  >
                    <Search className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <p className="mt-4 text-blue-200/80 text-sm font-medium">
            Ketik huruf awal, lalu pilih kata dari daftar untuk hasil terbaik.
          </p>
        </div>
      </div>

      {/* RESULT CONTENT */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {data && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KARTU INFO UTAMA */}
            <div className="md:col-span-1 space-y-6">
              <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <CardHeader className="bg-white border-b-2 border-slate-100 pb-4 text-center">
                  <div className="mb-2 flex justify-center">{getGenderBadge(data.gender)}</div>
                  <h2 className="text-4xl font-black text-slate-900 leading-none mb-1 break-words">
                    {data.gender ? determineArticle(data.gender) : ""} {data.germanWord}
                  </h2>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border-2 border-blue-100">
                    <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Terjemahan</p>
                    <p className="text-xl text-blue-800 font-serif italic font-bold">"{data.translation}"</p>
                  </div>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 gap-2 bg-slate-50">
                  <Button variant="outline" className="w-full border-2 border-slate-300 font-bold hover:bg-white" onClick={playAudio}>
                    <Volume2 className="w-4 h-4 mr-2" /> Audio
                  </Button>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black border-2 border-black" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                </CardContent>
              </Card>
              
              <a href={`https://de.wiktionary.org/wiki/${data.germanWord}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 text-xs font-bold text-blue-500 hover:underline">
                Lihat di Wiktionary <ExternalLink className="w-3 h-3"/>
              </a>
            </div>

            {/* KARTU TAB DETAIL */}
            <div className="md:col-span-2">
              <Card className="border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white min-h-[400px]">
                <Tabs defaultValue="bedeutung" className="w-full">
                  <div className="border-b-4 border-foreground bg-slate-100 px-2 pt-2 overflow-x-auto">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-2">
                      {[
                        { val: "bedeutung", label: "Arti", icon: <Book className="w-4 h-4"/> },
                        { val: "beispiele", label: "Contoh", icon: <Quote className="w-4 h-4"/> },
                        { val: "synonyme", label: "Sinonim", icon: <Sparkles className="w-4 h-4"/> },
                        { val: "grammatik", label: "Grammar", icon: <List className="w-4 h-4"/> }
                      ].map(tab => (
                        <TabsTrigger 
                          key={tab.val} 
                          value={tab.val}
                          className="border-2 border-transparent data-[state=active]:border-foreground data-[state=active]:border-b-0 data-[state=active]:bg-white rounded-t-lg px-4 py-3 font-bold uppercase text-xs tracking-widest text-slate-500 data-[state=active]:text-black flex items-center gap-2"
                        >
                          {tab.icon} {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {/* CONTENT TABS */}
                  <TabsContent value="bedeutung" className="p-6 space-y-4">
                    <h3 className="text-lg font-black text-blue-800 mb-2">Definisi (Jerman)</h3>
                    {data.definitions.length > 0 ? (
                      <ul className="space-y-3">
                        {data.definitions.map((def, i) => (
                          <li key={i} className="bg-slate-50 p-3 rounded-lg border-l-4 border-blue-400 text-slate-700 font-medium text-sm md:text-base">
                            {def}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-400 italic">Definisi detail tidak tersedia.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="beispiele" className="p-6 space-y-4">
                    <h3 className="text-lg font-black text-orange-800 mb-2">Contoh Kalimat</h3>
                    {data.examples.length > 0 ? (
                      <div className="space-y-3">
                        {data.examples.map((ex, i) => (
                          <div key={i} className="flex gap-3 items-start bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                            <span className="text-3xl text-orange-300 leading-none select-none">“</span>
                            <p className="text-sm md:text-base text-slate-700 font-serif italic pt-1">{ex}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">Contoh kalimat tidak tersedia.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="synonyme" className="p-6">
                    <h3 className="text-lg font-black text-purple-800 mb-4">Kata Terkait</h3>
                    {data.synonyms.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {data.synonyms.map((syn, i) => (
                          <button 
                            key={i} 
                            onClick={() => performSearch(syn)} // Recursive search
                            className="px-3 py-1.5 bg-white border-2 border-slate-200 hover:border-purple-500 hover:text-purple-700 rounded-full font-bold text-slate-600 transition-all text-sm shadow-sm"
                          >
                            {syn}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">Tidak ada sinonim.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="grammatik" className="p-6">
                    <h3 className="text-lg font-black text-slate-800 mb-4">Tabel Deklinasi (Estimasi)</h3>
                    {data.grammar ? (
                      <div className="overflow-x-auto border-2 border-slate-200 rounded-xl">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100 text-slate-500 uppercase font-bold">
                            <tr><th className="p-3 border-b">Kasus</th><th className="p-3 border-b">Singular</th><th className="p-3 border-b">Plural</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            <tr><td className="p-3 text-slate-400 font-bold">Nom</td><td className="p-3">{data.grammar.singular.nom}</td><td className="p-3">{data.grammar.plural.nom}</td></tr>
                            <tr><td className="p-3 text-slate-400 font-bold">Gen</td><td className="p-3">{data.grammar.singular.gen}</td><td className="p-3">{data.grammar.plural.gen}</td></tr>
                            <tr><td className="p-3 text-slate-400 font-bold">Dat</td><td className="p-3">{data.grammar.singular.dat}</td><td className="p-3">{data.grammar.plural.dat}</td></tr>
                            <tr><td className="p-3 text-slate-400 font-bold">Akk</td><td className="p-3">{data.grammar.singular.akk}</td><td className="p-3">{data.grammar.plural.akk}</td></tr>
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">Data grammar tidak tersedia (mungkin bukan kata benda).</p>
                    )}
                  </TabsContent>

                </Tabs>
              </Card>
            </div>

          </div>
        )}

        {!data && !loading && (
          <div className="text-center py-20 opacity-50 select-none">
            <Book className="w-32 h-32 mx-auto mb-6 text-slate-200" />
            <h3 className="text-2xl font-bold text-slate-400">Wörterbuch</h3>
            <p className="text-slate-400">Ketik kata, pilih dari saran, dan lihat detailnya.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryPage;