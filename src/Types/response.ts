import { BaseEntity } from '@Types/base';

export type Answer = BaseEntity & {
  text: string | null;
  isCorrect: boolean;
};

export type Response = BaseEntity & {
  answerIds: number[];
};
