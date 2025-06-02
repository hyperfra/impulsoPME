import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Complete translation dictionary
const translations = {
  pt: {
    // Company info
    companyName: "Desafios das PME",
    presenter: "Francesco Franco - Managing Partner Five Credit",
    date: "3 de Junho de 2025",
    title: "Powered by Five Credit",

    // Navigation
    previous: "Anterior",
    next: "Próximo",
    slideOf: "Slide {current} de {total}",
    explorerMode: "Modo Explorador",
    presentationMode: "Modo Apresentação",
    fullScreen: "Ecrã Completo",

    // Tabs
    percentageDistribution: "Distribuição Percentual",
    pieCharts: "Pie Charts",
    productivity: "Produtividade",
    sectorAnalysis: "Análise por Setor",
    table: "Tabela",

    // Chart titles
    percentageDistributionByType: "Distribuição Percentual por Tipo de Empresa",
    companiesInPortugal: "Empresas em Portugal",
    productivityComparison: "Comparação de Produtividade VAB",
    sectorAnalysisTitle: "Análise por Setor: Produtividade VAB",
    comparisonTitle: "Comparação: Empresas Individuais vs Sociedades",

    // Legend labels
    individualCompany: "Emp. Individual",
    corporation: "Sociedade",
    average: "Média",

    // Table headers
    staffLevel: "Escalão de Pessoal",
    numberOfCompanies: "Número de Empresas",
    percentageCompanies: "% Empresas",
    numberOfEmployees: "Número de Funcionários",
    percentageEmployees: "% Funcionários",
    turnover: "Volume de Negócios (€)",
    vab: "VAB (€)",
    percentageVAB: "% VAB",
    productivityVAB: "Produtividade VAB (€/func.)",

    // Staff levels
    individualCompanies: "Empresas individuais",
    lessThan10: "Menos de 10 pessoas",
    from10to19: "10-19 pessoas",
    from20to49: "20-49 pessoas",
    from50to249: "50-249 pessoas",
    over250: "250 ou mais pessoas",

    // Slide titles
    growthTitle: "I. Crescimento - Produtividade das Empresas (Macro)",
    financingTitle: "II. Financiamento das PME - Acesso (Macro)",
    microdataTitle: "III. Micro e PME dados micro",
    paradoxENI: "I. O \"paradoxo\" das ENI - dados",
    paradoxProductivity: "I. O \"paradoxo\" das ENI - produtividade",
    paradoxSector: "I. O \"paradoxo\" das ENI - Setor",
    productivityGap: "I. Gap de Produtividade - dados",
    europeanComparison: "I. Gap de Produtividade - Comparação vs EU",
    esafTitle: "II. \"Paradoxo\" do Acesso ao financiamento - ESAF",
    safeTitle: "II. \"Paradoxo\" do Acesso ao financiamento - SAFE",
    kpisTitle: "III. Micro e PME dados micro - KPIs",
    scoringTitle: "III. Micro e PME dados micro - Scoring",
    fiveCreditScoring: "III. Micro e PME dados micro - Scoring Five Credit - CONFIDENTIAL",
    financialHealthTitle: "III. Análise de Saúde Financeira - Classificação Cruzada",
    conclusionsTitle: "Conclusões Principais",
    appendixTitle: "Appendix: ESAF Indicator",

    // Content
    eniParadoxTitle: "O \"Paradoxo\" das Empresas em Nome Individual (ENI)",
    eniEmployment: "As ENI são necessárias para o emprego, absorvendo 22% do emprego total",
    eniProductivity: "As ENI apresentam uma produtividade muito baixa e produzem apenas 6,5% do VAB",
    eniLessProductive: "As ENI são 3,2 vezes menos produtivas que as microempresas",
    eniAllSectors: "Este padrão existe em quase todos os setores",

    productivityGapTitle: "Gap de Produtividade entre Micro, Pequenas, Medias, e Grandes empresas",
    microLessProductive: "As microempresas são 50% menos produtivas que as grande empresas",
    smallLessProductive: "As pequenas empresas são 28% menos produtivas que as grande empresas",
    mediumLessProductive: "As empresas médias são 1% menos produtivas que as grande empresas (sociedade)",
    euGap: "O gap com a UE-27 é de 13% para as micro, 51% para as pequenas, 27% para as médias e 58% para as grandes",

    financingParadoxTitle: "O \"Paradoxo\" do SAFE (ECB) vs ESAF (EIF)",
    safeImprovement: "O inquérito SAFE (BCE) revela uma melhoria no acesso ao financiamento no último semestre, com obstáculos relativamente alinhados com outros países da Zona Euro",
    esafUnfavorable: "O indicador ESAF (FEI) coloca Portugal numa posição muito desfavorável, com apenas 2 países apresentando pior acesso ao financiamento",
    safePerspective: "O SAFE tem uma perspetiva mais conjuntural e centrada no setor bancário. O ESAF tem uma perspectiva mais estrutural e abrangente alem da banca.",
    methodologicalDifferences: "As diferenças metodológicas entre os dois instrumentos explicam este aparente paradoxo",

    microdataImportanceTitle: "A Importância da Qualidade dos Dados ao Nível das Empresas e a Complexidade da sua Análise",
    aggregateDataUseful: "Os dados agregados são úteis mas ocultam informação crucial: analisámos uma amostra de +200 mil empresas para obter uma visão mais precisa",
    creditRatingExample: "Um exemplo de análise tradicional de rating de crédito revela uma realidade complexa: 82,5% das empresas apresentam indicadores mistos, com pontos fortes e fracos simultaneamente",
    diversityOpportunities: "Esta diversidade de perfis representa grandes oportunidades de melhoria, especialmente para empresas com desempenho misto que podem beneficiar de apoios direcionados",
    robustAnalysis: "Uma análise robusta do rating de crédito das PME portuguesas exige dados de elevada qualidade e modelos complexos que captem as nuances do tecido empresarial",

    // Sources
    source: "Fonte",
    ineSource: "INE, Sistema de contas integradas das empresas (SCIE)",

    // Countries
    portugal: "Portugal",
    spain: "Espanha",
    france: "França",
    germany: "Alemanha",
    euAverage: "Média UE-27",

    // Financial Health Analysis
    generalData: "🔢 Dados Gerais",
    companiesAnalyzed: "219.927 empresas analisadas com dados completos nos 3 indicadores",
    consistentPerformance: "Apenas 17,5% (38.562 empresas) têm desempenho consistente",
    mixedIndicators: "82,5% das empresas apresentam indicadores financeiros mistos",

    consistentPerformanceTitle: "🎯 Empresas com Desempenho Consistente",
    goodCompanies: "🟢 Empresas BOM (8,3% - 18.301)",
    excellentHealth: "Excelente saúde financeira",
    autonomyRoa: "Autonomia > 50%, ROA > 5%",
    mostSolid: "Empresas mais sólidas do mercado",

    criticalCompanies: "🔴 Empresas CRÍTICO (7,3% - 16.115)",
    criticalSituation: "Situação crítica em todos indicadores",
    negativeEquity: "Capital próprio negativo",
    urgentRestructuring: "Necessitam reestruturação urgente",

    weakCompanies: "🟠 Empresas FRACO (1,0% - 2.240)",
    consistentWeak: "Desempenho fraco consistente",
    lowAutonomyProfitability: "Baixa autonomia e rentabilidade",
    recoverableSituation: "Situação recuperável com gestão adequada",

    mediumCompanies: "🟡 Empresas MÉDIO (0,9% - 1.906)",
    balancedMedium: "Desempenho médio equilibrado",
    stableFinancial: "Situação financeira estável",
    solidBase: "Base sólida para crescimento",

    mainConclusionsTitle: "📈 Principais Conclusões",
    marketPolarization: "Polarização do mercado: Concentração nas categorias \"Bom\" e \"Crítico\"",
    majorityMixed: "Maioria com indicadores mistos: 82,5% das empresas têm pontos fortes e fracos",
    improvementOpportunities: "Oportunidades de melhoria: Grande potencial para empresas com desempenho misto",
    riskManagement: "Gestão de risco: 7,3% das empresas em situação crítica requerem atenção imediata",

    // Conclusions
    conclusion1: "As empresas ENI representam 66% de todas as empresas mas apenas 6,5% do VAB nacional. Aproximar a produtividade das ENI à das microempresas representa uma margem potencial significativa para aumentar o crescimento económico.",
    conclusion2: "As empresas portuguesas apresentam um gap de produtividade acentuado comparativamente à média da UE-27, com exceção das microempresas que têm desempenho comparável.",
    conclusion3: "O acesso ao financiamento é um conceito multidimensional, e diferentes indicadores podem transmitir mensagens variadas mas conciliáveis sobre as condições de financiamento.",
    conclusion4: "O último inquérito SAFE do BCE indica uma melhoria conjuntural do acesso ao financiamento em Portugal, enquanto o indicador ESAF do FEI coloca Portugal na cauda dos rankings europeus.",
    conclusion5: "A qualidade dos dados financeiros das empresas é crucial para permitir avaliações robustas das empresas. Isto será cada vez mais importante dados os trends irreversíveis de automatização e adoção de IA.",

    // ESAF/SAFE specific
    esafIndexTitle: "Índice ESAF (EIF) - Financiamento das PME 2023",
    portugalPosition: "Portugal ocupa a 25ª posição (de 27) no Índice ESAF do EIF",
    safeTitle: "Inquérito SAFE (BCE) - Q1 2025",
    financingGap: "Lacuna de Financiamento",
    financingObstacles: "Obstáculos ao Financiamento",
    portugalNegativeGap: "Portugal apresenta uma lacuna de financiamento negativa (-11%), indicando melhoria no acesso",
    portugalObstacles: "Portugal reporta 5% de obstáculos ao financiamento, próximo da média da Zona Euro"
  },
  en: {
    // Company info
    companyName: "SME Challenges",
    presenter: "Francesco Franco",
    date: "June 3rd, 2025",
    title: "Powered by Five Credit",

    // Navigation
    previous: "Previous",
    next: "Next",
    slideOf: "Slide {current} of {total}",
    explorerMode: "Explorer Mode",
    presentationMode: "Presentation Mode",
    fullScreen: "Full Screen",

    // Tabs
    percentageDistribution: "Percentage Distribution",
    pieCharts: "Pie Charts",
    productivity: "Productivity",
    sectorAnalysis: "Sector Analysis",
    table: "Table",

    // Chart titles
    percentageDistributionByType: "Percentage Distribution by Company Type",
    companiesInPortugal: "Companies in Portugal",
    productivityComparison: "GVA Productivity Comparison",
    sectorAnalysisTitle: "Sector Analysis: GVA Productivity",
    comparisonTitle: "Comparison: Individual Companies vs Corporations",

    // Legend labels
    individualCompany: "Individual Company",
    corporation: "Corporation",
    average: "Average",

    // Table headers
    staffLevel: "Staff Level",
    numberOfCompanies: "Number of Companies",
    percentageCompanies: "% Companies",
    numberOfEmployees: "Number of Employees",
    percentageEmployees: "% Employees",
    turnover: "Turnover (€)",
    vab: "GVA (€)",
    percentageVAB: "% GVA",
    productivityVAB: "GVA Productivity (€/emp.)",

    // Staff levels
    individualCompanies: "Individual companies",
    lessThan10: "Less than 10 people",
    from10to19: "10-19 people",
    from20to49: "20-49 people",
    from50to249: "50-249 people",
    over250: "250 or more people",

    // Slide titles
    growthTitle: "I. Growth - Company Productivity (Macro)",
    financingTitle: "II. SME Financing - Access (Macro)",
    microdataTitle: "III. Micro and SME micro data",
    paradoxENI: "I. The \"paradox\" of Individual Companies - data",
    paradoxProductivity: "I. The \"paradox\" of Individual Companies - productivity",
    paradoxSector: "I. The \"paradox\" of Individual Companies - Sector",
    productivityGap: "I. Productivity Gap - data",
    europeanComparison: "I. Productivity Gap - Comparison vs EU",
    esafTitle: "II. Financing Access \"Paradox\" - ESAF",
    safeTitle: "II. Financing Access \"Paradox\" - SAFE",
    kpisTitle: "III. Micro and SME micro data - KPIs",
    scoringTitle: "III. Micro and SME micro data - Scoring",
    fiveCreditScoring: "III. Micro and SME micro data - Five Credit Scoring - CONFIDENTIAL",
    financialHealthTitle: "III. Financial Health Analysis - Cross Classification",
    conclusionsTitle: "Main Conclusions",
    appendixTitle: "Appendix: ESAF Indicator",

    // Content
    eniParadoxTitle: "The \"Paradox\" of Individual Companies (ENI)",
    eniEmployment: "Individual companies are necessary for employment, absorbing 22% of total employment",
    eniProductivity: "Individual companies have very low productivity and produce only 6.5% of GVA",
    eniLessProductive: "Individual companies are 3.2 times less productive than micro companies",
    eniAllSectors: "This pattern exists in almost all sectors",

    productivityGapTitle: "Productivity Gap between Micro, Small, Medium, and Large companies",
    microLessProductive: "Micro companies are 50% less productive than large companies",
    smallLessProductive: "Small companies are 28% less productive than large companies",
    mediumLessProductive: "Medium companies are 1% less productive than large companies (corporation)",
    euGap: "The gap with EU-27 is 13% for micro, 51% for small, 27% for medium and 58% for large companies",

    financingParadoxTitle: "The \"Paradox\" of SAFE (ECB) vs ESAF (EIF)",
    safeImprovement: "The SAFE survey (ECB) reveals an improvement in access to financing in the last semester, with obstacles relatively aligned with other Eurozone countries",
    esafUnfavorable: "The ESAF indicator (EIF) places Portugal in a very unfavorable position, with only 2 countries showing worse access to financing",
    safePerspective: "SAFE has a more cyclical perspective focused on the banking sector. ESAF has a more structural and comprehensive perspective beyond banking.",
    methodologicalDifferences: "Methodological differences between the two instruments explain this apparent paradox",

    microdataImportanceTitle: "The Importance of Data Quality at Company Level and the Complexity of Analysis",
    aggregateDataUseful: "Aggregate data is useful but hides crucial information: we analyzed a sample of +200 thousand companies to obtain a more precise view",
    creditRatingExample: "An example of traditional credit rating analysis reveals a complex reality: 82.5% of companies present mixed indicators, with strengths and weaknesses simultaneously",
    diversityOpportunities: "This diversity of profiles represents great improvement opportunities, especially for companies with mixed performance that can benefit from targeted support",
    robustAnalysis: "A robust analysis of Portuguese SME credit rating requires high-quality data and complex models that capture the nuances of the business fabric",

    // Sources
    source: "Source",
    ineSource: "INE, Integrated Business Accounts System (SCIE)",

    // Countries
    portugal: "Portugal",
    spain: "Spain",
    france: "France",
    germany: "Germany",
    euAverage: "EU-27 Average",

    // Financial Health Analysis
    generalData: "🔢 General Data",
    companiesAnalyzed: "219,927 companies analyzed with complete data on the 3 indicators",
    consistentPerformance: "Only 17.5% (38,562 companies) have consistent performance",
    mixedIndicators: "82.5% of companies present mixed financial indicators",

    consistentPerformanceTitle: "🎯 Companies with Consistent Performance",
    goodCompanies: "🟢 GOOD Companies (8.3% - 18,301)",
    excellentHealth: "Excellent financial health",
    autonomyRoa: "Autonomy > 50%, ROA > 5%",
    mostSolid: "Most solid companies in the market",

    criticalCompanies: "🔴 CRITICAL Companies (7.3% - 16,115)",
    criticalSituation: "Critical situation in all indicators",
    negativeEquity: "Negative equity",
    urgentRestructuring: "Require urgent restructuring",

    weakCompanies: "🟠 WEAK Companies (1.0% - 2,240)",
    consistentWeak: "Consistent weak performance",
    lowAutonomyProfitability: "Low autonomy and profitability",
    recoverableSituation: "Recoverable situation with adequate management",

    mediumCompanies: "🟡 MEDIUM Companies (0.9% - 1,906)",
    balancedMedium: "Balanced medium performance",
    stableFinancial: "Stable financial situation",
    solidBase: "Solid base for growth",

    mainConclusionsTitle: "📈 Main Conclusions",
    marketPolarization: "Market polarization: Concentration in \"Good\" and \"Critical\" categories",
    majorityMixed: "Majority with mixed indicators: 82.5% of companies have strengths and weaknesses",
    improvementOpportunities: "Improvement opportunities: Great potential for companies with mixed performance",
    riskManagement: "Risk management: 7.3% of companies in critical situation require immediate attention",

    // Conclusions
    conclusion1: "Individual companies represent 66% of all companies but only 6.5% of national GVA. Bringing individual company productivity closer to micro companies represents a significant potential margin to increase economic growth.",
    conclusion2: "Portuguese companies show a marked productivity gap compared to the EU-27 average, except for micro companies which have comparable performance.",
    conclusion3: "Access to financing is a multidimensional concept, and different indicators can convey varied but reconcilable messages about financing conditions.",
    conclusion4: "The latest ECB SAFE survey indicates a cyclical improvement in access to financing in Portugal, while the EIF ESAF indicator places Portugal at the bottom of European rankings.",
    conclusion5: "The quality of company financial data is crucial to enable robust company assessments. This will become increasingly important given the irreversible trends of automation and AI adoption.",

    // ESAF/SAFE specific
    esafIndexTitle: "ESAF Index (EIF) - SME Financing 2023",
    portugalPosition: "Portugal ranks 25th (out of 27) in the EIF ESAF Index",
    safeTitle: "SAFE Survey (ECB) - Q1 2025",
    financingGap: "Financing Gap",
    financingObstacles: "Financing Obstacles",
    portugalNegativeGap: "Portugal shows a negative financing gap (-11%), indicating improved access",
    portugalObstacles: "Portugal reports 5% financing obstacles, close to the Eurozone average"
  }
};

const BusinessComparisonDashboard = () => {
  const [activeTab, setActiveTab] = useState('distribution');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresentation, setIsPresentation] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState('pt');

  // Translation helper function
  const t = (key, replacements = {}) => {
    let text = translations[language][key] || key;
    Object.keys(replacements).forEach(placeholder => {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    return text;
  };

  // Toggle language function
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  // Data with translations
  const csvData = [
    { "Escalão de Pessoal": "Empresas individuais", "Número de Empresas": 997523, "% Empresas": "66,05%", "Número de Funcionários": "1.052.822", "% Funcionários": "22,22%", "Funcionários por Empresa": 1, "Volume de Negócios (€)": "18.849.050.304", "% Volume de Negócios": "3,43%", "VAB (€)": "9.624.039.304", "% VAB": "6,55%", "Produtividade VAB (€ por funcionário)": 9141 },
    { "Escalão de Pessoal": "Menos de 10 pessoas", "Número de Empresas": 456499, "% Empresas": "30,23%", "Número de Funcionários": "1.022.352", "% Funcionários": "21,58%", "Funcionários por Empresa": 2, "Volume de Negócios (€)": "111.984.597.250", "% Volume de Negócios": "20,35%", "VAB (€)": "29.838.590.871", "% VAB": "20,30%", "Produtividade VAB (€ por funcionário)": 29186 },
    { "Escalão de Pessoal": "10-19 pessoas", "Número de Empresas": 30585, "% Empresas": "2,03%", "Número de Funcionários": "406.933", "% Funcionários": "8,59%", "Funcionários por Empresa": 13, "Volume de Negócios (€)": "47.652.594.344", "% Volume de Negócios": "8,66%", "VAB (€)": "12.962.152.370", "% VAB": "8,82%", "Produtividade VAB (€ por funcionário)": 31853 },
    { "Escalão de Pessoal": "20-49 pessoas", "Número de Empresas": 16898, "% Empresas": "1,12%", "Número de Funcionários": "506.633", "% Funcionários": "10,69%", "Funcionários por Empresa": 29, "Volume de Negócios (€)": "69.219.292.068", "% Volume de Negócios": "12,58%", "VAB (€)": "18.660.123.068", "% VAB": "12,69%", "Produtividade VAB (€ por funcionário)": 36831 },
    { "Escalão de Pessoal": "50-249 pessoas", "Número de Empresas": 7552, "% Empresas": "0,50%", "Número de Funcionários": "740.712", "% Funcionários": "15,63%", "Funcionários por Empresa": 98, "Volume de Negócios (€)": "140.473.052.433", "% Volume de Negócios": "25,53%", "VAB (€)": "31.944.748.285", "% VAB": "21,73%", "Produtividade VAB (€ por funcionário)": 43127 },
    { "Escalão de Pessoal": "250 ou mais pessoas", "Número de Empresas": 1217, "% Empresas": "0,08%", "Número de Funcionários": "1.008.889", "% Funcionários": "21,29%", "Funcionários por Empresa": 828, "Volume de Negócios (€)": "162.116.540.952", "% Volume de Negócios": "29,46%", "VAB (€)": "43.990.488.188", "% VAB": "29,92%", "Produtividade VAB (€ por funcionário)": 43602 }
  ];

  const europeData = [
    { country: "Portugal", total: 31027, micro: 29186, small: 33707, medium: 43127, large: 43602 },
    { country: "Espanha", total: 45500, micro: 32000, small: 48000, medium: 52000, large: 65000 },
    { country: "França", total: 52000, micro: 35000, small: 51000, medium: 58000, large: 72000 },
    { country: "Alemanha", total: 58000, micro: 38000, small: 55000, medium: 65000, large: 78000 },
    { country: "Média UE-27", total: 48000, micro: 33000, small: 47000, medium: 55000, large: 68000 }
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

  const COLORS = ['#0088FE', '#00C49F'];

  const companyInfo = {
    name: t('companyName'),
    presenter: t('presenter'),
    date: t('date'),
    title: t('title')
  };

  // Translate data dynamically
  const getTranslatedData = () => {
    const staffLevelTranslations = {
      "Empresas individuais": t('individualCompanies'),
      "Menos de 10 pessoas": t('lessThan10'),
      "10-19 pessoas": t('from10to19'),
      "20-49 pessoas": t('from20to49'),
      "50-249 pessoas": t('from50to249'),
      "250 ou mais pessoas": t('over250')
    };

    return csvData.map(item => ({
      ...item,
      "Escalão de Pessoal": staffLevelTranslations[item["Escalão de Pessoal"]] || item["Escalão de Pessoal"]
    }));
  };

  const getTranslatedEuropeData = () => {
    const countryTranslations = {
      "Portugal": t('portugal'),
      "Espanha": t('spain'),
      "França": t('france'),
      "Alemanha": t('germany'),
      "Média UE-27": t('euAverage')
    };

    return europeData.map(item => ({
      ...item,
      country: countryTranslations[item.country] || item.country
    }));
  };

  const getTranslatedSectorData = () => {
    const sectorTranslations = {
      "Transportes": language === 'en' ? "Transport" : "Transportes",
      "Comércio": language === 'en' ? "Commerce" : "Comércio",
      "Arts/Entret./Desporto": language === 'en' ? "Arts/Entertainment/Sports" : "Arts/Entret./Desporto",
      "Água/Saneamento": language === 'en' ? "Water/Sanitation" : "Água/Saneamento",
      "Indústrias Transformadoras": language === 'en' ? "Manufacturing" : "Indústrias Transformadoras",
      "Serviços Administrativos": language === 'en' ? "Administrative Services" : "Serviços Administrativos",
      "Agricultura": language === 'en' ? "Agriculture" : "Agricultura",
      "Educação": language === 'en' ? "Education" : "Educação",
      "Imobiliário": language === 'en' ? "Real Estate" : "Imobiliário",
      "Indústrias Extrativas": language === 'en' ? "Extractive Industries" : "Indústrias Extrativas",
      "Saúde": language === 'en' ? "Health" : "Saúde",
      "Construção": language === 'en' ? "Construction" : "Construção",
      "TIC": language === 'en' ? "ICT" : "TIC",
      "Outros Serviços": language === 'en' ? "Other Services" : "Outros Serviços",
      "Consultoria/Científicas": language === 'en' ? "Consulting/Scientific" : "Consultoria/Científicas",
      "Alojamento/Restauração": language === 'en' ? "Accommodation/Catering" : "Alojamento/Restauração"
    };

    return sectorData.map(item => ({
      ...item,
      sector: sectorTranslations[item.sector] || item.sector
    }));
  };

  const percentageData = [
    { name: t('numberOfCompanies'), empresaIndividual: 66.05, sociedade: 33.95 },
    { name: t('numberOfEmployees'), empresaIndividual: 22.22, sociedade: 77.78 },
    { name: language === 'pt' ? "Vol. Negócios" : "Turnover", empresaIndividual: 3.43, sociedade: 96.57 },
    { name: t('vab'), empresaIndividual: 6.55, sociedade: 93.45 }
  ];

  const tableData = {
    headers: language === 'pt' ?
      ["", "Empresa individual", "Sociedade", "TOTAL"] :
      ["", "Individual Company", "Corporation", "TOTAL"],
    rows: language === 'pt' ? [
      ["Número de Empresas", "997.523", "512.751", "1.510.274"],
      ["Percentagem Empresas (%)", "66,05%", "33,95%", "100,00%"],
      ["Número de Funcionários", "1.052.822", "3.685.519", "4.738.341"],
      ["Percentagem Funcionários (%)", "22,22%", "77,78%", "100,00%"],
      ["Volume de Negócios (€)", "18.849.050.304", "531.446.077.047", "550.295.127.351"],
      ["Percentagem Volume de Negócios (%)", "3,43%", "96,57%", "100,00%"],
      ["VAB (€)", "9.624.039.304", "137.396.102.782", "147.020.142.086"],
      ["Percentagem VAB (%)", "6,55%", "93,45%", "100,00%"],
      ["Produtividade VAB (€ por funcionário)", "9.141", "37.279", "31.027"]
    ] : [
      ["Number of Companies", "997,523", "512,751", "1,510,274"],
      ["Percentage Companies (%)", "66.05%", "33.95%", "100.00%"],
      ["Number of Employees", "1,052,822", "3,685,519", "4,738,341"],
      ["Percentage Employees (%)", "22.22%", "77.78%", "100.00%"],
      ["Turnover (€)", "18,849,050,304", "531,446,077,047", "550,295,127,351"],
      ["Percentage Turnover (%)", "3.43%", "96.57%", "100.00%"],
      ["GVA (€)", "9,624,039,304", "137,396,102,782", "147,020,142,086"],
      ["Percentage GVA (%)", "6.55%", "93.45%", "100.00%"],
      ["GVA Productivity (€ per employee)", "9,141", "37,279", "31,027"]
    ]
  };

  // Fullscreen functionality
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

  // Responsive styling
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
        return (value / 1000000000).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US', { maximumFractionDigits: 1 }) + (language === 'pt' ? ' mil M' : ' bn');
      } else if (value >= 1000000) {
        return (value / 1000000).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US', { maximumFractionDigits: 0 }) + ' M';
      } else if (value >= 1000) {
        return value.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US', { maximumFractionDigits: 0 });
      }
      return value.toString();
    }
    return value;
  };

  // Render functions
  const renderDistributionChart = () => {
    const chartHeight = isFullscreen ? '65vh' : '350px';
    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1rem' }}>
          {t('percentageDistributionByType')}
        </h3>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart data={percentageData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: language === 'pt' ? 'Percentagem (%)' : 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
              <Bar dataKey="empresaIndividual" name={t('individualCompany')} fill="#0088FE" />
              <Bar dataKey="sociedade" name={t('corporation')} fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderProductivityChart = () => {
    const chartHeight = isFullscreen ? '65vh' : '350px';
    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1rem' }}>
          {t('productivityComparison')}
        </h3>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart
              data={[{ name: language === 'pt' ? "Produtividade VAB (€)" : "GVA Productivity (€)", empresaIndividual: 9141, sociedade: 37279, media: 31027 }]}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="empresaIndividual" name={t('individualCompany')} fill="#0088FE" />
              <Bar dataKey="sociedade" name={t('corporation')} fill="#00C49F" />
              <Bar dataKey="media" name={t('average')} fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{
          marginTop: isFullscreen ? '2vh' : '1rem',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>{t('source')}:</strong> {t('ineSource')}
        </div>
      </div>
    );
  };

  const renderSectorAnalysis = () => {
    const chartHeight = isFullscreen ? '65vh' : '450px';
    const translatedSectorData = getTranslatedSectorData();

    return (
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '1.5rem' }}>
          {t('sectorAnalysisTitle')}
        </h3>
        <div style={{ width: '100%', height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart data={translatedSectorData} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} fontSize={10} />
              <YAxis label={{ value: language === 'pt' ? 'Produtividade VAB (€/funcionário)' : 'GVA Productivity (€/employee)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="produtividadeVABEmpresasIndividuais" name={t('individualCompany')} fill="#0088FE" />
              <Bar dataKey="produtividadeVABSociedades" name={t('corporation')} fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{
          marginTop: isFullscreen ? '1vh' : '0.5rem',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>{t('source')}:</strong> {t('ineSource')}
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
          {t('companiesInPortugal')}
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

        <div style={{
          marginTop: isFullscreen ? '2vh' : '1rem',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>{t('source')}:</strong> {t('ineSource')}
        </div>
      </div>
    );
  };

  const renderPieCharts = () => {
    const pieSize = isFullscreen ? Math.min(window.innerWidth * 0.25, 250) : 220;
    const pieRadius = isFullscreen ? 70 : 60;

    const pieChartData = [
      { name: t('individualCompany'), value: 66.05 },
      { name: t('corporation'), value: 33.95 }
    ];

    const pieChartData2 = [
      { name: t('individualCompany'), value: 22.22 },
      { name: t('corporation'), value: 77.78 }
    ];

    const pieChartData3 = [
      { name: t('individualCompany'), value: 3.43 },
      { name: t('corporation'), value: 96.57 }
    ];

    return (
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: isFullscreen ? '2vw' : '1rem' }}>
          {[pieChartData, pieChartData2, pieChartData3].map((data, idx) => {
            const titles = [t('numberOfCompanies'), t('numberOfEmployees'), language === 'pt' ? 'Volume de Negócios' : 'Turnover'];
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

  const renderTableWithPieCharts = () => (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        {renderTableData()}
      </div>
      {renderPieCharts()}
    </div>
  );

  const renderDetailedTable = () => {
    const translatedData = getTranslatedData();
    const headers = language === 'pt' ? [
      "Escalão de Pessoal", "Número de Empresas", "% Empresas", "Número de Funcionários",
      "% Funcionários", "Volume de Negócios (€)",
      "VAB (€)", "% VAB", "Produtividade VAB (€/func.)"
    ] : [
      "Staff Level", "Number of Companies", "% Companies", "Number of Employees",
      "% Employees", "Turnover (€)",
      "GVA (€)", "% GVA", "GVA Productivity (€/emp.)"
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
              {translatedData.map((row, rowIndex) => (
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
                      (parseFloat(row["Volume de Negócios (€)"].replace(/\./g, '')) / 1000000000).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US', { maximumFractionDigits: 1 }) + (language === 'pt' ? ' mil M' : ' bn') :
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
                      (parseFloat(row["VAB (€)"].replace(/\./g, '')) / 1000000000).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US', { maximumFractionDigits: 1 }) + (language === 'pt' ? ' mil M' : ' bn') :
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
        </div>
        <div style={{
          marginTop: isFullscreen ? '2vh' : '1rem',
          fontSize: isFullscreen ? '0.8vh' : '0.75rem',
          color: '#6b7280',
          lineHeight: '1.4',
          textAlign: 'left'
        }}>
          <strong>{t('source')}:</strong> {t('ineSource')}
        </div>
      </div>
    );
  };

  const renderEuropeanTable = () => {
    const translatedEuropeData = getTranslatedEuropeData();
    const headers = language === 'pt' ?
      ["País", "Total", "Micro (0-9)", "Pequena (10-49)", "Média (50-249)", "Grande (250+)"] :
      ["Country", "Total", "Micro (0-9)", "Small (10-49)", "Medium (50-249)", "Large (250+)"];

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
              {translatedEuropeData.map((row, rowIndex) => (
                <tr key={rowIndex} style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb',
                  fontWeight: row.country === t('portugal') ? '600' : '400'
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
                    €{row.total.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.micro.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.small.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.medium.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US')}
                  </td>
                  <td style={{
                    padding: cellPadding,
                    textAlign: 'center',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: fontSize.tableText,
                    whiteSpace: 'nowrap'
                  }}>
                    €{row.large.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{
            marginTop: isFullscreen ? '2vh' : '1rem',
            fontSize: isFullscreen ? '0.8vh' : '0.75rem',
            color: '#6b7280',
            lineHeight: '1.4',
            textAlign: 'left'
          }}>
            <strong>{t('source')}:</strong> {language === 'pt' ?
              'INE, Sistema de contas integradas das empresas (SCIE) e Eurostat, Structural business statistics (SBS). Os cálculos para médias e grandes empresas são efetuados com base nos dados do INE, uma vez que estes dados são classificados como confidenciais no Eurostat. Por conseguinte, podem existir algumas limitações de comparabilidade. Para Portugal o unico dado do SBS e o das pequenas. O dado SBS do VAB para media e pequenas para Portugal e confidencial.' :
              'INE, Integrated Business Accounts System (SCIE) and Eurostat, Structural business statistics (SBS). Calculations for medium and large companies are based on INE data, as this data is classified as confidential in Eurostat. Therefore, some comparability limitations may exist. For Portugal the only data from SBS is the one for Small firms. The SBS data for the VAB for medium and large Portuguese companies is confidential'
            }
          </div>
        </div>
      </div>
    );
  };

  // ESAF Slide Component
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

    // Translate country names
    const countryTranslations = {
      'Finlândia': language === 'en' ? 'Finland' : 'Finlândia',
      'Alemanha': language === 'en' ? 'Germany' : 'Alemanha',
      'Suécia': language === 'en' ? 'Sweden' : 'Suécia',
      'Luxemburgo': language === 'en' ? 'Luxembourg' : 'Luxemburgo',
      'Dinamarca': language === 'en' ? 'Denmark' : 'Dinamarca',
      'Áustria': language === 'en' ? 'Austria' : 'Áustria',
      'Bélgica': language === 'en' ? 'Belgium' : 'Bélgica',
      'Itália': language === 'en' ? 'Italy' : 'Itália',
      'Países Baixos': language === 'en' ? 'Netherlands' : 'Países Baixos',
      'França': language === 'en' ? 'France' : 'França',
      'Irlanda': language === 'en' ? 'Ireland' : 'Irlanda',
      'Croácia': language === 'en' ? 'Croatia' : 'Croácia',
      'Eslováquia': language === 'en' ? 'Slovakia' : 'Eslováquia',
      'Eslovénia': language === 'en' ? 'Slovenia' : 'Eslovénia',
      'Espanha': language === 'en' ? 'Spain' : 'Espanha',
      'Estónia': language === 'en' ? 'Estonia' : 'Estónia',
      'Roménia': language === 'en' ? 'Romania' : 'Roménia',
      'Bulgária': language === 'en' ? 'Bulgaria' : 'Bulgária',
      'Chipre': language === 'en' ? 'Cyprus' : 'Chipre',
      'Hungria': language === 'en' ? 'Hungary' : 'Hungria',
      'Malta': language === 'en' ? 'Malta' : 'Malta',
      'Letónia': language === 'en' ? 'Latvia' : 'Letónia',
      'Lituânia': language === 'en' ? 'Lithuania' : 'Lituânia',
      'Polónia': language === 'en' ? 'Poland' : 'Polónia',
      'Portugal': language === 'en' ? 'Portugal' : 'Portugal',
      'Grécia': language === 'en' ? 'Greece' : 'Grécia',
      'República Checa': language === 'en' ? 'Czech Republic' : 'República Checa'
    };

    const translatedData = data.map(item => ({
      ...item,
      country: countryTranslations[item.country] || item.country
    }));

    const sortedData = [...translatedData].sort((a, b) => b.value - a.value);
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
          }}></div>
        </div>
        <h2 style={{ fontSize: localFontSizes.title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          {t('esafTitle')}
        </h2>
        <h3 style={{ fontSize: localFontSizes.subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '8mm', color: '#2563eb', margin: `0 0 ${isFullscreen ? '2vh' : '8mm'} 0` }}>
          {t('esafIndexTitle')}
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
                <Bar dataKey="value" name={language === 'pt' ? 'Índice ESAF 2023' : 'ESAF Index 2023'}>
                  {sortedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.country === (language === 'pt' ? 'Portugal' : 'Portugal') ? '#dc2626' : '#3b82f6'}
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
              {t('portugalPosition')}
            </p>
            <p style={{ margin: 0 }}>
              {language === 'pt' ? 'Fonte: Torfs (2023, atualizado) - setembro 2024' : 'Source: Torfs (2023, updated) - September 2024'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // SAFE Slide Component
  const SAFESlide = () => {
    const [activeMetric, setActiveMetric] = useState('financingGap');

    const saefData = {
      financingGap: [
        { country: 'EA', value: -1, fullName: language === 'pt' ? 'Zona Euro' : 'Eurozone' },
        { country: 'BE', value: 2, fullName: language === 'pt' ? 'Bélgica' : 'Belgium' },
        { country: 'DE', value: 2, fullName: language === 'pt' ? 'Alemanha' : 'Germany' },
        { country: 'IE', value: -5, fullName: language === 'pt' ? 'Irlanda' : 'Ireland' },
        { country: 'GR', value: 3, fullName: language === 'pt' ? 'Grécia' : 'Greece' },
        { country: 'ES', value: -4, fullName: language === 'pt' ? 'Espanha' : 'Spain' },
        { country: 'FR', value: 1, fullName: language === 'pt' ? 'França' : 'France' },
        { country: 'IT', value: 0, fullName: language === 'pt' ? 'Itália' : 'Italy' },
        { country: 'NL', value: -11, fullName: language === 'pt' ? 'Países Baixos' : 'Netherlands' },
        { country: 'AT', value: -4, fullName: language === 'pt' ? 'Áustria' : 'Austria' },
        { country: 'PT', value: -11, fullName: 'Portugal' },
        { country: 'SK', value: -3, fullName: language === 'pt' ? 'Eslováquia' : 'Slovakia' },
        { country: 'FI', value: 11, fullName: language === 'pt' ? 'Finlândia' : 'Finland' }
      ],
      financingObstacles: [
        { country: 'EA', value: 5, fullName: language === 'pt' ? 'Zona Euro' : 'Eurozone' },
        { country: 'BE', value: 6, fullName: language === 'pt' ? 'Bélgica' : 'Belgium' },
        { country: 'DE', value: 6, fullName: language === 'pt' ? 'Alemanha' : 'Germany' },
        { country: 'IE', value: 4, fullName: language === 'pt' ? 'Irlanda' : 'Ireland' },
        { country: 'GR', value: 13, fullName: language === 'pt' ? 'Grécia' : 'Greece' },
        { country: 'ES', value: 6, fullName: language === 'pt' ? 'Espanha' : 'Spain' },
        { country: 'FR', value: 5, fullName: language === 'pt' ? 'França' : 'France' },
        { country: 'IT', value: 3, fullName: language === 'pt' ? 'Itália' : 'Italy' },
        { country: 'NL', value: 2, fullName: language === 'pt' ? 'Países Baixos' : 'Netherlands' },
        { country: 'AT', value: 6, fullName: language === 'pt' ? 'Áustria' : 'Austria' },
        { country: 'PT', value: 5, fullName: 'Portugal' },
        { country: 'SK', value: 5, fullName: language === 'pt' ? 'Eslováquia' : 'Slovakia' },
        { country: 'FI', value: 9, fullName: language === 'pt' ? 'Finlândia' : 'Finland' }
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
          }}></div>
        </div>
        <h2 style={{ fontSize: localFontSizes.title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          {t('safeTitle')}
        </h2>
        <h3 style={{ fontSize: localFontSizes.subtitle, fontWeight: '600', textAlign: 'center', marginBottom: isFullscreen ? '2vh' : '6mm', color: '#2563eb', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
          {t('safeTitle')}
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
            {t('financingGap')}
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
            {t('financingObstacles')}
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
                    activeMetric === 'financingGap' ? t('financingGap') : t('financingObstacles')
                  ]}
                  labelFormatter={(label) => {
                    const country = currentData.find(d => d.country === label);
                    return country ? country.fullName : label;
                  }}
                  contentStyle={{ fontSize: isFullscreen ? '12px' : '10px' }}
                />
                <Bar
                  dataKey="value"
                  name={activeMetric === 'financingGap' ? t('financingGap') : t('financingObstacles')}
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
                ? t('portugalNegativeGap')
                : t('portugalObstacles')
              }
            </p>
            <p style={{ margin: 0 }}>
              {language === 'pt' ? 'Fonte: BCE - Inquérito SAFE, Q1 2025' : 'Source: ECB - SAFE Survey, Q1 2025'}
            </p>
          </div>
        </div>
      </div>
    );
  };
  // Complete slide content
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

    // Slide 3: Growth (CORRECTED VERSION)
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
        {t('growthTitle')}
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.4', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '3vh' : '10mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            {t('eniParadoxTitle')}
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('eniEmployment')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('eniProductivity')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('eniLessProductive')}</li>
            <li>{t('eniAllSectors')}</li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            {t('productivityGapTitle')}
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('microLessProductive')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('smallLessProductive')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('mediumLessProductive')}</li>
            <li>{t('euGap')}</li>
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
        {t('financingTitle')}
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.4', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '3vh' : '10mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            {t('financingParadoxTitle')}
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('safeImprovement')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('esafUnfavorable')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('safePerspective')}</li>
            <li>{t('methodologicalDifferences')}</li>
          </ul>
        </div>
        <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'left', marginBottom: isFullscreen ? '3vh' : '8mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '3vh' : '8mm'} 0` }}>
          {t('microdataTitle')}
        </h2>
        <div>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '2vh' : '6mm', margin: `0 0 ${isFullscreen ? '2vh' : '6mm'} 0` }}>
            {t('microdataImportanceTitle')}
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '3vw' : '8mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('aggregateDataUseful')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('creditRatingExample')}</li>
            <li style={{ marginBottom: isFullscreen ? '1vh' : '3mm' }}>{t('diversityOpportunities')}</li>
            <li>{t('robustAnalysis')}</li>
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
        {t('paradoxENI')}
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
        {t('paradoxProductivity')}
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
        {t('paradoxSector')}
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
        {t('productivityGap')}
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
        {t('europeanComparison')}
      </h2>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {renderEuropeanTable()}
      </div>
    </div>,

    // Slide 10: SAFE
    <SAFESlide key="safe" />,

    // Slide 11: ESAF
    <ESAFSlide key="esaf" />,

    // Slide 12: Microdata KPIs
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
        {t('kpisTitle')}
      </h2>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src={`${process.env.PUBLIC_URL}/metricas_financeiras_distribuicao${language === 'en' ? '_en' : ''}.html`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="KPI's"
        />
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
          <strong>{t('source')}:</strong> {language === 'pt' ? 'Moody\'s Corporation, Moody\'s Investors Service, Inc.' : 'Moody\'s Corporation, Moody\'s Investors Service, Inc.'}
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
        {t('scoringTitle')}
      </h2>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          src={`${process.env.PUBLIC_URL}/updated_financial_health_summary${language === 'en' ? '_en' : ''}.html`}
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
        {t('financialHealthTitle')}
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.4', flex: 1, overflow: 'auto' }}>

        {/* Dados Gerais */}
        <div style={{ marginBottom: isFullscreen ? '2vh' : '6mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '1vh' : '3mm', margin: `0 0 ${isFullscreen ? '1vh' : '3mm'} 0` }}>
            {t('generalData')}
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '2vw' : '6mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>{t('companiesAnalyzed')}</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>{t('consistentPerformance')}</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>{t('mixedIndicators')}</li>
          </ul>
        </div>

        {/* Performance Categories */}
        <div style={{ marginBottom: isFullscreen ? '2vh' : '6mm' }}>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '1vh' : '3mm', margin: `0 0 ${isFullscreen ? '1vh' : '3mm'} 0` }}>
            {t('consistentPerformanceTitle')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: isFullscreen ? '1fr 1fr' : '1fr', gap: isFullscreen ? '1vw' : '4mm' }}>

            {/* BOM Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#16a34a', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                {t('goodCompanies')}
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('excellentHealth')}</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('autonomyRoa')}</li>
                <li>{t('mostSolid')}</li>
              </ul>
            </div>

            {/* CRÍTICO Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#dc2626', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                {t('criticalCompanies')}
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('criticalSituation')}</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('negativeEquity')}</li>
                <li>{t('urgentRestructuring')}</li>
              </ul>
            </div>

            {/* FRACO Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#ea580c', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                {t('weakCompanies')}
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('consistentWeak')}</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('lowAutonomyProfitability')}</li>
                <li>{t('recoverableSituation')}</li>
              </ul>
            </div>

            {/* MÉDIO Category */}
            <div style={{ marginBottom: isFullscreen ? '1vh' : '4mm' }}>
              <h4 style={{ fontSize: getFontSizes().text, fontWeight: '600', color: '#ca8a04', marginBottom: isFullscreen ? '0.5vh' : '2mm', margin: `0 0 ${isFullscreen ? '0.5vh' : '2mm'} 0` }}>
                {t('mediumCompanies')}
              </h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '1.5vw' : '5mm', margin: 0, fontSize: getFontSizes().small }}>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('balancedMedium')}</li>
                <li style={{ marginBottom: isFullscreen ? '0.3vh' : '1mm' }}>{t('stableFinancial')}</li>
                <li>{t('solidBase')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Principais Conclusões */}
        <div>
          <h3 style={{ fontSize: getFontSizes().subtitle, fontWeight: '600', color: '#2563eb', marginBottom: isFullscreen ? '1vh' : '3mm', margin: `0 0 ${isFullscreen ? '1vh' : '3mm'} 0` }}>
            {t('mainConclusionsTitle')}
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: isFullscreen ? '2vw' : '6mm', margin: 0 }}>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>{t('marketPolarization')}</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>{t('majorityMixed')}</li>
            <li style={{ marginBottom: isFullscreen ? '0.5vh' : '2mm' }}>{t('improvementOpportunities')}</li>
            <li>{t('riskManagement')}</li>
          </ul>
        </div>
      </div>
    </div>,

    // Slide 15: Five Scoring
    <div key="five-scoring" style={getSlideStyle()}>
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
        {t('fiveCreditScoring')}
      </h2>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src={`${process.env.PUBLIC_URL}/ratings_pie_quality_2023${language === 'en' ? '_en' : ''}.html`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          title="Scoring de 100k empresas"
        />
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
          <strong>{t('source')}:</strong> {language === 'pt' ? 'Five Credit internal scoring model.' : 'Five Credit internal scoring model.'}
        </div>
      </div>
    </div>,

    // Slide 16: Conclusion
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
          />
        </div>
      </div>
      <h2 style={{ fontSize: getFontSizes().title, fontWeight: 'bold', textAlign: 'center', marginBottom: isFullscreen ? '4vh' : '10mm', color: '#1e40af', margin: `0 0 ${isFullscreen ? '4vh' : '10mm'} 0` }}>
        {t('conclusionsTitle')}
      </h2>
      <div style={{ fontSize: getFontSizes().text, lineHeight: '1.6', flex: 1 }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
            <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
            <span>{t('conclusion1')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
            <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
            <span>{t('conclusion2')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
            <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
            <span>{t('conclusion3')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: isFullscreen ? '3vh' : '8mm' }}>
            <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
            <span>{t('conclusion4')}</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', width: isFullscreen ? '2vh' : '6mm', height: isFullscreen ? '2vh' : '6mm', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: isFullscreen ? '1.5vh' : '4mm', flexShrink: 0 }}></span>
            <span>{t('conclusion5')}</span>
          </li>
        </ul>
      </div>
    </div>,

    // Slide 17: Appendix
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
        {t('appendixTitle')}
      </h2>
      <div style={{ fontSize: isFullscreen ? '14px' : '11px', lineHeight: '1.3', flex: 1, padding: '0 20px' }}>

        {/* Loans Section */}
        <div style={{ marginBottom: isFullscreen ? '1.5vh' : '3mm' }}>
          <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
            {language === 'pt' ? 'Empréstimos:' : 'Loans:'}
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que usaram empréstimos bancários nos últimos 6 meses' : 'Percentage of SMEs using bank loans in last 6 months'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que usaram subsídios ou empréstimos bancários subsidiados nos últimos 6 meses' : 'Percentage of SMEs using grants or subsidised bank loans in last 6 months'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que não se candidataram a empréstimos bancários por receio de possível rejeição nos últimos 6 meses' : 'Percentage of SMEs not applying for a bank loan because of possible rejection in last 6 months'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Taxa de juro para empréstimos abaixo de 250k EUR (taxa variável com IRF até 1 ano)' : 'Interest rate for loans under EUR 250k (floating rate with IRF up to 1 year)'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Spread de taxa de juro (abaixo de 250k EUR vs acima de 1M EUR para taxa variável com IRF até 1 ano)' : 'Interest rate spread (under EUR 250k vs over EUR 1m for floating rate with IRF up to 1 year)'}</span>
            </li>
          </ul>
        </div>

        {/* Equity Section */}
        <div style={{ marginBottom: isFullscreen ? '1.5vh' : '3mm' }}>
          <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
            {language === 'pt' ? 'Capital Próprio:' : 'Equity:'}
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Investimentos de Capital de Risco / PIB' : 'Venture Capital Investments / GDP'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Valor do mercado de IPO / PIB' : 'Value of IPO market / GDP'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que usaram capital próprio nos últimos 6 meses' : 'Percentage of SMEs using equity capital in last 6 months'}</span>
            </li>
          </ul>
        </div>

        {/* Credit and Leasing Section */}
        <div style={{ marginBottom: isFullscreen ? '1.5vh' : '3mm' }}>
          <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
            {language === 'pt' ? 'Crédito e Leasing:' : 'Credit and Leasing:'}
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que usaram descoberto bancário, linha de crédito ou descoberto de cartão de crédito nos últimos 6 meses' : 'Percentage of SMEs using bank overdraft, credit line or credit card overdraft in last 6 months'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que não se candidataram ao acima referido por receio de possível rejeição nos últimos seis meses' : 'Percentage of SMEs not applying for the above because of fear of possible rejection in last six months'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que usaram leasing ou locação financeira nos últimos 6 meses' : 'Percentage of SMEs using leasing or hire-purchase in the last 6 months'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Taxa de juro mediana cobrada às PME para linha de crédito ou descoberto bancário nos últimos 6 meses' : 'Median interest rate charged to SMEs for credit line or bank overdraft application in last 6 months'}</span>
            </li>
          </ul>
        </div>

        {/* Macro Factors Section */}
        <div>
          <h3 style={{ fontSize: isFullscreen ? '28px' : '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: isFullscreen ? '0.8vh' : '2mm' }}>
            {language === 'pt' ? 'Fatores Macro:' : 'Macro Factors:'}
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Gap entre PIB real e potencial' : 'Gap between actual and potential GDP'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: isFullscreen ? '0.5vh' : '1mm' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Empréstimos não performantes bancários em relação ao total de empréstimos brutos' : 'Bank non-performing loans to total gross loans'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ display: 'inline-block', width: '3px', height: '3px', backgroundColor: '#000', marginRight: '6px', marginTop: '6px', flexShrink: 0 }}></span>
              <span>{language === 'pt' ? 'Percentagem de PME que sentem que não há obstáculos ao financiamento' : 'Percentage of SMEs feeling that there are no financing obstacles'}</span>
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
        {t('comparisonTitle')}
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <button onClick={() => setActiveTab('distribution')} style={activeTab === 'distribution' ? activeTabStyle : inactiveTabStyle}>
          {t('percentageDistribution')}
        </button>
        <button onClick={() => setActiveTab('pie')} style={activeTab === 'pie' ? activeTabStyle : inactiveTabStyle}>
          {t('pieCharts')}
        </button>
        <button onClick={() => setActiveTab('productivity')} style={activeTab === 'productivity' ? activeTabStyle : inactiveTabStyle}>
          {t('productivity')}
        </button>
        <button onClick={() => setActiveTab('sector-analysis')} style={activeTab === 'sector-analysis' ? activeTabStyle : inactiveTabStyle}>
          {t('sectorAnalysis')}
        </button>
        <button onClick={() => setActiveTab('table')} style={activeTab === 'table' ? activeTabStyle : inactiveTabStyle}>
          {t('table')}
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
        {t('previous')}
      </button>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        {t('slideOf', { current: currentSlide + 1, total: slideContent.length })}
      </div>
      <button onClick={() => setCurrentSlide(Math.min(slideContent.length - 1, currentSlide + 1))} disabled={currentSlide === slideContent.length - 1}
        style={{
          padding: '0.5rem 1rem', backgroundColor: currentSlide === slideContent.length - 1 ? '#e5e7eb' : '#3b82f6',
          color: currentSlide === slideContent.length - 1 ? '#9ca3af' : '#ffffff', border: 'none', borderRadius: '0.25rem',
          cursor: currentSlide === slideContent.length - 1 ? 'default' : 'pointer', fontWeight: '500'
        }}>
        {t('next')}
      </button>
    </div>
  );
  return (
    <div style={{ maxWidth: isFullscreen ? '100vw' : '1200px', margin: '0 auto', height: isFullscreen ? '100vh' : 'auto' }}>
      {!isFullscreen && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '0.5rem' }}>
          {/* Language Toggle Button */}
          <button onClick={toggleLanguage}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
            🌐 {language === 'pt' ? 'English' : 'Português'}
          </button>

          <button onClick={() => setIsPresentation(!isPresentation)}
            style={{
              padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db',
              borderRadius: '0.25rem', cursor: 'pointer', fontWeight: '500'
            }}>
            {isPresentation ? t('explorerMode') : t('presentationMode')}
          </button>
          {isPresentation && (
            <button onClick={toggleFullscreen}
              style={{
                padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none',
                borderRadius: '0.25rem', cursor: 'pointer', fontWeight: '500'
              }}>
              {t('fullScreen')}
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
          {language === 'pt' ? '← → Navegar | ESC Sair' : '← → Navigate | ESC Exit'}
        </div>
      )}
    </div>
  );
};

export default BusinessComparisonDashboard;