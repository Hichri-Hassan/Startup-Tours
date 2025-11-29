const questions = [
  {
    id: 1,
    text: "Si tu pouvais voyager n'importe où demain, où irais-tu ?",
    category: "fun",
  },
  {
    id: 2,
    text: "Quelle est la chose la plus folle que tu aies jamais faite ?",
    category: "fun",
  },
  {
    id: 3,
    text: "Si tu avais un super-pouvoir, ce serait lequel ?",
    category: "fun",
  },
  {
    id: 4,
    text: "Quel est ton film préféré et pourquoi ?",
    category: "chill",
  },
  {
    id: 5,
    text: "Pizza ou Burger ? Défends ton choix !",
    category: "fun",
  },
  {
    id: 6,
    text: "Quelle est ta plus grande peur ?",
    category: "deep",
  },
  {
    id: 7,
    text: "Si tu pouvais dîner avec une personne (vivante ou morte), qui choisirais-tu ?",
    category: "deep",
  },
  {
    id: 8,
    text: "Quel est ton meilleur souvenir d'enfance ?",
    category: "chill",
  },
  {
    id: 9,
    text: "Si tu gagnais au loto demain, que ferais-tu en premier ?",
    category: "fun",
  },
  {
    id: 10,
    text: "Chiens ou chats ? Pourquoi ?",
    category: "chill",
  },
  {
    id: 11,
    text: "Quelle est ta série préférée du moment ?",
    category: "chill",
  },
  {
    id: 12,
    text: "Si tu devais décrire ta vie en un mot, ce serait quoi ?",
    category: "deep",
  },
  {
    id: 13,
    text: "Quelle est la qualité que tu apprécies le plus chez quelqu'un ?",
    category: "deep",
  },
  {
    id: 14,
    text: "Quel est ton talent caché ?",
    category: "fun",
  },
  {
    id: 15,
    text: "Si tu pouvais changer une chose dans le monde, ce serait quoi ?",
    category: "deep",
  },
  {
    id: 16,
    text: "Quelle est ta chanson du moment ?",
    category: "chill",
  },
  {
    id: 17,
    text: "Montagne ou plage pour les vacances ?",
    category: "chill",
  },
  {
    id: 18,
    text: "Quel est ton rêve le plus fou ?",
    category: "deep",
  },
  {
    id: 19,
    text: "Si tu devais vivre dans une autre époque, laquelle choisirais-tu ?",
    category: "fun",
  },
  {
    id: 20,
    text: "Quelle est la chose la plus importante pour toi dans la vie ?",
    category: "deep",
  },
  {
    id: 21,
    text: "Café ou thé ? Comment le prends-tu ?",
    category: "chill",
  },
  {
    id: 22,
    text: "Quel est ton plus grand accomplissement ?",
    category: "deep",
  },
  {
    id: 23,
    text: "Si tu pouvais apprendre une nouvelle compétence instantanément, laquelle ?",
    category: "fun",
  },
  {
    id: 24,
    text: "Quelle est ta destination de voyage préférée ?",
    category: "chill",
  },
  {
    id: 25,
    text: "Quel conseil donnerais-tu à ton moi de 18 ans ?",
    category: "deep",
  },
  {
    id: 26,
    text: "Plutôt soirée calme à la maison ou sortie en ville ?",
    category: "chill",
  },
  {
    id: 27,
    text: "Si tu pouvais être célèbre, ce serait pour quoi ?",
    category: "fun",
  },
  {
    id: 28,
    text: "Quelle est ta passion secrète ?",
    category: "deep",
  },
  {
    id: 29,
    text: "Quel est ton plat préféré ?",
    category: "chill",
  },
  {
    id: 30,
    text: "Si tu devais choisir un animal qui te représente, ce serait lequel ?",
    category: "fun",
  },
];

// Fonction pour obtenir une question aléatoire
export const getRandomQuestion = (excludeIds = []) => {
  const availableQuestions = questions.filter(q => !excludeIds.includes(q.id));
  if (availableQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};

// Fonction pour obtenir une question par catégorie
export const getRandomQuestionByCategory = (category, excludeIds = []) => {
  const categoryQuestions = questions.filter(
    q => q.category === category && !excludeIds.includes(q.id)
  );
  if (categoryQuestions.length === 0) return getRandomQuestion(excludeIds);
  
  const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
  return categoryQuestions[randomIndex];
};

export default questions;
