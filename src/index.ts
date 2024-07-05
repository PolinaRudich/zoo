import { animals, enclosures } from "./data"
import { Animal , adoptedAnimalResponse, Enclosure, } from "./interface"

// Функция проверки возможности заселения
const canAnimalBeAdopted = (animal: Animal, enclosure: Enclosure): adoptedAnimalResponse => {
    const response: adoptedAnimalResponse[] = []
    const isSuitableBiom: boolean = animal.type.requiredBiom === enclosure.biom
    const isSuitableWater: boolean = animal.type.needsWater === enclosure.hasWater
    const isEnoughArea: boolean = enclosure.area >= animal.type.areaPerIndividual + enclosure.animals.reduce((acc, a) => acc + a.type.areaPerIndividual, 0)
    const isSuitableNeibourhoods: boolean = enclosure.animals.length === 0 ? true : animal.type.isPredator ? enclosure.animals.some((a) => a.type.isPredator) : enclosure.animals.some((a) => !a.type.isPredator)
    if (!isSuitableBiom) {
        response.push({result: false, message: `Биом не соответствует: ${animal.type.name} нуждается в ${animal.type.requiredBiom.name}, а вольер - ${enclosure.biom.name}`})
    }
    if (!isSuitableWater) {
        response.push({result: false, message: `Водоем не соответствует: ${animal.type.name} нуждается в ${animal.type.needsWater ? "воде" : "отсутствии воды"}, а вольер - ${enclosure.hasWater ? "с водой" : "без воды"}`})
    }
    if (!isEnoughArea) {
        response.push({result: false, message: `Недостаточно места для ${animal.type.name}`})
    }
    if (!isSuitableNeibourhoods) {
         response.push({result: false, message: `${animal.type.name} не подселен/a. Животные могут жить только с представителями своего вида, а  в вольере уже живут  ${animal.type.isPredator ? 'травоядные' : 'хищники'}`})
    }
    return response.length > 0 ? {result: false,  message: 'Животное успешно не подселено',  err: response} : {result: true, message: 'Животное успешно подселено'}
}

// Функция заселения/удаления

function settleAnimal(animal: Animal, enclosure: Enclosure): void {
  const {result, err} = canAnimalBeAdopted(animal, enclosure);
  if (!result && err) {
    const msg = `${err.map((errMsg: adoptedAnimalResponse) => {return `\n ${errMsg.message}`})}`
    console.log(msg)
    return;
  }

  if (enclosure.animals.includes(animal)) {
    enclosure.animals = enclosure.animals.filter((a) => a !== animal);
    console.log(`${animal.name} удален из вольера`);
  } else {
    enclosure.animals.push(animal);
    console.log(`${animal.name} добавлен в вольер`);
  }
}

// Функция подсчета еды

function calculateFoodNeeded(): number {
  return enclosures.reduce((acc: any, enclosure: Enclosure) => acc + enclosure.animals.reduce((acc_, animal) => acc_ + animal.foodCount, 0), 0);
}

settleAnimal(animals[1], enclosures[0]);
// settleAnimal(animals[1], enclosures[0]);
settleAnimal(animals[0], enclosures[0]);

console.log("количество еды:", calculateFoodNeeded());