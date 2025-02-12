import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FixedWindowRateLimiter } from '../fixedWindow';

describe('FixedWindowRateLimiter', () => {
  let rateLimiter: FixedWindowRateLimiter;
  const key = 'user-ip';

  beforeEach(() => {
    rateLimiter = new FixedWindowRateLimiter(5, 60000); 
  });

  it('should allow requests within the limit', () => {
    for (let i = 0; i < 5; i++) {
      expect(rateLimiter.makeRequest(key)).toBe(true);
    }
    expect(rateLimiter.makeRequest(key)).toBe(false);
  });

  it('should reset after the time window', () => {
    vi.useFakeTimers();

    for (let i = 0; i < 5; i++) {
      expect(rateLimiter.makeRequest(key)).toBe(true);
    }
    expect(rateLimiter.makeRequest(key)).toBe(false);

    vi.advanceTimersByTime(60000);

    expect(rateLimiter.makeRequest(key)).toBe(true);
  });
});
