import React, { useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { toPng } from 'html-to-image';

function App() {
  const chartRef = useRef(null);


  // Sample ESG rating data - replace with your actual data from column J
  const data = [
    { name: 'Good', value: 9 },
    { name: 'Medium', value: 13 },
    { name: 'Low', value: 6 }
  ];

  
  // Color scheme for the pie chart - green to orange/red spectrum (best to worst ratings)
  const COLORS = ['#4CAF50',  '#FFEB3B',  '#FF5722'];

  // Download function using the same approach as your original code
  const downloadChart = () => {
    if (chartRef.current === null) {
      return;
    }
    
    toPng(chartRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'esg-rating-pie-chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Calculate total number of ratings
  const totalRatings = data.reduce((sum, entry) => sum + entry.value, 0);
  
  // Custom tooltip to show count and percentage
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / totalRatings) * 100).toFixed(1);
      
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>{`${payload[0].name}: ${payload[0].value}`}</p>
          <p style={{ margin: '0' }}>{`${percentage}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>ESG Rating Distribution</h1>
      <button 
        onClick={downloadChart}
        style={{ 
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Download as PNG
      </button>
      
      <div ref={chartRef} style={{ backgroundColor: 'white', padding: '20px' }}>
        <div style={{ width: '800px', height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={180}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Total ESG ratings analyzed: {totalRatings}
        </div>
      </div>
    </div>
  );
}

export default App;