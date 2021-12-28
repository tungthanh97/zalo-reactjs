import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EntityName, ErrorMessage, User, UserFormLogin } from 'Types';
import { logIn } from 'Services';

const KEY = EntityName.User;

const initState: {
  isLoading: boolean;
  error: ErrorMessage | null;
  isLoggedIn: boolean;
  user: User;
} = {
  isLoading: false,
  error: null,
  user: {} as User,
  isLoggedIn: false,
};

export const logInAsync = createAsyncThunk<
  User,
  UserFormLogin,
  { rejectValue: ErrorMessage }
>(`${KEY}/login`, async (data, { rejectWithValue }) => {
  try {
    return await logIn(data);
  } catch (error) {
    return rejectWithValue(error as ErrorMessage);
  }
});

const userSlice = createSlice({
  name: `${KEY}_slice`,
  initialState: initState,
  reducers: {
    logInSuccess: (state) => {
      state.isLoggedIn = true;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAsync.pending, (state) => {
        state.isLoading = true;
        return state;
      })
      .addCase(logInAsync.fulfilled, (_, { payload }) => {
        return {
          isLoading: false,
          error: null,
          user: payload,
          isLoggedIn: true,
        };
      })
      .addCase(logInAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ErrorMessage;
        return state;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logInSuccess } = userSlice.actions;
