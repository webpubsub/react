import React, { lazy, Suspense } from 'react';

const MyRootComponent = () => {
  const DisplayWebPubSubTime = lazy(() => import('./WebPubSubTime'));

  return (
    <Suspense fallback={<div>Loading. . .</div>}>
      <DisplayWebPubSubTime />
    </Suspense>
  );
};

export default MyRootComponent;
