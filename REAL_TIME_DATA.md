# Real-Time Data Update System

## Overview

The UI Library Explorer now features a real-time data update system that automatically fetches and caches live data from the GitHub API for each library.

## Architecture

### Components

#### 1. **GitHub Data Service** (`src/services/github-data-service.ts`)

A singleton service that handles all GitHub API interactions with built-in caching and rate limit management.

**Key Features:**
- **Intelligent Caching**: 15-minute cache expiration for fetched data
- **Rate Limit Management**: Monitors GitHub API rate limits and adapts accordingly
- **Error Handling**: Gracefully handles network errors and API failures
- **Data Staleness Detection**: Identifies data older than 24 hours

**Methods:**
- `fetchRepoData(owner, repo)`: Fetches real-time repository data
- `clearCache(owner, repo)`: Clears cache for specific repository
- `clearAllCache()`: Clears entire cache
- `getRateLimitStatus()`: Returns current rate limit information

#### 2. **useRepoData Hook** (`src/hooks/useRepoData.ts`)

A React hook that manages repository data fetching with automatic polling.

**Features:**
- **Automatic Polling**: Fetches updated data every 5 minutes
- **Loading States**: Provides loading indicators during data fetch
- **Error Handling**: Captures and exposes error messages
- **Manual Refresh**: Allows users to manually refresh data
- **Stale Data Detection**: Alerts users when data hasn't been updated recently

**Usage:**
```typescript
const { data, loading, error, refetch, isStale } = useRepoData('owner', 'repo');
```

#### 3. **Enhanced LibraryCard Component** (`src/components/shared/LibraryCard.tsx`)

Updated to use real-time GitHub data with fallback to static data.

**Features:**
- **Real-Time Stats**: Displays live star counts from GitHub
- **Automatic Polling**: Updates data periodically
- **Visual Indicators**: Shows loading states and data staleness warnings
- **Manual Refresh Button**: Allows users to manually refresh specific library data
- **Live Description**: Uses repository description from GitHub

## Data Flow

```
Library Card Component
    ↓
useRepoData Hook (extracts GitHub URL)
    ↓
GitHub Data Service (fetches from GitHub API)
    ↓
Cache Layer (15-minute expiration)
    ↓
Display with live data + Polling updates
```

## API Integration

### GitHub API Endpoints Used

- `GET /repos/{owner}/{repo}` - Repository information
- `GET /rate_limit` - Rate limit information

### Rate Limiting

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

The service monitors rate limits and adapts request frequency accordingly.

## Error Handling

The system handles various error scenarios:

1. **Network Errors**: Defaults to cached or static data
2. **API Errors** (4xx/5xx): Logs errors and uses fallback data
3. **Rate Limit Exceeded**: Uses cached data and notifies user
4. **Repository Not Found**: Gracefully falls back to static data

## Data Freshness

- **Cache Duration**: 15 minutes
- **Polling Interval**: 5 minutes (only if cache is older than 2.5 minutes)
- **Stale Data Threshold**: 24 hours

Visual indicators alert users when data:
- Is being fetched (loading spinner)
- Is stale (warning icon ⚠)
- Has errors (error message in tooltip)

## Performance Optimizations

1. **Memoization**: Prevents unnecessary re-renders
2. **Interval-based Polling**: Reduces API calls through smart scheduling
3. **Cache Management**: 15-minute cache reduces redundant API calls
4. **Conditional Polling**: Only enables for visible/active libraries

## Future Enhancements

- [ ] Authenticate with GitHub Personal Access Token (higher rate limits)
- [ ] Fetch npm download statistics
- [ ] Add Last.fm-style activity indicators
- [ ] Batch API requests using GraphQL
- [ ] Implement service worker for offline support
- [ ] Cache stats to IndexedDB for persistence

## Testing

### Manual Testing

1. Open the application
2. Observe loading states on library cards (optional, may be too fast)
3. Check browser DevTools Network tab to see API calls
4. Click refresh button to manually update a library's data
5. Switch to another tab and back; polling should resume
6. Wait 15+ minutes; cache should refresh

### Automated Tests

Run tests with:
```bash
npm test
```

Tests verify:
- [ ] Data fetching functionality
- [ ] Caching behavior
- [ ] Error handling
- [ ] Polling mechanism
- [ ] Rate limit management

## Troubleshooting

### Data Not Updating

**Issue**: Library stats are not showing real-time data
**Solution**: 
1. Check browser console for errors
2. Verify GitHub URL is correct in data
3. Click refresh button to manually fetch data

### Rate Limit Errors

**Issue**: "GitHub API rate limit exceeded" message
**Solution**: 
1. Data will be cached and still displayed
2. Wait 1 hour for rate limit reset
3. Configure GitHub authentication token (see Future Enhancements)

### Missing Data

**Issue**: Some fields are empty or show old data
**Solution**:
1. This is expected if GitHub data is incomplete
2. Static fallback data is always available
3. Manually refresh to get latest GitHub data

## Configuration

To enable/disable polling per library:

```typescript
// Enable polling (default)
const { data } = useRepoData('owner', 'repo', true);

// Disable polling
const { data } = useRepoData('owner', 'repo', false);
```

To change polling interval, edit `useRepoData.ts`:

```typescript
const POLLING_INTERVAL = 1000 * 60 * 5; // 5 minutes
```

To change cache expiry, edit `github-data-service.ts`:

```typescript
private cacheExpiry: number = 1000 * 60 * 15; // 15 minutes
```
