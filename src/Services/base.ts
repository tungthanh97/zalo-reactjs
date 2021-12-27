import { BaseEntity, EntityName } from 'Types';
import { API } from './api';
import { BASE_URL } from './url';
import { parseJson } from './util';

export const genGetAllEntity = <T extends BaseEntity>(entity: EntityName) => {
  return async (): Promise<T[]> => {
    const { data } = await API.get<string>(`${BASE_URL}/${entity}`);
    return parseJson<T[]>(data);
  };
};
