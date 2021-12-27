import { assign } from 'lodash-es';
import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { genGetAllEntity } from 'Services';
import { BaseEntity, EntityName, ErrorMessage } from 'Types';

export function createBaseSlice<T extends BaseEntity>(
  name: EntityName,
  initialData: T[] = [],
) {
  const initState: {
    isLoading: boolean;
    error: ErrorMessage | null;
    data: T[];
  } = {
    isLoading: false,
    error: null,
    data: initialData,
  };

  const loadEntitiesAsync = createAsyncThunk<
    T[],
    void,
    { rejectValue: ErrorMessage }
  >(`${name}/loadEntities`, async (_data, { rejectWithValue }) => {
    try {
      return await genGetAllEntity<T>(name)();
    } catch (error) {
      return rejectWithValue(error as ErrorMessage);
    }
  });

  const baseSlice = createSlice({
    name: `${name}_slice`,
    initialState: initState,
    reducers: {
      createEntity: (state, { payload }: PayloadAction<Draft<T>>) => {
        state.data.push(payload);
        return state;
      },
      updateEntity: (state, { payload }: PayloadAction<Draft<T>>) => {
        const foundIndex = state.data.findIndex(
          (entity) => entity.id === payload.id,
        );
        if (foundIndex > -1) {
          state.data[foundIndex] = assign(state.data[foundIndex], payload);
        }

        return state;
      },
      deleteEntity: (state, { payload }: PayloadAction<Draft<T>>) => {
        const foundEntity = state.data.find(
          (entity) => entity.id === payload.id,
        );
        if (foundEntity) {
          state.data = state.data.filter((item) => item.id !== foundEntity.id);
        }
        return state;
      },
    },
    extraReducers: (builder) => {
      //@ Pending
      builder
        .addCase(loadEntitiesAsync.pending, (state) => {
          state.isLoading = true;
          return state;
        })
        //fulfilled
        .addCase(loadEntitiesAsync.fulfilled, (_, { payload }) => {
          return {
            isLoading: true,
            data: payload,
            error: null,
          };
        })
        //@  Reject
        .addCase(loadEntitiesAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as ErrorMessage;
          return state;
        });
    },
  });

  return {
    loadEntitiesAsync,
    ...baseSlice.actions,
    ...baseSlice,
  };
}
