'use client';
import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // We use sessionStorage so we only count 1 visit per tab session
    // instead of every single refresh (optional preference)
    const hasVisited = sessionStorage.getItem('visited');
    
    if (!hasVisited) {
      fetch('/api/stats')
        .then(() => {
          sessionStorage.setItem('visited', 'true');
        })
        .catch(err => console.error('Tracker failed', err));
    }
  }, []);

  return null; // Render nothing
}
