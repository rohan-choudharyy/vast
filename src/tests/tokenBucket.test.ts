import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TokenBucketRateLimiter } from '../tokenBucket';

describe('TokenBucketRateLimiter', () => {
    let limiter: TokenBucketRateLimiter;
    const key = 'user-ip';

    beforeEach(() => {
        limiter = new TokenBucketRateLimiter(5,1/1000);
    });

    it('should allow requests within the token limit', () => {
        for(let i = 0; i < 5; i++){
            expect(limiter.makeRequest(key)).toBe(true);
        }
        expect(limiter.makeRequest(key)).toBe(false);
    });

    it('should refill tokens over time', () => {
        vi.useFakeTimers();

        for(let i = 0; i < 5; i++){
            expect(limiter.makeRequest(key)).toBe(true);
        }
        expect(limiter.makeRequest(key)).toBe(false);

        vi.advanceTimersByTime(5000);

        expect(limiter.makeRequest(key)).toBe(true);
    });
});