// src/features/PlanetDetail/components/PlanetTabs.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FactsSection from './FactsSection';
import ExplorationSection from './ExplorationSection';
import ResourcesSection from './ResourcesSection';
import NewsFeed from './NewsFeed';
import GalleryPreview from './GalleryPreview';

export default function PlanetTabs({ data }) {
  const { slug } = useParams();
  const tabs = ['Facts', 'Exploration', 'Resources', 'News', 'Gallery'];
  const [active, setActive] = useState(tabs[0]);

  return (
    <div>
      <div className="flex space-x-4 mb-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2 ${
              active === tab
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {active === 'Facts' && <FactsSection stats={data.detail} />}
        {active === 'Exploration' && <ExplorationSection exploration={data.exploration} />}
        {active === 'Resources' && <ResourcesSection resources={data.resources} />}
        {active === 'News' && <NewsFeed news={data.news} />}
        {active === 'Gallery' && <GalleryPreview gallery={data.gallery} slug={slug} />}
      </div>
    </div>
  );
}