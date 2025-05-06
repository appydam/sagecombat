export interface GeoQuestQuestion {
  id: number;
  imageUrl: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Using placeholder images from picsum.photos for variety
export const mockGeoQuestQuestions: GeoQuestQuestion[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/seed/paris/600/400", // Placeholder for Eiffel Tower
    question: "Where is this iconic landmark located?",
    options: ["Paris, France", "Tokyo, Japan", "New York, USA", "Sydney, Australia"],
    correctAnswer: "Paris, France",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/seed/agra/600/400", // Placeholder for Taj Mahal
    question: "In which city can you find this mausoleum?",
    options: ["Agra, India", "Cairo, Egypt", "Rio de Janeiro, Brazil", "Moscow, Russia"],
    correctAnswer: "Agra, India",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/seed/arizona/600/400", // Placeholder for Grand Canyon
    question: "This natural wonder is located in which US state?",
    options: ["Arizona, USA", "Queensland, Australia", "Cape Town, South Africa", "Beijing, China"],
    correctAnswer: "Arizona, USA",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/seed/beijing/600/400", // Placeholder for Great Wall
    question: "Which country is home to this massive structure?",
    options: ["Beijing, China", "Rome, Italy", "Athens, Greece", "Mexico City, Mexico"],
    correctAnswer: "Beijing, China",
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/seed/peru/600/400", // Placeholder for Machu Picchu
    question: "This ancient citadel is found in which country?",
    options: ["Cusco, Peru", "Bangkok, Thailand", "Dubai, UAE", "London, UK"],
    correctAnswer: "Cusco, Peru",
  },
];
