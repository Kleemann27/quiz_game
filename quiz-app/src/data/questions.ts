import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: 1,
    question: "Mis on Eesti pealinn?",
    options: [
      { id: "a", text: "Tallinn" },
      { id: "b", text: "Tartu" },
      { id: "c", text: "Paide" },
    ],
    correctAnswerId: "a",
  },
  {
    id: 2,
    question: "Milline lind on Eesti rahvuslind?",
    options: [
      { id: "a", text: "Leevike" },
      { id: "b", text: "Suitsupääsuke" },
      { id: "c", text: "Varblane" },
    ],
    correctAnswerId: "b",
  },
  {
    id: 3,
    question: "Mis looma peetakse Eesti rahvusloomaks?",
    options: [
      { id: "a", text: "Hunt" },
      { id: "b", text: "Rebane" },
      { id: "c", text: "Karu" },
    ],
    correctAnswerId: "a",
  },
];