import { genGetAllEntity } from './base';
import { QuestionData, EntityName } from 'Types';

const entity = EntityName.Question;

export const getAllQuestion = genGetAllEntity<QuestionData>(entity);

// export const getQuestionById = getEntityById(ORDER_URL);

// export const deleteQuestion = deleteEntity(ORDER_URL);

// export const createQuestion = createEntity(ORDER_URL);
