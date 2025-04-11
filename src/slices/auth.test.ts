import { describe, expect, it } from '@jest/globals';
import authSlice, { setCredentials } from './auth';
import type { IAuthState } from './auth';
import type { TUser } from '../../declarations/user';

describe('authSlice reducers', () => {
  const initialState: IAuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuth: false,
  };

  it('should handle initial state', () => {
    const action = { type: undefined };
    const state = authSlice(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const user: TUser = {
      name: 'Test User',
      email: 'test@example.com',
      accessToken: 'test-token',
      refreshToken: 'test-refresh-token',
      password: 'test-password',
    };
    const action = {
      type: setCredentials.type,
      payload: {
        user,
        token: 'test-token',
        refreshToken: 'test-refresh-token',
      },
    };
    const state = authSlice(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.token).toBe('test-token');
    expect(state.refreshToken).toBe('test-refresh-token');
    expect(state.isAuth).toBe(true);
  });
});
