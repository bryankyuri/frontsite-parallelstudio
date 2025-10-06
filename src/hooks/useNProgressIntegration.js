import { useEffect } from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import NProgress from 'nprogress';

export function useNProgressIntegration() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching, isMutating]);
}