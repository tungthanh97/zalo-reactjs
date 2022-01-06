import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  EntityName,
  ErrorMessage,
  User,
  UserFormLogin,
  UserFormRegister,
} from 'Types';
import { logIn, userRegister, autoLogin } from 'Services';

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

export const registerAsync = createAsyncThunk<
  User,
  UserFormRegister,
  { rejectValue: ErrorMessage }
>(`${KEY}/register`, async (data, { rejectWithValue }) => {
  try {
    return await userRegister(data);
  } catch (error) {
    return rejectWithValue(error as ErrorMessage);
  }
});

export const autoLoginAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: ErrorMessage }
>(`${KEY}/auto-register`, async (refreshToken, { rejectWithValue }) => {
  try {
    return await autoLogin(refreshToken);
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
    [logInAsync.pending, registerAsync.pending, autoLoginAsync.pending].forEach(
      (item) => {
        builder.addCase(item, (state) => {
          state.isLoading = true;
          return state;
        });
      },
    );

    [
      logInAsync.fulfilled,
      registerAsync.fulfilled,
      autoLoginAsync.fulfilled,
    ].forEach((item) => {
      builder.addCase(item, (_, { payload }) => {
        return {
          isLoading: false,
          error: null,
          user: payload,
          isLoggedIn: true,
        };
      });
    });

    [
      logInAsync.rejected,
      registerAsync.rejected,
      autoLoginAsync.rejected,
    ].forEach((item) => {
      builder.addCase(item, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as ErrorMessage;
        return state;
      });
    });
  },
});

export const userReducer = userSlice.reducer;
export const { logInSuccess } = userSlice.actions;
