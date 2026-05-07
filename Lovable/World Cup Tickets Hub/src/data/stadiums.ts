export interface Sector {
  id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  capacity: number;
  image: string;
  description: string;
  sectors: Sector[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const stadiums: Stadium[] = [
  // USA Stadiums (11)
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "East Rutherford, NJ",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 82500,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=800&q=80",
    description: "Casa do New York Giants e New York Jets, será palco da final da Copa do Mundo 2026.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2500, capacity: 5000, description: "Assentos premium com vista privilegiada, acesso a lounge exclusivo e serviço de alimentação incluso." },
      { id: "cat1", name: "Categoria 1", price: 1200, capacity: 25000, description: "Assentos nas áreas centrais do estádio com excelente visibilidade do campo." },
      { id: "cat2", name: "Categoria 2", price: 600, capacity: 52500, description: "Assentos nas áreas laterais e superiores, ótimo custo-benefício." },
    ],
    coordinates: { lat: 40.8128, lng: -74.0742 },
  },
  {
    id: "att",
    name: "AT&T Stadium",
    city: "Arlington, TX",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 80000,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80",
    description: "Conhecido como 'Jerry World', possui um dos maiores telões do mundo e teto retrátil.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2200, capacity: 4500, description: "Suítes privativas com catering exclusivo e acesso ao campo pré-jogo." },
      { id: "cat1", name: "Categoria 1", price: 1000, capacity: 22000, description: "Vista central com cobertura do telão gigante." },
      { id: "cat2", name: "Categoria 2", price: 500, capacity: 53500, description: "Setores superiores com visão panorâmica." },
    ],
    coordinates: { lat: 32.7473, lng: -97.0945 },
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    city: "Los Angeles, CA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 70240,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    description: "O estádio mais caro já construído, com arquitetura futurista e tecnologia de ponta.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2800, capacity: 4000, description: "Experiência ultra-premium com champagne, buffet gourmet e meet & greet." },
      { id: "cat1", name: "Categoria 1", price: 1400, capacity: 20000, description: "Assentos centrais com acesso a áreas exclusivas." },
      { id: "cat2", name: "Categoria 2", price: 700, capacity: 46240, description: "Ampla visibilidade em setores elevados." },
    ],
    coordinates: { lat: 33.9535, lng: -118.3392 },
  },
  {
    id: "hardrock",
    name: "Hard Rock Stadium",
    city: "Miami Gardens, FL",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 65326,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    description: "Casa do Miami Dolphins, recebeu Super Bowls e será um dos principais palcos da Copa.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2000, capacity: 3500, description: "Camarotes climatizados com vista panorâmica." },
      { id: "cat1", name: "Categoria 1", price: 950, capacity: 18000, description: "Setores centrais cobertos." },
      { id: "cat2", name: "Categoria 2", price: 450, capacity: 43826, description: "Arquibancadas descobertas com ambiente vibrante." },
    ],
    coordinates: { lat: 25.958, lng: -80.2389 },
  },
  {
    id: "levis",
    name: "Levi's Stadium",
    city: "Santa Clara, CA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 68500,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    description: "Estádio sustentável do San Francisco 49ers com tecnologia verde.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 2100, capacity: 3800, description: "Lounges com terraço e vista do Vale do Silício." },
      { id: "cat1", name: "Categoria 1", price: 980, capacity: 19000, description: "Assentos premium no nível do campo." },
      { id: "cat2", name: "Categoria 2", price: 480, capacity: 45700, description: "Setores superiores com excelente acústica." },
    ],
    coordinates: { lat: 37.4033, lng: -121.9694 },
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz Stadium",
    city: "Atlanta, GA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 71000,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    description: "Teto retrátil único em formato de câmera e o maior sistema de vídeo 360° do mundo.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1900, capacity: 4200, description: "Suítes com bar privativo e serviço de concierge." },
      { id: "cat1", name: "Categoria 1", price: 900, capacity: 20000, description: "Vista central sob o icônico teto retrátil." },
      { id: "cat2", name: "Categoria 2", price: 420, capacity: 46800, description: "Setores com preços acessíveis da NFL." },
    ],
    coordinates: { lat: 33.7553, lng: -84.401 },
  },
  {
    id: "nrg",
    name: "NRG Stadium",
    city: "Houston, TX",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 72220,
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80",
    description: "Primeiro estádio da NFL com teto retrátil, casa do Houston Texans.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1850, capacity: 4000, description: "Acesso exclusivo ao clube privativo Field Level." },
      { id: "cat1", name: "Categoria 1", price: 850, capacity: 21000, description: "Assentos no nível médio com cobertura." },
      { id: "cat2", name: "Categoria 2", price: 400, capacity: 47220, description: "Ambiente texano autêntico nas arquibancadas." },
    ],
    coordinates: { lat: 29.6847, lng: -95.4107 },
  },
  {
    id: "lincoln",
    name: "Lincoln Financial Field",
    city: "Philadelphia, PA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 69796,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    description: "Casa dos Philadelphia Eagles, conhecido pela atmosfera intensa dos torcedores.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1800, capacity: 3800, description: "Suítes aquecidas com catering premium." },
      { id: "cat1", name: "Categoria 1", price: 820, capacity: 19000, description: "Setores centrais com cobertura parcial." },
      { id: "cat2", name: "Categoria 2", price: 380, capacity: 46996, description: "Arquibancadas tradicionais com torcida apaixonada." },
    ],
    coordinates: { lat: 39.9008, lng: -75.1675 },
  },
  {
    id: "lumen",
    name: "Lumen Field",
    city: "Seattle, WA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 68740,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    description: "Conhecido pela acústica que amplifica o barulho da torcida do Seattle Seahawks.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1750, capacity: 3600, description: "Vista para o Monte Rainier e Puget Sound." },
      { id: "cat1", name: "Categoria 1", price: 800, capacity: 18500, description: "Setores cobertos com excelente visibilidade." },
      { id: "cat2", name: "Categoria 2", price: 360, capacity: 46640, description: "Arquibancadas abertas com vista panorâmica." },
    ],
    coordinates: { lat: 47.5952, lng: -122.3316 },
  },
  {
    id: "arrowhead",
    name: "Arrowhead Stadium",
    city: "Kansas City, MO",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 76416,
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
    description: "Um dos estádios mais barulhentos do mundo, casa dos Kansas City Chiefs.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1700, capacity: 4200, description: "Chiefs Kingdom Club com churrasco tradicional." },
      { id: "cat1", name: "Categoria 1", price: 780, capacity: 22000, description: "Assentos vermelhos icônicos no nível principal." },
      { id: "cat2", name: "Categoria 2", price: 350, capacity: 50216, description: "Experiência autêntica do Midwest americano." },
    ],
    coordinates: { lat: 39.0489, lng: -94.484 },
  },
  {
    id: "gillette",
    name: "Gillette Stadium",
    city: "Foxborough, MA",
    country: "Estados Unidos",
    countryCode: "USA",
    capacity: 65878,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80",
    description: "Casa da dinastia New England Patriots, estádio histórico da NFL.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1900, capacity: 3500, description: "Acesso ao Putnam Club com vista privilegiada." },
      { id: "cat1", name: "Categoria 1", price: 880, capacity: 18000, description: "Setores centrais com proteção climática." },
      { id: "cat2", name: "Categoria 2", price: 420, capacity: 44378, description: "Arquibancadas tradicionais da Nova Inglaterra." },
    ],
    coordinates: { lat: 42.0909, lng: -71.2643 },
  },
  
  // Mexico Stadiums (3)
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Cidade do México",
    country: "México",
    countryCode: "MEX",
    capacity: 87523,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    description: "Lendário estádio que sediou duas finais de Copa do Mundo (1970 e 1986).",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1600, capacity: 5000, description: "Palcos históricos com serviço de luxo mexicano." },
      { id: "cat1", name: "Categoria 1", price: 700, capacity: 25000, description: "Setores centrais com vista para o gramado sagrado." },
      { id: "cat2", name: "Categoria 2", price: 300, capacity: 57523, description: "Arquibancadas vibrantes com a paixão mexicana." },
    ],
    coordinates: { lat: 19.3029, lng: -99.1505 },
  },
  {
    id: "bbva",
    name: "Estadio BBVA",
    city: "Monterrey",
    country: "México",
    countryCode: "MEX",
    capacity: 53500,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    description: "Moderno estádio do Monterrey com arquitetura premiada internacionalmente.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1400, capacity: 3000, description: "Suítes com vista para as montanhas de Monterrey." },
      { id: "cat1", name: "Categoria 1", price: 650, capacity: 15000, description: "Assentos premium com cobertura total." },
      { id: "cat2", name: "Categoria 2", price: 280, capacity: 35500, description: "Setores abertos com ambiente festivo." },
    ],
    coordinates: { lat: 25.6697, lng: -100.2447 },
  },
  {
    id: "akron",
    name: "Estadio Akron",
    city: "Guadalajara",
    country: "México",
    countryCode: "MEX",
    capacity: 49850,
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    description: "Casa das Chivas Rayadas, conhecido pela fidelidade de sua torcida.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1350, capacity: 2800, description: "Experiência premium com tequila artesanal." },
      { id: "cat1", name: "Categoria 1", price: 620, capacity: 14000, description: "Setores vermelhos e brancos tradicionais." },
      { id: "cat2", name: "Categoria 2", price: 260, capacity: 33050, description: "Arquibancadas populares de Jalisco." },
    ],
    coordinates: { lat: 20.6817, lng: -103.4627 },
  },
  
  // Canada Stadiums (2)
  {
    id: "bcplace",
    name: "BC Place",
    city: "Vancouver",
    country: "Canadá",
    countryCode: "CAN",
    capacity: 54500,
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800&q=80",
    description: "Estádio com teto retrátil e vista espetacular para as montanhas de Vancouver.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1800, capacity: 3200, description: "Lounges com vista para as North Shore Mountains." },
      { id: "cat1", name: "Categoria 1", price: 850, capacity: 16000, description: "Assentos centrais sob o teto retratável." },
      { id: "cat2", name: "Categoria 2", price: 400, capacity: 35300, description: "Setores com ambiente multicultural de Vancouver." },
    ],
    coordinates: { lat: 49.2768, lng: -123.1117 },
  },
  {
    id: "bmo",
    name: "BMO Field",
    city: "Toronto",
    country: "Canadá",
    countryCode: "CAN",
    capacity: 45500,
    image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&q=80",
    description: "Principal estádio de futebol do Canadá, casa do Toronto FC.",
    sectors: [
      { id: "vip", name: "VIP Premium", price: 1700, capacity: 2800, description: "Vista para o skyline de Toronto e CN Tower." },
      { id: "cat1", name: "Categoria 1", price: 820, capacity: 13000, description: "Setores premium com aquecimento." },
      { id: "cat2", name: "Categoria 2", price: 380, capacity: 29700, description: "Arquibancadas ao ar livre estilo europeu." },
    ],
    coordinates: { lat: 43.6332, lng: -79.4186 },
  },
];

export const getStadiumById = (id: string): Stadium | undefined => {
  return stadiums.find(stadium => stadium.id === id);
};

export const getStadiumsByCountry = (countryCode: string): Stadium[] => {
  return stadiums.filter(stadium => stadium.countryCode === countryCode);
};
