import { cleanup, render } from '@testing-library/react';
import React from 'react';
import WebPubSub from 'webpubsub';
import { WebPubSubConsumer } from '../WebPubSubConsumer';
import { WebPubSubContext, WebPubSubContextValue } from '../WebPubSubContext';
import { WebPubSubProvider } from '../WebPubSubProvider';


describe('<WebPubSubConsumer /> component', () => {
  afterEach(cleanup);

  const WebPubSubClient = new WebPubSub({
    publishKey: 'x',
    subscribeKey: 'y',
    uuid: 'z',
  });

  it('has a client instance provided', done => {
    render(
      <WebPubSubProvider client={WebPubSubClient}>
        <WebPubSubConsumer>
          {clientRender => {
            try {
              expect(clientRender).toBe(WebPubSubClient);
              done();
            } catch (e) {
              done.fail(e);
            }
            return null;
          }}
        </WebPubSubConsumer>
      </WebPubSubProvider>
    );
  });

  it('has error when client is not provided', () => {
    // Prevent Error about missing context type from appearing in the console.
    const errorLogger = console.error;
    console.error = () => {};

    expect(() => {
      render(
        <WebPubSubContext.Provider value={({} as unknown) as WebPubSubContextValue}>
          <WebPubSubConsumer>{() => null}</WebPubSubConsumer>
        </WebPubSubContext.Provider>
      );
    }).toThrowError(
      'Could not find "client" in the context of WebPubSubConsumer. ' +
        'Wrap the root component in an <WebPubSubProvider>.'
    );

    console.error = errorLogger;
  });
});
