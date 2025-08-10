export interface QuestionOption {
  optionLetter: string;
  optionText: string;
}

export interface Question {
  questionText?: string;
  options: QuestionOption[];
  correctAnswerOption: string;
  explanation?: string;
}

export interface QuestionGroup {
  imageUrl?: string;
  audioUrl?: string;
  passageText?: string;
  questions: Question[];
}