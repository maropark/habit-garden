import React from 'react';
import { PlantSprite, PLANT_TYPES, PLANT_COLORS, GROWTH_STAGES } from './assets/index';
import { ToolIcon, TOOL_TYPES } from './assets/Tools';
import { DatePlaque } from './assets/DatePlaque';

const SpriteTest: React.FC = () => {
  const plantSize = 64;
  const toolSize = 48;

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a2f1a', minHeight: '100vh' }}>
      <h1 style={{ color: '#C5E1A5', textAlign: 'center', marginBottom: '20px' }}>
        Sprite Test - ARROA Pixel Art
      </h1>

      {/* Date Plaque */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <DatePlaque date={new Date()} />
      </div>

      {/* Plant Grid */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#AED581', marginBottom: '10px' }}>
          Plant Variants (Type × Color × Stage)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PLANT_COLORS.length}, 1fr)`, gap: '20px' }}>
          {PLANT_TYPES.map((plantType) => (
            <div key={plantType} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', textTransform: 'capitalize' }}>
                {plantType}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                {PLANT_COLORS.map((plantColor) => (
                  <div key={plantColor} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                    <div style={{ fontSize: '12px', color: '#FFFFFF', textTransform: 'capitalize' }}>
                      {plantColor}
                    </div>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {GROWTH_STAGES.map((growthStage) => (
                        <PlantSprite
                          key={growthStage}
                          plantType={plantType}
                          plantColor={plantColor}
                          growthStage={growthStage}
                          isWatered={growthStage === 'mature'} // Just for variety
                          size={plantSize}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <h2 style={{ color: '#AED581', marginBottom: '10px' }}>
          Tool Icons (Active/Inactive)
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {TOOL_TYPES.map((tool) => (
            <div key={tool} style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', marginBottom: '5px', textTransform: 'capitalize' }}>
                {tool}
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <ToolIcon
                  tool={tool as any}
                  isActive={false}
                  size={toolSize}
                />
                <ToolIcon
                  tool={tool as any}
                  isActive={true}
                  size={toolSize}
                />
              </div>
              <div style={{ fontSize: '12px', color: '#AED581', marginTop: '5px' }}>
                Inactive • Active
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SpriteTest };