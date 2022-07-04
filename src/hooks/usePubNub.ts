import { useContext } from 'react';
import invariant from 'ts-invariant';
import WebPubSub from 'webpubsub';
import { WebPubSubContext } from '../context/WebPubSubContext';


export function useWebPubSub(): WebPubSub {
  const context = useContext(WebPubSubContext);

  invariant(
    context && context.client,
    'No WebPubSub Client instance can be found. Please ensure that you ' +
      'have called `WebPubSubProvider` higher up in your tree.'
  );

  return context!.client;
}
