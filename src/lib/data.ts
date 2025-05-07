export const featuredStories = [
  {
    id: "1",
    title: "The Rising Waters: Climate Change's Impact on Coastal Communities",
    excerpt: "An in-depth look at how climate change is affecting coastal communities worldwide and the innovative solutions emerging to combat rising sea levels.",
    coverImage: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    author: {
      name: "Eliza Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true
    },
    publishedAt: "May 3, 2025",
    category: "Climate",
    region: "Global",
    readTime: 8,
    commentsCount: 24,
    likesCount: 156,
    viewsCount: 3240
  },
  {
    id: "2",
    title: "Democracy Under Digital Siege: The New Frontier of Election Security",
    excerpt: "Investigating the sophisticated cyber threats targeting democratic elections and the technologies being deployed to safeguard the integrity of the vote.",
    coverImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c",
    author: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=4",
      verified: true
    },
    publishedAt: "May 1, 2025",
    category: "Politics",
    region: "North America",
    readTime: 12,
    commentsCount: 56,
    likesCount: 203,
    viewsCount: 5891
  },
  {
    id: "3",
    title: "The Forgotten Crisis: Humanitarian Challenges in Yemen",
    excerpt: "A comprehensive report on the ongoing humanitarian crisis in Yemen, highlighting the challenges faced by aid organizations and the resilience of local communities.",
    coverImage: "https://images.unsplash.com/photo-1469461084727-4bfb496cf55a",
    author: {
      name: "Aisha Khalid",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true
    },
    publishedAt: "Apr 28, 2025",
    category: "Humanitarian",
    region: "Middle East",
    readTime: 15,
    commentsCount: 87,
    likesCount: 412,
    viewsCount: 7630
  },
  {
    id: "4",
    title: "The Future of Work: AI's Impact on Global Labor Markets",
    excerpt: "Exploring how artificial intelligence and automation are reshaping industries and what it means for workers across different economic sectors worldwide.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    author: {
      name: "David Rivera",
      avatar: "https://i.pravatar.cc/150?img=8",
      verified: false
    },
    publishedAt: "Apr 26, 2025",
    category: "Technology",
    region: "Global",
    readTime: 10,
    commentsCount: 34,
    likesCount: 178,
    viewsCount: 4210
  },
  {
    id: "5",
    title: "Art in Conflict Zones: Expression Amid Turmoil",
    excerpt: "Documenting how artists in conflict zones use their work as a form of resistance, healing, and preserving cultural identity in the face of violence and displacement.",
    coverImage: "https://images.unsplash.com/photo-1501696461415-6bd6660c6742",
    author: {
      name: "Sofia Mendoza",
      avatar: "https://i.pravatar.cc/150?img=10",
      verified: true
    },
    publishedAt: "Apr 22, 2025",
    category: "Culture",
    region: "Various",
    readTime: 7,
    commentsCount: 19,
    likesCount: 231,
    viewsCount: 3845
  },
  {
    id: "6",
    title: "Regenerative Agriculture: Farming for the Future",
    excerpt: "How regenerative farming practices are helping combat climate change while improving food security and restoring ecosystems across different regions.",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    author: {
      name: "Thomas Okonkwo",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true
    },
    publishedAt: "Apr 20, 2025",
    category: "Environment",
    region: "Africa",
    readTime: 9,
    commentsCount: 43,
    likesCount: 267,
    viewsCount: 4520
  }
];

export const topCategories = [
  "Politics",
  "Climate",
  "Technology",
  "Human Rights",
  "Health",
  "Economy",
  "Culture",
  "Science",
  "Environment",
  "Education"
];

export const regions = [
  "Global",
  // Continents
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Middle East",
  // Major Countries by Continent
  // Africa
  "Nigeria",
  "South Africa",
  "Egypt",
  "Kenya",
  "Ethiopia",
  // Asia
  "China",
  "India",
  "Japan",
  "South Korea",
  "Indonesia",
  "Vietnam",
  "Thailand",
  "Philippines",
  // Europe
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Russia",
  "Ukraine",
  "Poland",
  "Netherlands",
  "Sweden",
  // North America
  "United States",
  "Canada",
  "Mexico",
  // South America
  "Brazil",
  "Argentina",
  "Colombia",
  "Chile",
  "Peru",
  // Oceania
  "Australia",
  "New Zealand",
  // Middle East
  "Saudi Arabia",
  "UAE",
  "Israel",
  "Turkey",
  "Iran"
];

export const journalists = [
  {
    id: "1",
    name: "Eliza Chen",
    role: "Senior Climate Correspondent",
    avatar: "https://i.pravatar.cc/150?img=1",
    coverImage: "https://images.unsplash.com/photo-1485160497022-3e09382fb310",
    bio: "Award-winning environmental journalist with over a decade of experience covering climate policy and sustainable development initiatives worldwide.",
    longBio: "Eliza Chen is an award-winning environmental journalist with over a decade of experience covering climate policy, renewable energy transitions, and sustainable development initiatives worldwide. With a background in environmental science and international relations, she brings analytical depth to complex ecological and political issues. Her investigative reporting on climate migration has been recognized by the Environmental Journalism Association and has influenced policy discussions at international climate summits.",
    expertise: ["Climate Change", "Environmental Policy", "Sustainability"],
    verified: true,
    location: "Berlin, Germany",
    joinedDate: "January 2018",
    storiesCount: 127,
    regionsOfFocus: ["Europe", "Asia", "Global"],
    awards: ["Environmental Journalism Award 2023", "Climate Reporting Excellence 2021"]
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Political Analyst",
    avatar: "https://i.pravatar.cc/150?img=4",
    coverImage: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1",
    bio: "Political correspondent specializing in democratic institutions, electoral systems, and governance across North America and Europe.",
    longBio: "Marcus Johnson is a distinguished political correspondent specializing in democratic institutions, electoral systems, and governance. With previous experience as a policy advisor and a PhD in Political Science, he provides nuanced analysis on complex political phenomena. His reporting emphasizes historical context and structural factors that shape modern governance challenges. Beyond his journalism, Marcus frequently lectures at universities and contributes to scholarly publications on democratic theory.",
    expertise: ["Democracy", "Elections", "Governance", "North American Politics"],
    verified: true,
    location: "Washington D.C., USA",
    joinedDate: "March 2019",
    storiesCount: 98,
    regionsOfFocus: ["North America", "Europe"],
    awards: ["Political Reporting Award 2024", "Democracy in Media Prize 2022"]
  },
  {
    id: "3",
    name: "Aisha Khalid",
    role: "Middle East Correspondent",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverImage: "https://images.unsplash.com/photo-1488161628813-04466f872be2",
    bio: "Investigative journalist focusing on humanitarian crises, conflict resolution, and human rights issues across the Middle East and North Africa.",
    longBio: "Aisha Khalid is an investigative journalist focusing on humanitarian crises, conflict resolution, and human rights issues across the Middle East and North Africa. With fluency in Arabic, Farsi, and French, she accesses perspectives often overlooked in international coverage. Her on-the-ground reporting from conflict zones has highlighted the human cost of geopolitical tensions and provided critical context to complex regional dynamics. Before joining PublicPress, Aisha worked with international humanitarian organizations documenting human rights violations.",
    expertise: ["Humanitarian Affairs", "Conflict Resolution", "Human Rights", "Middle Eastern Politics"],
    verified: true,
    location: "Beirut, Lebanon",
    joinedDate: "June 2020",
    storiesCount: 73,
    regionsOfFocus: ["Middle East", "North Africa"],
    awards: ["International Reporting Award 2023", "Human Rights Press Award 2021"]
  },
  {
    id: "4",
    name: "David Rivera",
    role: "Technology Reporter",
    avatar: "https://i.pravatar.cc/150?img=8",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    bio: "Tech journalist covering artificial intelligence, digital transformation, and the societal impacts of emerging technologies.",
    longBio: "David Rivera is a technology journalist covering artificial intelligence, digital transformation, and the societal impacts of emerging technologies. With a background in computer science and science communication, he translates complex technological concepts into accessible analyses for general audiences. David's reporting emphasizes the ethical dimensions of technology development and implementation, highlighting both opportunities and challenges presented by rapid digital innovation. He regularly contributes to discussions on technology policy and digital rights.",
    expertise: ["Artificial Intelligence", "Digital Ethics", "Tech Policy", "Innovation"],
    verified: false,
    location: "San Francisco, USA",
    joinedDate: "October 2021",
    storiesCount: 54,
    regionsOfFocus: ["North America", "Global"],
    awards: []
  },
  {
    id: "5",
    name: "Sofia Mendoza",
    role: "Arts & Culture Editor",
    avatar: "https://i.pravatar.cc/150?img=10",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    bio: "Cultural journalist examining the intersection of arts, politics, and social movements across diverse global contexts.",
    longBio: "Sofia Mendoza is a cultural journalist examining the intersection of arts, politics, and social movements across diverse global contexts. With a background in anthropology and visual arts, she brings unique interdisciplinary perspectives to cultural reporting. Her work highlights how artistic expression reflects and shapes social realities, particularly in communities experiencing conflict or rapid change. Sofia has developed special expertise in documenting indigenous cultural preservation efforts and contemporary art movements in the Global South.",
    expertise: ["Arts", "Cultural Heritage", "Social Movements", "Indigenous Rights"],
    verified: true,
    location: "Mexico City, Mexico",
    joinedDate: "February 2020",
    storiesCount: 82,
    regionsOfFocus: ["Latin America", "Global"],
    awards: ["Cultural Journalism Excellence Award 2022"]
  },
  {
    id: "6",
    name: "Thomas Okonkwo",
    role: "Environmental & Agricultural Reporter",
    avatar: "https://i.pravatar.cc/150?img=3",
    coverImage: "https://images.unsplash.com/photo-1498440785321-2968907d5a50",
    bio: "Environmental journalist specializing in sustainable agriculture, food security, and ecosystem restoration with a focus on African contexts.",
    longBio: "Thomas Okonkwo is an environmental journalist specializing in sustainable agriculture, food security, and ecosystem restoration with a focus on African contexts. With training in agronomy and environmental science, he provides scientifically informed coverage of agricultural innovations and challenges. His reporting highlights the intersections between environmental sustainability, economic development, and traditional knowledge systems. Thomas has extensively documented community-led conservation initiatives and agricultural adaptation strategies in response to climate change across Africa.",
    expertise: ["Sustainable Agriculture", "Food Security", "Conservation", "Rural Development"],
    verified: true,
    location: "Nairobi, Kenya",
    joinedDate: "April 2019",
    storiesCount: 91,
    regionsOfFocus: ["Africa", "Global"],
    awards: ["Environmental Storytelling Award 2023", "Agricultural Journalism Prize 2021"]
  }
];
