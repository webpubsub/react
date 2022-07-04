import { cleanup, render } from '@testing-library/react';
import React from 'react';
import WebPubSub from 'webpubsub';
import { WebPubSubProvider } from '../../context/WebPubSubProvider';
import { useWebPubSub } from '../useWebPubSub';


describe('useWebPubSub hook', () => {
  afterEach(cleanup);

  const WebPubSubClient = new WebPubSub({
    publishKey: 'x',
    subscribeKey: 'y',
    uuid: 'z',
  });

  it('should have client instance provided', () => {
    const Child = () => {
      expect(useWebPubSub()).toEqual(WebPubSubClient);
      return null;
    };

    render(
      <WebPubSubProvider client={WebPubSubClient}>
        <Child />
      </WebPubSubProvider>
    );
  });

  it('should throw an error when client instance is not provided', () => {
    const Child = () => {
      expect(() => useWebPubSub()).toThrowError(
        'No WebPubSub Client instance can be found. Please ensure that you ' +
          'have called `WebPubSubProvider` higher up in your tree.'
      );
      return null;
    };

    render(<Child />);
  });
});
