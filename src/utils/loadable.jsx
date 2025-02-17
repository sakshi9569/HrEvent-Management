import React, { lazy, Suspense } from "react";

const Loader = () => <span className="block text-center text-lg font-semibold">Loading...</span>;

const loadable = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<Loader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
