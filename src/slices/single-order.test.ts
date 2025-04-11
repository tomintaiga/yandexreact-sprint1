import { describe, expect, it } from '@jest/globals';
import { showOrder, initialState } from './single-order';
import singleOrderSlice from './single-order';

describe('Show order action creator', () => {
  it('should handle initial state', () => {
    const action = { type: undefined };
    const state = singleOrderSlice(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should return the correct action', () => {
    const testAction = showOrder(true);
    expect(testAction.type).toBe('singleOrder/showOrder');
    expect(testAction.payload).toBe(true);
  });

  it('should return the correct action with false payload', () => {
    const testAction = showOrder(false);
    expect(testAction.type).toBe('singleOrder/showOrder');
    expect(testAction.payload).toBe(false);
  });
});

describe('Single order reducer', () => {
  it('should return the initial state', () => {
    const action = { type: undefined };
    const state = initialState;
    const newState = singleOrderSlice(state, action);
    expect(newState).toEqual(initialState);
  });

  it('should handle showOrder action', () => {
    const action = showOrder(true);
    const state = initialState;
    const newState = singleOrderSlice(state, action);
    expect(newState.showOrder).toBe(true);
  });
});
