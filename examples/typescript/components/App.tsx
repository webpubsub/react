import React from 'react';
import WebPubSub from 'webpubsub-js';
import { WebPubSubProvider } from 'webpubsub-react';
import Chat from './Chat';

const webPubSubConfig = require('../config/webpubsub.json');
const webPubSubClient = new WebPubSub(webPubSubConfig.Demo.keySet);

function App() {
  console.log('App')
  return (
    <WebPubSubProvider client={webPubSubClient}>
      <h3>hello</h3>
      <Chat />
    </WebPubSubProvider>
  );
}

export default App;
