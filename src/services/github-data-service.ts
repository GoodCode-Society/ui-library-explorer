/**
 * GitHub Data Service
 * Fetches real-time data from GitHub API with caching and polling support
 */

interface CacheEntry {
  data: GitHubRepoData;
  timestamp: number;
}

interface GitHubRepoData {
  stars: number;
  forks: number;
  watchers: number;
  lastUpdated: string;
  description: string;
  language: string | null;
  topics: string[];
  license: {
    name: string;
    spdxId: string;
  } | null;
}

class GitHubDataService {
  private cache: Map<string, CacheEntry> = new Map();
  private cacheExpiry: number = 1000 * 60 * 15; // 15 minutes
  private apiBaseUrl = 'https://api.github.com';
  private rateLimitRemaining = 60;
  private rateLimitReset = 0;

  /**
   * Fetch GitHub repository data with caching
   */
  async fetchRepoData(owner: string, repo: string): Promise<GitHubRepoData | null> {
    const cacheKey = `${owner}/${repo}`;

    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Check rate limit before making request
      await this.checkRateLimit();

      const response = await fetch(
        `${this.apiBaseUrl}/repos/${owner}/${repo}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`Repository ${cacheKey} not found`);
          return null;
        }
        if (response.status === 403) {
          console.warn('GitHub API rate limit exceeded');
          return null;
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      // Update rate limit info
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');
      if (rateLimitRemaining) {
        this.rateLimitRemaining = parseInt(rateLimitRemaining, 10);
      }
      if (rateLimitReset) {
        this.rateLimitReset = parseInt(rateLimitReset, 10) * 1000;
      }

      const data = await response.json();

      const repoData: GitHubRepoData = {
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
        watchers: data.watchers_count || 0,
        lastUpdated: data.updated_at || new Date().toISOString().split('T')[0],
        description: data.description || '',
        language: data.language || null,
        topics: data.topics || [],
        license: data.license
          ? {
              name: data.license.name,
              spdxId: data.license.spdx_id,
            }
          : null,
      };

      // Cache the data
      this.setInCache(cacheKey, repoData);

      return repoData;
    } catch (error) {
      console.error(`Error fetching data for ${cacheKey}:`, error);
      return null;
    }
  }

  /**
   * Clear cache for a specific repository
   */
  clearCache(owner: string, repo: string): void {
    const cacheKey = `${owner}/${repo}`;
    this.cache.delete(cacheKey);
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.cache.clear();
  }

  /**
   * Get Rate limit status
   */
  getRateLimitStatus(): { remaining: number; resetTime: number } {
    return {
      remaining: this.rateLimitRemaining,
      resetTime: this.rateLimitReset,
    };
  }

  /**
   * Check GitHub API rate limit
   */
  private async checkRateLimit(): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/rate_limit`);
      if (response.ok) {
        const data = await response.json();
        this.rateLimitRemaining = data.rate.remaining;
        this.rateLimitReset = data.rate.reset * 1000;
      }
    } catch (error) {
      console.warn('Could not check rate limit:', error);
    }
  }

  /**
   * Get from cache if not expired
   */
  private getFromCache(key: string): GitHubRepoData | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age > this.cacheExpiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set data in cache
   */
  private setInCache(key: string, data: GitHubRepoData): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }
}

export const gitHubDataService = new GitHubDataService();
export type { GitHubRepoData };
