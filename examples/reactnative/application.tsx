import React from 'react'
import WebPubSub from 'webpubsub-js'
import { App } from './src/App'


const webpubsub = new WebPubSub({
    subscribeKey: 'demo',
    publishKey: 'demo',
    uuid: 'myuuid'
})

export const Application = () => (
    <WebPubSubProvider client={webpubsub}>
        <App />
    </WebPubSubProvider>
)
