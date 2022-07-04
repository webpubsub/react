import React from 'react';
import invariant from 'ts-invariant';
import WebPubSub from 'webpubsub';
import { WebPubSubContext } from './WebPubSubContext';


export interface WebPubSubConsumerProps {
  children: (client: WebPubSub) => React.ReactChild | null;
}

export const WebPubSubConsumer: React.FC<WebPubSubConsumerProps> = ({ children }) => {
  const context = React.useContext(WebPubSubContext);

  invariant(
    context && context.client,
    'Could not find "client" in the context of WebPubSubConsumer. ' +
      'Wrap the root component in an <WebPubSubProvider>.'
  );

  return <>{children(context!.client)}</>;
};
