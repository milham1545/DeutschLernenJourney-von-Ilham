// src/utils/grammarGenerator.ts

export const determineArticle = (gender: string) => {
  if (gender === "m") return "der";
  if (gender === "f") return "die";
  if (gender === "n") return "das";
  return ""; // Unknown
};

// Fungsi Cerdas Tebak Gender dari Akhiran Kata
export const guessGender = (word: string): "m" | "f" | "n" | null => {
  const w = word.toLowerCase();
  
  // Ciri-ciri MASKULIN (Der)
  if (w.endsWith("er") || w.endsWith("en") || w.endsWith("ig") || w.endsWith("ling") || w.endsWith("ismus") || w.endsWith("ant")) return "m";
  
  // Ciri-ciri FEMININ (Die)
  if (w.endsWith("e") || w.endsWith("ung") || w.endsWith("heit") || w.endsWith("keit") || w.endsWith("schaft") || w.endsWith("tät") || w.endsWith("ion") || w.endsWith("ie") || w.endsWith("ik") || w.endsWith("ur")) return "f";
  
  // Ciri-ciri NEUTRAL (Das)
  if (w.endsWith("chen") || w.endsWith("lein") || w.endsWith("ment") || w.endsWith("tum") || w.endsWith("ma") || w.endsWith("um")) return "n";

  return null; // Tidak bisa ditebak
};

export const generateDeclension = (word: string, gender: string) => {
  const gen = gender.toLowerCase();
  
  const cases = {
    singular: { nom: "", gen: "", dat: "", akk: "" },
    plural: { nom: "", gen: "", dat: "", akk: "" }
  };

  // --- SINGULAR ---
  if (gen === "m") { // Der
    cases.singular = { nom: `der ${word}`, gen: `des ${word}s`, dat: `dem ${word}`, akk: `den ${word}` };
  } else if (gen === "f") { // Die
    cases.singular = { nom: `die ${word}`, gen: `der ${word}`, dat: `der ${word}`, akk: `die ${word}` };
  } else if (gen === "n") { // Das
    cases.singular = { nom: `das ${word}`, gen: `des ${word}s`, dat: `dem ${word}`, akk: `das ${word}` };
  }

  // --- PLURAL (Estimasi Kasar) ---
  // Kebanyakan feminin tambah -n/-en, maskulin/neutral tambah -e
  const pluralSuffix = gen === "f" ? "n" : "e";
  const pluralWord = word + pluralSuffix;
  
  cases.plural = {
    nom: `die ${pluralWord}`,
    gen: `der ${pluralWord}`,
    dat: `den ${pluralWord}n`, // Dativ plural selalu tambah n
    akk: `die ${pluralWord}`
  };

  return cases;
};