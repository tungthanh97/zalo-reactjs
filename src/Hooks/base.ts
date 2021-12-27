import { filter, get } from 'lodash-es';
import { useAppSelector } from 'Stores';
import { EntityName, BaseEntity } from 'Types';

export type EntityPredicate<T extends BaseEntity> = (item: T) => boolean;

export const useEntitySelector = <T extends BaseEntity>(
  entityName: EntityName,
  predicate: EntityPredicate<T> = (item: T) => Boolean(item),
) => {
  const store = useAppSelector((state) => state);
  let data = get(store, `${entityName}.data`) as T[];

  return filter(data, predicate);
};
