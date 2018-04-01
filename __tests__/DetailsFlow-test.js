// @flow

import { FAKE_EVENT, FAKE_DEST } from '../src/API';

import TestContext from '../src/TestContext';
import HomePage from '../src/pages/HomePage';
import NoDests from '../src/components/NoDests';
import EventCard from '../src/components/EventCard';
import EventPage from '../src/pages/EventPage';

const StubDestGenerateReply = {
  events: [FAKE_EVENT],
  dests: [FAKE_DEST]
};

describe('details flow', () => {

  // TODO(maxhawkins): fix
  xtest('open directions', async () => {
    const ctx = new TestContext();
    ctx.login();
    ctx.api = {
      ...ctx.api,
      generateDest: jest.fn(async () => StubDestGenerateReply)
    };

    const page = ctx.render();

    await page.instance.componentWillMount();

    // Open the event
    const card = page.findByType(EventCard);
    await card.props.onPress();
    expect(page).toHaveComponentWithType(EventPage);

    ctx.actionSheet = {
      ...ctx.actionSheet,
      show: jest.fn(async () => 'google')
    };

    // Click show directions
    const directions = page.findByProps({ accessibilityLabel: 'See Directions' });
    await directions.props.onPress();

    // The action sheet shows
    expect(ctx.actionSheet.show).toHaveBeenCalled();

    // Google Maps opens
    expect(ctx.linking.openURL).toBeCalled();
  });

  // TODO(maxhawkins): fix
  xtest('open details and close', async () => {
    const ctx = new TestContext();
    ctx.login();
    ctx.api = {
      ...ctx.api,
      generateDest: jest.fn(async () => StubDestGenerateReply)
    };

    const page = ctx.render();

    await page.instance.componentWillMount();

    // And shows the home page
    expect(page).toHaveComponentWithType(HomePage);
    expect(page).toHaveComponentWithType(EventCard);

    // When you click on the card it shows the event page
    const card = page.findByType(EventCard);
    await card.props.onPress();
    expect(page).toHaveComponentWithType(EventPage);

    // When you press the back button you're back on the home page
    const backButton = page.findByProps({ accessibilityLabel: 'Back to Main Page' });
    await backButton.props.onPress();
    expect(page).toHaveComponentWithType(HomePage);
  });

});
