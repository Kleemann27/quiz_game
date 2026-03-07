export type AnswerOption = {
  id: string;
  text: string;
};

export type Question = {
  id: number;
  question: string;
  options: AnswerOption[];
  correctAnswerId: string;
};

export type UserAnswer = {
  questionId: number;
  question: string;
  selectedAnswerId: string;
  selectedAnswerText: string;
  correctAnswerId: string;
  isCorrect: boolean;
};