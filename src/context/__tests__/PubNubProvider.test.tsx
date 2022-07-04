import { cleanup, render } from '@testing-library/react';
import React, { useContext } from 'react';
import WebPubSub from 'webpubsub';
import { WebPubSubContext, WebPubSubContextValue } from '../WebPubSubContext';
import { WebPubSubProvider } from '../WebPubSubProvider';


describe('<WebPubSubProvider /> component', () => {
  afterEach(cleanup);

  const WebPubSubClient = new WebPubSub({
    publishKey: 'x',
    subscribeKey: 'y',
    uuid: 'z',
  });

  it('has an error when WebPubSubProvider was not passed a client instance', () => {
    const originalConsoleError = console.error;
    console.error = () => {};

    expect(() => {
      render(
        <WebPubSubContext.Provider value={({} as unknown) as WebPubSubContextValue}>
          <WebPubSubProvider client={(undefined as unknown) as WebPubSub}>
            <div />
          </WebPubSubProvider>
        </WebPubSubContext.Provider>
      );
    }).toThrowError(
      'WebPubSubProvider was not passed a client instance. Make ' +
        'sure you pass in your client via the "client" prop.'
    );

    console.error = originalConsoleError;
  });

  it('should pass a client instance to the children context', () => {
    const Child = () => {
      const context = useContext(WebPubSubContext);
      expect(context!.client).toEqual(WebPubSubClient);
      return null;
    };

    render(
      <WebPubSubProvider client={WebPubSubClient}>
        <Child />
      </WebPubSubProvider>
    );
  });
});
