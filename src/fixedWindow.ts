export class FixedWindowRateLimiter {
    private limit: number;
    private window: number;
    private requests: Map<string, number[]>;

    constructor(limit: number, window: number){
        this.limit = limit;
        this.window = window;
        this.requests = new Map()
    }

    public makeRequest(key: string): boolean {
        const now = Date.now();
        const timestamps = this.requests.get(key) || [];

        const filteredTimestamps = timestamps.filter((timestamp) => now - timestamp < this.window);
        this.requests.set(key, filteredTimestamps);

        if(filteredTimestamps.length < this.limit){
            filteredTimestamps.push(now);
            return true;
        }

        return false;
    }
}