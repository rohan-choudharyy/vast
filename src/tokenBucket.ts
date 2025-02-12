export class TokenBucketRateLimiter {
    private maxtokens: number;
    private tokens: Map<string, { count: number, lastRefill: number}>;
    private refillRate: number;

    constructor(maxTokens: number, refillRate: number){
        this.maxtokens = maxTokens;
        this.refillRate = refillRate;
        this.tokens = new Map();
    }

    public makeRequest(key: string): boolean {
        const now = Date.now();
        const tokenData = this.tokens.get(key) || { count: this.maxtokens, lastRefill: now};

        const elapsed = now - tokenData.lastRefill;
        const refilledTokens = Math.floor(elapsed * this.refillRate);
        tokenData.count = Math.min(this.maxtokens, tokenData.count + refilledTokens);
        tokenData.lastRefill = now;

        if(tokenData.count > 0){
            tokenData.count--;
            this.tokens.set(key, tokenData);
            return true;
        }
        return false;
    }
}