const challenges = [
  {
    id: 1,
    text: "Imite un animal au choix pendant 30 secondes",
    difficulty: "easy",
  },
  {
    id: 2,
    text: "Raconte une blague (et fais rire le groupe !)",
    difficulty: "easy",
  },
  {
    id: 3,
    text: "Fais 10 pompes",
    difficulty: "medium",
  },
  {
    id: 4,
    text: "Partage un secret que personne ne connaît",
    difficulty: "hard",
  },
  {
    id: 5,
    text: "Danse sur une chanson choisie par le groupe",
    difficulty: "medium",
  },
  {
    id: 6,
    text: "Parle avec un accent étranger pendant 2 minutes",
    difficulty: "medium",
  },
  {
    id: 7,
    text: "Complimente chaque personne du groupe",
    difficulty: "easy",
  },
  {
    id: 8,
    text: "Fais le poirier pendant 10 secondes",
    difficulty: "hard",
  },
  {
    id: 9,
    text: "Chante le refrain de ta chanson préférée",
    difficulty: "medium",
  },
  {
    id: 10,
    text: "Raconte ton pire date/rencard",
    difficulty: "medium",
  },
  {
    id: 11,
    text: "Fais un compliment sincère à la personne à ta gauche",
    difficulty: "easy",
  },
  {
    id: 12,
    text: "Mime un film et fais deviner le groupe",
    difficulty: "medium",
  },
  {
    id: 13,
    text: "Partage un moment embarrassant de ton passé",
    difficulty: "hard",
  },
  {
    id: 14,
    text: "Fais 20 jumping jacks",
    difficulty: "easy",
  },
  {
    id: 15,
    text: "Invente une histoire sur comment tu as rencontré quelqu'un du groupe",
    difficulty: "medium",
  },
  {
    id: 16,
    text: "Montre ta photo la plus gênante sur ton téléphone",
    difficulty: "hard",
  },
  {
    id: 17,
    text: "Fais ton meilleur cri de guerre",
    difficulty: "easy",
  },
  {
    id: 18,
    text: "Parle pendant 1 minute sans dire 'euh' ou 'donc'",
    difficulty: "medium",
  },
  {
    id: 19,
    text: "Échange un vêtement avec quelqu'un du groupe",
    difficulty: "hard",
  },
  {
    id: 20,
    text: "Fais la planche pendant 30 secondes",
    difficulty: "medium",
  },
  {
    id: 21,
    text: "Prends un selfie de groupe en faisant une grimace",
    difficulty: "easy",
  },
  {
    id: 22,
    text: "Imite une célébrité et fais deviner qui c'est",
    difficulty: "medium",
  },
  {
    id: 23,
    text: "Partage ton crush actuel (si tu en as un)",
    difficulty: "hard",
  },
  {
    id: 24,
    text: "Fais un battle de danse avec quelqu'un du groupe",
    difficulty: "medium",
  },
  {
    id: 25,
    text: "Raconte ton rêve le plus bizarre",
    difficulty: "easy",
  },
];

// Fonction pour obtenir un défi aléatoire
export const getRandomChallenge = (excludeIds = []) => {
  const availableChallenges = challenges.filter(c => !excludeIds.includes(c.id));
  if (availableChallenges.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableChallenges.length);
  return availableChallenges[randomIndex];
};

// Fonction pour obtenir un défi par difficulté
export const getRandomChallengeByDifficulty = (difficulty, excludeIds = []) => {
  const difficultyChallenges = challenges.filter(
    c => c.difficulty === difficulty && !excludeIds.includes(c.id)
  );
  if (difficultyChallenges.length === 0) return getRandomChallenge(excludeIds);
  
  const randomIndex = Math.floor(Math.random() * difficultyChallenges.length);
  return difficultyChallenges[randomIndex];
};

// Fonction pour déterminer si un défi doit apparaître (50% de chance)
export const shouldShowChallenge = () => {
  return Math.random() > 0.5;
};

export default challenges;
