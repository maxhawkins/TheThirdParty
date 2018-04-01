// @flow

import type {
    State,
    ErrorLogger,
    Middleware
} from '../types';

export default function errorLoggerMiddleware(
  errorLogger: ErrorLogger,
  filterState: (State) => State
): Middleware {
  return store => next => action => {
    // Handle any uncaught exceptions
    try {
      let result = next(action);

      // Log any error events
      // $FlowFixMe
      if (action.error) {
        const actionType: string = action.type;
        const message: string = action.payload.message;
        const state = filterState(store.getState());

        const fullMessage = `${actionType}: ${message}`;

        errorLogger.error(fullMessage, {
          state: state,
          env: process.env.NODE_ENV
        });
      } else {
        errorLogger.info(action.type);
      }

      return result;

    } catch (error) {
      const actionType: string = action.type;
      const message: string = error.message;
      const state = filterState(store.getState());

      const fullMessage = `${actionType}: uncaught exception: ${message}`;

      errorLogger.error(fullMessage, {
        state: state,
        env: process.env.NODE_ENV
      });

      throw error;
    }
  }
}
