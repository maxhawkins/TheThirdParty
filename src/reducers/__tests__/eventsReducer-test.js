import reducer from '..';
import {
    closeEvent,
    listDestsError,
    listDestsRequest,
    listDestsSuccess,
    selectEvent
} from '../../actions';

describe('events', () => {

  describe('data', () => {

    test('defaults to {}', () => {
      var state = reducer(undefined, { });
      expect(state.events.data).toEqual({ });
    });

    test('gets populated by listDests', () => {
      const events = { A: { id: "A" }, B: { id: "B" } };
      const dests = [];
      for (var id in events) {
        dests.push({
          id: 'dest-' + id,
          event: events[id],
          eventID: id
        });
      }
      state = reducer(undefined, listDestsSuccess(dests));

      expect(state.events.data).toEqual(events);
    });

  });

  describe('selectedID', () => {

    test('gets set on select', () => {
      const eventID = 'fakeid';
      var state = reducer(undefined, selectEvent(eventID));
      expect(state.events.selectedID).toEqual(eventID);
    });

    test('gets cleared on close', () => {
      var state = reducer(undefined, closeEvent());
      expect(state.events.selectedID).toEqual(null);
    });

  });

});
