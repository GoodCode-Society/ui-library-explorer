import { useState, useEffect } from 'react';

interface GitHubStats {
  stars: number;
  forks: number;
  loading: boolean;
  error: string | null;
}

export const useGitHubStats = (owner: string, repo: string): GitHubStats => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        
        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch stats',
        }));
      }
    };

    fetchStats();
  }, [owner, repo]);

  return stats;
};