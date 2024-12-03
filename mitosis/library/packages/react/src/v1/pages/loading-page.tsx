import * as React from "react";

function LoadingPage(props: any) {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <span className="loading loading-bars loading-lg" />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
