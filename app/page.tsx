'use client';

import { Suspense } from 'react';
import AgentForm from './components/AgentForm';

function AgentFormWrapper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <AgentForm />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>}>
      <AgentFormWrapper />
    </Suspense>
  );
}
