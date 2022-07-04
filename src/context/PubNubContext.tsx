import React from 'react';
import WebPubSub from 'webpubsub';

export interface WebPubSubContextValue {
  client: WebPubSub;
}

export const WebPubSubContext = React.createContext<WebPubSubContextValue | null>(
  null
);
