// src/features/planets/hooks/usePlanetsHomeData.js
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

export default function usePlanetsHomeData() {
  const [overview, setOverview]   = useState(null);
  const [tenFacts, setTenFacts]   = useState([]);
  const [missions, setMissions]   = useState([]);
  const [articles, setArticles]   = useState([]);
  const [resources, setResources] = useState([]);
  const [news, setNews]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [
          overviewRes,
          tenFactsRes,
          missionsRes,
          articlesRes,
          resourcesRes,
          newsRes,
        ] = await Promise.all([
          apiClient.get('/planets/home/overview'),
          apiClient.get('/planets/home/ten-facts'),
          apiClient.get('/missions/featured'),
          apiClient.get('/articles/featured'),
          apiClient.get('/resources'),
          apiClient.get('/news'),
        ]);

        setOverview(overviewRes.data);
        setTenFacts(tenFactsRes.data);
        setMissions(missionsRes.data);
        setArticles(articlesRes.data);
        setResources(resourcesRes.data);
        setNews(newsRes.data);
      } catch (err) {
        console.error('Error loading planets home data', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  return { overview, tenFacts, missions, articles, resources, news, loading, error };
}
