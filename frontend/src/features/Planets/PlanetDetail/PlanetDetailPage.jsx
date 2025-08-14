import React from 'react';
import { useParams } from 'react-router-dom';
import usePlanetData from '../../../hooks/Planet/usePlanetData';
import PlanetHero from './components/PlanetHero';
import PlanetTabs from './components/PlanetTabs';

export default function PlanetDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = usePlanetData(slug);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <PlanetHero planet={data.detail} />
      <PlanetTabs data={data} />
    </div>
  );
}