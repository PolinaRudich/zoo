import { Animal, AnimalType, Biom, Enclosure } from "./interface";

const tropic: Biom = { name: "Тропики" };
const forest: Biom = { name: "Лес" };
const desert: Biom = { name: "Пустыня" };
const savanna: Biom = { name: "Саванна" };

const giraffeType: AnimalType = {
  name: "Жираф",
  requiredBiom: savanna,
  needsWater: true,
  areaPerIndividual: 7,
  food: "Листья",
  isPredator: false,
};

const lionType: AnimalType = {
  name: "Лев",
  requiredBiom: savanna,
  needsWater: true,
  areaPerIndividual: 50,
  food: "Мясо",
  isPredator: true,
};

const zebraType: AnimalType = {
  name: "Зебра",
  requiredBiom: savanna,
  needsWater: true,
  areaPerIndividual: 20,
  food: "Трава",
  isPredator: false,
};

export const animals: Animal[] = [
  {
    type: giraffeType,
    name: "Олег",
    foodCount: 10,
  },
  {
    type: zebraType,
    name: "Зоя",
    foodCount: 5,
  },
  {
    type: lionType,
    name: "Лео",
    foodCount: 20,
  },
];

export  const enclosures: Enclosure[] = [
  {
    biom: savanna,
    area: 100,
    hasWater: true,
    animals: [],
  },
  {
    biom: forest,
    area: 300,
    hasWater: true,
    animals: [],
  },
];