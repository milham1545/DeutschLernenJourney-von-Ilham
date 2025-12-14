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
      // 1. DAS PERFEKT
      {
        id: "a2_1_perfekt",
        title: "1. Das Perfekt (Masa Lampau Lisan)",
        content: [
          {
            type: "text",
            content: "Untuk ngobrol santai soal masa lalu, orang Jerman pakai Perfekt. Jangan pakai Präteritum (kecuali sein/haben) biar gak kaku.\n\nRUMUS: **Haben/Sein** (Posisi 2) + ... + **Partizip II** (Akhir Kalimat)."
          },
          {
            type: "table",
            headers: ["Kapan Pakai 'SEIN'?", "Kapan Pakai 'HABEN'?"],
            rows: [
              ["Perpindahan Tempat (A ke B)\n(gehen, fahren, fliegen)", "Kata kerja butuh objek (Transitif)\n(essen, trinken, kaufen)"],
              ["Perubahan Kondisi\n(aufwachen/bangun, sterben/mati)", "Kata kerja refleksif\n(sich freuen)"],
              ["Kata kerja: sein, bleiben, passieren", "Sisanya (90% kata kerja)"]
            ]
          },
          {
            type: "text",
            content: "CONTOH:\n- Ich **bin** nach Bali **geflogen**. (Terbang = Pindah tempat -> Sein)\n- Er **hat** eine Pizza **bestellt**. (Pesan apa? Pizza = Objek -> Haben)"
          }
        ],
        tips: [
          "Ingat 'Aturan Superman': Kalau kegiatannya membuatmu berpindah tempat atau berubah wujud, pakai **SEIN**.",
          "Partizip II kata berakhiran '-ieren' (studieren, telefonieren) tidak pakai 'ge-' (hat studiert, hat telefoniert)."
        ],
        resources: [
          { title: "Nicos Weg A2: Das Perfekt", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "video" },
          { title: "Latihan Sein vs Haben Online", url: "https://mein-deutschbuch.de/perfekt.html", type: "web" }
        ]
      },

      // 2. PRÄTERITUM (MODAL & SEIN/HABEN)
      {
        id: "a2_2_praeteritum",
        title: "2. Präteritum (Masa Lampau Tertulis)",
        content: [
          {
            type: "text",
            content: "Walau biasanya untuk tulisan, ada pengecualian! Untuk **Sein**, **Haben**, dan **Modal Verbs**, orang Jerman lebih suka pakai Präteritum saat bicara karena lebih pendek."
          },
          {
            type: "table",
            headers: ["Verb", "Present", "Präteritum (Lampau)", "Arti"],
            rows: [
              ["sein", "ich bin", "**ich war**", "saya dulu (ada/adalah)"],
              ["haben", "ich habe", "**ich hatte**", "saya dulu punya"],
              ["können", "ich kann", "**ich konnte**", "saya dulu bisa"],
              ["müssen", "ich muss", "**ich musste**", "saya dulu harus"],
              ["wollen", "ich will", "**ich wollte**", "saya dulu ingin"]
            ]
          },
          {
            type: "text",
            content: "CONTOH:\n- \"Ich **war** gestern krank.\" (Lebih enak daripada 'Ich bin krank gewesen')\n- \"Ich **musste** arbeiten.\" (Lebih enak daripada 'Ich habe arbeiten müssen')"
          }
        ],
        tips: [
          "Hafalkan: 'Ich war' (Saya dulu ada) dan 'Ich hatte' (Saya dulu punya). Itu paling sering dipakai.",
          "Konjugasi 'ich' dan 'er/sie/es' di Präteritum selalu sama."
        ],
        resources: [
          { title: "Latihan Präteritum (Schubert)", url: "https://www.schubert-verlag.de/aufgaben/uebungen_a2/a2_kap1_praeteritum.htm", type: "web" }
        ]
      },

      // 3. ADJEKTIVDEKLINATION
      {
        id: "a2_3_adjektive",
        title: "3. Adjektivdeklination (Akhiran Kata Sifat)",
        content: [
          {
            type: "text",
            content: "Materi 'Horor' di A2. Kata sifat di depan benda harus punya akhiran. Akhirannya tergantung artikel di depannya. \nKenapa 'Guten Morgen' tapi 'Gute Nacht'? Akhiran kata sifat berubah tergantung Artikel di depannya. Ini materi tersulit di A2, jadi perhatikan tabel ini!"
          },
          {
            type: "table",
            headers: ["Artikel (Der/Die/Das)", "Nominativ", "Akkusativ", "Dativ"],
            rows: [
              ["Maskulin (Der)", "-e (der rote Ball)", "-en (den roten Ball)", "-en (dem roten Ball)"],
              ["Feminin (Die)", "-e (die rote Tür)", "-e (die rote Tür)", "-en (der roten Tür)"],
              ["Neutral (Das)", "-e (das rote Auto)", "-e (das rote Auto)", "-en (dem roten Auto)"],
              ["Plural (Die)", "-en (die roten Autos)", "-en (die roten Autos)", "-en (den roten Autos)"]
            ]
          },
          {
            type: "table",
            headers: ["Kondisi", "Maskulin", "Feminin", "Neutral", "Plural"],
            rows: [
              ["1. Setelah 'DER/DIE/DAS' (Definit)", "der gut**e** Mann\nden gut**en** Mann (Akk)", "die gut**e** Frau", "das gut**e** Kind", "die gut**en** Eltern"],
              ["2. Setelah 'EIN/EINE' (Indefinit)", "ein gut**er** Mann\neinen gut**en** Mann (Akk)", "eine gut**e** Frau", "ein gut**es** Kind", "keine gut**en** Eltern"],
              ["3. Tanpa Artikel (Nol)", "gut**er** Wein", "gut**e** Milch", "gut**es** Wasser", "gut**e** Freunde"]
            ]
          },
          {
            type: "text",
            content: "RUMUS JITU JIKA ADA ARTIKEL:\n1. Singular Nominativ/Akkusativ (Kecuali Maskulin Akk) = **-e**.\n2. Sisanya (Plural, Dativ, Maskulin Akk) = **-en**. \n**ATURAN 'EN' (DATIV):**\nKabar baik! Jika kasusnya DATIV (mir, dir, dem, der, den), SEMUA kata sifat akhirannya pasti **-EN**.\n- Mit dem gut**en** Mann.\n- Mit der schön**en** Frau."
          }
        ],
        tips: [
          "Hafalkan pola 'Pistol': Nominativ Singular biasanya cuma -e (der gute, die gute, das gute). Sisanya dan Plural kebanyakan -en.",
          "Kalau pakai 'Ein', kata sifatnya mengambil alih tugas artikel. (Ein = Netral, jadi sifatnya harus tunjuk gender -> Ein gut**er** (Maskulin) / Ein gut**es** (Neutral)).",
          "Kalau bingung dan terdesak saat ujian/ngomong, tebak saja akhiran **-EN**. Peluang benarnya 60%!",
          "Plural dengan artikel pasti (Die) selalu berakhiran **-en**."
        ],
        resources: [
          { title: "Tabel Adjektivdeklination (PDF)", url: "https://www.nthuleen.com/teach/grammar/adjektivendungenexpl.html", type: "pdf" }
        ]
      },

      // 4. KOMPARATIV & SUPERLATIV (TAMBAHAN PENTING)
      {
        id: "a2_4_komparation",
        title: "4. Perbandingan (Komparativ & Superlativ)",
        content: [
          {
            type: "text",
            content: "Bagaimana bilang 'Lebih bagus' atau 'Paling bagus'?\nRumus:\n- Komparativ: Adjektiv + **-er** (+ als)\n- Superlativ: **am** + Adjektiv + **-sten**"
          },
          {
            type: "table",
            headers: ["Positif (Biasa)", "Komparativ (Lebih)", "Superlativ (Paling)"],
            rows: [
              ["schnell (cepat)", "schneller (als)", "am schnellsten"],
              ["klein (kecil)", "kleiner (als)", "am kleinsten"],
              ["**gut** (bagus)", "**besser**", "**am besten**"],
              ["**viel** (banyak)", "**mehr**", "**am meisten**"],
              ["**gern** (suka)", "**lieber**", "**am liebsten**"]
            ]
          },
          {
            type: "text",
            content: "CONTOH:\n- Ich bin **schneller als** du. (Saya lebih cepat daripada kamu).\n- Er ist **am schnellsten**. (Dia yang paling cepat)."
          }
        ],
        tips: [
          "Kata sifat pendek dengan a, o, u biasanya kena Umlaut di perbandingan. (alt -> älter, groß -> größer, jung -> jünger).",
          "Hafalkan 'Gern -> Lieber -> Am liebsten' untuk menyatakan kesukaan/hobi."
        ],
        resources: [
          { title: "Video Penjelasan Komparativ", url: "https://www.youtube.com/watch?v=xyz123", type: "video" }
        ]
      },

      // 5. NEBENSATZ (ANAK KALIMAT)
      {
        id: "a2_5_nebensatz",
        title: "5. Nebensatz (Anak Kalimat: weil, dass, wenn)",
        content: [
          {
            type: "text",
            content: "Di A2, kalimatmu makin panjang. Kuncinya: Kata hubung tertentu (Konektor) menendang **VERB KE PALING UJUNG**."
          },
          {
            type: "table",
            headers: ["Konektor", "Arti", "Contoh Kalimat"],
            rows: [
              ["weil", "karena", "Ich esse, **weil** ich Hunger **habe**."],
              ["dass", "bahwa", "Ich weiß, **dass** du klug **bist**."],
              ["wenn", "jika / saat", "**Wenn** ich Zeit **habe**, **komme** ich."],
              ["ob", "apakah (ragu)", "Ich weiß nicht, **ob** er **kommt**."]
            ]
          },
          {
            type: "text",
            content: "ATURAN:\nInduk Kalimat + Koma + Konektor + Subjek + ... + **VERB**.\nJangan bilang '...weil ich habe Hunger'. Tapi '...weil ich Hunger habe'."
          }
        ],
        tips: [
          "Bayangkan kata hubung (weil/dass) itu seperti 'Sepatu Boot' yang menendang bola (Verb) sampai ke gawang (titik akhir kalimat).",
          "Jika kalimat dimulai dengan 'Wenn', maka kalimat berikutnya langsung diawali Verb. (Wenn ich esse, **trinke** ich)."
        ],
        resources: [
          { title: "Latihan Nebensatz Online", url: "https://deutsch.lingolia.com/de/grammatik/satzbau/nebensaetze", type: "web" }
        ]
      },

      // 6. INDIREKTE FRAGEN (TAMBAHAN PENTING)
      {
        id: "a2_6_indirekte_fragen",
        title: "6. Kalimat Tanya Tidak Langsung (Sopan)",
        content: [
          {
            type: "text",
            content: "Biar lebih sopan, jangan tanya langsung 'Jam berapa?'. Gunakan pengantar 'Bisa kasih tahu saya...'. Aturannya sama seperti Nebensatz: **Verb pindah ke ujung**."
          },
          {
            type: "table",
            headers: ["Jenis Tanya", "Konektor", "Contoh"],
            rows: [
              ["W-Fragen (Apa, Siapa)", "Kata Tanyanya (Was/Wo)", "Können Sie sagen, **wo** der Bahnhof **ist**?"],
              ["Ja/Nein Fragen", "**Ob** (Apakah)", "Ich weiß nicht, **ob** er Zeit **hat**."]
            ]
          },
          {
            type: "text",
            content: "BANDINGKAN:\n- Langsung: Wo wohnt er? (Dimana dia tinggal?)\n- Tidak Langsung: Wissen Sie, wo er **wohnt**? (Anda tahu dimana dia tinggal?)"
          }
        ],
        tips: [
          "Gunakan ini saat bertanya ke orang asing di jalan agar terdengar sangat sopan.",
          "Ingat: Kalau pertanyaannya Jawabannya Ya/Tidak, pakai kata hubung **'ob'**."
        ],
        resources: [
          { title: "Video: Indirekte Fragen", url: "https://www.youtube.com/watch?v=IndirectQ", type: "video" }
        ]
      },

      // 7. PREPOSISI DUA ARAH (WECHSELPRAEPOSITIONEN)
      {
        id: "a2_7_wechselpraep",
        title: "7. Preposisi Dua Arah (Dativ vs Akkusativ)",
        content: [
          {
            type: "text",
            content: "Ada 9 preposisi (in, an, auf, neben, zwischen, vor, hinter, über, unter) yang 'bunglon'. Kasusnya berubah tergantung gerakan."
          },
          {
            type: "table",
            headers: ["Situasi", "Pertanyaan", "Kasus", "Contoh"],
            rows: [
              ["DIAM (Posisi)", "Wo? (Di mana?)", "**DATIV**", "Das Buch liegt **auf dem** Tisch."],
              ["GERAK (Arah)", "Wohin? (Ke mana?)", "**AKKUSATIV**", "Ich lege das Buch **auf den** Tisch."]
            ]
          },
          {
            type: "text",
            content: "SINGKATAN UMUM:\n- in dem = **im** (im Kino - diam)\n- in das = **ins** (ins Kino - gerak)\n- an dem = **am**"
          }
        ],
        tips: [
          "Hafalan: **Wo-Dativ** (Woda) dan **Wohin-Akkusativ** (Winak).",
          "Gunakan tanganmu! Menunjuk lokasi diam = telapak terbuka. Menunjuk arah = telunjuk."
        ],
        resources: [
          { title: "Latihan Wechselpräpositionen", url: "https://www.schubert-verlag.de/aufgaben/uebungen_a2/a2_kap3_wechselpraep.htm", type: "web" }
        ]
      },

      // 8. REFLEXIVE VERBEN
      {
        id: "a2_8_reflexiv",
        title: "8. Kata Kerja Refleksif",
        content: [
          {
            type: "text",
            content: "Kata kerja yang kegiatannya memantul kembali ke diri sendiri. Wajib pakai kata ganti refleksif (**mich, dich, sich**)."
          },
          {
            type: "table",
            headers: ["Subjek", "Refleksif (Akk)", "Contoh Verb"],
            rows: [
              ["ich", "mich", "Ich freue **mich**."],
              ["du", "dich", "Du ärgerst **dich**."],
              ["er/sie/es", "sich", "Er duscht **sich**."],
              ["wir", "uns", "Wir treffen **uns**."],
              ["ihr", "euch", "Ihr beeilt **euch**."],
              ["sie/Sie", "sich", "Sie interessieren **sich**."]
            ]
          }
        ],
        tips: [
          "Jangan lupa 'sich'-nya! 'Ich freue' itu salah besar. Harus 'Ich freue MICH'.",
          "Hafalkan sepaket: 'sich freuen' (senang), 'sich ärgern' (kesal)."
        ],
        resources: [
          { title: "Daftar Reflexive Verben PDF", url: "https://www.mein-deutschbuch.de/reflexive-verben-liste.pdf", type: "pdf" }
        ]
      },

      // 9. VERBA DENGAN PREPOSISI
      {
        id: "a2_9_verben_praep",
        title: "9. Kata Kerja dengan Preposisi Tetap",
        content: [
          {
            type: "text",
            content: "Di A2, kamu mulai menghafal kata kerja sepaket dengan preposisinya. Tidak ada logika, murni hafalan."
          },
          {
            type: "table",
            headers: ["Kata Kerja", "Preposisi + Kasus", "Arti"],
            rows: [
              ["warten", "**auf** + Akk", "menunggu"],
              ["denken", "**an** + Akk", "memikirkan"],
              ["träumen", "**von** + Dat", "bermimpi tentang"],
              ["sprechen", "**mit** + Dat", "berbicara dengan"],
              ["sich interessieren", "**für** + Akk", "tertarik pada"]
            ]
          },
          {
            type: "text",
            content: "CONTOH:\n- Ich warte **auf den** Bus. (Bukan 'warten den Bus')\n- Ich denke **an dich**."
          }
        ],
        tips: [
          "Jangan hafal 'warten' saja. Hafalkan '**warten-auf-akkusativ**' sebagai satu kesatuan seperti mantra."
        ],
        resources: [
          { title: "Flashcard Verben mit Präpositionen", url: "https://quizlet.com/subject/verben-mit-praepositionen/", type: "web" }
        ]
      },

      // 10. KOSAKATA: KERJA & TRAVEL
      {
        id: "a2_10_vocab",
        title: "10. Kosakata: Kerja & Travel",
        content: [
          {
            type: "text",
            content: "Kosakata level A2 fokus pada mobilitas dan pekerjaan."
          },
          {
            type: "table",
            headers: ["Topik", "Jerman", "Indonesia"],
            rows: [
              ["Kerja", "Die Bewerbung", "Lamaran"],
              ["Kerja", "Der Lebenslauf", "CV"],
              ["Kerja", "kündigen", "resign/memecat"],
              ["Travel", "Der Zug / Das Gleis", "Kereta / Peron"],
              ["Travel", "Die Verspätung", "Keterlambatan"],
              ["Travel", "umsteigen", "ganti kendaraan"]
            ]
          }
        ],
        tips: [
          "Bedakan 'Beruf' (profesi jangka panjang) dan 'Job' (kerjaan sementara).",
          "Di Jerman, kereta sering telat. Hafalkan kata 'Verspätung'!"
        ],
        resources: [
          { title: "Goethe A2 Wordlist (Full)", url: "https://www.goethe.de/pro/relaunch/prf/en/Goethe-Zertifikat_A2_Wortliste.pdf", type: "pdf" }
        ]
      },

      // 11. VERBEN MIT DATIV (KATA KERJA DATIV)
      {
        id: "a2_11_dativ_verbs",
        title: "11. Kata Kerja Khusus Dativ",
        content: [
          {
            type: "text",
            content: "Hati-hati! Kata kerja ini 'alergi' sama Akkusativ. Objeknya WAJIB Dativ (mir/dir/ihm), bukan (mich/dich/ihn)."
          },
          {
            type: "table",
            headers: ["Kata Kerja", "Arti", "Contoh Salah vs Benar"],
            rows: [
              ["helfen", "Membantu", "Salah: Ich helfe dich.\nBenar: Ich helfe **dir**."],
              ["danken", "Berterima kasih", "Benar: Ich danke **Ihnen**."],
              ["gefallen", "Menyukai (Barang)", "Benar: Das Auto gefällt **mir**."],
              ["schmecken", "Terasa enak", "Benar: Die Pizza schmeckt **uns**."],
              ["gratulieren", "Menyelamati", "Benar: Ich gratuliere **dir**."]
            ]
          }
        ],
        tips: [
          "Hafalkan 'Geng Dativ': Helfen, Danken, Gefallen, Gehören, Schmecken, Gratulieren.",
          "Ingat: 'Mir' bukan 'Mich'!"
        ]
      },

      // 12. TEMPORALPRÄPOSITIONEN II (WAKTU LANJUTAN)
      {
        id: "a2_12_temporal",
        title: "12. Preposisi Waktu: Seit, Vor, Für",
        content: [
          {
            type: "text",
            content: "Sering tertukar? Ini bedanya."
          },
          {
            type: "table",
            headers: ["Preposisi", "Kasus", "Fungsi", "Contoh"],
            rows: [
              ["seit", "Dativ", "Mulai dulu, MASIH sampai sekarang", "Ich lerne **seit einem** Jahr Deutsch (Masih belajar)."],
              ["vor", "Dativ", "Dulu, SUDAH selesai", "Ich war **vor einem** Jahr in Berlin (Sekarang tidak)."],
              ["für", "Akkusativ", "Durasi (Rencana)", "Ich gehe **für einen** Monat nach Bali."],
              ["über", "Akkusativ", "Lebih dari (Angka)", "Er ist **über** 50 Jahre alt."]
            ]
          }
        ],
        tips: [
          "Beda 'Seit' vs 'Vor': Kalau kegiatannya masih berlangsung -> Seit. Kalau sudah lewat -> Vor.",
          "Seit selalu Dativ (seit dem, seit einem, seit einer)."
        ]
      },

      // 13. PERSONALPRONOMEN (TABEL KERAMAT)
      {
        id: "a2_13_pronomen_chart",
        title: "13. Tabel Kata Ganti (Mich vs Mir)",
        content: [
          {
            type: "text",
            content: "Bingung kapan pakai 'Mich' atau 'Mir'? Hafalkan tabel ini seperti menghafal perkalian. Ini pondasi kalimat Jerman."
          },
          {
            type: "table",
            headers: ["Nominativ (Subjek)", "Akkusativ (Objek Langsung)", "Dativ (Objek Tidak Langsung)"],
            rows: [
              ["ich", "mich", "**mir**"],
              ["du", "dich", "**dir**"],
              ["er", "ihn", "**ihm**"],
              ["sie", "sie", "**ihr**"],
              ["es", "es", "**ihm**"],
              ["wir", "uns", "uns"],
              ["ihr", "euch", "euch"],
              ["sie / Sie", "sie / Sie", "**ihnen / Ihnen**"]
            ]
          },
          {
            type: "text",
            content: "CONTOH:\n- Er liebt **mich** (Akkusativ - Siapa yang dicintai?)\n- Er hilft **mir** (Dativ - Helfen wajib Dativ)\n- Ich gebe **dir** den Ball (Memberi KEPADA siapa? -> Dativ)."
          }
        ],
        tips: [
          "Jembatan Keledai Dativ: **Mir Dir Ihm Ihm Ihr** (Bunyinya berirama).",
          "Uns dan Euch gampang, bentuknya sama di Akkusativ dan Dativ."
        ]
      },

      // 14. KOMPOSITA (KATA BENDA LEGO)
      {
        id: "a2_14_komposita",
        title: "14. Menyusun Kata Panjang (Komposita)",
        content: [
          {
            type: "text",
            content: "Bahasa Jerman itu seperti Lego. Kamu bisa menempelkan dua kata benda (atau lebih) menjadi satu kata baru yang panjang."
          },
          {
            type: "table",
            headers: ["Kata 1", "Kata 2", "Hasil (Gender ikut Kata Terakhir!)"],
            rows: [
              ["Die Orange (Jeruk)", "Der Saft (Jus)", "**Der** Orangensaft"],
              ["Der Tisch (Meja)", "Die Lampe (Lampu)", "**Die** Tischlampe"],
              ["Krank (Sakit)", "Das Haus (Rumah)", "**Das** Krankenhaus"],
              ["Warten (Menunggu)", "Das Zimmer (Ruang)", "**Das** Wartezimmer"]
            ]
          },
          {
            type: "text",
            content: "**FUGEN-S (Perekat):**\nKadang kita butuh huruf 's' atau 'n' di tengah sebagai lem.\n- Die Liebe + Der Brief = Der Liebe**s**brief (Surat Cinta).\n- Die Sonne + Die Brille = Die Sonne**n**brille (Kacamata Hitam)."
          }
        ],
        tips: [
          "Jangan takut melihat kata panjang! Baca dari belakang. 'Donaudampfschifffahrtsgesellschaftskapitän' intinya adalah 'Kapitän' (Kapten). Sisanya cuma penjelasan.",
          "Artikel (Der/Die/Das) SELALU mengikuti kata paling belakang."
        ]
      },

      // 15. URUTAN OBJEK (DATIV vs AKKUSATIV)
      {
        id: "a2_15_word_order_objects",
        title: "15. Urutan Objek: Siapa Duluan?",
        content: [
          {
            type: "text",
            content: "Jika dalam satu kalimat ada DUA objek (misal: 'Memberi [buku] kepada [ayah]'), urutannya berubah tergantung apakah itu Kata Benda atau Kata Ganti."
          },
          {
            type: "table",
            headers: ["Kondisi", "Aturan", "Contoh Kalimat"],
            rows: [
              ["Dua Kata Benda", "**Dativ** (Orang) dulu, baru **Akkusativ** (Benda).", "Ich gebe **dem Mann** (Dat) **das Buch** (Akk)."],
              ["Satu Ganti, Satu Benda", "**Kata Ganti** selalu menang (maju duluan).", "Ich gebe **ihm** (Ganti) **das Buch** (Benda).\nIch gebe **es** (Ganti) **dem Mann** (Benda)."],
              ["Dua Kata Ganti", "**Akkusativ** dulu, baru **Dativ** (Dibalik!).", "Ich gebe **es** (Akk) **ihm** (Dat)."]
            ]
          }
        ],
        tips: [
          "Hafalkan mantra ini: **'Orang sebelum Benda, tapi Pendek (Pronoun) sebelum Panjang'.**",
          "Jika dua-duanya pronoun (pendek), Akkusativ menang (Es Ihm)."
        ]
      },

      // 16. PERPUSTAKAAN A2 (SUMBER LANJUTAN)
      {
        id: "a2_resources_general",
        title: "16. Perpustakaan A2 (Latihan Pendengaran)",
        content: [
          {
            type: "text",
            content: "Di A2, kamu harus mulai membiasakan telinga dengan audio Jerman yang agak lambat."
          },
          {
            type: "table",
            headers: ["Nama Sumber", "Tipe", "Fokus Belajar"],
            rows: [
              ["**Slow German (Annik Rubens)**", "Podcast", "Cerita tentang budaya Jerman yang dibacakan pelan-pelan."],
              ["**Mein-Deutschbuch.de**", "Website Grammar", "Penjelasan grammar tertulis yang paling rapi dan lengkap."],
              ["**Nicos Weg A2**", "Film Interaktif", "Lanjutan cerita Nico. Masalah hidupnya makin kompleks (kerja/cinta)."],
              ["**LyricsTraining**", "Musik", "Belajar bahasa lewat lagu Jerman (Nena, Cro, Namika)."]
            ]
          }
        ],
        tips: [
          "Mulai ganti settingan HP ke bahasa Jerman. Itu cara termudah belajar kata teknis (Einstellungen, Speicher, dll).",
          "Dengarkan podcast saat di jalan/bus. Tidak perlu paham 100%, yang penting telinga terbiasa."
        ],
        resources: [
          { title: "Slow German Podcast", url: "https://slowgerman.com/", type: "audio" },
          { title: "Penjelasan Grammar Detail", url: "https://mein-deutschbuch.de/grammatik.html", type: "web" }
        ]
      }
    ]
  },

  // --- LEVEL B1 (FINAL COMPLETED VERSION) ---
  {
    id: "B1",
    title: "Materi B1 - Menengah (Intermediate)",
    description: "Menuju kefasihan. Menguasai struktur kalimat kompleks, diskusi abstrak, dan tata bahasa tingkat lanjut.",
    sections: [
      // 1. MENYATAKAN PENDAPAT
      {
        id: "b1_1_meinung",
        title: "1. Menyatakan Pendapat (Diskusi)",
        content: [
          { type: "text", content: "Di B1, hindari sekadar bilang 'gut' atau 'schlecht'. Gunakan frasa argumentatif." },
          {
            type: "table",
            headers: ["Ekspresi", "Arti", "Tingkat Formalitas"],
            rows: [
              ["Meiner Meinung nach...", "Menurut pendapat saya...", "Formal/Netral"],
              ["Ich bin der Ansicht, dass...", "Saya berpandangan bahwa...", "Sangat Formal"],
              ["Ich bin davon überzeugt, dass...", "Saya yakin bahwa...", "Tegas (Strong)"],
              ["Da hast du recht, aber...", "Kamu benar, tapi...", "Sanggahan Halus"]
            ]
          },
          { type: "text", content: "ATURAN POSISI:\n- **Meiner Meinung nach** IST das wichtig. (Verb langsung setelah frasa).\n- **Ich denke**, DASS das wichtig IST. (Verb di akhir karena 'dass')." }
        ],
        tips: ["Jangan lupa koma sebelum 'dass' atau 'aber'. Itu wajib di tulisan Jerman."],
        resources: [
          { title: "Redemittel B1 (PDF)", url: "https://www.telc.net/fileadmin/user_upload/telc_deutsch_b1_uebungstest_1.pdf", type: "pdf" }
        ]
      },

      // 2. PLUSQUAMPERFEKT (TAMBAHAN PENTING)
      {
        id: "b1_2_plusquamperfekt",
        title: "2. Plusquamperfekt (Masa Lampau Sempurna)",
        content: [
          { type: "text", content: "Digunakan untuk menceritakan kejadian yang **SUDAH SELESAI** sebelum kejadian lain di masa lampau.\nRumus: **hatte/war** + **Partizip II**." },
          {
            type: "table",
            headers: ["Urutan Waktu", "Tenses", "Contoh Kalimat"],
            rows: [
              ["Kejadian 1 (Duluan)", "Plusquamperfekt", "Nachdem ich **gegessen hatte**... (Setelah saya sudah makan)"],
              ["Kejadian 2 (Belakangan)", "Präteritum", "...**ging** ich ins Bett. (...saya pergi tidur)"]
            ]
          },
          { type: "text", content: "KATA HUBUNG KHAS:\n- **Nachdem** (Setelah): Selalu memicu Plusquamperfekt jika kalimat utamanya Präteritum.\n- **Bevor** (Sebelum): Biasanya pakai Präteritum biasa." }
        ],
        tips: ["Bayangkan ini sebagai 'Masa lampau-nya masa lampau'. Mirip 'Had done' di bahasa Inggris."],
        resources: [
          { title: "Video Penjelasan Plusquamperfekt", url: "https://www.youtube.com/watch?v=plusquamperfekt_dummy", type: "video" }
        ]
      },

      // 3. KALIMAT PASIF (PASSIV)
      {
        id: "b1_3_passiv",
        title: "3. Kalimat Pasif (Vorgangspassiv)",
        content: [
          { type: "text", content: "Fokus pada 'Apa yang terjadi', bukan 'Siapa yang melakukan'.\nRumus Dasar: **Werden + Partizip II**." },
          {
            type: "table",
            headers: ["Waktu", "Rumus", "Contoh"],
            rows: [
              ["Sekarang (Präsens)", "wird ... gemacht", "Das Auto **wird** repariert."],
              ["Lampau (Präteritum)", "wurde ... gemacht", "Das Auto **wurde** repariert."],
              ["Telah (Perfekt)", "ist ... gemacht worden", "Das Auto **ist** repariert **worden**."]
            ]
          },
          { type: "text", content: "PELAKU (AGENT):\n- **von** + Dativ (oleh orang/instansi).\n- **durch** + Akkusativ (oleh alat/sebab).\nContoh: Das Fenster wurde **vom** (von dem) Kind kaputt gemacht." }
        ],
        tips: ["Di Pasif Perfekt, gunakan 'worden' (bukan geworden).", "Pasif sering dipakai di instruksi manual atau resep masakan."],
        resources: [
          { title: "Latihan Passiv Online", url: "https://mein-deutschbuch.de/passiv.html", type: "web" }
        ]
      },

      // 4. PRONOMINALADVERBIEN (WO- & DA-) (TAMBAHAN PENTING)
      {
        id: "b1_4_pronominal",
        title: "4. Kata Ganti 'Wo-' dan 'Da-' (Dafür, Wofür)",
        content: [
          { type: "text", content: "Cara mempersingkat preposisi untuk **BENDA** (Bukan Orang). \nRumus: **Da(r) + Preposisi**. \nOrang Jerman malas mengulang kata benda. Mereka pakai singkatan 'Da-' (Pengganti Benda) dan 'Wo-' (Untuk bertanya)." },
          {
            type: "table",
            headers: ["Preposisi", "Tanya (Benda)", "Jawab (Singkat)", "Contoh"],
            rows: [
              ["für", "Wofür? (Untuk apa?)", "Dafür (Untuk itu)", "Ich lerne. **Dafür** brauche ich Zeit."],
              ["mit", "Womit? (Dengan apa?)", "Damit (Dengan itu)", "Der Stift. **Damit** schreibe ich."],
              ["an", "Woran? (Tentang apa?)", "Daran (Tentang itu)", "Der Urlaub. Ich denke **daran**."],
              ["auf", "Worauf? (Pada apa?)", "Darauf (Pada itu)", "Der Bus. Ich warte **darauf**."]
            ]
          },
          {
            type: "table",
            headers: ["Konteks", "Orang (Person)", "Benda (Sache)"],
            rows: [
              ["Bertanya", "**Auf wen** wartest du? (Siapa)", "**Worauf** wartest du? (Apa)"],
              ["Menjawab", "Ich warte **auf ihn**. (Dia)", "Ich warte **darauf**. (Itu)"],
              ["Preposisi 'Mit'", "**Mit wem** gehst du? / **Mit ihm**.", "**Womit** fährst du? / **Damit**."],
              ["Preposisi 'An'", "**An wen** denkst du? / **An sie**.", "**Woran** denkst du? / **Daran**."]
            ]
          },
          { type: "text", content: "ATURAN 'R':\nJika preposisi dimulai huruf vokal (an, auf, in, über), tambahkan 'r' di tengah.\n- Da + an = Da**r**an.\n- Wo + auf = Wo**r**auf. \n**RUMUS R (Vokal):**\nJika preposisi diawali vokal (Auf, An, Über, In), tambahkan huruf 'r' di tengah biar enak dibaca.\n- Wo + Auf = Wo**r**auf (Bukan Woauf).\n- Da + An = Da**r**an (Bukan Daan)." }
        ],
        tips: [
          "Hanya untuk BENDA! Kalau orang, tetap pakai preposisi biasa. (Ich denke an dich - BUKAN daran).",
          "Ingat: **DA-** dan **WO-** hanya untuk BENDA/KONSEP. Tidak boleh untuk manusia/hewan.",
          "Contoh salah: 'Ich liebe meine Frau. Ich denke daran.' (Salah! Istri itu orang, harus 'Ich denke an sie')."
        ],
        resources: [
          { title: "Video: Wo- & Da- Compounds", url: "https://www.youtube.com/watch?v=woda_compounds", type: "video" }
        ]
      },

      // 5. KALIMAT RELATIF
      {
        id: "b1_5_relativsatz",
        title: "5. Kalimat Relatif (Yang...)",
        content: [
          { type: "text", content: "Menjelaskan benda lebih detail. Artikel (der/die/das) jadi penghubung. Verb pindah ke akhir." },
          {
            type: "table",
            headers: ["Gender", "Nominativ (Subjek)", "Akkusativ (Objek)", "Dativ"],
            rows: [
              ["Maskulin", "Der Mann, **der** lacht", "Der Mann, **den** ich sehe", "Der Mann, **dem** ich helfe"],
              ["Feminin", "Die Frau, **die** singt", "Die Frau, **die** ich höre", "Die Frau, **der** ich danke"],
              ["Plural", "Die Leute, **die** warten", "Die Leute, **die** ich kenne", "Die Leute, **denen** ich helfe"]
            ]
          }
        ],
        tips: ["Hati-hati dengan Dativ Plural! Artikelnya berubah jadi **denen** (bukan den)."],
        resources: [
          { title: "Latihan Relativsatz", url: "https://deutsch.lingolia.com/de/grammatik/satzbau/nebensaetze/relativsaetze", type: "web" }
        ]
      },

      // 6. GENITIV
      {
        id: "b1_6_genitiv",
        title: "6. Kasus Genitiv (Kepemilikan)",
        content: [
          { type: "text", content: "Menunjukkan milik. Ciri khas: Artikel berubah, benda Maskulin/Neutral dapat akhiran **-(e)s**." },
          {
            type: "table",
            headers: ["Gender", "Artikel", "Akhiran Benda", "Contoh"],
            rows: [
              ["Maskulin", "**des**", "+(e)s", "Das Auto **des** Mann**es**"],
              ["Feminin", "**der**", "-", "Die Tasche **der** Frau"],
              ["Neutral", "**des**", "+(e)s", "Das Spiel **des** Kind**es**"],
              ["Plural", "**der**", "-", "Das Haus **der** Eltern"]
            ]
          },
          { type: "text", content: "PREPOSISI GENITIV:\n- **Wegen** (Karena): Wegen des Regens.\n- **Trotz** (Meskipun): Trotz des Staus.\n- **Während** (Selama): Während der Pause." }
        ],
        tips: ["Di bahasa lisan (gaul), orang sering ganti Genitiv dengan Dativ ('Wegen dem Wetter'). Tapi di ujian B1, wajib Genitiv!"],
        resources: [
          { title: "Nicos Weg B1: Genitiv", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "video" }
        ]
      },

      // 7. N-DEKLINATION (TAMBAHAN PENTING)
      {
        id: "b1_7_ndeklination",
        title: "7. N-Deklination (Kata Benda Lemah)",
        content: [
          { type: "text", content: "Beberapa kata benda MASKULIN (biasanya berakhiran -e, -ist, -ent) mendapat akhiran **-n** atau **-en** di semua kasus (Kecuali Nominativ Tunggal)." },
          {
            type: "table",
            headers: ["Kasus", "Normal (Tisch)", "N-Deklination (Junge)", "N-Deklination (Student)"],
            rows: [
              ["Nominativ", "Der Tisch", "Der Junge", "Der Student"],
              ["Akkusativ", "Den Tisch", "Den Junge**n**", "Den Student**en**"],
              ["Dativ", "Dem Tisch", "Dem Junge**n**", "Dem Student**en**"],
              ["Genitiv", "Des Tisches", "Des Junge**n**", "Des Student**en**"]
            ]
          },
          { type: "text", content: "KATA PENTING:\n- Orang: Der Junge, Der Kunde, Der Kollege, Der Mensch.\n- Profesi: Der Student, Der Polizist, Der Journalist, Der Tourist.\n- Hewan: Der Löwe, Der Affe, Der Bär." }
        ],
        tips: ["Jika kamu melihat 'Den Studenten' padahal itu tunggal (satu orang), itu adalah N-Deklination."],
        resources: [
          { title: "Daftar N-Deklination Lengkap (PDF)", url: "https://mein-deutschbuch.de/n-deklination.html", type: "web" }
        ]
      },

      // 8. DOPPELKONNEKTOREN
      {
        id: "b1_8_doppel",
        title: "8. Kata Hubung Ganda (Konektor)",
        content: [
          { type: "text", content: "Menghubungkan dua ide sekaligus." },
          {
            type: "table",
            headers: ["Konektor", "Arti", "Contoh"],
            rows: [
              ["sowohl ... als auch", "Baik ... maupun (dan)", "Ich spreche **sowohl** Deutsch **als auch** Englisch."],
              ["weder ... noch", "Tidak ... dan juga tidak", "Er isst **weder** Fleisch **noch** Fisch."],
              ["je ... desto", "Semakin ... semakin", "**Je** mehr ich lerne, **desto** besser werde ich."]
            ]
          }
        ],
        tips: ["'Weder ... noch' itu sudah negatif. Jangan tambah 'nicht' lagi!"],
        resources: [
          { title: "Latihan Je Desto", url: "https://deutsch.lingolia.com/de/grammatik/satzbau/konjunktionen/vergleichissaetze", type: "web" }
        ]
      },

      // 9. KONJUNKTIV II
      {
        id: "b1_9_konjunktiv",
        title: "9. Konjunktiv II (Sopan & Khayalan)",
        content: [
          { type: "text", content: "Bentuk untuk kesopanan tinggi dan situasi berandai-andai." },
          {
            type: "table",
            headers: ["Fungsi", "Bentuk", "Contoh"],
            rows: [
              ["Sopan", "Könnten / Würden", "**Könnten** Sie mir helfen?"],
              ["Keinginan", "Hätte / Wäre gern", "Ich **hätte** gern eine Cola."],
              ["Saran", "Sollten", "Du **solltest** zum Arzt gehen."],
              ["Khayalan", "Wäre / Hätte", "Wenn ich reich **wäre**, kaufte ich ein Haus."]
            ]
          }
        ],
        tips: ["Di restoran, jangan bilang 'Ich will'. Bilanglah 'Ich hätte gern' atau 'Ich möchte'."],
        resources: [
          { title: "Penjelasan Konjunktiv II", url: "https://mein-deutschbuch.de/konjunktiv-2.html", type: "web" }
        ]
      },

      // 10. INFINITIV MIT ZU
      {
        id: "b1_10_infinitiv",
        title: "10. Infinitiv dengan 'zu'",
        content: [
          { type: "text", content: "Menghubungkan dua verb. Verb kedua di akhir pakai 'zu'." },
          {
            type: "table",
            headers: ["Awal Kalimat", "Akhir Kalimat", "Arti"],
            rows: [
              ["Ich habe Lust,", "Pizza **zu** essen.", "Ada niat makan pizza."],
              ["Es ist wichtig,", "Deutsch **zu** lernen.", "Penting belajar Jerman."],
              ["Er versucht,", "das Auto **zu** reparieren.", "Mencoba memperbaiki mobil."]
            ]
          }
        ],
        tips: ["Jangan pakai 'zu' setelah Modal Verbs (können, müssen, dll)."],
        resources: [
          { title: "Latihan Infinitiv + Zu", url: "https://deutsch.lingolia.com/de/grammatik/verben/infinitiv-mit-zu", type: "web" }
        ]
      },

      // 11. KOSAKATA TEMATIK B1
      {
        id: "b1_11_vocab",
        title: "11. Kosakata: Lingkungan & Teknologi",
        content: [
          { type: "text", content: "Topik B1 lebih abstrak dan sosial." },
          {
            type: "table",
            headers: ["Topik", "Istilah", "Arti"],
            rows: [
              ["Lingkungan", "Der Klimawandel", "Perubahan Iklim"],
              ["Lingkungan", "Der Müll trennen", "Memilah sampah"],
              ["Lingkungan", "Die Umwelt schützen", "Melindungi lingkungan"],
              ["Teknologi", "Die Datei speichern", "Menyimpan file"],
              ["Teknologi", "Herunterladen", "Download"],
              ["Masyarakat", "Die Bevölkerung", "Populasi"]
            ]
          }
        ],
        tips: ["Hafalkan kata kerja fungsional: 'eine Entscheidung treffen' (membuat keputusan), bukan cuma 'entscheiden'."],
        resources: [
          { title: "Goethe B1 Wordlist", url: "https://www.goethe.de/pro/relaunch/prf/en/Goethe-Zertifikat_B1_Wortliste.pdf", type: "pdf" }
        ]
      },
      
      // 12. PARTIZIP I & II SEBAGAI ADJEKTIV (PELENGKAP B1)
      {
        id: "b1_12_partizip",
        title: "12. Partizip sebagai Kata Sifat",
        content: [
          {
            type: "text",
            content: "Kata kerja bisa berubah fungsi menjadi kata sifat untuk menjelaskan benda secara efisien tanpa perlu bikin kalimat 'yang' (Relativsatz)."
          },
          {
            type: "table",
            headers: ["Tipe", "Arti", "Asal -> Hasil"],
            rows: [
              ["Partizip I (Verb + d)", "Aktif / Sedang terjadi", "schlafen -> das **schlafende** Kind (Anak yang sedang tidur)."],
              ["Partizip II (Ge-)", "Pasif / Sudah terjadi", "kochen -> das **gekochte** Ei (Telur yang sudah direbus)."]
            ]
          },
          {
            type: "text",
            content: "CONTOH LAIN:\n- Der **bellende** Hund (Anjing yang menggonggong - Aktif).\n- Das **reparierte** Auto (Mobil yang diperbaiki - Pasif)."
          }
        ],
        tips: [
          "Ingat: Partizip I itu seperti '-ing' di Inggris (Sleeping). Partizip II itu seperti V3 (Cooked).",
          "Jangan lupa tambahkan akhiran adjektiva (deklinasi) di ujungnya! (Der schlafend**e** Hund)."
        ],
        resources: [
          { title: "Penjelasan Partizipien", url: "https://mein-deutschbuch.de/partizip-1.html", type: "web" }
        ]
      },

      // 13. FUTUR I (MASA DEPAN)
      {
        id: "b1_13_futur",
        title: "13. Futur I (Masa Depan)",
        content: [
          {
            type: "text",
            content: "Selain pakai 'Present + Waktu' (Morgen gehe ich), kita bisa pakai bentuk Futur resmi untuk janji atau prediksi.\nRumus: **Werden + Infinitiv (Akhir)**."
          },
          {
            type: "table",
            headers: ["Subjek", "Werden (Aux)", "Infinitiv (Akhir)", "Arti"],
            rows: [
              ["Ich", "werde", "lernen", "Saya akan belajar"],
              ["Du", "wirst", "sehen", "Kamu akan melihat"],
              ["Er/Sie", "wird", "kommen", "Dia akan datang"],
              ["Wir", "werden", "reisen", "Kami akan bepergian"],
              ["Ihr", "werdet", "sein", "Kalian akan menjadi"]
            ]
          },
          {
            type: "text",
            content: "CONTOH PENGGUNAAN:\n- Janji: Ich **werde** dich immer **lieben**. (Aku akan selalu mencintaimu).\n- Prediksi Cuaca: Morgen **wird** es **regnen**. (Besok akan hujan)."
          }
        ],
        tips: [
          "Jangan tertukar! 'Werden' di sini artinya 'Akan', bukan 'Menjadi' atau 'Pasif'. Lihat ekor kalimatnya, kalau ada Verb Infinitiv, berarti Future.",
          "Sering dipakai di horoskop dan ramalan cuaca."
        ]
      },

      // 14. KATA KERJA "LASSEN" (MULTI-FUNGSI)
      {
        id: "b1_14_lassen",
        title: "14. Kata Kerja 'Lassen' (Membiarkan/Menyuruh)",
        content: [
          {
            type: "text",
            content: "Kata kerja ini unik karena punya dua arti yang sangat berbeda tergantung konteks. Polanya mirip Modal Verb (Lassen posisi 2 + Verb lain di ujung)."
          },
          {
            type: "table",
            headers: ["Fungsi", "Arti", "Contoh Kalimat"],
            rows: [
              ["1. Membiarkan/Meninggalkan", "To leave / To let", "Ich **lasse** mein Handy zu Hause. (Saya tinggal HP di rumah)."],
              ["2. Menyuruh (Orang Lain)", "To have something done", "Ich **lasse** meine Haare **schneiden**. (Saya potong rambut - di salon, bukan potong sendiri)."],
              ["3. Mengizinkan", "To allow", "Der Vater **lässt** das Kind **spielen**."],
              ["4. Ajakan (Imperativ)", "Let's...", "**Lass uns** gehen! (Ayo kita pergi!)"]
            ]
          },
          {
            type: "text",
            content: "KONJUGASI (IREGULER):\nIch lasse, Du **lässt**, Er **lässt**, Wir lassen, Ihr lasst, Sie lassen."
          }
        ],
        tips: [
          "Beda 'Ich schneide meine Haare' (Saya potong sendiri) vs 'Ich lasse meine Haare schneiden' (Saya ke tukang cukur). Hati-hati!",
          "Lass uns... adalah cara paling umum mengajak teman nongkrong."
        ]
      },

      // 15. KONJUNKTIV II MASA LAMPAU (PENYESALAN)
      {
        id: "b1_15_konjunktiv_past",
        title: "15. Konjunktiv II Lampau (Penyesalan)",
        content: [
          {
            type: "text",
            content: "Bagaimana bilang 'Seandainya dulu aku...'? Ini bentuk untuk menyesali kejadian yang sudah lewat dan tidak bisa diubah.\nRumus: **wäre/hätte + Partizip II**."
          },
          {
            type: "table",
            headers: ["Situasi Nyata (Lampau)", "Harapan / Penyesalan", "Arti"],
            rows: [
              ["Ich war krank. (Aku sakit)", "Ich **wäre** gern gesund **gewesen**.", "Coba aja dulu aku sehat."],
              ["Ich habe nicht gelernt. (Aku gak belajar)", "Ich **hätte** mehr **gelernt**.", "Harusnya dulu aku belajar lebih banyak."],
              ["Er ist nicht gekommen.", "Er **wäre** bestimmt **gekommen**.", "Dia pasti akan datang (seandainya bisa)."]
            ]
          }
        ],
        tips: [
          "Kuncinya: Pilih 'hätte' atau 'wäre' tergantung kata kerjanya (sama seperti aturan Perfekt).",
          "Gunakan kata **'doch nur'** untuk mendramatisir. 'Hätte ich **doch nur** gelernt!' (Ah, andai saja aku belajar!)."
        ]
      },

      // 16. URUTAN KATA "TEKAMOLO" (RAHASIA SENTENCE ORDER)
      {
        id: "b1_16_tekamolo",
        title: "16. Aturan Emas TeKaMoLo",
        content: [
          {
            type: "text",
            content: "Bingung menaruh keterangan waktu dan tempat? Gunakan urutan **TeKaMoLo** di tengah kalimat (setelah Verb 1)."
          },
          {
            type: "table",
            headers: ["Urutan", "Kepanjangan", "Arti", "Contoh"],
            rows: [
              ["1. **Te**", "Temporal", "Kapan? (Waktu)", "Ich fahre **heute**..."],
              ["2. **Ka**", "Kausal", "Mengapa? (Sebab)", "...**wegen der Arbeit**..."],
              ["3. **Mo**", "Modal", "Bagaimana? (Cara)", "...**mit dem Bus**..."],
              ["4. **Lo**", "Lokal", "Di mana/Ke mana? (Tempat)", "...**nach Berlin**."]
            ]
          },
          {
            type: "text",
            content: "KALIMAT LENGKAP:\n*Ich fahre **heute** (Te) **wegen der Arbeit** (Ka) **mit dem Bus** (Mo) **nach Berlin** (Lo).*"
          }
        ],
        tips: [
          "Ingat saja: **Waktu (Te)** selalu di depan, **Tempat (Lo)** selalu di belakang dekat titik.",
          "Bahasa Inggris: Place before Time (to Berlin today). Jerman: Time before Place (**heute nach Berlin**). Jangan terbalik!"
        ],
        resources: [
          { title: "Penjelasan TeKaMoLo", url: "https://www.youtube.com/results?search_query=tekamolo+deutsch", type: "video" }
        ]
      },

      // 17. POSISI KONEKTOR (ADUSO vs TEGAMI)
      {
        id: "b1_17_connector_positions",
        title: "17. Posisi Verb pada Konektor",
        content: [
          {
            type: "text",
            content: "Tidak semua kata hubung itu sama! Ada yang 'Sopan' (Posisi 0), ada yang 'Egois' (Posisi 1 / Inversi)."
          },
          {
            type: "table",
            headers: ["Tipe", "Kata Kunci", "Struktur Kalimat", "Contoh"],
            rows: [
              ["Posisi 0 (Normal)", "**ADUSO** (Aber, Denn, Und, Sondern, Oder)", "Konektor + Subjek + Verb", "Ich will, **aber** ich **kann** nicht."],
              ["Posisi 1 (Inversi)", "**Deshalb, Trotzdem, Dann, Sonst**", "Konektor + **Verb** + Subjek", "Ich bin krank, **deshalb** **gehe** ich zum Arzt."],
              ["End-Position (Ekor)", "**Weil, Dass, Wenn, Als, Ob**", "Konektor + Subjek + ... + **Verb**", "Ich weiß, **dass** du klug **bist**."]
            ]
          }
        ],
        tips: [
          "Hafalkan geng **ADUSO** (Posisi 0). Selain mereka dan geng 'Weil', mayoritas konektor lain (Deshalb, Dann, Später) itu memicu INVERSI (Verb langsung nempel setelahnya).",
          "Jangan bilang 'Deshalb ich gehe'. Tapi 'Deshalb gehe ich'."
        ]
      },

      // 18. PREPOSISI GENITIV (BAHASA FORMAL)
      {
        id: "b1_18_genitiv_preps",
        title: "18. Preposisi Genitiv: Wegen, Trotz, Während",
        content: [
          {
            type: "text",
            content: "Di level B1, kita mulai menggunakan bahasa yang lebih 'intelek'. Preposisi ini diikuti oleh Genitiv (Des/Der), bukan Dem/Den."
          },
          {
            type: "table",
            headers: ["Preposisi", "Arti", "Contoh (Perhatikan Akhiran)"],
            rows: [
              ["Wegen", "Gara-gara / Karena", "**Wegen des** Wetter**s** bleibe ich hier. (Gara-gara cuaca)."],
              ["Trotz", "Meskipun", "**Trotz des** Regen**s** gehe ich raus. (Meskipun hujan)."],
              ["Während", "Selama (Durasi)", "**Während der** Arbeit darf man nicht essen. (Selama kerja)."],
              ["Innerhalb", "Di dalam (Waktu/Jarak)", "**Innerhalb einer** Woche. (Dalam seminggu)."]
            ]
          }
        ],
        tips: [
          "Ciri Genitiv Maskulin/Neutral: Artikel jadi **DES** + Benda tambah **-S** (Des Vaters, Des Wetters).",
          "Di bahasa percakapan santai (Jalanan), orang Jerman sering 'curang' pakai Dativ (*Wegen dem Wetter*). Tapi di Ujian Tulis, WAJIB Genitiv!"
        ]
      },

      // 19. PERPUSTAKAAN B1 (BERITA & BACAAN)
      {
        id: "b1_resources_general",
        title: "19. Perpustakaan B1 (Berita & Konteks)",
        content: [
          {
            type: "text",
            content: "Saatnya meninggalkan materi 'buatan' dan mulai konsumsi materi 'asli' tapi yang disederhanakan."
          },
          {
            type: "table",
            headers: ["Nama Sumber", "Tipe", "Keunggulan"],
            rows: [
              ["**Langsam gesprochene Nachrichten**", "Berita (DW)", "Berita asli hari ini, tapi dibacakan jauuuuh lebih lambat. Ada transkripnya."],
              ["**Deutsch für Euch**", "YouTube", "Penjelasan grammar yang sangat mendalam dan logis (oleh Katja)."],
              ["**Lingolia**", "Latihan Soal", "Website terbaik untuk latihan soal grammar B1 (gratis sebagian)."],
              ["**PONS Online**", "Kamus", "Mulai beralih ke kamus Jerman-Jerman (Deutsch als Fremdsprache)."]
            ]
          }
        ],
        tips: [
          "Baca berita DW setiap pagi. Coba pahami topik utamanya (Politik? Cuaca? Ekonomi?) tanpa buka kamus dulu.",
          "Jangan terjemahkan ke Inggris/Indo lagi. Coba cari arti kata di kamus Jerman-Jerman (Duden/Pons)."
        ],
        resources: [
          { title: "Berita Lambat (DW)", url: "https://learngerman.dw.com/de/langsam-gesprochene-nachrichten/s-60040332", type: "audio" }
        ]
      }
    ]
  },

  // --- LEVEL B2 (SUPER DUPER LENGKAP - FINAL) ---
  {
    id: "B2",
    title: "Materi B2 - Menengah Atas (Expert)",
    description: "Bahasa tingkat tinggi. Fokus pada nuansa, gaya bahasa akademis, idiom, dan struktur kalimat yang sangat kompleks.",
    sections: [
      // 1. NOMEN-VERB-VERBINDUNGEN (NVV)
      {
        id: "b2_1_nvv",
        title: "1. Nomen-Verb-Verbindungen (Bahasa Formal)",
        content: [
          {
            type: "text",
            content: "Ciri utama bahasa level tinggi (Berita/Akademis). Mengganti kata kerja simpel dengan kombinasi 'Kata Benda + Kata Kerja Fungsional'."
          },
          {
            type: "table",
            headers: ["Kata Kerja Simpel", "Bentuk NVV (Formal)", "Arti"],
            rows: [
              ["entscheiden", "eine Entscheidung **treffen**", "Mengambil keputusan"],
              ["kritisieren", "Kritik **üben** (an)", "Memberikan kritik"],
              ["fragen", "eine Frage **stellen**", "Mengajukan pertanyaan"],
              ["helfen", "Hilfe **leisten**", "Memberikan bantuan"],
              ["beeindrucken", "Eindruck **machen**", "Memberikan kesan"],
              ["wichtig sein", "eine Rolle **spielen**", "Berperan penting"]
            ]
          },
          {
            type: "text",
            content: "CONTOH:\n- Biasa: Wir müssen das entscheiden.\n- B2: Wir müssen **eine Entscheidung treffen**."
          }
        ],
        tips: [
          "Gunakan ini saat menulis email resmi atau presentasi. Jangan gunakan saat ngobrol santai (terdengar kaku).",
          "Hafalkan verb pasangannya! (Frage *stellen*, bukan *machen*)."
        ],
        resources: [
          { title: "Daftar NVV Lengkap (PDF)", url: "https://www.telc.net/fileadmin/user_upload/telc_deutsch_b2_c1_medizin_nomen_verb_verbindungen.pdf", type: "pdf" }
        ]
      },

      // 2. KONJUNKTIV I (BERITA)
      {
        id: "b2_2_konjunktiv1",
        title: "2. Konjunktiv I (Indirect Speech)",
        content: [
          {
            type: "text",
            content: "Digunakan untuk melaporkan ucapan orang lain secara netral (tanpa memihak). Wajib untuk membaca berita."
          },
          {
            type: "table",
            headers: ["Subjek", "Sein (Jadwal)", "Haben", "Verb Lain (-e)"],
            rows: [
              ["ich", "sei", "habe", "gehe"],
              ["du", "seiest", "habest", "gehest"],
              ["er/sie/es", "**sei**", "**habe**", "**gehe**"],
              ["wir", "seien", "haben", "gehen"],
              ["sie/Sie", "seien", "haben", "gehen"]
            ]
          },
          {
            type: "text",
            content: "CONTOH BERITA:\n- Der Minister sagte, er **habe** keine Zeit. (Menteri berkata dia tidak punya waktu).\n- Die Polizei meldet, der Täter **sei** geflohen. (Polisi melapor pelaku telah kabur)."
          }
        ],
        tips: [
          "Fokus hafalkan bentuk 'er/sie/es' (orang ketiga), karena berita biasanya membicarakan orang lain.",
          "Jika bentuk Konjunktiv I sama dengan Indikativ, ganti ke Konjunktiv II (würde)."
        ],
        resources: [
          { title: "Tagesschau (Berita Asli)", url: "https://www.tagesschau.de/", type: "video" }
        ]
      },

      // 3. ZUSTANDSPASSIV
      {
        id: "b2_3_zustandspassiv",
        title: "3. Zustandspassiv (Pasif Keadaan)",
        content: [
          {
            type: "text",
            content: "Menjelaskan hasil akhir dari sebuah proses, bukan prosesnya itu sendiri.\nRumus: **Sein + Partizip II**."
          },
          {
            type: "table",
            headers: ["Jenis Pasif", "Rumus", "Makna"],
            rows: [
              ["Vorgang (Proses)", "Die Tür **wird** geschlossen.", "Pintu sedang ditutup (ada aksi)."],
              ["Zustand (Hasil)", "Die Tür **ist** geschlossen.", "Pintu (sudah) tertutup (status)."]
            ]
          }
        ],
        tips: [
          "Bedakan dengan Perfekt! Perfekt: 'Er ist gegangen' (Dia sudah pergi - Aktif). Zustandspassiv: 'Es ist geöffnet' (Itu terbuka - Pasif).",
          "Sangat berguna untuk mendeskripsikan kondisi barang/ruangan."
        ],
        resources: [
          { title: "Latihan Zustandspassiv", url: "https://deutsch.lingolia.com/de/grammatik/verben/passiv/zustandspassiv", type: "web" }
        ]
      },

      // 4. SUBJEKTIVE MODALVERBEN
      {
        id: "b2_4_modal_subjektiv",
        title: "4. Modal Verbs Subjektif (Dugaan)",
        content: [
          {
            type: "text",
            content: "Modal verb bisa dipakai untuk menyatakan tingkat keyakinan atau gosip."
          },
          {
            type: "table",
            headers: ["Modal", "Keyakinan", "Arti"],
            rows: [
              ["müssen", "99% (Pasti)", "Er **muss** krank sein. (Dia pasti sakit)"],
              ["dürfte", "75% (Mungkin besar)", "Er **dürfte** zu Hause sein. (Dia kayaknya di rumah)"],
              ["könnte", "50% (Mungkin)", "Es **könnte** regnen. (Bisa jadi hujan)"],
              ["sollen", "Gosip (Katanya)", "Der Film **soll** gut sein. (Kata orang filmnya bagus)"],
              ["wollen", "Klaim (Ngakunya)", "Er **will** reich sein. (Dia ngakunya kaya, padahal...)"]
            ]
          }
        ],
        tips: [
          "'Sollen' = Kata orang lain. 'Wollen' = Kata subjek itu sendiri (biasanya kita ragu).",
          "Sering muncul di ujian listening B2!"
        ],
        resources: [
          { title: "Video Penjelasan Modal Subjektif", url: "https://www.youtube.com/watch?v=Modalverben_B2", type: "video" }
        ]
      },

      // 5. NOMINALISIERUNG (TAMBAHAN BOSS LEVEL)
      {
        id: "b2_5_nominalisierung",
        title: "5. Nominalisierte Adjektive (Kata Sifat jadi Benda)",
        content: [
          {
            type: "text",
            content: "Mengubah kata sifat atau partizip menjadi kata benda untuk menyebut orang/hal. Penulisannya **Huruf Besar** dan mengikuti aturan deklinasi kata sifat."
          },
          {
            type: "table",
            headers: ["Asal Kata", "Orang (Masc/Fem)", "Hal (Neutral)", "Plural"],
            rows: [
              ["krank (sakit)", "Der Kranke (Si sakit)", "-", "Die Kranken"],
              ["reisen (travel)", "Der Reisende (Wisatawan)", "-", "Die Reisenden"],
              ["gut (bagus)", "-", "Das Gute (Hal baik)", "-"],
              ["neu (baru)", "Der Neue (Si anak baru)", "Das Neue (Hal baru)", "Die Neuen"]
            ]
          },
          {
            type: "text",
            content: "FRASA UMUM:\n- **Alles Gute!** (Semua yang baik/Selamat!)\n- **Nichts Neues.** (Tidak ada hal baru).\n- **Das Beste** kommt noch. (Hal terbaik masih akan datang)."
          }
        ],
        tips: [
          "Setelah kata 'alles', 'etwas', 'nichts', 'viel', 'wenig', kata sifat selalu menjadi Kata Benda (Huruf Besar) dan berakhiran **-es** (Alles Gut**es**).",
          "Kecuali: 'Alles klar' (bukan benda)."
        ],
        resources: [
          { title: "Penjelasan Nominalisierung", url: "https://mein-deutschbuch.de/nominalisierung.html", type: "web" }
        ]
      },

      // 6. GERUNDIVUM (TAMBAHAN BOSS LEVEL)
      {
        id: "b2_6_gerundivum",
        title: "6. Gerundivum (Modales Partizip)",
        content: [
          {
            type: "text",
            content: "Cara super efisien (dan elit) untuk menggantikan kalimat pasif dengan modal 'müssen/können'. Sering di bahasa teknis/akademis.\nRumus: **zu + Partizip I**."
          },
          {
            type: "table",
            headers: ["Kalimat Pasif (Ribet)", "Gerundivum (Efisien)", "Arti"],
            rows: [
              ["Das Problem, das gelöst werden muss.", "Das **zu lösende** Problem.", "Masalah yang harus dipecahkan."],
              ["Die Bücher, die gelesen werden können.", "Die **zu lesenden** Bücher.", "Buku yang bisa dibaca."],
              ["Die Gefahr, die vermieden werden muss.", "Die **zu vermeidende** Gefahr.", "Bahaya yang harus dihindari."]
            ]
          }
        ],
        tips: [
          "Strukturnya mirip bahasa Inggris 'The *to-be-solved* problem'.",
          "Ingat: Selalu berfungsi sebagai Adjektiv, jadi harus punya akhiran (deklinasi) sesuai bendanya."
        ],
        resources: [
          { title: "Latihan Gerundivum", url: "https://deutsch.lingolia.com/de/grammatik/verben/partizipien/gerundivum", type: "web" }
        ]
      },

      // 7. PASSIVERSATZFORMEN (ALTERNATIF PASIF)
      {
        id: "b2_7_passiversatz",
        title: "7. Alternatif Pasif (Tanpa Werden)",
        content: [
          {
            type: "text",
            content: "Bahasa Jerman benci pengulangan kata. Gunakan variasi ini agar tidak melulu pakai 'werden'."
          },
          {
            type: "table",
            headers: ["Bentuk", "Contoh", "Arti Pasif"],
            rows: [
              ["sein + zu + Infinitiv", "Das **ist zu** machen.", "Itu bisa/harus dikerjakan."],
              ["sich lassen + Infinitiv", "Das **lässt sich** machen.", "Itu bisa dikerjakan."],
              ["Adjektiv -bar", "Das ist mach**bar**.", "Itu 'do-able' (bisa dikerjakan)."],
              ["Adjektiv -lich", "Das ist verständ**lich**.", "Itu bisa dimengerti."]
            ]
          }
        ],
        tips: [
          "Kata berakhiran **-bar** (Trinkbar, Essbar, Machbar) adalah cara termudah bilang 'bisa di-'.",
          "'Sich lassen' sangat populer di bahasa lisan. 'Das lässt sich reparieren' (Itu bisa dibenerin kok)."
        ],
        resources: [
          { title: "Latihan Passiversatz", url: "https://mein-deutschbuch.de/passiversatz.html", type: "web" }
        ]
      },

      // 8. KONEKTOR LANJUTAN
      {
        id: "b2_8_konnektoren",
        title: "8. Konektor Ganda Lanjutan",
        content: [
          {
            type: "text",
            content: "Untuk menyusun argumen yang kompleks."
          },
          {
            type: "table",
            headers: ["Konektor", "Arti", "Contoh"],
            rows: [
              ["nicht nur ..., sondern auch", "Bukan hanya ..., tapi juga", "Er ist **nicht nur** reich, **sondern auch** nett."],
              ["einerseits ..., andererseits", "Di satu sisi ..., di sisi lain", "**Einerseits** will ich reisen, **andererseits** muss ich sparen."],
              ["entweder ..., oder", "Entah ... atau", "Wir fahren **entweder** heute **oder** morgen."]
            ]
          }
        ],
        tips: [
          "Einerseits/Andererseits memicu **Inversi** (Verb duluan). 'Einerseits **ist** es gut...'.",
          "Gunakan ini di ujian Speaking B2 bagian 'Diskusi Pro & Kontra' untuk nilai tinggi."
        ],
        resources: [
          { title: "Redemittel Diskusi B2", url: "https://www.youtube.com/watch?v=Redemittel_B2", type: "video" }
        ]
      },

      // 9. KOSAKATA: MEDIA & TEKNOLOGI
      {
        id: "b2_9_media",
        title: "9. Kosakata: Media & Digital",
        content: [
          {
            type: "text",
            content: "Topik wajib B2. Membahas dampak teknologi dan media sosial."
          },
          {
            type: "table",
            headers: ["Jerman", "Indonesia", "Contoh Konteks"],
            rows: [
              ["Die Auswirkung", "Dampak", "Negative Auswirkungen auf Kinder"],
              ["Die Sucht", "Kecanduan", "Handysucht (Kecanduan HP)"],
              ["Das soziale Netzwerk", "Sosmed", "Facebook nutzen"],
              ["erreichbar sein", "Bisa dihubungi", "Immer erreichbar sein"],
              ["abschalten", "Mematikan/Rileks", "Das Handy abschalten"],
              ["Die Daten schützen", "Melindungi data", "Datenschutz ist wichtig"]
            ]
          }
        ],
        tips: [
          "Gunakan kata 'nutzen' (menggunakan) untuk teknologi, lebih formal daripada 'benutzen'.",
          "Hafalkan argumen Pro/Kontra teknologi untuk persiapan ujian."
        ],
        resources: [
          { title: "Artikel: Digitalisierung", url: "https://www.spiegel.de/netzwelt/", type: "web" }
        ]
      },

      // 10. KOSAKATA: LINGKUNGAN AKADEMIS
      {
        id: "b2_10_umwelt",
        title: "10. Kosakata: Lingkungan & Sains",
        content: [
          {
            type: "text",
            content: "Bahasa akademis untuk debat isu global."
          },
          {
            type: "table",
            headers: ["Jerman", "Indonesia", "Contoh"],
            rows: [
              ["Die Nachhaltigkeit", "Keberlanjutan", "Nachhaltig leben"],
              ["Der Treibhauseffekt", "Efek Rumah Kaca", "Erderwärmung"],
              ["Die Verschwendung", "Pemborosan", "Lebensmittelverschwendung"],
              ["wiederverwerten", "Daur ulang", "Plastik recyceln"],
              ["Die Maßnahme", "Tindakan", "Maßnahmen ergreifen (Mengambil tindakan)"],
              ["verzichten auf", "Rela tanpa/Mengurangi", "Auf Plastik verzichten"]
            ]
          }
        ],
        tips: [
          "Verba 'verzichten auf + Akk' (hidup tanpa sesuatu) sangat sering dipakai di tema minimalisme.",
          "Maßnahmen 'ergreifen' atau 'treffen' adalah kolokasi wajib."
        ],
        resources: [
          { title: "Doku: Klimawandel (Terra X)", url: "https://www.zdf.de/dokumentation/terra-x", type: "video" }
        ]
      },

      // 11. RELATIVSATZ LANJUTAN (Genitiv & Preposisi)
      {
        id: "b2_11_relativ_komplex",
        title: "11. Kalimat Relatif Kompleks (Dessen/Deren)",
        content: [
          {
            type: "text",
            content: "Level tertinggi kalimat relatif. Menunjukkan kepemilikan (Genitiv) atau lokasi (Preposisi) di dalam kalimat penjelas."
          },
          {
            type: "table",
            headers: ["Jenis", "Rumus", "Contoh Kalimat"],
            rows: [
              ["Genitiv (Masc/Neut)", "dessen", "Der Mann, **dessen** Auto kaputt ist... (Pria yang mobilnya rusak)"],
              ["Genitiv (Fem/Plu)", "deren", "Die Frau, **deren** Kinder spielen... (Wanita yang anak-anaknya bermain)"],
              ["Preposisi", "Prep + den/dem/der", "Das Haus, **in dem** ich wohne... (Rumah di mana saya tinggal)"],
              ["Wo- (Lokasi)", "wo...", "Die Stadt, **wo** ich geboren bin..."]
            ]
          }
        ],
        tips: [
          "Ingat: Setelah 'dessen/deren', kata bendanya TIDAK boleh pakai artikel lagi! (Salah: dessen das Auto. Benar: dessen Auto).",
          "Untuk preposisi, cek kasusnya! 'In' + Diam = Dativ (in dem). 'In' + Gerak = Akkusativ (in das)."
        ],
        resources: [
          { title: "Latihan Relativsatz Dessen/Deren", url: "https://www.schubert-verlag.de/aufgaben/uebungen_b2/b2_kap4_relativsaetze.htm", type: "web" }
        ]
      },

      // 12. REDEMITTEL (STRATEGI UJIAN)
      {
        id: "b2_12_redemittel",
        title: "12. Strategi Ujian: Grafik & Komplain",
        content: [
          {
            type: "text",
            content: "Di B2, kamu wajib bisa mendeskripsikan data statistik dan menyampaikan keluhan (Beschwerde) dengan sopan tapi tegas."
          },
          {
            type: "table",
            headers: ["Fungsi", "Frasa Kunci (Hafalkan!)"],
            rows: [
              ["Judul Grafik", "Das Thema der Grafik ist... / Die Grafik zeigt..."],
              ["Data Utama", "Aus der Statistik geht hervor, dass... (Dari statistik terlihat bahwa...)"],
              ["Meningkat", "Die Zahl ist gestiegen / hat zugenommen."],
              ["Menurun", "Die Zahl ist gesunken / zurückgegangen."],
              ["Komplain Awal", "Hiermit möchte ich mich über ... beschweren."],
              ["Kecewa", "Ich bin mit dem Service gar nicht zufrieden."]
            ]
          }
        ],
        tips: [
          "Jangan cuma bilang 'naik' (gehen hoch). Gunakan kata 'steigen' (naik) atau 'sinken' (turun) biar terdengar intelek.",
          "Di surat komplain, selalu akhiri dengan tuntutan: 'Ich erwarte eine Rückerstattung' (Saya harap pengembalian dana)."
        ],
        resources: [
          { title: "Redemittel Grafikbeschreibung (PDF)", url: "https://www.hueber.de/media/36/Sicher-B2-Lektion-1-Redemittel-Grafikbeschreibung.pdf", type: "pdf" }
        ]
      },

      // 13. MODALPARTIKELN (BUMBU BAHASA)
      {
        id: "b2_13_partikeln",
        title: "13. Modalpartikeln (Kata 'Bumbu')",
        content: [
          {
            type: "text",
            content: "Ini rahasia terdengar seperti Native! Kata-kata ini tidak mengubah arti kalimat secara harfiah, tapi mengubah **nada/emosi** pembicara."
          },
          {
            type: "table",
            headers: ["Partikel", "Nuansa Emosi", "Contoh"],
            rows: [
              ["doch", "Mengingatkan / Membantah / Harapan", "Das weißt du **doch**! (Kan kamu udah tau!).\nKomm **doch** mal her! (Sini dong!)."],
              ["mal", "Biar terdengar santai / sebentar", "Guck **mal**! (Coba liat deh).\nIch mache das **mal** schnell. (Aku kerjain bentar ya)."],
              ["ja", "Kekaguman / Hal yang sudah jelas", "Das ist **ja** super! (Wah keren banget!).\nWir sind **ja** Freunde. (Kan kita emang temen)."],
              ["halt / eben", "Pasrah / Ya mau gimana lagi", "Das ist **halt** so. (Ya emang gitu kenyataannya)."],
              ["denn", "Kepastian / Ramah (di pertanyaan)", "Was machst du **denn** hier? (Lho, lagi ngapain di sini?)."]
            ]
          }
        ],
        tips: [
          "Jangan gunakan 'denn' di kalimat berita, cuma boleh di pertanyaan.",
          "'Doch' adalah kata ajaib. Bisa buat maksa secara halus: 'Iss **doch** dein Brot!' (Makan dong rotinya!)."
        ],
        resources: [
          { title: "Video Modalpartikeln (Easy German)", url: "https://www.youtube.com/watch?v=lyNMvKk0Y2E", type: "video" }
        ]
      },

      // 14. FUNGSI "ES" (SUBJEK SEMU)
      {
        id: "b2_14_es_functions",
        title: "14. Misteri Kata 'Es'",
        content: [
          {
            type: "text",
            content: "Kata 'Es' bukan cuma berarti 'It/Dia'. Di B2, 'Es' punya fungsi gramatikal yang unik sebagai Platzhalter (penjaga tempat)."
          },
          {
            type: "table",
            headers: ["Fungsi", "Penjelasan", "Contoh"],
            rows: [
              ["Subjek Alam/Waktu", "Tidak ada pelakunya, cuma fenomena.", "**Es** regnet. (Hujan)\n**Es** ist 5 Uhr."],
              ["Platzhalter (Pasif)", "Menjaga agar Verb tetap di posisi 2.", "**Es** wird getanzt. (Ada dansa)\n*Tapi jika dibalik, Es hilang:* Heute wird getanzt."],
              ["Korrelat (Penunjuk)", "Menunjuk ke anak kalimat di belakang.", "Ich liebe **es**, wenn du lachst. (Saya suka [hal ini], yaitu saat kamu tertawa)."]
            ]
          }
        ],
        tips: [
          "Di kalimat Pasif tanpa subjek, 'Es' cuma pajangan di depan. Kalau ada kata lain di depan (misal: Heute/Hier), buang 'Es'-nya!",
          "Salah: Hier es wird gearbeitet. Benar: Hier wird gearbeitet."
        ]
      },

      // 15. PERPUSTAKAAN B2 (MATERI NATIVE)
      {
        id: "b2_resources_general",
        title: "15. Perpustakaan B2 (Dunia Nyata)",
        content: [
          {
            type: "text",
            content: "Selamat datang di dunia nyata! Di level ini, sumber belajarmu sama dengan apa yang orang Jerman asli tonton/baca."
          },
          {
            type: "table",
            headers: ["Nama Sumber", "Kategori", "Deskripsi"],
            rows: [
              ["**Tagesschau** (ARD)", "Berita TV", "Berita paling resmi di Jerman. Bahasanya cepat, formal, dan padat (15 menit)."],
              ["**MrWissen2go**", "YouTube Edukasi", "Pengetahuan umum (Sejarah/Politik) dengan bahasa yang jelas tapi cepat."],
              ["**Spiegel / Zeit**", "Majalah/Koran", "Artikel opini dengan bahasa tingkat tinggi (C1/C2)."],
              ["**Duden**", "Kitab Suci", "KBBI-nya Jerman. Cek ejaan, gender, dan asal kata di sini."]
            ]
          }
        ],
        tips: [
          "Nonton film/series Jerman di Netflix (Dark, Babylon Berlin, How to Sell Drugs...) dengan subtitle **JERMAN** (bukan Inggris/Indo).",
          "Ikuti akun meme Jerman (seperti @alman_memes) di Instagram untuk belajar bahasa gaul dan sarkasme."
        ],
        resources: [
          { title: "Tagesschau in 100 Sekunden", url: "https://www.tagesschau.de/multimedia/sendung/tagesschau_in_100_sekunden", type: "video" },
          { title: "Duden Online", url: "https://www.duden.de/", type: "web" }
        ]
      }
    ]
  }
];