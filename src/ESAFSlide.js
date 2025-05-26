import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ESAFSlide = () => {
    const data = [
      { country: 'Finlândia', value: 0.48 },
      { country: 'Alemanha', value: 0.47 },
      { country: 'Suécia', value: 0.47 },
      { country: 'Luxemburgo', value: 0.43 },
      { country: 'Dinamarca', value: 0.42 },
      { country: 'Áustria', value: 0.41 },
      { country: 'Bélgica', value: 0.40 },
      { country: 'Itália', value: 0.40 },
      { country: 'Países Baixos', value: 0.39 },
      { country: 'França', value: 0.38 },
      { country: 'Irlanda', value: 0.37 },
      { country: 'Croácia', value: 0.36 },
      { country: 'Eslováquia', value: 0.35 },
      { country: 'Eslovénia', value: 0.34 },
      { country: 'Espanha', value: 0.30 },
      { country: 'Estónia', value: 0.28 },
      { country: 'Roménia', value: 0.27 },
      { country: 'Bulgária', value: 0.26 },
      { country: 'Chipre', value: 0.25 },
      { country: 'Hungria', value: 0.24 },
      { country: 'Malta', value: 0.23 },
      { country: 'Letónia', value: 0.22 },
      { country: 'Lituânia', value: 0.21 },
      { country: 'Polónia', value: 0.21 },
      { country: 'Portugal', value: 0.20 },
      { country: 'Grécia', value: 0.18 },
      { country: 'República Checa', value: 0.17 }
    ];

    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const localFontSizes = {
      title: isFullscreen ? '4vh' : '7mm',
      subtitle: isFullscreen ? '2.8vh' : '5.5mm',
      small: isFullscreen ? '1.4vh' : '3.5mm'
    };

    return (
      <div style={getSlideStyle()}>
        <div style={getHeaderBarStyle()}>
          <img src="/bar.png" alt="Header Bar" style={{ width: '100%', height: isFullscreen ? '8vh' : '15mm', objectFit: 'cover', display: 'block' }} />
        </div>
        <h2 style={{ fontSize: localFontSizes.title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          Paradoxo do SAEF (ECB) e ESAF (EIF)
        </h2>
        <h3 style={{ fontSize: localFontSizes.subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '8mm', color: '#2563eb', margin: `0 0 ${isFullscreen ? '2vh' : '8mm'} 0` }}>
          Índice ESAF (EIF) - Financiamento das PME 2023
        </h3>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ height: isFullscreen ? '70vh' : '140mm', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
                barSize={isFullscreen ? 12 : 8}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="country" 
                  tick={{ fontSize: isFullscreen ? 10 : 8, angle: -90, textAnchor: 'end' }}
                  height={80}
                  interval={0}
                />
                <YAxis 
                  domain={[0, 0.5]} 
                  tick={{ fontSize: isFullscreen ? 12 : 9 }}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <Tooltip 
                  formatter={(value) => [value.toFixed(2), '2023']}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ fontSize: isFullscreen ? '12px' : '10px' }}
                />
                <Bar dataKey="value" name="Índice ESAF 2023">
                  {sortedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.country === 'Portugal' ? '#dc2626' : '#3b82f6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: isFullscreen ? '2vh' : '4mm', fontSize: localFontSizes.small, color: '#6b7280', textAlign: 'center' }}>
            <p style={{ margin: `0 0 ${isFullscreen ? '1vh' : '2mm'} 0` }}>Portugal ocupa a 25ª posição (de 27) no Índice ESAF do EIF</p>
            <p style={{ margin: 0 }}>Fonte: Torfs (2023, atualizado) - setembro 2024</p>
          </div>
        </div>
      </div>
    );
  };

export default ESAFSlide;