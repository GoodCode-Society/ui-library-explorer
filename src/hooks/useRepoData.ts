import { useState, useEffect, useCallback, useRef } from 'react';
import { gitHubDataService, type GitHubRepoData } from '../services/github-data-service';

interface UseRepoDataReturn {
  data: GitHubRepoData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

const POLLING_INTERVAL = 1000 * 60 * 5; // 5 minutes

/**
 * Hook to fetch and automatically refresh GitHub repository data
 * Uses caching to minimize API calls and polling for periodic updates
 */
export const useRepoData = (
  owner: string,
  repo: string,
  enablePolling: boolean = true
): UseRepoDataReturn => {
  const [data, setData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout>();
  const lastFetchRef = useRef<number>(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const repoData = await gitHubDataService.fetchRepoData(owner, repo);

      if (repoData) {
        setData(repoData);
        // Check if data is older than 24 hours
        const dataDate = new Date(repoData.lastUpdated);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        setIsStale(dataDate < dayAgo);
        lastFetchRef.current = Date.now();
      } else {
        setError('Failed to fetch repository data');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching repo data:', err);
    } finally {
      setLoading(false);
    }
  }, [owner, repo]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Setup polling for periodic updates
  useEffect(() => {
    if (!enablePolling) return;

    const setupPolling = () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }

      pollingIntervalRef.current = setInterval(() => {
        const timeSinceLastFetch = Date.now() - lastFetchRef.current;
        // Only poll if enough time has passed since last fetch
        if (timeSinceLastFetch > POLLING_INTERVAL / 2) {
          fetchData();
        }
      }, POLLING_INTERVAL);
    };

    setupPolling();

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [enablePolling, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    isStale,
  };
};
