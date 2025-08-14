import React, { useState, useEffect } from 'react';
import { getAllPlanets } from '../../services/planetService';
import { useNavigate } from 'react-router-dom';
import HeaderWithBreadcrumb from './components/HeaderWithBreadcrumb';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import HighlightsCarousel from './components/HighlightsCarousel';
import HighlightsNewsCarousel from './components/HighlightsNewsCarousel';
import StickySidebar from './components/StickySidebar';
import PlanetFactCard from './components/PlanetFactCard';
import PlanetSection from './components/PlanetSection';

export default function PlanetsPage() {
   const [planets, setPlanets] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
     getAllPlanets().then(res => setPlanets(res.data)).catch(console.error);
   }, []);

   const inner = planets.filter(p => p.distanceFromSun < 2);
   const outer = planets.filter(p => p.distanceFromSun >= 2);
   const dwarf = planets.filter(p => p.type === 'dwarf');

   return (
     <div className="bg-neutral-50">
      <Hero />
      <HeaderWithBreadcrumb crumbs={[{ label: 'Home', to: '/' }, { label: 'Planets' }]} />
      <Introduction />
       <section id="overview" className="container mx-auto px-6 py-8">
         <h2 className="text-3xl font-semibold mb-4">Overview</h2>
         <p className="text-lg text-gray-700">
           Explore our solar system’s diverse worlds, from Mercury to Neptune, and beyond.
         </p>
       </section>

       {/* Featured Planets */}
       <section className="overflow-x-auto scrollbar-hide bg-gray-50">
         <HighlightsCarousel items={planets.slice(0, 4)} />
       </section>

       {/* News Highlights */}
       <section className="overflow-x-auto scrollbar-hide bg-white">
         <HighlightsNewsCarousel />
       </section>

       <div className="container mx-auto px-6 flex gap-8 py-8">
         <aside className="w-1/4 hidden lg:block">
           <StickySidebar planets={planets} />
         </aside>
         <main className="flex-grow">
          {/* sections */}
          <PlanetSection id="inner" title="Inner Planets" items={inner} onSelect={slug => navigate(`/planets/${slug}`)} />
          <PlanetSection id="outer" title="Outer Planets" items={outer} onSelect={slug => navigate(`/planets/${slug}`)} />
          <PlanetSection id="dwarf" title="Dwarf Planets" items={dwarf} onSelect={slug => navigate(`/planets/${slug}`)} />
         </main>
       </div>
     </div>
   );
 }