import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SAEFSlide = () => {
    const [activeMetric, setActiveMetric] = useState('financingGap');

    const saefData = {
      financingGap: [
        { country: 'EA', value: -1, fullName: 'Zona Euro' },
        { country: 'BE', value: 2, fullName: 'Bélgica' },
        { country: 'DE', value: 2, fullName: 'Alemanha' },
        { country: 'IE', value: -5, fullName: 'Irlanda' },
        { country: 'GR', value: 3, fullName: 'Grécia' },
        { country: 'ES', value: -4, fullName: 'Espanha' },
        { country: 'FR', value: 1, fullName: 'França' },
        { country: 'IT', value: 0, fullName: 'Itália' },
        { country: 'NL', value: -11, fullName: 'Países Baixos' },
        { country: 'AT', value: -4, fullName: 'Áustria' },
        { country: 'PT', value: -11, fullName: 'Portugal' },
        { country: 'SK', value: -3, fullName: 'Eslováquia' },
        { country: 'FI', value: 11, fullName: 'Finlândia' }
      ],
      financingObstacles: [
        { country: 'EA', value: 5, fullName: 'Zona Euro' },
        { country: 'BE', value: 6, fullName: 'Bélgica' },
        { country: 'DE', value: 6, fullName: 'Alemanha' },
        { country: 'IE', value: 4, fullName: 'Irlanda' },
        { country: 'GR', value: 13, fullName: 'Grécia' },
        { country: 'ES', value: 6, fullName: 'Espanha' },
        { country: 'FR', value: 5, fullName: 'França' },
        { country: 'IT', value: 3, fullName: 'Itália' },
        { country: 'NL', value: 2, fullName: 'Países Baixos' },
        { country: 'AT', value: 6, fullName: 'Áustria' },
        { country: 'PT', value: 5, fullName: 'Portugal' },
        { country: 'SK', value: 5, fullName: 'Eslováquia' },
        { country: 'FI', value: 9, fullName: 'Finlândia' }
      ]
    };

    const getColorByValue = (value, country) => {
      if (activeMetric === 'financingGap') {
        if (value > 0) return '#ef4444';
        if (value < 0) return '#22c55e';
      } else {
        if (value > 5) return '#ef4444';
        if (value < 5) return '#22c55e';
      }
      return '#6b7280';
    };

    const currentData = saefData[activeMetric];
    const fontSize = getFontSizes();

    return (
      <div style={getSlideStyle()}>
        <div style={getHeaderBarStyle()}>
          <img src="/bar.png" alt="Header Bar" style={{ width: '100%', height: isFullscreen ? '8vh' : '15mm', objectFit: 'cover', display: 'block' }} />
        </div>
        <h2 style={{ fontSize: fontSize.title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          Paradoxo do SAFE (ECB) e ESAF (EIF)
        </h2>
        <h3 style={{ fontSize: fontSize.subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#2563eb', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          Inquérito SAFE (BCE) - Q1 2025
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', gap: isFullscreen ? '1vw' : '4mm' }}>
          <button
            onClick={() => setActiveMetric('financingGap')}
            style={{
              padding: isFullscreen ? '1vh 2vw' : '2mm 4mm',
              fontSize: fontSize.small,
              backgroundColor: activeMetric === 'financingGap' ? '#3b82f6' : '#f3f4f6',
              color: activeMetric === 'financingGap' ? 'white' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: isFullscreen ? '0.5vh' : '2mm',
              cursor: 'pointer'
            }}
          >
            Lacuna de Financiamento
          </button>
          <button
            onClick={() => setActiveMetric('financingObstacles')}
            style={{
              padding: isFullscreen ? '1vh 2vw' : '2mm 4mm',
              fontSize: fontSize.small,
              backgroundColor: activeMetric === 'financingObstacles' ? '#3b82f6' : '#f3f4f6',
              color: activeMetric === 'financingObstacles' ? 'white' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: isFullscreen ? '0.5vh' : '2mm',
              cursor: 'pointer'
            }}
          >
            Obstáculos ao Financiamento
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ height: isFullscreen ? '60vh' : '120mm', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData}
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                barSize={isFullscreen ? 20 : 15}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="country"
                  tick={{ fontSize: isFullscreen ? 12 : 9, angle: -45, textAnchor: 'end' }}
                  height={60}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: isFullscreen ? 12 : 9 }}
                  domain={activeMetric === 'financingGap' ? [-15, 15] : [0, 15]}
                />
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    activeMetric === 'financingGap' ? 'Lacuna de Financiamento' : 'Obstáculos (%)'
                  ]}
                  labelFormatter={(label) => {
                    const country = currentData.find(d => d.country === label);
                    return country ? country.fullName : label;
                  }}
                  contentStyle={{ fontSize: isFullscreen ? '12px' : '10px' }}
                />
                <Bar
                  dataKey="value"
                  name={activeMetric === 'financingGap' ? 'Lacuna de Financiamento' : 'Obstáculos (%)'}
                >
                  {currentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColorByValue(entry.value, entry.country)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: isFullscreen ? '2vh' : '4mm', fontSize: fontSize.small, color: '#6b7280', textAlign: 'center' }}>
            <p style={{ margin: `0 0 ${isFullscreen ? '1vh' : '2mm'} 0` }}>
              {activeMetric === 'financingGap'
                ? 'Portugal apresenta uma lacuna de financiamento negativa (-11%), indicando melhoria no acesso'
                : 'Portugal reporta 5% de obstáculos ao financiamento, próximo da média da Zona Euro'
              }
            </p>
            <p style={{ margin: 0 }}>Fonte: BCE - Inquérito SAFE, Q1 2025</p>
          </div>
        </div>
      </div>
    );
  };

export default SAEFSlide;