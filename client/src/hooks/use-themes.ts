// Hook for theme management (will be replaced with .NET API integration)
import { useState, useEffect } from 'react';
import { sampleThemes } from '@/data/sample-data';

export function useThemes() {
  const [themes, setThemes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual .NET API call
    // const loadThemes = async () => {
    //   const response = await fetch('/api/themes');
    //   const data = await response.json();
    //   setThemes(data);
    // };
    
    // Simulate network delay
    setTimeout(() => {
      setThemes(sampleThemes);
      setIsLoading(false);
    }, 300);
  }, []);

  return { themes, isLoading };
}