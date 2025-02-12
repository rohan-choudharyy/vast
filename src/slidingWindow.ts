export class SlidingWindowRateLimiter {
    private limit: number;
    private window: number;
    private requests: Map<string, { timestamp: number, count: number }>;

    constructor(limit: number, window: number){
        this.limit = limit;
        this.window = window;
        this.requests = new Map();
    }
    public makeRequest(key: string): boolean {
        const now = Date.now();
        const requestData = this.requests.get(key) || { timestamp: now, count: 0}

        const elapsed = now - requestData.timestamp;
        const slid = Math.floor(elapsed / this.window * this.limit);
        
        const newCount = Math.max(0, requestData.count - slid);

        if(newCount < this.limit){
            requestData.count = newCount + 1;
            requestData.timestamp = now;
            this.requests.set(key, requestData);
            return true;
        }
        return false;
    }
}