import { useState, useEffect } from 'react';
import { fetchVideoBanners } from '../api';

// Custom hook for fetching video banners
export const useVideoBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVideoBanners();
        setBanners(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load video banners:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  const refetch = async () => {
    try {
      setError(null);
      const data = await fetchVideoBanners();
      setBanners(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to refetch video banners:', err);
    }
  };

  return {
    banners,
    loading,
    error,
    refetch
  };
};