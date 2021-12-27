import { Response, EntityName, EntityPredicate } from 'Types';
import { useEntitySelector } from './base';

export const useResponse = (predicate?: EntityPredicate<Response>) => {
  return useEntitySelector<Response>(EntityName.Response, predicate);
};
