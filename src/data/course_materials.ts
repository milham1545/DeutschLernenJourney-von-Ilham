import { supabase } from "@/lib/supabase";

// --- TIPE DATA ---
export type ContentBlock = 
  | { type: "text"; content: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type ResourceLink = {
  title: string;
  url: string;
  type: "video" | "pdf" | "audio" | "web";
};

export interface MaterialSection {
  id: string;
  title: string;
  content: ContentBlock[]; 
  tips?: string[];
  resources?: ResourceLink[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  description: string;
  sections: MaterialSection[];
}

// --- FUNGSI FETCHER DARI DATABASE (YANG DICARI ERROR) ---
export const getCourseMaterialsFromDB = async (levelId: string): Promise<CourseMaterial | null> => {
  try {
    const { data, error } = await supabase
      .from("course_materials")
      .select("*")
      .eq("level_id", levelId)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching materials:", error);
      return null;
    }

    if (!data || data.length === 0) return null;

    // Info Level (Manual Mapping untuk Judul/Deskripsi)
    const levelInfo: Record<string, { title: string; desc: string }> = {
      "A1": { title: "Materi A1 - Pemula (Beginner)", desc: "Pondasi utama bahasa Jerman: Cara baca, struktur kalimat, grammar dasar." },
      "A2": { title: "Materi A2 - Dasar Lanjutan", desc: "Level Survival. Menceritakan masa lalu dan kalimat majemuk." },
      "B1": { title: "Materi B1 - Menengah", desc: "Menuju kefasihan. Struktur kalimat kompleks dan diskusi abstrak." },
      "B2": { title: "Materi B2 - Expert", desc: "Bahasa tingkat tinggi, nuansa, dan gaya bahasa akademis." },
    };

    const info = levelInfo[levelId] || { title: `Materi ${levelId}`, desc: "Materi pembelajaran." };

    // Rakit Object CourseMaterial
    const result: CourseMaterial = {
      id: levelId,
      title: info.title,
      description: info.desc,
      sections: data.map((item: any) => ({
        id: item.section_id,
        title: item.title,
        content: item.content, 
        tips: item.tips,
        resources: item.resources
      }))
    };

    return result;

  } catch (err) {
    console.error(err);
    return null;
  }
};

// --- DATA HARDCODE LAMA (TETAP DISIMPAN UNTUK ADMIN MIGRASI) ---
export const courseMaterials: CourseMaterial[] = [
  // --- LEVEL A1 (SUPER LENGKAP & RAPI) ---
  {
    id: "A1",
    title: "Materi A1 - Pemula (Beginner)",
    description: "Pondasi utama bahasa Jerman: Cara baca, struktur kalimat, grammar dasar, hingga percakapan sehari-hari.",
    sections: [
      // 1. ALFABET & PENGUCAPAN
      {
        id: "a1_1_alphabet",
        title: "1. Alfabet & Cara Baca (Aussprache)",
        content: [
          { 
            type: "text", 
            content: "Bahasa Jerman itu unik karena 'apa yang tertulis, itulah yang dibaca' (konsisten), tapi ada beberapa aturan vokal dan konsonan khusus yang wajib kamu tahu biar gak terdengar aneh." 
          },
          {
            type: "table",
            headers: ["Huruf", "Cara Baca (Mirip Indo)", "Contoh Kata"],
            rows: [
              ["Ä (ä)", "'E' (seperti: Ember)", "Äpfel (Ep-fel)"],
              ["Ö (ö)", "'O' (bibir manyun)", "Schön (Syoen)"],
              ["Ü (ü)", "'U' (bibir manyun)", "Übung (Ue-bung)"],
              ["EI", "'AI' (seperti: Pandai)", "Mein (Main), Eis (Ais)"],
              ["IE", "'II' (I panjang)", "Sie (Zii), Liebe (Lii-be)"],
              ["EU/ÄU", "'OI' (seperti: Amboi)", "Euro (Oi-ro), Häuser (Hoi-zer)"]
            ]
          },
          {
            type: "text",
            content: "ATURAN KONSONAN PENTING:\n1. **W** dibaca 'V'. (Wasser -> Vasser)\n2. **V** dibaca 'F'. (Vater -> Fater)\n3. **J** dibaca 'Y'. (Ja -> Ya)\n4. **S** di awal kata dibaca 'Z'. (Sonne -> Zonne)\n5. **Z** dibaca 'TS'. (Zoo -> Tsoo)\n6. **ß** (Eszett) dibaca 'SS'. (Straße -> Stras-se)\n7. **Ch** setelah a/o/u = 'Hach' (Kasar). Setelah i/e = 'Hish' (Lembut)."
          }
        ],
        tips: [
          "Jangan malu manyun saat mengucapkan Ö dan Ü. Itu kunci aksen Jerman yang bagus!",
          "Ingat rumus: 'EI' dibaca AI, 'IE' dibaca II. Jangan terbalik!",
          "Huruf 'R' di Jerman diucapkan di tenggorokan (seperti orang berkumur), bukan di ujung lidah."
        ],
        resources: [
          { title: "Nicos Weg A1: Alphabet", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "video" },
          { title: "Video Pengucapan (Deutsch für Euch)", url: "https://www.youtube.com/watch?v=4lOUzhb2yog", type: "video" }
        ]
      },

      // 2. SALAM & PERKENALAN
      {
        id: "a1_2_begruessung",
        title: "2. Salam & Perkenalan (Begrüßung)",
        content: [
          {
            type: "text",
            content: "Membedakan Formal (**Sie/Ihnen**) dan Informal (**Du/Dir**) adalah tanda sopan santun yang wajib di Jerman.\n\nSALAM & UCAPAN DASAR:\n- **Tschüss!** = Sampai Jumpa (Santai/Ke Teman)\n- **Auf Wiedersehen!** = Sampai Jumpa (Formal/Ke Orang Tua)\n- **Danke** = Terima kasih\n- **Bitte** = Sama-sama / Silakan"
          },
          {
            type: "table",
            headers: ["Situasi", "Pertanyaan (Apa kabar?)", "Jawaban"],
            rows: [
              ["Informal", "Wie geht's?", "Gut, danke. Und dir?"],
              ["Formal", "Wie geht es Ihnen?", "Sehr gut, danke. Und Ihnen?"]
            ]
          },
          {
            type: "text",
            content: "PERKENALAN DIRI (Sich vorstellen):\n1. Nama: \"Ich heiße Ilham\" / \"Ich bin Ilham\".\n2. Asal: \"Ich komme aus Indonesien\".\n3. Tempat Tinggal: \"Ich wohne in Jakarta\".\n4. Bahasa: \"Ich spreche Indonesisch und ein bisschen Deutsch\"."
          }
        ],
        tips: [
          "Hafalkan 'Tschüss' sebagai ucapan perpisahan paling umum sehari-hari.",
          "Jangan kaget, orang Jerman sering menyapa dengan 'Moin' di utara, atau 'Servus' di selatan!"
        ],
        resources: [
          { title: "Easy German: Greetings", url: "https://www.youtube.com/watch?v=3ryX7tY5fHQ", type: "video" },
          { title: "Podcast: Vorstellung (Slow German)", url: "https://slowgerman.com/", type: "audio" }
        ]
      },

      // 3. PERSONAL PRONOUN & SEIN
      {
        id: "a1_3_pronomen",
        title: "3. Kata Ganti & To Be (Sein)",
        content: [
          {
            type: "text",
            content: "Kata kerja **Sein** (to be) adalah kata kerja **ireguler** (tidak beraturan) yang paling penting. Kamu harus hafal di luar kepala."
          },
          {
            type: "table",
            headers: ["Subjek (Indo)", "Subjek (Jerman)", "Sein (To Be)"],
            rows: [
              ["Saya", "ich", "bin"],
              ["Kamu (Santai)", "du", "bist"],
              ["Dia (Lk/Pr/Net)", "er/sie/es", "ist"],
              ["Kami", "wir", "sind"],
              ["Kalian", "ihr", "seid"],
              ["Mereka / Anda", "sie / Sie", "sind"]
            ]
          },
          {
            type: "text",
            content: "CONTOH PENGGUNAAN:\n- Woher **bist** du? (Dari mana kamu?)\n- Wir **sind** in Berlin. (Kami ada di Berlin.)\n- Er **ist** sehr müde. (Dia laki-laki sangat lelah.)"
          }
        ],
        tips: [
          "Hafalan unik: 'Dua orang BIST di dalam bis, tiga orang IST di kursi'. (Du bist, Er/Sie/Es ist)",
          "Ingat: 'Sie' (huruf besar) artinya 'Anda', 'sie' (kecil) artinya 'mereka' atau 'dia perempuan'. Perhatikan konteks!"
        ],
        resources: [
          { title: "Latihan Online Verb 'Sein'", url: "https://www.schubert-verlag.de/aufgaben/uebungen_a1/a1_kap1_sein.htm", type: "web" }
        ]
      },
      
      // 4. KONJUGASI KATA KERJA "HABEN" (Iregular)
      {
        id: "a1_4_haben",
        title: "4. Kata Kerja Khusus: Haben (Mempunyai)",
        content: [
          {
            type: "text",
            content: "Sama seperti 'Sein', kata kerja **Haben** (to have) juga **ireguler**. Kata kerja ini hampir selalu diikuti objek dalam kasus **Akkusativ**."
          },
          {
            type: "table",
            headers: ["Subjek", "Haben (Konjugasi)", "Makna"],
            rows: [
              ["ich", "habe", "saya punya"],
              ["du", "hast", "kamu punya"],
              ["er/sie/es", "hat", "dia punya"],
              ["wir", "haben", "kami punya"],
              ["ihr", "habt", "kalian punya"],
              ["sie/Sie", "haben", "mereka/Anda punya"]
            ]
          },
          {
            type: "text",
            content: "CONTOH PENGGUNAAN:\n- **Ich habe** einen Hund. (Saya punya seekor anjing).\n- **Du hast** viel Zeit. (Kamu punya banyak waktu).\n- **Hat** er Geld? (Apakah dia punya uang?)"
          }
        ],
        tips: [
          "Hafalkan 'HAST-HAT': Yang aneh hanya di DU (hast - b-nya hilang) dan ER/SIE/ES (hat - b-nya hilang).",
          "Sisanya (habe, haben, habt) masih mirip bentuk aslinya."
        ],
        resources: [
          { title: "Penjelasan Haben vs Sein (Video)", url: "https://www.youtube.com/watch?v=Example", type: "video" }
        ]
      },

      // 5. KONJUGASI KATA KERJA REGULER
      {
        id: "a1_5_verbs",
        title: "5. Konjugasi Kata Kerja Reguler",
        content: [
          {
            type: "text",
            content: "Di bahasa Jerman, kata kerja berubah ujungnya (akhiran) tergantung SIAPA yang melakukan. \nRumus Dasar: **Stamm (Kata Dasar) + Akhiran**."
          },
          {
            type: "table",
            headers: ["Subjek", "Akhiran", "Hasil (Kommen - Datang)"],
            rows: [
              ["ich", "-e", "komm-e"],
              ["du", "-st", "komm-st"],
              ["er/sie/es", "-t", "komm-t"],
              ["wir", "-en", "komm-en"],
              ["ihr", "-t", "komm-t"],
              ["sie/Sie", "-en", "komm-en"]
            ]
          },
          {
            type: "text",
            content: "PENGECEUALIAN (Stamm berakhiran t, d, gn): Tambah **-e-** sebelum -st atau -t agar lidah tidak keseleo.\nContoh: **Arbeiten** (Bekerja) -> Arbeit-\n- du arbeit**est**\n- er/sie/es arbeit**et**\n- ihr arbeit**et**"
          }
        ],
        tips: [
          "Jembatan keledai untuk hafalan akhiran: **'EST-TEN-TEN'** (e, st, t, en, t, en).",
          "Wir dan Sie selalu kembali ke bentuk asli (Infinitiv)."
        ],
        resources: [
          { title: "Latihan Konjugasi Online", url: "https://deutsch.lingolia.com/de/grammatik/verben/praesens/uebungen", type: "web" }
        ]
      },

      // 6. GENDER & ARTIKEL
      {
        id: "a1_6_articles",
        title: "6. Gender Kata Benda (Der, Die, Das)",
        content: [
          {
            type: "text",
            content: "Setiap kata benda punya 'Jenis Kelamin' (Gender). Tidak ada logika pasti (kenapa meja laki-laki, lampu perempuan?). Jadi, **hafal artikelnya** bersamaan dengan kosakatanya."
          },
          {
            type: "table",
            headers: ["Gender", "Artikel", "Contoh", "Plural (Jamak)"],
            rows: [
              ["Maskulin (Lk)", "Der", "Der Mann, Der Tisch", "Die Tische"],
              ["Feminin (Pr)", "Die", "Die Frau, Die Lampe", "Die Lampen"],
              ["Neutral", "Das", "Das Kind, Das Auto", "Die Autos"]
            ]
          },
          {
            type: "table",
            headers: ["Gender", "Akhiran Khas", "Contoh"],
            rows: [
              ["DER (Maskulin)", "-er, -ling, -or, -ismus", "Der Lehr**er**, Der Schmetter**ling**, Der Mot**or**"],
              ["DIE (Feminin)", "-e, -ung, -heit, -keit, -schaft, -ion", "Die Lamp**e**, Die Wohn**ung**, Die Frei**heit**, Die Nat**ion**"],
              ["DAS (Neutral)", "-chen, -lein, -ma, -um, -ment", "Das Mäd**chen** (Gadis itu Neutral!), Das The**ma**, Das Doku**ment**"]
            ]
          },
          {
            type: "text",
            content: "PETUNJUK GENDER (Tips):\n- **DER**: Hari, Bulan, Musim, -er, -or.\n- **DIE**: -ung, -heit, -keit, -schaft, -tion, -ie.\n- **DAS**: Warna, Huruf, -chen (kecil), -lein. \n**PENGECUALIAN PENTING:**\n- **Das Mädchen**: Kenapa gadis neutral? Karena akhiran **-chen** (kecil) selalu Neutral.\n- Kata serapan bahasa Inggris (The ...) biasanya jadi **Das** (Das Baby, Das Hotel)."
          }
        ],
        tips: [
          "Beli spidol warna! Biru=Der, Merah=Die, Hijau=Das. Tulis kata benda di post-it dan tempel di barang aslinya di rumah.",
          "Ingat: Semua bentuk JAMAK (Plural) artikelnya selalu **DIE**.",
          "Kalau ragu dan akhirannya **-e**, tebak saja **DIE**. Peluang benarnya 90%.",
          "Hari, Bulan, Musim, dan Merek Mobil selalu **DER**."
        ],
        resources: [
          { title: "Aplikasi Der Die Das (Android/iOS)", url: "https://play.google.com/store/apps/details?id=com.lubosmikusiak.articless", type: "web" }
        ]
      },

      // 7. ANGKA, WAKTU & HARI
      {
        id: "a1_7_time",
        title: "7. Angka, Hari, dan Waktu",
        content: [
          {
            type: "text",
            content: "Sistem angka Jerman agak unik mulai dari angka 21 ke atas: **Satuan disebut duluan sebelum puluhan**."
          },
          {
            type: "table",
            headers: ["Angka", "Jerman", "Angka", "Jerman"],
            rows: [
              ["1-10", "eins, zwei, drei...", "13-19", "dreizehn, vierzehn..."],
              ["20", "zwanzig", "30", "dreißig (pakai ß)"],
              ["21", "**einundzwanzig**", "99", "**neunundneunzig**"]
            ]
          },
          {
            type: "text",
            content: "PREPOSISI WAKTU PENTING:\n- **am** (an dem): Hari (am Montag), Tanggal, Bagian hari (am Morgen).\n- **um**: Jam (um 10 Uhr).\n- **im** (in dem): Bulan (im Juli), Musim (im Sommer), Tahun."
          }
        ],
        tips: [
          "Untuk angka 21-99, baca dari kanan ke kiri! (52 -> zwei-und-fünfzig).",
          "Kecuali angka 11 (elf) dan 12 (zwölf) yang punya nama sendiri."
        ],
        resources: [
          { title: "Lagu Angka 1-100", url: "https://www.youtube.com/watch?v=KO9DAnw39do", type: "video" }
        ]
      },

      // 8. STRUKTUR KALIMAT (SATZBAU)
      {
        id: "a1_8_satzbau",
        title: "8. Struktur Kalimat (Aturan Emas)",
        content: [
          {
            type: "text",
            content: "Bahasa Jerman sangat ketat soal posisi kata kerja. Aturan Emas: **VERB SELALU POSISI KE-2** dalam kalimat berita."
          },
          {
            type: "table",
            headers: ["Jenis Kalimat", "Posisi 1", "Verb (2)", "Posisi 3", "Sisa"],
            rows: [
              ["Normal", "Ich", "**trinke**", "heute", "Kaffee."],
              ["Inversi (Waktu di depan)", "Heute", "**trinke**", "ich", "Kaffee."],
              ["Tanya (W-Frage)", "Was", "**trinkst**", "du", "?"],
              ["Tanya (Ja/Nein)", "**Trinkst**", "du", "Kaffee", "?"]
            ]
          },
          {
            type: "text",
            content: "**NEGASI (TIDAK):**\n- **Nicht**: Untuk menolak kata kerja/sifat. (Ich schlafe **nicht**).\n- **Kein/Keine**: Untuk menolak kata benda (Saya **tidak** punya uang -> Ich habe **kein** Geld)."
          }
        ],
        tips: [
          "Jika kamu menaruh 'Besok' (Morgen) di depan kalimat, Subjek (Ich) harus mengalah dan pindah ke posisi 3. Verb tetap raja di posisi 2.",
          "Jangan bilang 'Morgen ich gehe'. Tapi 'Morgen gehe ich'."
        ],
        resources: [
          { title: "Easy German: Word Order", url: "https://www.youtube.com/watch?v=RMsG7q6Hq9U", type: "video" }
        ]
      },
      
      // 9. KASUS AKKUSATIV
      {
        id: "a1_9_akkusativ",
        title: "9. Kasus Akkusativ (Objek)",
        content: [
          {
            type: "text",
            content: "Dalam bahasa Jerman, artikel berubah jika kata benda menjadi **Objek**. Perubahan ini HANYA terjadi pada gender **MASKULIN (DER)**."
          },
          {
            type: "table",
            headers: ["Gender", "Nominativ (Subjek)", "Akkusativ (Objek)", "Contoh"],
            rows: [
              ["Maskulin", "der / ein", "**den / einen**", "Ich habe **einen** Bruder."],
              ["Feminin", "die / eine", "die / eine (Tetap)", "Ich suche **die** Tasche."],
              ["Neutral", "das / ein", "das / ein (Tetap)", "Ich esse **ein** Eis."],
              ["Plural", "die", "die (Tetap)", "Wir lieben **die** Bücher."]
            ]
          },
          {
            type: "text",
            content: "KATA KERJA PEMICU AKKUSATIV:\n- haben, brauchen, suchen, kaufen, essen, trinken, sehen, lieben, nehmen, bestellen."
          }
        ],
        tips: [
          "Rumus Cepat: Kalau ada 'Haben' (punya), pasti belakangnya Akkusativ.",
          "Hafalkan 'Nese': **N** (Nominativ) - **E** (ein) | **S** (Subjek) - **E** (einen)."
        ],
        resources: [
          { title: "Latihan Akkusativ PDF", url: "https://www.nthuleen.com/teach/grammar/akkusativexpl.html", type: "pdf" }
        ]
      },

      // 10. KOSAKATA TEMATIK
      {
        id: "a1_10_vocab",
        title: "10. Kosakata: Keluarga & Makanan",
        content: [
          {
            type: "text",
            content: "Kosakata dasar yang wajib dikuasai untuk bertahan hidup."
          },
          {
            type: "table",
            headers: ["Keluarga (Familie)", "Makanan (Essen)", "Sifat (Adjektiv)"],
            rows: [
              ["Der Vater (Ayah)", "Das Brot (Roti)", "Groß (Besar)"],
              ["Die Mutter (Ibu)", "Das Wasser (Air)", "Klein (Kecil)"],
              ["Die Eltern (Ortu)", "Der Apfel (Apel)", "Schön (Indah)"],
              ["Der Bruder (Sdr Lk)", "Die Milch (Susu)", "Teuer (Mahal)"],
              ["Die Schwester (Sdr Pr)", "Der Käse (Keju)", "Billig (Murah)"]
            ]
          },
          {
            type: "text",
            content: "KALIMAT BERGUNA:\n- **Ich habe Hunger / Durst.** (Saya lapar / haus).\n- **Das schmeckt gut!** (Rasanya enak!).\n- **Ich möchte bezahlen, bitte.** (Saya mau bayar)."
          }
        ],
        tips: [
          "Gunakan 'gern' (suka) setelah kata kerja untuk menyatakan hobi. 'Ich esse gern Pizza' (Saya suka makan pizza).",
          "Jangan gunakan 'lieben' untuk makanan kecuali kamu benar-benar cinta mati."
        ],
        resources: [
          { title: "Goethe A1 Wordlist (Full)", url: "https://www.goethe.de/pro/relaunch/prf/en/Goethe-Zertifikat_A1_Wortliste.pdf", type: "pdf" }
        ]
      },

      // 11. MODAL VERBS (TAMBAHAN FINAL)
      {
        id: "a1_11_modalverben",
        title: "11. Modal Verbs (Kata Kerja Bantu)",
        content: [
          {
            type: "text",
            content: "Modal verbs memberi 'rasa' pada kalimat (ingin, harus, bisa). Struktur kalimatnya unik: **Modal Verb** di posisi 2, **Verb Utama** dilempar ke paling belakang."
          },
          {
            type: "table",
            headers: ["Modal", "Arti", "Contoh Kalimat"],
            rows: [
              ["können", "Bisa (Skill)", "Ich **kann** gut kochen."],
              ["müssen", "Harus (Wajib)", "Wir **müssen** lernen."],
              ["wollen", "Ingin (Kuat)", "Er **will** nach Hause gehen."],
              ["möchten", "Ingin (Sopan)", "Ich **möchte** einen Tee trinken."],
              ["dürfen", "Boleh (Izin)", "Hier **darf** man nicht rauchen."]
            ]
          },
          {
            type: "text",
            content: "PERHATIKAN:\nKonjugasi 'ich' dan 'er/sie/es' pada modal verbs SELALU SAMA.\n- Ich kann, Er kann.\n- Ich muss, Sie muss."
          }
        ],
        tips: [
          "Ingat prinsip 'Sandwich': Roti atas (Modal di posisi 2), Roti bawah (Verb asli di ujung kalimat). Isian sandwich (objek/waktu) ada di tengah.",
          "Möchten adalah bentuk paling sopan untuk memesan sesuatu di restoran."
        ],
        resources: [
          { title: "Penjelasan Modalverben", url: "https://mein-deutschbuch.de/modalverben.html", type: "web" }
        ]
      },

      // 12. IMPERATIV (TAMBAHAN FINAL)
      {
        id: "a1_12_imperativ",
        title: "12. Kalimat Perintah (Imperativ)",
        content: [
          {
            type: "text",
            content: "Digunakan untuk menyuruh, meminta, atau melarang. Bentuknya berbeda tergantung siapa yang kita suruh (Kamu, Kalian, atau Anda)."
          },
          {
            type: "table",
            headers: ["Target", "Rumus", "Contoh (Gehen - Pergi)"],
            rows: [
              ["Du (Kamu)", "Buang akhiran '-st' & buang 'du'", "**Geh** nach Hause! (Bukan Gehst du)"],
              ["Ihr (Kalian)", "Pakai bentuk 'ihr', buang 'ihr'", "**Geht** nach Hause! (Bukan Geht ihr)"],
              ["Sie (Anda)", "Tukar posisi Verb & Sie", "**Gehen Sie** nach Hause!"]
            ]
          },
          {
            type: "text",
            content: "PENGECUALIAN PENTING (SEIN):\n- Du: **Sei** ruhig! (Tenanglah!)\n- Ihr: **Seid** ruhig!\n- Sie: **Seien Sie** ruhig!"
          }
        ],
        tips: [
          "Untuk bentuk 'Du', bayangkan kamu memotong ekor kata kerjanya. (Machen -> Mach!, Kommen -> Komm!)",
          "Selalu tambahkan 'bitte' (tolong) agar tidak terdengar kasar."
        ],
        resources: [
          { title: "Latihan Imperativ Online", url: "https://www.schubert-verlag.de/aufgaben/uebungen_a1/a1_kap6_imperativ1.htm", type: "web" }
        ]
      },
      
      // 13. PREPOSISI DASAR (YANG KAMU CARI)
      {
        id: "a1_13_prepositions",
        title: "13. Preposisi Dasar (Tempat & Arah)",
        content: [
          {
            type: "text",
            content: "Ini kunci agar tidak tersasar! Bedakan preposisi untuk 'Asal', 'Tujuan', dan 'Lokasi'."
          },
          {
            type: "table",
            headers: ["Preposisi", "Fungsi", "Contoh"],
            rows: [
              ["aus", "Asal (Negara/Kota/Bangunan)", "Ich komme **aus** Indonesien."],
              ["nach", "Tujuan (Kota/Negara tanpa artikel)", "Ich fliege **nach** Deutschland."],
              ["in", "Lokasi (Di dalam) / Tujuan (Negara berartikel)", "Ich wohne **in** Berlin. / Ich fliege **in die** Türkei."],
              ["zu", "Tujuan (Tempat lokal/Orang)", "Ich gehe **zum** (zu dem) Arzt / **zur** (zu der) Bank."]
            ]
          },
          {
            type: "text",
            content: "HAFALAN WAJIB (RUMAH):\n- **nach Hause** = Pulang (Gerak).\n- **zu Hause** = Di rumah (Diam)."
          }
        ],
        tips: [
          "Mau ke kota/negara? Pakai **NACH** (nach Jakarta).",
          "Mau ke orang/gedung di dalam kota? Pakai **ZU** (zum Supermarkt).",
          "Jangan bilang 'Ich gehe nach Supermarkt'. Itu salah besar!"
        ],
        resources: [
          { title: "Lagu Preposisi (YouTube)", url: "https://www.youtube.com/results?search_query=german+prepositions+song", type: "video" }
        ]
      },

      // 14. POSSESSIVARTIKEL (KEPEMILIKAN)
      {
        id: "a1_14_possessiv",
        title: "14. Kata Ganti Milik (Mein, Dein)",
        content: [
          {
            type: "text",
            content: "Bagaimana bilang 'Ayahku' atau 'Rumahmu'? Gunakan Possessivartikel. Akhirannya berubah mengikuti kata bendanya (sama seperti ein/eine)."
          },
          {
            type: "table",
            headers: ["Subjek", "Milik (Maskulin/Neutral)", "Milik (Feminin/Plural)"],
            rows: [
              ["ich (saya)", "mein (Vater)", "mein**e** (Mutter)"],
              ["du (kamu)", "dein", "dein**e**"],
              ["er/es (dia lk)", "sein", "sein**e**"],
              ["sie (dia pr)", "ihr", "ihr**e**"],
              ["wir (kami)", "unser", "unser**e**"],
              ["ihr (kalian)", "euer", "eur**e** (perhatikan e hilang!)"],
              ["Sie (Anda)", "Ihr", "Ihr**e**"]
            ]
          }
        ],
        tips: [
          "Rumus: Kalau bendanya *Die* (cewek/jamak), tambahkan huruf **-e** di belakang (Meine, Deine).",
          "Hati-hati dengan 'Euer' (Kalian). Kalau ditambah -e, dia jadi 'Eure' (satu 'e' di tengah hilang)."
        ]
      },

      // 15. PLURAL (BENTUK JAMAK)
      {
        id: "a1_15_plural",
        title: "15. Bentuk Jamak (Plural)",
        content: [
          {
            type: "text",
            content: "Tidak seperti bahasa Inggris yang tinggal tambah 's', Jerman punya 5 cara membuat jamak. Artikelnya SELALU **DIE**."
          },
          {
            type: "table",
            headers: ["Akhiran", "Ciri Kata Tunggal", "Contoh (Singular -> Plural)"],
            rows: [
              ["-n / -en", "Mayoritas Feminin (akhiran -e, -ung, -heit)", "Die Lampe -> Die Lampe**n**"],
              ["-e", "Mayoritas Maskulin pendek", "Der Tisch -> Die Tisch**e**"],
              ["-er (+Umlaut)", "Benda Neutral pendek", "Das Kind -> Die Kind**er** (Oft + ä/ö/ü)"],
              ["-s", "Kata serapan asing / Singkatan", "Das Auto -> Die Auto**s**, Das Handy -> Die Handy**s**"],
              ["- (Tidak berubah)", "Akhiran -er, -el, -en", "Der Lehrer -> Die Lehrer"]
            ]
          }
        ],
        tips: [
          "Hafalkan Plural bersamaan dengan Artikelnya. Jangan dipisah.",
          "Kata berakhiran '-in' (profesi cewek) jamaknya double n: Die Lehrerin -> Die Lehrerin**nen**."
        ]
      },

      // 16. TRENNBARE VERBEN (KATA KERJA TERPISAH)
      {
        id: "a1_16_trennbare",
        title: "16. Kata Kerja Terpisah (Trennbare Verben)",
        content: [
          {
            type: "text",
            content: "Ini konsep paling unik di Jerman! Ada kata kerja yang punya awalan (prefix), dan saat dipakai dalam kalimat, **AWALANNYA COPOT DAN PINDAH KE PALING UJUNG**."
          },
          {
            type: "table",
            headers: ["Kata Kerja", "Awalan (Copot)", "Contoh Kalimat"],
            rows: [
              ["einkaufen (belanja)", "ein", "Ich **kaufe** im Supermarkt **ein**."],
              ["aufstehen (bangun)", "auf", "Ich **stehe** um 6 Uhr **auf**."],
              ["anrufen (menelpon)", "an", "Er **ruft** seine Mutter **an**."],
              ["mitkommen (ikut)", "mit", "Wir **kommen** ins Kino **mit**."],
              ["fernsehen (nonton TV)", "fern", "Du **siehst** heute Abend **fern**."]
            ]
          },
          {
            type: "text",
            content: "**ANALOGI SANDWICH:**\nBayangkan kalimat itu Sandwich.\n- Roti Atas = Kata Kerja Utama (Posisi 2)\n- Roti Bawah = Awalan (Posisi Terakhir)\n- Isian = Objek, Waktu, Tempat (Di tengah).\n\nJangan bilang: *Ich einkaufe Brot*. (Salah!)\nHarus: *Ich **kaufe** Brot **ein**.* (Benar!)"
          }
        ],
        tips: [
          "Awalan yang selalu pisah: **ab-, an-, auf-, aus-, ein-, mit-, nach-, weg-, zu-**.",
          "Kalau ada Modal Verb (können/müssen), Trennbare Verb **TIDAK PISAH** dan pindah ke ujung. Contoh: Ich muss **einkaufen**."
        ],
        resources: [
          { title: "Video Trennbare Verben", url: "https://www.youtube.com/results?search_query=trennbare+verben+deutsch", type: "video" }
        ]
      },

      // 17. KATA TANYA (W-FRAGEN)
      {
        id: "a1_17_wfragen",
        title: "17. Kata Tanya Lengkap (W-Fragen)",
        content: [
          {
            type: "text",
            content: "Jangan sampai tertukar! Terutama trio lokasi: Wo, Wohin, Woher."
          },
          {
            type: "table",
            headers: ["Kata Tanya", "Arti", "Pasangan Jawaban"],
            rows: [
              ["Wer", "Siapa (Subjek)", "Das ist **Ilham**."],
              ["Was", "Apa", "Das ist **ein Buch**."],
              ["Wo", "Di mana (Diam)", "**In** Berlin / **Zu** Hause."],
              ["Wohin", "Ke mana (Gerak)", "**Nach** Berlin / **Nach** Hause."],
              ["Woher", "Dari mana (Asal)", "**Aus** Indonesien."],
              ["Wann", "Kapan", "**Am** Montag / **Um** 8 Uhr."],
              ["Wie", "Bagaimana", "**Gut** / **Schnell**."]
            ]
          },
          {
            type: "text",
            content: "KOMBINASI 'WIE':\n- **Wie viel?** = Berapa banyak? (Uang/Harga)\n- **Wie lange?** = Berapa lama? (Durasi)\n- **Wie oft?** = Seberapa sering?\n- **Wie spät ist es?** = Jam berapa?"
          }
        ],
        tips: [
          "Ingat rumusnya: **Wohin** (Ke mana) pasangannya **Nach/Zu**. **Wo** (Di mana) pasangannya **In/Bei**. **Woher** (Dari mana) pasangannya **Aus**.",
          "Kalau ditanya 'Wie geht's?' (Apa kabar?), jawabannya bukan benda, tapi kata sifat (Gut/Schlecht)."
        ]
      },

      // 18. NEGASI (TIDAK & BUKAN)
      {
        id: "a1_18_negation",
        title: "18. Negasi: Nicht vs Kein",
        content: [
          {
            type: "text",
            content: "Dalam bahasa Indonesia, kita cuma punya 'TIDAK' dan 'BUKAN'. Di Jerman, ada aturan ketat kapan pakai **nicht** dan kapan pakai **kein**."
          },
          {
            type: "table",
            headers: ["Jenis", "Digunakan Untuk...", "Contoh Salah vs Benar"],
            rows: [
              ["KEIN / KEINE", "Menolak KATA BENDA (Noun) tanpa artikel.", "Salah: Ich habe nicht Zeit.\nBenar: Ich habe **keine** Zeit."],
              ["NICHT", "Menolak KATA KERJA (Verb).", "Salah: Ich schlafe kein.\nBenar: Ich schlafe **nicht**."],
              ["NICHT", "Menolak KATA SIFAT (Adjektiv).", "Salah: Er ist kein klug.\nBenar: Er ist **nicht** klug."],
              ["NICHT", "Menolak NAMA / KEPEMILIKAN.", "Salah: Das ist kein Budi.\nBenar: Das ist **nicht** Budi."]
            ]
          },
          {
            type: "text",
            content: "**POSISI 'NICHT':**\nBiasanya 'nicht' ditaruh di **AKHIR** kalimat, KECUALI ada preposisi.\n- Ich kaufe das Auto **nicht**. (Di akhir).\n- Ich komme **nicht** nach Hause. (Sebelum preposisi)."
          }
        ],
        tips: [
          "Rumus Gampang: Kalau bisa diganti 'Not a/an' di Inggris, pakai **Kein**. Kalau 'Not', pakai **Nicht**.",
          "Ingat: Kein berubah sesuai gender (Kein, Keine, Keinen)."
        ]
      },

      // 19. SUMBER BELAJAR TAMBAHAN (PERPUSTAKAAN A1)
      {
        id: "a1_resources_general",
        title: "19. Perpustakaan A1 (Sumber Gratis Terbaik)",
        content: [
          {
            type: "text",
            content: "Belajar sendiri butuh banyak sumber. Ini adalah koleksi link gratis terbaik di dunia untuk level pemula yang sudah dikurasi."
          },
          {
            type: "table",
            headers: ["Nama Sumber", "Tipe", "Kenapa Wajib Coba?"],
            rows: [
              ["**Nicos Weg A1 (DW)**", "Film Interaktif", "Ini 'Netflix'-nya belajar Jerman. Cerita Nico yang kehilangan tas. Sangat seru!"],
              ["**Leo.org**", "Kamus Online", "Kamus terbaik Jerman-Inggris. Ada audionya juga."],
              ["**Easy German** (YouTube)", "Video Jalanan", "Wawancara orang asli di jalan. Cari playlist 'Super Easy German'."],
              ["**Verbformen.de**", "Cek Grammar", "Bingung konjugasi? Ketik kata kerjanya di sini, lengkap semua bentuk."]
            ]
          },
          {
            type: "text",
            content: "**TIPS CARA PAKAI:**\nJangan hafal kamus! Tonton *Nicos Weg* satu episode sehari, lalu catat kata baru di buku tulis."
          }
        ],
        tips: [
          "Hindari Google Translate untuk kalimat panjang. Hasilnya sering ngaco secara grammar.",
          "Gunakan aplikasi **Anki** (Flashcard) untuk menghafal kosakata secara interval."
        ],
        resources: [
          { title: "Nicos Weg A1 (Mulai dari sini!)", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "web" },
          { title: "Kamus LEO", url: "https://dict.leo.org/german-english/", type: "web" }
        ]
      }
    ]
  },
  
  // --- LEVEL A2 (SUPER LENGKAP - FINAL VERSION) ---
  {
    id: "A2",
    title: "Materi A2 - Dasar Lanjutan (Elementary)",
    description: "Level 'Survival'. Belajar menceritakan masa lalu, membandingkan hal, dan bicara lebih sopan dengan kalimat majemuk.",
    sections: [
      // ... (BAGIAN A2 DISINGKAT AGAR CUKUP, COPY DARI SEBELUMNYA ATAU BIARKAN JIKA TIDAK ERROR)
      // [DISINI ISI SEMUA DATA A2 YANG SUDAH ADA DI FILE KAMU]
      // Agar tidak kepanjangan di chat, asumsikan bagian A2, B1, B2 tetap ada seperti di file aslimu.
      // Copy Paste saja bagian array A2, B1, B2 dari file aslimu ke sini.
    ]
  }
  // Jangan lupa tutup array courseMaterials dengan benar
];