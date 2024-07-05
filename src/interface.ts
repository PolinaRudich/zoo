import { animals, enclosures } from "./data";

// биом
export interface Biom {
  name: string;
}

// вольеры
export interface Enclosure {
  biom: Biom;
  area: number;
  hasWater: boolean;
  animals: Animal[];
}

// вид животного
export interface AnimalType {
  name: string;
  requiredBiom: Biom;
  needsWater: boolean;
  areaPerIndividual: number;
  food: string;
  isPredator: boolean;
}

// описание животного
export interface Animal {
  type: AnimalType;
  name: string;
  foodCount: number;
}

// подселенческие ответики
export interface adoptedAnimalResponse {
    result: boolean,
    message: string,
    err?: Array<adoptedAnimalResponse>
}
