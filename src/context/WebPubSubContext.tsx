import React from 'react';
import WebPubSub from 'webpubsub-js';

export interface WebPubSubContextValue {
  client: WebPubSub;
}

export const WebPubSubContext = React.createContext<WebPubSubContextValue | null>(
  null
);
