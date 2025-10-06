import { useQuery } from '@tanstack/react-query';
import { fetchWorksList } from '../api';

// Hook for fetching works list with filtering and pagination
export const useWorksList = (filters = {}) => {
  return useQuery({
    queryKey: ['works-list', filters],
    queryFn: () => fetchWorksList(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};