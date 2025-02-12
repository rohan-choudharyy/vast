import { describe, it, expect, beforeEach, vi} from 'vitest';
import { SlidingWindowRateLimiter } from '../slidingWindow';

describe('SlidingWindowRateLimiter', () => {
    let limiter: SlidingWindowRateLimiter;
    const key = 'user-ip';

    beforeEach(() => {
        limiter = new SlidingWindowRateLimiter(5, 60000);
    });

    it('should allow requests within the limit', () => {
        for(let i = 0; i < 5; i++){
            expect (limiter.makeRequest(key)).toBe(true);
        }
        expect(limiter.makeRequest(key)).toBe(false);
    });
    
    it('should allow requests to slide out of the window', () => {
        vi.useFakeTimers();

        for(let i = 0; i < 5; i++){
            expect(limiter.makeRequest(key)).toBe(true);
            vi.advanceTimersByTime(12000);
        }

        expect(limiter.makeRequest(key)).toBe(true);
    });
});