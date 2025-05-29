import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BusinessComparisonDashboard = () => {
  const [activeTab, setActiveTab] = useState('distribution');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresentation, setIsPresentation] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Direct data - CSV loading removed
  const csvData = [
    { "Escalão de Pessoal": "Empresas individuais", "Número de Empresas": 997523, "% Empresas": "66,05%", "Número de Funcionários": "1.052.822", "% Funcionários": "22,22%", "Funcionários por Empresa": 1, "Volume de Negócios (€)": "18.849.050.304", "% Volume de Negócios": "3,43%", "VAB (€)": "9.624.039.304", "% VAB": "6,55%", "Produtividade VAB (€ por funcionário)": 9141 },
    { "Escalão de Pessoal": "Menos de 10 pessoas", "Número de Empresas": 456499, "% Empresas": "30,23%", "Número de Funcionários": "1.022.352", "% Funcionários": "21,58%", "Funcionários por Empresa": 2, "Volume de Negócios (€)": "111.984.597.250", "% Volume de Negócios": "20,35%", "VAB (€)": "29.838.590.871", "% VAB": "20,30%", "Produtividade VAB (€ por funcionário)": 29186 },
    { "Escalão de Pessoal": "10-19 pessoas", "Número de Empresas": 30585, "% Empresas": "2,03%", "Número de Funcionários": "406.933", "% Funcionários": "8,59%", "Funcionários por Empresa": 13, "Volume de Negócios (€)": "47.652.594.344", "% Volume de Negócios": "8,66%", "VAB (€)": "12.962.152.370", "% VAB": "8,82%", "Produtividade VAB (€ por funcionário)": 31853 },
    { "Escalão de Pessoal": "20-49 pessoas", "Número de Empresas": 16898, "% Empresas": "1,12%", "Número de Funcionários": "506.633", "% Funcionários": "10,69%", "Funcionários por Empresa": 29, "Volume de Negócios (€)": "69.219.292.068", "% Volume de Negócios": "12,58%", "VAB (€)": "18.660.123.068", "% VAB": "12,69%", "Produtividade VAB (€ por funcionário)": 36831 },
    { "Escalão de Pessoal": "50-249 pessoas", "Número de Empresas": 7552, "% Empresas": "0,50%", "Número de Funcionários": "740.712", "% Funcionários": "15,63%", "Funcionários por Empresa": 98, "Volume de Negócios (€)": "140.473.052.433", "% Volume de Negócios": "25,53%", "VAB (€)": "31.944.748.285", "% VAB": "21,73%", "Produtividade VAB (€ por funcionário)": 43127 },
    { "Escalão de Pessoal": "250 ou mais pessoas", "Número de Empresas": 1217, "% Empresas": "0,08%", "Número de Funcionários": "1.008.889", "% Funcionários": "21,29%", "Funcionários por Empresa": 828, "Volume de Negócios (€)": "162.116.540.952", "% Volume de Negócios": "29,46%", "VAB (€)": "43.990.488.188", "% VAB": "29,92%", "Produtividade VAB (€ por funcionário)": 43602 }
  ];

  const europeData = [
    { country: "Portugal", total: 31027, micro: 29186, small: 31853, medium: 43127, large: 43602 },
    { country: "Espanha", total: 45500, micro: 32000, small: 48000, medium: 52000, large: 65000 },
    { country: "França", total: 52000, micro: 35000, small: 51000, medium: 58000, large: 72000 },
    { country: "Alemanha", total: 58000, micro: 38000, small: 55000, medium: 65000, large: 78000 },
    { country: "Média UE-27", total: 48000, micro: 33000, small: 47000, medium: 55000, large: 68000 }
  ];

  const percentageData = [
    { name: "Empresas", empresaIndividual: 66.05, sociedade: 33.95 },
    { name: "Funcionários", empresaIndividual: 22.22, sociedade: 77.78 },
    { name: "Vol. Negócios", empresaIndividual: 3.43, sociedade: 96.57 },
    { name: "VAB", empresaIndividual: 6.55, sociedade: 93.45 }
  ];

  const sectorData = [
    { sector: "Transportes", produtividadeVABEmpresasIndividuais: 5394, produtividadeVABSociedades: 51230, ratioVAB: 9.50 },
    { sector: "Comércio", produtividadeVABEmpresasIndividuais: 6494, produtividadeVABSociedades: 35805, ratioVAB: 5.51 },
    { sector: "Arts/Entret./Desporto", produtividadeVABEmpresasIndividuais: 8479, produtividadeVABSociedades: 45621, ratioVAB: 5.38 },
    { sector: "Água/Saneamento", produtividadeVABEmpresasIndividuais: 9234, produtividadeVABSociedades: 48842, ratioVAB: 5.29 },
    { sector: "Indústrias Transformadoras", produtividadeVABEmpresasIndividuais: 9194, produtividadeVABSociedades: 40369, ratioVAB: 4.39 },
    { sector: "Serviços Administrativos", produtividadeVABEmpresasIndividuais: 6255, produtividadeVABSociedades: 23547, ratioVAB: 3.76 },
    { sector: "Agricultura", produtividadeVABEmpresasIndividuais: 7094, produtividadeVABSociedades: 25218, ratioVAB: 3.55 },
    { sector: "Educação", produtividadeVABEmpresasIndividuais: 5938, produtividadeVABSociedades: 20682, ratioVAB: 3.48 },
    { sector: "Imobiliário", produtividadeVABEmpresasIndividuais: 14478, produtividadeVABSociedades: 50399, ratioVAB: 3.48 },
    { sector: "Indústrias Extrativas", produtividadeVABEmpresasIndividuais: 18922, produtividadeVABSociedades: 63975, ratioVAB: 3.38 },
    { sector: "Saúde", produtividadeVABEmpresasIndividuais: 9256, produtividadeVABSociedades: 30460, ratioVAB: 3.29 },
    { sector: "Construção", produtividadeVABEmpresasIndividuais: 9086, produtividadeVABSociedades: 29468, ratioVAB: 3.24 },
    { sector: "TIC", produtividadeVABEmpresasIndividuais: 21111, produtividadeVABSociedades: 65722, ratioVAB: 3.11 },
    { sector: "Outros Serviços", produtividadeVABEmpresasIndividuais: 5875, produtividadeVABSociedades: 15839, ratioVAB: 2.70 },
    { sector: "Consultoria/Científicas", produtividadeVABEmpresasIndividuais: 15500, produtividadeVABSociedades: 37759, ratioVAB: 2.44 },
    { sector: "Alojamento/Restauração", produtividadeVABEmpresasIndividuais: 18734, produtividadeVABSociedades: 23626, ratioVAB: 1.26 }
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

  const tableData = {
    headers: ["", "Empresa individual", "Sociedade", "TOTAL"],
    rows: [
      ["Número de Empresas", "997.523", "512.751", "1.510.274"],
      ["Percentagem Empresas (%)", "66,05%", "33,95%", "100,00%"],
      ["Número de Funcionários", "1.052.822", "3.685.519", "4.738.341"],
      ["Percentagem Funcionários (%)", "22,22%", "77,78%", "100,00%"],
      ["Volume de Negócios (€)", "18.849.050.304", "531.446.077.047", "550.295.127.351"],
      ["Percentagem Volume de Negócios (%)", "3,43%", "96,57%", "100,00%"],
      ["VAB (€)", "9.624.039.304", "137.396.102.782", "147.020.142.086"],
      ["Percentagem VAB (%)", "6,55%", "93,45%", "100,00%"],
      ["Produtividade VAB (€ por funcionário)", "9.141", "37.279", "31.027"]
    ]
  };

  const companyInfo = {
    name: "Desafios das PME",
    logo: "/api/placeholder/80/80",
    presenter: "Francesco Franco",
    date: "3 de Junho de 2025",
    title: "Powered by Five Credit"
  };

  // Fullscreen functionality with keyboard support
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyPress = (event) => {
      if (isFullscreen) {
        switch (event.key) {
          case 'Escape':
            document.exitFullscreen();
            break;
          case 'ArrowLeft':
            setCurrentSlide(prev => Math.max(0, prev - 1));
            break;
          case 'ArrowRight':
            setCurrentSlide(prev => Math.min(slideContent.length - 1, prev + 1));
            break;
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Improved responsive system with consistent scaling
  const getSlideStyle = () => {
    const baseWidth = isFullscreen ? '100vw' : '297mm';
    const baseHeight = isFullscreen ? '100vh' : '210mm';
    const basePadding = isFullscreen ? '3vw' : '15mm';

    return {
      width: baseWidth,
      height: baseHeight,
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${basePadding} ${isFullscreen ? '2vh' : '10mm'} ${basePadding}`,
      boxSizing: 'border-box',
      overflow: 'hidden'
    };
  };

  const getHeaderBarStyle = () => {
    const negativeMargin = isFullscreen ? '3vw' : '15mm';
    return {
      width: `calc(100% + ${isFullscreen ? '6vw' : '30mm'})`,
      marginLeft: `-${negativeMargin}`,
      marginRight: `-${negativeMargin}`,
      marginTop: '0',
      marginBottom: isFullscreen ? '2vh' : '8mm',
      textAlign: 'center'
    };
  };

  const getFontSizes = () => {
    // Use consistent scaling ratio between modes
    return {
      title: isFullscreen ? '4vh' : '7mm',
      subtitle: isFullscreen ? '2.8vh' : '5.5mm',
      text: isFullscreen ? '1.8vh' : '4.5mm',
      small: isFullscreen ? '1.4vh' : '3.5mm',
      tableHeader: isFullscreen ? '1.6vh' : '4mm',
      tableText: isFullscreen ? '1.4vh' : '3.5mm'
    };
  };

  // Utility functions
  const formatTableNumber = (value) => {
    if (typeof value === 'number') {
      if (value >= 1000000000) {
        return (value / 1000000000).toLocaleString('pt-PT', { maximumFractionDigits: 1 }) + ' mil M';
      } else if (value >= 1000000) {
        return (value / 1000000).toLocaleString('pt-PT', { maximumFractionDigits: 0 }) + ' M';
      } else if (value >= 1000) {
        return value.toLocaleString('pt-PT', { maximumFractionDigits: 0 });
      }
      return value.toString();
    }
    return value;
  };

  // Render functions for charts and tables
  const renderDetailedTable = () => {
    const headers = [
      "Escalão de Pessoal", "Número de Empresas", "% Empresas", "Número de Funcionários",
      "% Funcionários", "Volume de Negócios (€)",
      "VAB (€)", "% VAB", "Produtividade VAB (€/func.)"
    ];
    const fontSize = getFontSizes();
    const cellPadding = isFullscreen ? '1vh 0.8vw' : '3mm';

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: fontSize.tableText,
            minWidth: isFullscreen ? 'auto' : '1000px'
          }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f3f4f6', zIndex: 10 }}>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={{
                    padding: cellPadding,
                    backgroundColor: '#f3f4f6',
                    textAlign: 'center',
                    borderBottom: '2px solid #d1d5db',
                    fontWeight: '600',
                    fontSize: fontSize.tableHeader,
                    whiteSpace: 'nowrap'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontWeight: '500',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {row["Escalão de Pessoal"]}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {formatTableNumber(row["Número de Empresas"])}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {row["% Empresas"]}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {typeof row["Número de Funcionários"] === 'string' ?
                      row["Número de Funcionários"].replace(/\B(?=(\d{3})+(?!\d))/g, " ") :
                      formatTableNumber(row["Número de Funcionários"])}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {row["% Funcionários"]}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {typeof row["Volume de Negócios (€)"] === 'string' ?
                      (parseFloat(row["Volume de Negócios (€)"].replace(/\./g, '')) / 1000000000).toLocaleString('pt-PT', { maximumFractionDigits: 1 }) + ' mil M' :
                      formatTableNumber(row["Volume de Negócios (€)"])}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {typeof row["VAB (€)"] === 'string' ?
                      (parseFloat(row["VAB (€)"].replace(/\./g, '')) / 1000000000).toLocaleString('pt-PT', { maximumFractionDigits: 1 }) + ' mil M' :
                      formatTableNumber(row["VAB (€)"])}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {row["% VAB"]}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {formatTableNumber(row["Produtividade VAB (€ por funcionário)"])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Legend */}
          <div style={{
            marginTop: isFullscreen ? '2vh' : '1rem',
            fontSize: isFullscreen ? '0.8vh' : '0.75rem',
            color: '#6b7280',
            lineHeight: '1.4',
            textAlign: 'left'
          }}>
            <strong>Fonte:</strong> INE,  Sistema de contas integradas das empresas (SCIE).
          </div>
        </div>
      </div>
    );
  };

  const renderEuropeanTable = () => {
    const headers = ["País", "Total", "Micro (0-9)", "Pequena (10-49)", "Média (50-249)", "Grande (250+)"];
    const fontSize = getFontSizes();
    const cellPadding = isFullscreen ? '1.2vh 1vw' : '4mm';

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: fontSize.tableText,
            minWidth: isFullscreen ? 'auto' : '800px'
          }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f3f4f6', zIndex: 10 }}>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={{
                    padding: cellPadding,
                    backgroundColor: '#f3f4f6',
                    textAlign: 'center',
                    borderBottom: '2px solid #d1d5db',
                    fontWeight: '600',
                    fontSize: fontSize.tableHeader,
                    whiteSpace: 'nowrap'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {europeData.map((row, rowIndex) => (
                <tr key={rowIndex} style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb',
                  fontWeight: row.country === 'Portugal' ? '600' : '400'
                }}>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontWeight: '500',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    {row.country}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.total.toLocaleString('pt-PT')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.micro.toLocaleString('pt-PT')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.small.toLocaleString('pt-PT')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.medium.toLocaleString('pt-PT')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.large.toLocaleString('pt-PT')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Legend */}
          <div style={{
            marginTop: isFullscreen ? '2vh' : '1rem',
            fontSize: isFullscreen ? '0.8vh' : '0.75rem',
            color: '#6b7280',
            lineHeight: '1.4',
            textAlign: 'left'
          }}>
            <strong>Fonte:</strong> INE, Sistema de contas integradas das empresas (SCIE) e Eurostat, Structural business statistics (SBS). Os cálculos para médias e grandes empresas são efetuados com base nos dados do INE, uma vez que estes dados são classificados como confidenciais no Eurostat. Por conseguinte, podem existir algumas limitações de comparabilidade.
          </div>

        </div>

      </div>
    );
  };

  const renderDistributionChart = () => {
    const chartHeight = isFullscreen ? '65vh' : '350px';
    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1rem' }}>
          Distribuição Percentual por Tipo de Empresa
        </h3>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart data={percentageData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
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
      </div>
    );
  };

  const renderTableData = () => {
    const fontSize = getFontSizes();
    const cellPadding = isFullscreen ? '1vh 1.5vw' : '0.75rem';

    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', overflowX: 'auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1rem' }}>
          Empresas em Portugal
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: fontSize.tableText }}>
          <thead>
            <tr>
              {tableData.headers.map((header, index) => (
                <th key={index} style={{
                  padding: cellPadding,
                  backgroundColor: index === 0 ? '#f3f4f6' : '#f9fafb',
                  textAlign: index === 0 ? 'left' : 'center',
                  borderBottom: '2px solid #d1d5db',
                  fontWeight: '600',
                  fontSize: fontSize.tableHeader
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
                    padding: cellPadding,
                    textAlign: cellIndex === 0 ? 'left' : 'right',
                    borderBottom: '1px solid #e5e7eb',
                    fontWeight: cellIndex === 0 ? '500' : '400',
                    fontSize: fontSize.tableText
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div style={{
          marginTop: isFullscreen ? '2vh' : '1rem',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>Fonte:</strong> INE, Sistema de contas integradas das empresas (SCIE). O SCIE resulta de um processo de integração da informação estatística sobre empresas, baseado em dados administrativos, com particular destaque para a Informação Empresarial Simplificada (IES) e complementada, por um lado, com dados para as empresas individuais (empresários em nome individual e trabalhadores independentes), recebidos por via do protocolo estabelecido entre o INE e a AT, e por outro, com informação proveniente do Ficheiro de Unidades Estatísticas (FUE) do INE.
        </div>
      </div>
    );
  };

  const renderPieCharts = () => {
    const pieSize = isFullscreen ? Math.min(window.innerWidth * 0.25, 250) : 220;
    const pieRadius = isFullscreen ? 70 : 60;

    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: isFullscreen ? '2vw' : '1rem' }}>
          {[pieChartData, pieChartData2, pieChartData3].map((data, idx) => {
            const titles = ['Número de Empresas', 'Número de Funcionários', 'Volume de Negócios'];
            return (
              <div key={idx} style={{ textAlign: 'center', width: `${pieSize}px` }}>
                <h4 style={{ fontWeight: '500', textAlign: 'center', fontSize: getFontSizes().text, marginBottom: isFullscreen ? '1vh' : '0.5rem' }}>
                  {titles[idx]}
                </h4>
                <div style={{ width: `${pieSize}px`, height: `${pieSize * 0.8}px` }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={pieRadius}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  const renderProductivityChart = () => {
    const chartHeight = isFullscreen ? '65vh' : '350px';
    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1rem' }}>
          Comparação de Produtividade VAB
        </h3>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart
              data={[{ name: "Produtividade VAB (€)", empresaIndividual: 9141, sociedade: 37279, media: 31027 }]}
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
        {/* Legend */}
        <div style={{
          marginTop: isFullscreen ? '2vh' : '1rem',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>Fonte:</strong> INE, Sistema de contas integradas das empresas (SCIE).
        </div>
      </div>
    );
  };

  const renderSectorAnalysis = () => {
    const chartHeight = isFullscreen ? '65vh' : '450px'; // Slightly reduced height
    return (
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1.5rem' }}>
          Análise por Setor: Produtividade VAB
        </h3>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart data={sectorData} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}> {/* Reduced from 120 to 80 */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} fontSize={10} /> {/* Reduced from 120 to 80 */}
              <YAxis label={{ value: 'Produtividade VAB (€/funcionário)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="produtividadeVABEmpresasIndividuais" name="Empresa Individual" fill="#0088FE" />
              <Bar dataKey="produtividadeVABSociedades" name="Sociedade" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: isFullscreen ? '1vh' : '0.5rem', // Reduced margin
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>Fonte:</strong> INE, Sistema de contas integradas das empresas (SCIE).
        </div>
      </div>
    );
  };

  const renderTableWithPieCharts = () => (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        {renderTableData()}
      </div>
      {renderPieCharts()}
    </div>
  );

  // Responsive ESAF Slide Component
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
          <div style={{
            width: '100%',
            height: isFullscreen ? '8vh' : '15mm',
            position: 'relative',
            background: '#000080',
            display: 'block'
          }}>
            <img
              src={`${process.env.PUBLIC_URL}/bar.png`}
              alt="Header Bar"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        <h2 style={{ fontSize: localFontSizes.title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          II. "Paradoxo" do Acesso ao financiamento - ESAF
        </h2>
        <h3 style={{ fontSize: localFontSizes.subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '8mm', color: '#2563eb', margin: `0 0 ${isFullscreen ? '2vh' : '8mm'} 0` }}>
          Índice ESAF (EIF) - Financiamento das PME 2023
        </h3>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ height: isFullscreen ? '65vh' : '130mm', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                barSize={isFullscreen ? 12 : 8}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="country"
                  tick={{ fontSize: isFullscreen ? 10 : 8, angle: -90, textAnchor: 'end' }}
                  height={60}
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
          <div style={{
            marginTop: isFullscreen ? '1vh' : '2mm',
            fontSize: localFontSizes.small,
            color: '#6b7280',
            textAlign: 'justify',
            maxWidth: '90%',
            margin: `${isFullscreen ? '1vh' : '2mm'} auto 0`
          }}>
            <p style={{ margin: `0 0 ${isFullscreen ? '1vh' : '2mm'} 0` }}>
              Portugal ocupa a 25ª posição (de 27) no Índice ESAF do EIF
            </p>
            <p style={{ margin: 0 }}>Fonte: Torfs (2023, atualizado) - setembro 2024</p>
          </div>
        </div>
      </div>
    );
  };

  // Responsive SAFE Slide Component
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
    const localFontSizes = {
      title: isFullscreen ? '4vh' : '7mm',
      subtitle: isFullscreen ? '2.8vh' : '5.5mm',
      small: isFullscreen ? '1.4vh' : '3.5mm'
    };

    return (
      <div style={getSlideStyle()}>
        <div style={getHeaderBarStyle()}>
          <div style={{
            width: '100%',
            height: isFullscreen ? '8vh' : '15mm',
            position: 'relative',
            background: '#000080',
            display: 'block'
          }}>
            <img
              src={`${process.env.PUBLIC_URL}/bar.png`}
              alt="Header Bar"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        <h2 style={{ fontSize: localFontSizes.title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          II. "Paradoxo" do Acesso ao financiamento - SAFE
        </h2>
        <h3 style={{ fontSize: localFontSizes.subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#2563eb', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          Inquérito SAFE (BCE) - Q1 2025
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', gap: isFullscreen ? '1vw' : '4mm' }}>
          <button
            onClick={() => setActiveMetric('financingGap')}
            style={{
              padding: isFullscreen ? '1vh 2vw' : '2mm 4mm',
              fontSize: localFontSizes.small,
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
              fontSize: localFontSizes.small,
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
          <div style={{ height: isFullscreen ? '55vh' : '110mm', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData}
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                barSize={isFullscreen ? 20 : 15}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="country"
                  tick={{ fontSize: isFullscreen ? 12 : 9, angle: -45, textAnchor: 'end' }}
                  height={40}
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
          <div style={{
            marginTop: isFullscreen ? '1vh' : '2mm',
            fontSize: localFontSizes.small,
            color: '#6b7280',
            textAlign: 'justify',
            maxWidth: '90%',
            margin: `${isFullscreen ? '1vh' : '2mm'} auto 0`
          }}>
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

  // Complete slide content with responsive styling
  const slideContent = [
    // Slide 1: Image slide
    <div key="image-intro" style={{ ...getSlideStyle(), alignItems: 'center', justifyContent: 'center', padding: '0' }}>
      <img
        src={`${process.env.PUBLIC_URL}/slide1.png`}
        alt="Introduction Image"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    </div>,

    // Slide 2: Title
    <div key="title" style={{ ...getSlideStyle(), backgroundColor: '#f9fafb' }}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '4vh' : '15mm' }}>
          <h1 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>{companyInfo.name}</h1>
        </div>
        <h2 style={{ fontSize: getFontSizes().subtitle, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '4vh' : '15mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '4vh' : '15mm'} 0` }}>
          {companyInfo.title}
        </h2>
        <div style={{ textAlign: 'center', color: '#4b5563' }}>
          <p style={{ fontSize: getFontSizes().text, margin: `0 0 ${isFullscreen ? '2vh' : '5mm'} 0` }}>Apresentado por {companyInfo.presenter}</p>
          <p style={{ fontSize: getFontSizes().small, margin: 0 }}>{companyInfo.date}</p>
        </div>
      </div>
    </div>,

    // Slide 3: Growth
    <div key="growth" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'left', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        I. Crescimento - Produtividade das Empresas (Macro)
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.4', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '3vh' : '10mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            O "Paradoxo" das Empresas em Nome Individual (ENI)
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>As ENI são necessárias para o emprego, absorvendo 22% do emprego total</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>As ENI apresentam uma produtividade muito baixa e produzem apenas 6,5% do VAB</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>As ENI são 3,2 vezes menos produtivas que as microempresas</li>
            <li>Este padrão existe em quase todos os setores</li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            Gap de Produtividade entre Micro, Pequenas, Medias, e Grandes empresas
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>As microempresas são 50% menos produtivas que as grande empresas</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>As pequenas empresas são 28% menos produtivas que as grande empresas</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>As empresas médias são 1% menos produtivas que as grande empresas (sociedade)</li>
            <li>O gap com a UE-27 é de 13% para as micro, 51% para as pequenas, 27% para as médias e 58% para as grandes</li>
          </ul>
        </div>
      </div>
    </div>,

    // Slide 4: Financing
    <div key="financing" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'left', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        II. Financiamento das PME - Acesso (Macro)
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.4', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '3vh' : '10mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            O "Paradoxo" do SAFE (ECB) vs ESAF (EIF)
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>O inquérito SAFE (BCE) revela uma melhoria no acesso ao financiamento no último semestre, com obstáculos relativamente alinhados com outros países da Zona Euro</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>O indicador ESAF (FEI) coloca Portugal numa posição muito desfavorável, com apenas 2 países apresentando pior acesso ao financiamento</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>O SAFE tem uma perspetiva mais conjuntural e centrada no setor bancário. O ESAF tem uma perspectiva mais estrutural e abrangente alem da banca.</li>
            <li>As diferenças metodológicas entre os dois instrumentos explicam este aparente paradoxo</li>
          </ul>
        </div>
        <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'left', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
          III. Financiamento das PME - Scoring (Micro)
        </h2>
        <div>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            A Importância da Qualidade dos Dados ao Nível das Empresas e a Complexidade da sua Análise
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>Os dados agregados são úteis mas ocultam informação crucial: analisámos uma amostra de +200 mil empresas para obter uma visão mais precisa</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>Um exemplo de análise tradicional de rating de crédito revela uma realidade complexa: 82,5% das empresas apresentam indicadores mistos, com pontos fortes e fracos simultaneamente</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>Esta diversidade de perfis representa grandes oportunidades de melhoria, especialmente para empresas com desempenho misto que podem beneficiar de apoios direcionados</li>
            <li>Uma análise robusta do rating de crédito das PME portuguesas exige dados de elevada qualidade e modelos complexos que captem as nuances do tecido empresarial</li>
          </ul>
        </div>
      </div>
    </div>,

    // Slide 5: Paradox ENI data
    <div key="paradox" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        I. O "paradoxo" das ENI - dados
      </h2>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderTableWithPieCharts()}
      </div>
    </div>,

    // Slide 6: Productivity
    <div key="productivity" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        I. O "paradoxo" das ENI - produtividade
      </h2>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderProductivityChart()}
      </div>
    </div>,

    // Slide 7: Sector Analysis
    <div key="sector" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        I. O "paradoxo" das ENI - Setor
      </h2>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderSectorAnalysis()}
      </div>
    </div>,

    // Slide 8: Detailed Comparison
    <div key="detailed-comparison" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: isFullscreen ? '3.5vh' : '6mm', fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
        I. Gap de Produtividade - dados
      </h2>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderDetailedTable()}
      </div>
    </div>,

    // Slide 9: European Comparison
    <div key="european" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        I. Gap de Produtividade - Comparação vs EU
      </h2>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {renderEuropeanTable()}
        <div style={{ marginTop: isFullscreen ? '3vh' : '8mm', fontSize: getFontSizes().small, color: '#6b7280', textAlign: 'center' }}>
          
         
        </div>
      </div>
    </div>,

    // Slide 11: SAEF  
    <SAEFSlide key="saef" />,

    // Slide 10: ESAF
    <ESAFSlide key="esaf" />,



    // Slide 12: Microdata
    <div key="microdata1" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        III. Micro e PME dados micro - KPIs
      </h2>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe

          src={`${process.env.PUBLIC_URL}/metricas_financeiras_distribuicao.html`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="KPI's"
        />

        {/* Legend positioned over the iframe */}
        <div style={{
          position: 'absolute',
          bottom: isFullscreen ? '1vh' : '2mm',
          left: isFullscreen ? '1vw' : '2mm',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: isFullscreen ? '0.5vh 1vw' : '1mm 2mm',
          borderRadius: '2px',
          zIndex: 10
        }}>
          <strong>Fonte:</strong> Moody's Corporation, Moody's Investors Service, Inc.
        </div>
      </div>
    </div>,

    // Slide 13: Microdata Scoring
    <div key="microdata2" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        III. Micro e PME dados micro - Scoring
      </h2>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          src={`${process.env.PUBLIC_URL}/updated_financial_health_summary.html`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="Scoring"
        />
      </div>
    </div>,
    // Slide 14: Financial Health Analysis
    <div key="financial-health" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
        III. Análise de Saúde Financeira - Classificação Cruzada
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.4', flex: 1, overflow: 'auto' }}>

        {/* Dados Gerais */}
        <div style={{ marginBottom: isFullscreen ? '2vh' : '6mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '1vh' : '3mm', margin: `0 0 ${isFullscreen ? '1vh' : '3mm'} 0` }}>
            🔢 Dados Gerais
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '2vw' : '6mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}><strong>219.927 empresas</strong> analisadas com dados completos nos 3 indicadores</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>Apenas <strong>17,5%</strong> (38.562 empresas) têm desempenho consistente</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}><strong>82,5%</strong> das empresas apresentam indicadores financeiros mistos</li>
          </ul>
        </div>

        {/* Performance Categories */}
        <div style={{ marginBottom: isFullscreen ? '2vh' : '6mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '1vh' : '3mm', margin: `0 0 ${isFullscreen ? '1vh' : '3mm'} 0` }}>
            🎯 Empresas com Desempenho Consistente
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: isFullscreen ? '1fr 1fr' : '1fr', gap: isFullscreen ? '1vw' : '4mm' }}>

            {/* BOM Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#16a34a', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                🟢 Empresas BOM (8,3% - 18.301)
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Excelente saúde financeira</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Autonomia > 50%, ROA > 5%</li>
                <li>Empresas mais sólidas do mercado</li>
              </ul>
            </div>

            {/* CRÍTICO Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#dc2626', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                🔴 Empresas CRÍTICO (7,3% - 16.115)
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Situação crítica em todos indicadores</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Capital próprio negativo</li>
                <li>Necessitam reestruturação urgente</li>
              </ul>
            </div>

            {/* FRACO Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#ea580c', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                🟠 Empresas FRACO (1,0% - 2.240)
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Desempenho fraco consistente</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Baixa autonomia e rentabilidade</li>
                <li>Situação recuperável com gestão adequada</li>
              </ul>
            </div>

            {/* MÉDIO Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#ca8a04', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                🟡 Empresas MÉDIO (0,9% - 1.906)
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Desempenho médio equilibrado</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>Situação financeira estável</li>
                <li>Base sólida para crescimento</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Principais Conclusões */}
        <div>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '1vh' : '3mm', margin: `0 0 ${isFullscreen ? '1vh' : '3mm'} 0` }}>
            📈 Principais Conclusões
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '2vw' : '6mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}><strong>Polarização do mercado:</strong> Concentração nas categorias "Bom" e "Crítico"</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}><strong>Maioria com indicadores mistos:</strong> 82,5% das empresas têm pontos fortes e fracos</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}><strong>Oportunidades de melhoria:</strong> Grande potencial para empresas com desempenho misto</li>
            <li><strong>Gestão de risco:</strong> 7,3% das empresas em situação crítica requerem atenção imediata</li>
          </ul>
        </div>
      </div>
    </div>,
    // Slide 15: Five Scoring
    <div key="microdata2" style={getSlideStyle()}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
        III. Micro e PME dados micro - Scoring Five Credit - CONFIDENTIAL
      </h2>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          src={`${process.env.PUBLIC_URL}/ratings_pie_quality_2023.html`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="Scoring de 100k empresas"
        />
        {/* Legend positioned over the iframe */}
        <div style={{
          position: 'absolute',
          bottom: isFullscreen ? '1vh' : '2mm',
          left: isFullscreen ? '1vw' : '2mm',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: isFullscreen ? '0.5vh 1vw' : '1mm 2mm',
          borderRadius: '2px',
          zIndex: 10
        }}>
          <strong>Fonte:</strong> Five Credit internal scoring model.
        </div>
      </div>
    </div>,
    // Slide 15: Conclusion
    <div key="conclusion" style={{ ...getSlideStyle(), backgroundColor: '#f9fafb' }}>
      <div style={getHeaderBarStyle()}>
        <div style={{
          width: '100%',
          height: isFullscreen ? '8vh' : '15mm',
          position: 'relative',
          background: '#000080',
          display: 'block'
        }}>
          <img
            src={`${process.env.PUBLIC_URL}/bar.png`}
            alt="Header Bar"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />´

        </div>

      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '4vh' : '10mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '4vh' : '10mm'} 0` }}>
        Conclusões Principais
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.6', flex: 1 }}>
  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
      <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
      <span>As empresas ENI representam <strong>66%</strong> de todas as empresas mas apenas <strong>6,5%</strong> do VAB nacional. Aproximar a produtividade das ENI à das microempresas representa uma margem potencial significativa para aumentar o crescimento económico.</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
      <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
      <span>As empresas portuguesas apresentam um gap de produtividade acentuado comparativamente à <strong>média da UE-27</strong>, com exceção das microempresas que têm desempenho comparável.</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
      <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
      <span><strong>O acesso ao financiamento é um conceito multidimensional</strong>, e diferentes indicadores podem transmitir mensagens variadas mas conciliáveis sobre as condições de financiamento.</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
      <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
      <span>O último <strong>inquérito SAFE do BCE</strong> indica uma melhoria conjuntural do acesso ao financiamento em Portugal, enquanto o <strong>indicador ESAF do FEI</strong> coloca Portugal na cauda dos rankings europeus.</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
      <span>A qualidade dos <strong>dados financeiros das empresas</strong> é crucial para permitir avaliações robustas das empresas. Isto será cada vez mais importante dados os trends irreversíveis de <strong>automatização e adoção de IA</strong>.</span>
    </li>
  </ul>
</div>
    </div>,
   // Slide 16: Appendix
<div key="appendix" style={{ ...getSlideStyle(), backgroundColor: '#f9fafb' }}>
  <div style={getHeaderBarStyle()}>
    <div style={{
      width: '100%',
      height: isFullscreen ? '8vh' : '15mm',
      position: 'relative',
      background: '#000080',
      display: 'block'
    }}>
      <img
        src={`${process.env.PUBLIC_URL}/bar.png`}
        alt="Header Bar"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  </div>
  <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
    Appendix: ESAF Indicator
  </h2>
  <div style={{ fontSize: isFullscreen ? '14px' : '11px', lineHeight: '1.3', flex: 1, padding: '0 20px' }}>
    
    {/* Loans Section */}
    <div style={{ marginBottom: isFullscreen ? '1.5vh' : '3mm' }}>
     <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
        Loans:
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs using bank loans in last 6 months</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs using grants or subsidised bank loans in last 6 months</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs not applying for a bank loan because of possible rejection in last 6 months</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Interest rate for loans under EUR 250k (floating rate with IRF up to 1 year)</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Interest rate spread (under EUR 250k vs over EUR 1m for floating rate with IRF up to 1 year)</span>
        </li>
      </ul>
    </div>

    {/* Equity Section */}
    <div style={{ marginBottom: isFullscreen ? '1.5vh' : '3mm' }}>
     <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
        Equity:
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Venture Capital Investments / GDP</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Value of IPO market / GDP</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs using equity capital in last 6 months</span>
        </li>
      </ul>
    </div>

    {/* Credit and Leasing Section */}
    <div style={{ marginBottom: isFullscreen ? '1.5vh' : '3mm' }}>
     <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
        Credit and Leasing:
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs using bank overdraft, credit line or credit card overdraft in last 6 months</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs not applying for the above because of fear of possible rejection in last six months</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs using leasing or hire-purchase in the last 6 months</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Median interest rate charged to SMEs for credit line or bank overdraft application in last 6 months</span>
        </li>
      </ul>
    </div>

    {/* Macro Factors Section */}
    <div>
     <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
        Macro Factors:
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Gap between actual and potential GDP</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Bank non-performing loans to total gross loans</span>
        </li>
        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
          <span>Percentage of SMEs feeling that there are no financing obstacles</span>
        </li>
      </ul>
    </div>
  </div>
</div>
  ];

  const tabStyle = { padding: '0.5rem 1rem', margin: '0 0.25rem', cursor: 'pointer', border: 'none', background: 'transparent', fontWeight: '500', fontSize: '0.875rem' };
  const activeTabStyle = { ...tabStyle, borderBottom: '2px solid #3b82f6', color: '#2563eb' };
  const inactiveTabStyle = { ...tabStyle, borderBottom: '2px solid transparent', color: '#6b7280' };

  const dataExplorer = (
    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>
        Comparação: Empresas Individuais vs Sociedades
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <button onClick={() => setActiveTab('distribution')} style={activeTab === 'distribution' ? activeTabStyle : inactiveTabStyle}>
          Distribuição Percentual
        </button>
        <button onClick={() => setActiveTab('pie')} style={activeTab === 'pie' ? activeTabStyle : inactiveTabStyle}>
          Pie Charts
        </button>
        <button onClick={() => setActiveTab('productivity')} style={activeTab === 'productivity' ? activeTabStyle : inactiveTabStyle}>
          Produtividade
        </button>
        <button onClick={() => setActiveTab('sector-analysis')} style={activeTab === 'sector-analysis' ? activeTabStyle : inactiveTabStyle}>
          Análise por Setor
        </button>
        <button onClick={() => setActiveTab('table')} style={activeTab === 'table' ? activeTabStyle : inactiveTabStyle}>
          Tabela
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {activeTab === 'distribution' && renderDistributionChart()}
        {activeTab === 'pie' && renderPieCharts()}
        {activeTab === 'productivity' && renderProductivityChart()}
        {activeTab === 'sector-analysis' && renderSectorAnalysis()}
        {activeTab === 'table' && renderTableData()}
      </div>
    </div>
  );

  const presentationNavigation = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
      <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0}
        style={{
          padding: '0.5rem 1rem', backgroundColor: currentSlide === 0 ? '#e5e7eb' : '#3b82f6',
          color: currentSlide === 0 ? '#9ca3af' : '#ffffff', border: 'none', borderRadius: '0.25rem',
          cursor: currentSlide === 0 ? 'default' : 'pointer', fontWeight: '500'
        }}>
        Anterior
      </button>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        Slide {currentSlide + 1} de {slideContent.length}
      </div>
      <button onClick={() => setCurrentSlide(Math.min(slideContent.length - 1, currentSlide + 1))} disabled={currentSlide === slideContent.length - 1}
        style={{
          padding: '0.5rem 1rem', backgroundColor: currentSlide === slideContent.length - 1 ? '#e5e7eb' : '#3b82f6',
          color: currentSlide === slideContent.length - 1 ? '#9ca3af' : '#ffffff', border: 'none', borderRadius: '0.25rem',
          cursor: currentSlide === slideContent.length - 1 ? 'default' : 'pointer', fontWeight: '500'
        }}>
        Próximo
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: isFullscreen ? '100vw' : '1200px', margin: '0 auto', height: isFullscreen ? '100vh' : 'auto' }}>
      {!isFullscreen && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '0.5rem' }}>
          <button onClick={() => setIsPresentation(!isPresentation)}
            style={{
              padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db',
              borderRadius: '0.25rem', cursor: 'pointer', fontWeight: '500'
            }}>
            {isPresentation ? 'Modo Explorador' : 'Modo Apresentação'}
          </button>
          {isPresentation && (
            <button onClick={toggleFullscreen}
              style={{
                padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none',
                borderRadius: '0.25rem', cursor: 'pointer', fontWeight: '500'
              }}>
              Ecrã Completo
            </button>
          )}
        </div>
      )}

      {isPresentation ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: isFullscreen ? '0' : '0.5rem',
          boxShadow: isFullscreen ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          width: isFullscreen ? '100vw' : '297mm',
          height: isFullscreen ? '100vh' : '210mm',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          aspectRatio: isFullscreen ? 'auto' : '297/210'
        }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {slideContent[currentSlide]}
          </div>
          {/* Only show navigation in normal mode */}
          {!isFullscreen && presentationNavigation}
        </div>
      ) : (
        dataExplorer
      )}

      {/* Fullscreen instructions overlay - only show briefly */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          top: '2vh',
          right: '2vw',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '1vh 2vw',
          borderRadius: '0.5vh',
          fontSize: '1.5vh',
          zIndex: 1000,
          opacity: 0
        }}>
          ← → Navegar | ESC Sair
        </div>
      )}
    </div>
  );
};

export default BusinessComparisonDashboard;