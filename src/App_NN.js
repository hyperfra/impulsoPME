import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

const NeuralNetworkModel = () => {
  const chartRef = useRef(null);

  // Download function
  const downloadChart = () => {
    if (chartRef.current === null) {
      return;
    }
    
    toPng(chartRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'neural-network-model.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 className="text-2xl font-bold text-center mb-4">Neural Network Rating Model</h1>
      <p className="text-center text-gray-600 mb-6">Estimation of Illiquidity Probability</p>
      
      <button 
        onClick={downloadChart}
        className="block mx-auto mb-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Download as PNG
      </button>
      
      <div ref={chartRef} className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <svg viewBox="0 0 800 500" className="w-full">
          {/* Background */}
          <rect width="800" height="500" fill="#f8f9fa" rx="10" ry="10"/>
          
          {/* Grid lines */}
          <g className="grid-lines">
            {[80, 160, 240, 320, 400, 480].map(y => (
              <path 
                key={`grid-${y}`} 
                d={`M100,${y} L700,${y}`} 
                stroke="#e0e0e0" 
                strokeWidth="1" 
                strokeDasharray="5,5"
              />
            ))}
            {[100, 700].map(x => (
              [80, 160, 240, 320, 400, 480].map(y => (
                <circle 
                  key={`dot-${x}-${y}`} 
                  cx={x} 
                  cy={y} 
                  r="3" 
                  fill="#0288d1"
                />
              ))
            ))}
          </g>
          
          {/* Connections */}
          <g className="connections">
            {/* From Aggregate to Network */}
            <path d="M180,120 C280,120 300,250 400,250" stroke="#3498db" strokeWidth="2.5" fill="none"/>
            
            {/* From Sector to Network */}
            <path d="M180,200 C280,200 300,250 400,250" stroke="#3498db" strokeWidth="2.5" fill="none"/>
            
            {/* From Illiquidity to Network */}
            <path d="M180,320 C280,320 300,250 400,250" stroke="#3498db" strokeWidth="2.5" fill="none"/>
            
            {/* From Network to Output Nodes */}
            {[120, 200, 280, 340, 400, 440].map(y => (
              <path 
                key={`out-${y}`} 
                d={`M440,250 C500,250 500,${y} 560,${y}`} 
                stroke="#3498db" 
                strokeWidth="2.5" 
                fill="none"
              />
            ))}
          </g>
          
          {/* Neural activity animations */}
          <g className="neural-activity">
            {[
              {cx: 240, cy: 150, duration: 2},
              {cx: 320, cy: 200, duration: 2.5},
              {cx: 280, cy: 280, duration: 3},
              {cx: 470, cy: 180, duration: 2.2},
              {cx: 490, cy: 270, duration: 2.7}
            ].map((pulse, i) => (
              <circle
                key={`pulse-${i}`}
                cx={pulse.cx}
                cy={pulse.cy}
                r="5"
                fill="#3498db"
                opacity="0.5"
              >
                <animate 
                  attributeName="r" 
                  values="3;6;3" 
                  dur={`${pulse.duration}s`} 
                  repeatCount="indefinite"
                />
                <animate 
                  attributeName="opacity" 
                  values="0.3;0.7;0.3" 
                  dur={`${pulse.duration}s`} 
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
          
          {/* Input Nodes */}
          <g className="input-nodes">
            {/* Aggregate Node */}
            <circle cx="180" cy="120" r="30" fill="#00bcd4" stroke="#0097a7" strokeWidth="3"/>
            <circle cx="180" cy="120" r="25" fill="#e3f2fd" strokeWidth="0"/>
            <text x="180" y="120" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#01579b">Aggregate</text>
            
            {/* Sector Node */}
            <circle cx="180" cy="200" r="30" fill="#00bcd4" stroke="#0097a7" strokeWidth="3"/>
            <circle cx="180" cy="200" r="25" fill="#e3f2fd" strokeWidth="0"/>
            <text x="180" y="200" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#01579b">Sector</text>
            
            {/* Illiquidity Node */}
            <circle cx="180" cy="320" r="40" fill="#0288d1" stroke="#01579b" strokeWidth="3"/>
            <circle cx="180" cy="320" r="35" fill="#e3f2fd" strokeWidth="0"/>
            <text x="180" y="320" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#01579b">Illiquidity</text>
          </g>
          
          {/* Hidden Layer Node */}
          <g className="hidden-layer">
            <circle cx="400" cy="250" r="40" fill="#0288d1" stroke="#01579b" strokeWidth="3"/>
            <circle cx="400" cy="250" r="35" fill="#e3f2fd" strokeWidth="0"/>
            <text x="400" y="250" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#01579b">Network</text>
          </g>
          
          {/* Output Nodes */}
          <g className="output-nodes">
            {[
              {y: 120, label: "Control 1"},
              {y: 200, label: "Control 2"},
              {y: 280, label: "Control 3"},
              {y: 340, label: "Control 4"},
              {y: 400, label: "Control 5"},
              {y: 440, label: "Control 6"}
            ].map((node, i) => (
              <g key={`output-${i}`}>
                <circle cx="560" cy={node.y} r="30" fill="#1565c0" stroke="#0d47a1" strokeWidth="3"/>
                <text x="560" y={node.y} textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#ffffff">{node.label}</text>
              </g>
            ))}
          </g>
        </svg>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          Neural Network Rating Model for Illiquidity Probability Estimation
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkModel;