import { QuestionData, EntityName, EntityPredicate } from 'Types';
import { useEntitySelector } from './base';

export const useQuesions = (predicate?: EntityPredicate<QuestionData>) => {
  return useEntitySelector<QuestionData>(EntityName.Question, predicate);
};
