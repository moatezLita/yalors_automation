// src/components/chat/ChatButtonWrapper.js
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ChatButton component
const ChatButton = dynamic(() => import('./ChatButton'), {
  ssr: false,
  loading: () => null
});

export default function ChatButtonWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render the ChatButton on the client side
  return isMounted ? <ChatButton /> : null;
}