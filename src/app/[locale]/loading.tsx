"use client";

export default function LoadingPage() {
  return (
    <div className="h-dvh w-full flex justify-center items-center content-center bg-background">
      <img
        src="/img/logo-gray.png"
        alt="Loading"
        aria-hidden="true"
        className="mx-auto mb-4 w-24 h-24"
      />
    </div>
  );
}
