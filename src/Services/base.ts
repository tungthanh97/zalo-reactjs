import { BaseEntity, EntityName } from 'Types';
import { API } from './api';
import { BASE_URL } from './url';

export const genGetAllEntity = <T extends BaseEntity>(entity: EntityName) => {
  return async (): Promise<T[]> => {
    const { data } = await API.get<T[]>(`${BASE_URL}/${entity}`);
    return data;
  };
};
