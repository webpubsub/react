import React from 'react';
import invariant from 'ts-invariant';
import WebPubSub from 'webpubsub-js';
import { WebPubSubContext } from './WebPubSubContext';


export interface WebPubSubProviderProps<WebPubSubInstance> {
  client: WebPubSubInstance;
  children: React.ReactNode | React.ReactNode[] | null;
}

function appendPnsdk(webpubsub: any) {
  if (typeof webpubsub._addPnsdkSuffix === 'function') {
    webpubsub._addPnsdkSuffix('react', 'React/__VERSION__');
  }
}

export const WebPubSubProvider: React.FC<WebPubSubProviderProps<WebPubSub>> = ({
  client,
  children,
}) => {
  const contextValue = React.useMemo(() => {
    return { client };
  }, [client]);

  invariant(
    contextValue.client,
    'WebPubSubProvider was not passed a client instance. Make ' +
      'sure you pass in your client via the "client" prop.'
  );

  React.useEffect(() => {
    appendPnsdk(contextValue.client);
  }, []);

  return (
    <WebPubSubContext.Provider value={contextValue}>
      {children}
    </WebPubSubContext.Provider>
  );
};
