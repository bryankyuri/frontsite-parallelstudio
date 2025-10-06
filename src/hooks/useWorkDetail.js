import { useQuery } from '@tanstack/react-query';
import { fetchWorkDetail, fetchRelatedWorks } from '../api';

// Hook for fetching work detail (includes related works from same API call)
export const useWorkDetail = (id) => {
  return useQuery({
    queryKey: ['work-detail', id],
    queryFn: () => fetchWorkDetail(id),
    enabled: !!id, // Only run query if id exists
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    select: (data) => ({
      work: data.work,
      relatedWorks: data.relatedWorks
    }),
  });
};

// Hook for fetching related works (separate endpoint - keeping for backward compatibility)
export const useRelatedWorks = (id, options = {}) => {
  const defaultOptions = {
    limit: 5,
    sort_by: 'relevance',
    sort_direction: 'desc',
    ...options,
  };

  return useQuery({
    queryKey: ['related-works', id, defaultOptions],
    queryFn: () => fetchRelatedWorks(id, defaultOptions),
    enabled: !!id, // Only run query if id exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 1,
  });
};