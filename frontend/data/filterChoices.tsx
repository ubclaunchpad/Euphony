import { Choice } from "../types";
export const genreChoices: [Choice] = [ //TODO update
  {
    id: '1',
    label: 'Pop',
    imageUri: 'pop',
    isGenre: true,
  },
  {
    id: '2',
    label: "R&B",
    imageUri: 'r_and_b',
    isGenre: true,
  },
  {
    id: '3',
    label: "Indie",
    imageUri: 'indie',
    isGenre: true,
  },
  {
    id: '4',
    label: "Hip-Hop",
    imageUri: 'hiphop',
    isGenre: true,
  }
];

export const moodChoices: [Choice] = [
  {
    id: '1',
    label: 'Happy',
    imageTitle: '☺️'
  },
  {
    id: '2',
    label: "Melancholic",
    imageTitle: '😞'
  },
  {
    id: '3',
    label: "Lonely",
    imageTitle: '😔'
  },
  {
    id: '4',
    label: "Angry",
    imageTitle: '😡'
  },
  {
    id: '5',
    label: "Compassionate",
    imageTitle: '🥰'
  }
];

export const activityChoices: [Choice] = [
  {
    id: '1',
    label: "Shower",
    imageUri: 'chill'
  },
  {
    id: '2',
    label: "Gym",
    imageUri: 'gym'
  },
  {
    id: '3',
    label: "Study",
    imageUri: 'study'
  },
  {
    id: '4',
    label: "Party",
    imageUri: 'party'
  },
  {
    id: '5',
    label: "Bed",
    imageUri: 'bed'
  }
];
export const weatherChoices: [Choice] = [
  {
    id: '1',
    label: "Current Weather"
  },
  {
    id: '2',
    label: "Rainy"
  },
  {
    id: '3',
    label: "Sunny"
  },
  {
    id: '4',
    label: "Stormy"
  }
];