import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BusinessComparisonDashboard = () => {
  // State for tabs and slides
  const [activeTab, setActiveTab] = useState('distribution');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresentation, setIsPresentation] = useState(true);
  
  // Chart data
  const percentageData = [
    { name: "Empresas", empresaIndividual: 66.05, sociedade: 33.95 },
    { name: "Funcionários", empresaIndividual: 22.22, sociedade: 77.78 },
    { name: "Vol. Negócios", empresaIndividual: 3.43, sociedade: 96.57 },
    { name: "Prod. VN", empresaIndividual: 15.42, sociedade: 124.16 },
    { name: "VAB", empresaIndividual: 6.55, sociedade: 93.45 },
    { name: "Prod. VAB", empresaIndividual: 29.46, sociedade: 120.15 }
  ];
  
  const pieChartData = [
    { name: 'Emp. Individual', value: 66.05 },
    { name: 'Sociedade', value: 33.95 }
  ];
  
  const pieChartData2 = [
    { name: 'Emp. Individual', value: 22.22 },
    { name: 'Sociedade', value: 77.78 }
  ];
  
  const pieChartData3 = [
    { name: 'Emp. Individual', value: 3.43 },
    { name: 'Sociedade', value: 96.57 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F'];
  
  // Table data from the original input
  const tableData = {
    headers: ["", "Empresa individual", "Sociedade", "TOTAL"],
    rows: [
      ["Número de Empresas", "997.523", "512.751", "1.510.274"],
      ["Percentagem Empresas (%)", "66,05%", "33,95%", "100,00%"],
      ["Número de Funcionários", "1.052.822", "3.685.519", "4.738.341"],
      ["Percentagem Funcionários (%)", "22,22%", "77,78%", "100,00%"],
      ["Volume de Negócios (€)", "18.849.050.304", "531.446.077.047", "550.295.127.351"],
      ["Percentagem Volume de Negócios (%)", "3,43%", "96,57%", "100,00%"],
      ["Produtividade VN (€ por funcionário)", "17.903", "144.198", "116.136"],
      ["Percentagem Produtividade VN (%)", "15,42%", "124,16%", "100,00%"],
      ["VAB (€)", "9.624.039.304", "137.396.102.782", "147.020.142.086"],
      ["Percentagem VAB (%)", "6,55%", "93,45%", "100,00%"],
      ["Produtividade VAB (€ por funcionário)", "9.141", "37.279", "31.027"],
      ["Percentagem Produtividade VAB (%)", "29,46%", "120,15%", "100,00%"]
    ]
  };
  
  // Company info for presentation
  const companyInfo = {
    name: "DataAnalytica",
    logo: "/api/placeholder/80/80",
    presenter: "Analista de Dados",
    date: "16 de Maio de 2025",
    title: "Análise Comparativa: Empresas Individuais vs Sociedades em Portugal"
  };
  
  // Chart rendering functions
  const renderDistributionChart = () => (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '1rem' }}>
        Distribuição Percentual por Tipo de Empresa
      </h3>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <BarChart
            data={percentageData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis label={{ value: 'Percentagem (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend />
            <Bar dataKey="empresaIndividual" name="Empresa Individual" fill="#0088FE" />
            <Bar dataKey="sociedade" name="Sociedade" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginTop: '0.5rem' }}>
        Nota: Produtividade VN e Produtividade VAB exibem a percentagem relativa à média (100%)
      </div>
    </div>
  );
  
  const renderPieCharts = () => (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '1rem' }}>
        Pie Charts
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ textAlign: 'center', width: '220px' }}>
          <h4 style={{ fontWeight: '500', textAlign: 'center' }}>Número de Empresas</h4>
          <div style={{ width: '220px', height: '220px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', width: '220px' }}>
          <h4 style={{ fontWeight: '500', textAlign: 'center' }}>Número de Funcionários</h4>
          <div style={{ width: '220px', height: '220px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {pieChartData2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', width: '220px' }}>
          <h4 style={{ fontWeight: '500', textAlign: 'center' }}>Volume de Negócios</h4>
          <div style={{ width: '220px', height: '220px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData3}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {pieChartData3.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderProductivityChart = () => (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '1rem' }}>
        Comparação de Produtividade
      </h3>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <BarChart
            data={[
              { name: "Produtividade VN (€)", empresaIndividual: 17903, sociedade: 144198, media: 116136 },
              { name: "Produtividade VAB (€)", empresaIndividual: 9141, sociedade: 37279, media: 31027 }
            ]}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="empresaIndividual" name="Empresa Individual" fill="#0088FE" />
            <Bar dataKey="sociedade" name="Sociedade" fill="#00C49F" />
            <Bar dataKey="media" name="Média" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', marginTop: '0.5rem' }}>
        Produtividade medida em euros por funcionário
      </div>
    </div>
  );

  const renderTableData = () => (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', overflowX: 'auto' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center', marginBottom: '1rem' }}>
        Dados Completos da Análise
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            {tableData.headers.map((header, index) => (
              <th key={index} style={{ 
                padding: '0.75rem', 
                backgroundColor: index === 0 ? '#f3f4f6' : (index === tableData.headers.length - 1 ? '#e5e7eb' : '#f9fafb'),
                textAlign: index === 0 ? 'left' : 'center',
                borderBottom: '2px solid #d1d5db',
                fontWeight: '600'
              }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ 
                  padding: '0.75rem', 
                  textAlign: cellIndex === 0 ? 'left' : 'right',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: cellIndex === 0 ? '500' : '400'
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Style definitions
  const tabStyle = {
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    fontWeight: '500',
    fontSize: '0.875rem'
  };
  
  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '2px solid #3b82f6',
    color: '#2563eb'
  };
  
  const inactiveTabStyle = {
    ...tabStyle,
    borderBottom: '2px solid transparent',
    color: '#6b7280'
  };

  // Define slides for presentation mode
  const slides = [
    // Title slide
    <div key="title" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      padding: '2rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <img src={companyInfo.logo} alt="Company Logo" style={{ width: '80px', height: '80px', marginRight: '1rem' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>{companyInfo.name}</h1>
      </div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1e40af' }}>
        {companyInfo.title}
      </h2>
      <div style={{ marginTop: 'auto', textAlign: 'center', color: '#4b5563' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Apresentado por: {companyInfo.presenter}</p>
        <p style={{ fontSize: '1.125rem' }}>{companyInfo.date}</p>
      </div>
    </div>,

    // Table data slide
    <div key="table" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#1e40af' }}>
        Dados Comparativos
      </h2>
      {renderTableData()}
    </div>,

    // Distribution chart slide
    <div key="distribution" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#1e40af' }}>
        Distribuição Percentual
      </h2>
      {renderDistributionChart()}
    </div>,

    // Pie charts slide
    <div key="pie" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#1e40af' }}>
        Distribuição por Categorias Principais
      </h2>
      {renderPieCharts()}
    </div>,

    // Productivity chart slide
    <div key="productivity" style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#1e40af' }}>
        Análise de Produtividade
      </h2>
      {renderProductivityChart()}
    </div>,

    // Conclusion slide
    <div key="conclusion" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '2rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      height: '100%'
    }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1e40af' }}>
        Conclusões Principais
      </h2>
      <div style={{ fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: '#3b82f6', 
              marginRight: '0.75rem',
              flexShrink: 0
            }}></span>
            <span>Embora as empresas individuais representem <strong>66%</strong> do número total de empresas, elas contribuem com apenas <strong>3,4%</strong> do volume de negócios.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: '#3b82f6', 
              marginRight: '0.75rem',
              flexShrink: 0
            }}></span>
            <span>As sociedades têm uma produtividade (VN e VAB) <strong>significativamente maior</strong> por funcionário.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              backgroundColor: '#3b82f6', 
              marginRight: '0.75rem',
              flexShrink: 0
            }}></span>
            <span>As sociedades empregam <strong>77,8%</strong> dos funcionários apesar de representarem apenas <strong>34%</strong> das empresas.</span>
          </li>
        </ul>
      </div>
      <div style={{ textAlign: 'center', marginTop: 'auto', color: '#4b5563' }}>
        <p style={{ fontSize: '1.125rem' }}>{companyInfo.name} | {companyInfo.date}</p>
      </div>
    </div>
  ];

  // Presentation navigation
  const presentationNavigation = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderTop: '1px solid #e5e7eb', marginTop: '1rem' }}>
      <button 
        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
        disabled={currentSlide === 0}
        style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: currentSlide === 0 ? '#e5e7eb' : '#3b82f6', 
          color: currentSlide === 0 ? '#9ca3af' : '#ffffff',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: currentSlide === 0 ? 'default' : 'pointer',
          fontWeight: '500'
        }}
      >
        Anterior
      </button>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        Slide {currentSlide + 1} de {slides.length}
      </div>
      <button 
        onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
        disabled={currentSlide === slides.length - 1}
        style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: currentSlide === slides.length - 1 ? '#e5e7eb' : '#3b82f6', 
          color: currentSlide === slides.length - 1 ? '#9ca3af' : '#ffffff',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: currentSlide === slides.length - 1 ? 'default' : 'pointer',
          fontWeight: '500'
        }}
      >
        Próximo
      </button>
    </div>
  );

  // Data explorer mode
  const dataExplorer = (
    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>
        Comparação: Empresas Individuais vs Sociedades
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <button
          onClick={() => setActiveTab('distribution')}
          style={activeTab === 'distribution' ? activeTabStyle : inactiveTabStyle}
        >
          Distribuição Percentual
        </button>
        <button
          onClick={() => setActiveTab('pie')}
          style={activeTab === 'pie' ? activeTabStyle : inactiveTabStyle}
        >
          Pie Charts
        </button>
        <button
          onClick={() => setActiveTab('productivity')}
          style={activeTab === 'productivity' ? activeTabStyle : inactiveTabStyle}
        >
          Produtividade
        </button>
        <button
          onClick={() => setActiveTab('table')}
          style={activeTab === 'table' ? activeTabStyle : inactiveTabStyle}
        >
          Tabela
        </button>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        {activeTab === 'distribution' && renderDistributionChart()}
        {activeTab === 'pie' && renderPieCharts()}
        {activeTab === 'productivity' && renderProductivityChart()}
        {activeTab === 'table' && renderTableData()}
      </div>
      
      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '2rem' }}>
        <p style={{ fontWeight: '500' }}>Observações:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
          <li>Embora as empresas individuais representem 66% do número total de empresas, elas contribuem com apenas 3,4% do volume de negócios.</li>
          <li>As sociedades têm uma produtividade (VN e VAB) significativamente maior por funcionário.</li>
          <li>As sociedades empregam 77,8% dos funcionários apesar de representarem apenas 34% das empresas.</li>
        </ul>
      </div>
    </div>
  );

  // Main component return
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          onClick={() => setIsPresentation(!isPresentation)}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#f3f4f6', 
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {isPresentation ? 'Modo Explorador' : 'Modo Apresentação'}
        </button>
      </div>

      {isPresentation ? (
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slides[currentSlide]}
          </div>
          {presentationNavigation}
        </div>
      ) : (
        dataExplorer
      )}
    </div>
  );
};

export default BusinessComparisonDashboard;