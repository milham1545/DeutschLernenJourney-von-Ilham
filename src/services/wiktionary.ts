// src/services/wiktionary.ts

export interface WikiData {
  definitions: string[];
  examples: string[];
  synonyms: string[];
}

// 1. FITUR AUTOCOMPLETE (LIVE SUGGESTION)
// Ini yang bikin efek "ketik l muncul list l..."
export const getWiktionarySuggestions = async (query: string): Promise<string[]> => {
  try {
    // API OpenSearch resmi Wiktionary
    const url = `https://de.wiktionary.org/w/api.php?action=opensearch&format=json&origin=*&search=${query}&limit=10`;
    const response = await fetch(url);
    const data = await response.json();
    // Format response Wiktionary: [query, [list suggestion], [desc], [links]]
    // Kita cuma butuh array ke-1 (list suggestion)
    return data[1] || [];
  } catch (error) {
    return [];
  }
};

// 2. PARSER DATA DETAIL
export const fetchWiktionaryData = async (word: string): Promise<WikiData | null> => {
  try {
    const url = `https://de.wiktionary.org/w/api.php?action=parse&page=${word}&prop=text&format=json&origin=*&redirects=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.parse || !data.parse.text) return null;

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data.parse.text["*"], "text/html");

    const definitions: string[] = [];
    const examples: string[] = [];
    const synonyms: string[] = [];

    const cleanText = (text: string) => text.replace(/\[\d+\]|\[[a-z]\]/g, "").trim();

    // Cari semua header (Bedeutungen, Synonyme, dll)
    // Kita cari H3, H4, H5 karena struktur wiki beda-beda tiap kata
    const headers = htmlDoc.querySelectorAll("h2, h3, h4, h5, p"); 

    headers.forEach((header) => {
      const text = header.textContent || "";

      // --- AMBIL ARTI (Bedeutungen) ---
      if (text.includes("Bedeutungen")) {
        let next = header.nextElementSibling;
        // Loop elemen di bawah header sampai ketemu header baru
        while (next && !["H2", "H3", "H4"].includes(next.tagName)) {
          if (next.tagName === "DL" || next.tagName === "UL" || next.tagName === "OL") {
             const items = next.querySelectorAll("dd, li");
             items.forEach(item => {
               const clean = cleanText(item.textContent || "");
               // Filter: Jangan ambil yang kosong atau cuma info grammar singkat
               if (clean && clean.length > 5) definitions.push(clean);
             });
          } else if (next.tagName === "P") {
             // Kadang definisi ada di paragraf dengan nomor [1]
             const clean = cleanText(next.textContent || "");
             if (clean.match(/^\d+/) || clean.length > 10) definitions.push(clean);
          }
          next = next.nextElementSibling;
        }
      }

      // --- AMBIL CONTOH (Beispiele) ---
      if (text.includes("Beispiele")) {
        let next = header.nextElementSibling;
        while (next && !["H2", "H3", "H4"].includes(next.tagName)) {
          if (next.tagName === "UL" || next.tagName === "DL" || next.tagName === "OL") {
             const items = next.querySelectorAll("li, dd");
             items.forEach(item => {
               const clean = cleanText(item.textContent || "");
               if (clean) examples.push(clean);
             });
          }
          next = next.nextElementSibling;
        }
      }

      // --- AMBIL SINONIM (Synonyme) ---
      if (text.includes("Synonyme")) {
        let next = header.nextElementSibling;
        while (next && !["H2", "H3", "H4"].includes(next.tagName)) {
          // Ambil text link saja
          const links = next.querySelectorAll("a");
          links.forEach(a => {
            if (!a.title.includes("Verzeichnis") && !a.title.includes("Anhang")) {
              synonyms.push(a.textContent || "");
            }
          });
          next = next.nextElementSibling;
        }
      }
    });

    return {
      definitions: definitions.slice(0, 8), // Ambil lebih banyak
      examples: examples.slice(0, 6),
      synonyms: [...new Set(synonyms)].slice(0, 10)
    };

  } catch (error) {
    console.error("Wiki Error:", error);
    return null;
  }
};