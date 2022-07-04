import React, { useEffect, useState } from 'react';
import { useWebPubSub } from '../../../src/index';

const WebPubSubTime = () => {
  const webpubsub = useWebPubSub();
  const [time, setTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    webpubsub
      .time()
      .then(({ timetoken }) => {
        setTime(timetoken);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error !== null) {
    return <div>An error has occured: {error}</div>;
  }

  if (time === null) {
    return <div>Loading...</div>;
  }

  return <div>{time}</div>;
};

export default WebPubSubTime;
