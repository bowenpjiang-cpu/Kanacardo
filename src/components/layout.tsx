import React from 'react';
import TopNavigation from './TopNavigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      <main className="flex-grow">
        {children}
      </main>

    </div>
  );
}