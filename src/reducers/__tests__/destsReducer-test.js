import reducer from '..';
import {
    listDestsError,
    listDestsRequest,
    listDestsSuccess
} from '../../actions';

describe('dests', () => {
  var stubData = { };
  var stubErr = new Error('list dests err');

  test('defaults to loading', () => {
    var state = reducer(undefined, { });
    expect(state.dests.isLoading).toBe(true);
  })

  test('listDestsRequest updates state', () => {
    var state = { dests: { error: 'err', isLoading: false, data: stubData } };
    state = reducer(state, listDestsRequest());

    expect(state.dests.isLoading).toEqual(true);
    expect(state.dests.error).toBeNull();
    expect(state.dests.data).toEqual(stubData);
  });

  test('listDestsError updates state', () => {
    var stubErr = new Error('list dests err');
    var state = { dests: { error: null, isLoading: true, data: stubData } };
    state = reducer(state, listDestsError(stubErr));

    expect(state.dests.isLoading).toEqual(false);
    expect(state.dests.error).not.toBeNull();
    expect(state.dests.data).toEqual(stubData);
  });

  test('listDestsSuccess updates state', () => {
    var state = { dests: { error: stubErr, isLoading: true } };
    state = reducer(state, listDestsSuccess(stubData));

    expect(state.dests.isLoading).toEqual(false);
    expect(state.dests.error).toBeNull();
  });

});
