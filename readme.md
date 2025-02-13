# Vast - TypeScript based Rate Limiting Library.

This library provides three types of rate limiting algorithms: Fixed Window, Sliding Window, and Token Bucket. It is designed to help developers control the rate of requests to their applications, ensuring fair usage and preventing abuse.

## Features

- **Fixed Window Rate Limiter**: Limits the number of requests in a fixed time window.
- **Sliding Window Rate Limiter**: Provides a more granular control by allowing requests to slide out of the window.
- **Token Bucket Rate Limiter**: Allows requests to be made until a bucket of tokens is exhausted, with tokens refilling over time.

## Installation

To install the library, use npm:
```bash
npm install vast
```

## Usage

### Fixed Window Rate Limiter

```typescript
import { FixedWindowRateLimiter } from 'ts-ratelimit';

const limiter = new FixedWindowRateLimiter(5, 60000); // 5 requests per minute
const key = 'user-ip';

if (limiter.makeRequest(key)) {
  console.log('Request allowed');
} else {
  console.log('Rate limit exceeded');
}
```

### Sliding Window Rate Limiter

```typescript
import { SlidingWindowRateLimiter } from 'ts-ratelimit';

const limiter = new SlidingWindowRateLimiter(5, 60000); // 5 requests per minute
const key = 'user-ip';

if (limiter.makeRequest(key)) {
  console.log('Request allowed');
} else {
  console.log('Rate limit exceeded');
}
```

### Token Bucket Rate Limiter

```typescript
import { TokenBucketRateLimiter } from 'ts-ratelimit';

const limiter = new TokenBucketRateLimiter(5, 1/1000); // 5 tokens, refilling at 1 token per second
const key = 'user-ip';

if (limiter.makeRequest(key)) {
  console.log('Request allowed');
} else {
  console.log('Rate limit exceeded');
}
```

## Testing

The library uses Vitest for testing. To run the tests, use:

```bash
npm test
```

## Upcoming Features

- **Distributed Rate Limiting**: Support for distributed systems to share rate limiting state across multiple instances.
- **Customizable Backoff Strategies**: Allow users to define custom backoff strategies when rate limits are exceeded.
- **Dashboard for Monitoring**: A web-based dashboard to monitor rate limiting metrics in real-time.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
