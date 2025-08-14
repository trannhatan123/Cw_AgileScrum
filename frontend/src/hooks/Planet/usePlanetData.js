// src/features/PlanetDetail/hooks/usePlanetData.js
import { useState, useEffect } from 'react';
import {
  getPlanetBySlug,
  getPlanetExploration,
  getPlanetResources,
  getPlanetNews,
  getPlanetGallery
} from '../../services/planetService';

export default function usePlanetData(slug) {
  const [data, setData] = useState({
    detail: null,
    exploration: [],
    resources: [],
    news: [],
    gallery: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all([
      getPlanetBySlug(slug),
      getPlanetExploration(slug),
      getPlanetResources(slug),
      getPlanetNews(slug),
      getPlanetGallery(slug)
    ])
      .then(([{ data: detail }, { data: exploration }, { data: resources }, { data: news }, { data: gallery }]) => {
        if (!isMounted) return;
        setData({ detail, exploration, resources, news, gallery });
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, [slug]);

  return { data, loading, error };
}
