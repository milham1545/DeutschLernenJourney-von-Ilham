export type QuestionType = "multiple-choice" | "fill-blank" | "reorder";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // Untuk multiple choice
  correctAnswer: string | string[]; // String untuk text/choice, Array untuk reorder
  explanation: string;
}

export interface LevelQuiz {
  level: string;
  title: string;
  questions: QuizQuestion[];
}

export const quizzes: Record<string, LevelQuiz> = {
  A1: {
    level: "A1",
    title: "Evaluasi Akhir Level A1",
    questions: [
      {
        id: "q1_a1",
        type: "multiple-choice",
        question: "Apa artikel yang tepat untuk kata 'Mädchen'?",
        options: ["Der", "Die", "Das"],
        correctAnswer: "Das",
        explanation: "Semua kata berakhiran '-chen' selalu memiliki gender Neutral (Das)."
      },
      {
        id: "q2_a1",
        type: "reorder",
        question: "Susun kalimat ini dengan benar (Aturan Verb Posisi 2):",
        options: ["kaufe", "Ich", "im Supermarkt", "ein"], // Opsi yang diacak
        correctAnswer: ["Ich", "kaufe", "im Supermarkt", "ein"], // Urutan benar
        explanation: "Verb 'einkaufen' adalah Trennbare Verben. 'Kaufe' posisi 2, 'ein' di akhir."
      },
      {
        id: "q3_a1",
        type: "fill-blank",
        question: "Lengkapi kalimat: 'Ich komme _____ Indonesien.'",
        correctAnswer: "aus",
        explanation: "Preposisi asal negara selalu menggunakan 'aus'."
      }
    ]
  },
  B1: {
    level: "B1",
    title: "Evaluasi TeKaMoLo & Pasif",
    questions: [
      {
        id: "q1_b1",
        type: "reorder",
        question: "Susun sesuai aturan TeKaMoLo:",
        options: ["nach Berlin", "heute", "fahre", "ich", "mit dem Zug"],
        correctAnswer: ["Ich", "fahre", "heute", "mit dem Zug", "nach Berlin"], 
        explanation: "Urutan: Subjek - Verb - Temporal (heute) - Kausal - Modal (mit dem Zug) - Lokal (nach Berlin)."
      },
      {
        id: "q2_b1",
        type: "fill-blank",
        question: "Ubah ke Pasif: 'Man repariert das Auto'. -> 'Das Auto _____ repariert.'",
        correctAnswer: "wird",
        explanation: "Pasif Present menggunakan 'Werden' + Partizip II."
      }
    ]
  }
};