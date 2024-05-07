// const adventurer = {
//     name: "Robin",
//     health: 10,
//     inventory: ["sword", "potion", "artifact"],
//     companion: {
//         name: "Leo",
//         type: "Cat"
//     }
//     }

// adventurer.companion.companion = {
//     name: 'Frank',
//     type: 'Flea',
//     inventory: ['small hat', 'sunglasses']
// }

// adventure.inventory.forEach((item) => {
//   console.log(item)
// })

// adventurer.roll = function (mod = 0) {
//     const result = Math.floor(Math.random() * 20) + 1 + mod;
//     console.log(`${this.name} rolled a ${result}.`)
//     }
// console.log(adventurer);
// adventurer.roll()

class Character {
    static maxHealth = 100 // статическое свойство привяззонное к классу
    constructor(name){ // метод позволяющий добалять полям объекта переданные данные при его создании из класса
        this.name = name 
        this.health = 100
        this.inventory = []
    }

    roll(mod = 0){ //  метод объекта
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
}


// const robin = new Character('Robin')
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

// console.log(robin)
// robin.roll()
// extends - оператор отвечающий за наследование
// Adventurer наследуется от Character
class Adventurer extends Character {
    static roles = ['Fighter', 'Healer', 'Wizard']
    constructor (name, role) {
      super(name); // позволяет наследовать свойства от класса (родителя)
      // Adventurers have specialized roles.
      if(Adventurer.roles.includes(role)){
          this.role = role;
      }
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins", 'long bow');
    }
    // Adventurers have the ability to scout ahead of them.
    scout () {
      console.log(`${this.name} is scouting ahead...`);
      super.roll(); // вызываем унаследованный метод
    }

    detection() {
        console.log(`${this.name} is detected 5 gold coins`)
        super.roll()
    }

    duel(adventure){
        console.log(`${this.name} and ${adventure.name} begining duel...`)
        this.roll() // вызываем унаследованный метод объекта вызова
        adventure.roll() // вызываем унаследованный метод переданного объекта
    }
  }


  const Alex = new Adventurer('Alex', 'Healer')



  class AdventurerFactory {  
    constructor (role) {
      this.role = role;
      this.adventurers = [];
    }
    generate (name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
    }
    findByIndex (index) {
      return this.adventurers[index];
    }
    findByName (name) {
      return this.adventurers.find((a) => a.name === name);
    }
  }
  
  const healers = new AdventurerFactory("Healer");
  const robin = healers.generate("Robin");

  Alex.duel(healers.findByIndex(0)) // вызов метода