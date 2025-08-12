import { useState, useRef } from 'react';

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

export const useRateLimit = (options: RateLimitOptions) => {
  const { maxAttempts, windowMs, blockDurationMs = 60000 } = options;
  const [isBlocked, setIsBlocked] = useState(false);
  const attemptsRef = useRef<number[]>([]);
  const blockTimeRef = useRef<number | null>(null);

  const checkRateLimit = (): boolean => {
    const now = Date.now();

    // Check if still blocked
    if (blockTimeRef.current && now < blockTimeRef.current) {
      setIsBlocked(true);
      return false;
    }

    // Clear block if expired
    if (blockTimeRef.current && now >= blockTimeRef.current) {
      blockTimeRef.current = null;
      setIsBlocked(false);
    }

    // Remove old attempts outside the window
    attemptsRef.current = attemptsRef.current.filter(
      (timestamp) => now - timestamp < windowMs
    );

    // Check if we've exceeded the limit
    if (attemptsRef.current.length >= maxAttempts) {
      blockTimeRef.current = now + blockDurationMs;
      setIsBlocked(true);
      return false;
    }

    // Record this attempt
    attemptsRef.current.push(now);
    return true;
  };

  const resetRateLimit = () => {
    attemptsRef.current = [];
    blockTimeRef.current = null;
    setIsBlocked(false);
  };

  const getTimeUntilReset = (): number => {
    if (!blockTimeRef.current) return 0;
    return Math.max(0, blockTimeRef.current - Date.now());
  };

  return {
    checkRateLimit,
    resetRateLimit,
    isBlocked,
    getTimeUntilReset,
    remainingAttempts: Math.max(0, maxAttempts - attemptsRef.current.length)
  };
};