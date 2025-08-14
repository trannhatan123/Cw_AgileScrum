// src/features/PlanetDetail/components/ExplorationSection.jsx
import React from 'react';
import { parseISO, format } from 'date-fns';

export default function ExplorationSection({ exploration }) {
  return (
    <div className="space-y-6">
      {exploration.map((mission) => (
        <div key={mission.missionName} className="flex flex-col md:flex-row bg-white/5 rounded-lg overflow-hidden">
          {mission.imageUrl && (
            <img
              src={mission.imageUrl}
              alt={mission.missionName}
              className="w-full md:w-1/3 h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-white">{mission.missionName}</h3>
            <p className="text-sm text-gray-300">
              Launched: {format(parseISO(mission.launchDate), 'MMMM d, yyyy')}
            </p>
            <p className="mt-2 text-white">{mission.description}</p>
            {mission.link && (
              <a href={mission.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-400 underline">
                Learn more
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
