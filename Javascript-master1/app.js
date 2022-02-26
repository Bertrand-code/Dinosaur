class Dino {
    constructor({ species, weight, height, diet, where, when, fact }) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.displayFact = "";
        this.image = "";
    }
}
// Create Dino Objects
async function readJSONData() {
    return await fetch("dino.json")
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            const dinoArray = [];
            for (data of jsonData.Dinos) {
                dinoArray.push(new Dino(data));
            }
            return dinoArray;
        });
}
const dinos = readJSONData();
// Create Human Object
class Human{
    constructor(name, height, weight, diet) {
        this.name= name;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
    }
    
}

const name = document.getElementById("name").value;
const feetHeight = Number(document.getElementById("feet").value);
const inchesHeight = Number(document.getElementById("inches").value);
const weight = Number(document.getElementById("weight").value);
const diet = document.getElementById("diet").value;
const height = (feetHeight * 12) + inchesHeight;
const human = (function (name, height, weight, diet) {
    return new Human(name, height, weight, diet);
})(name, height, weight, diet);


function shuffleDinoFacts(dino) {
    (dino.species === 'Pigeon') ? dino.displayFact = dino.fact : (Math.random() > 0.8 ) ? dino.displayFact = dino.where : (Math.random() > 0.8 ) ? dino.displayFact = dino.when : (Math.random() > 0.8 ) ? dino.displayFact = compareWeight(human, dino) : (Math.random() > 0.8 ) ? dino.displayFact = compareHeight(human, dino) : dino.displayFact = compareDiet(human, dino);
}
const mainGrid = document.getElementById("grid");
// Use IIFE to get human data from form
const compareBtn = document.getElementById("btn");
compareBtn.addEventListener("click", () => {
     // Remove form from screen
    const form = document.getElementById("dino-compare");
    form.style.display = "none";
    const name = document.getElementById("name").value;
const feetHeight = Number(document.getElementById("feet").value);
const inchesHeight = Number(document.getElementById("inches").value);
const weight = Number(document.getElementById("weight").value);
const diet = document.getElementById("diet").value;
const height = (feetHeight * 12) + inchesHeight;
const human = (function (name, height, weight, diet) {
    return new Human(name, height, weight, diet);
})(name, height, weight, diet);
    let tileCount = 0;
    dinos.then(dinosData => {
        for (const dino of dinosData) {
            shuffleDinoFacts(dino);
            if (tileCount === 4) {
                mainGrid.innerHTML += createTile(human, human);
            }
            mainGrid.innerHTML += createTile(dino, human);
            tileCount += 1;
        }
    });
    mainGrid.style.display = "flex";
});
// Creating Tiles
function createTile(tile, human) {
    return (tile instanceof Dino) ? `
    <div class="grid-item " >
        <h3>${tile.species}</h3>
        <img src="/images/${tile.species.toLowerCase()}.png" alt="Dino1-image">
        <h2>${tile.displayFact}</h2>
        </div>
    `
        :
        `<div class="grid-item ">
        <h3>${human.name}</h3>
        <img src="./images/human.png" alt="human-image">
    </div>
    `
 ;
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
let compareWeight = (human, dino) => {
    const humanWeight=human.weight;
    const dinoWeight=dino.weight;
    if (human.weight > dino.weight) {
        const diffInWeight=humanWeight-dinoWeight;
       return `You are  ${diffInWeight} lbs  Heavier!! than ${dino.species}`;
    } else if (human.weight === dino.weight) {
        return `You and ${dino.species} weigh the same !!`;
    } else {
        const diffInWeight=dinoWeight-humanWeight;
        return `${dino.species} is  ${diffInWeight} lbs  Heavier!! than You`;
    }
};
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
let compareHeight = (human, dino) => {
    const humanHeight= human.height;
    const dinoHeight=dino.height;
    if (human.height > dino.height) {
        const diffInHeight=human.height-dinoHeight;
        return `You are ${diffInHeight} inches much Taller!! than ${dino.species}`
    } else if (human.height === dino.height) {
        return `You and ${dino.species} are the same height!!`;
    } else {
        const diffInHeight=dinoHeight-humanHeight;
        return `You are  ${diffInHeight} inches less Taller!! than ${dino.species}`
    }
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
let compareDiet = (human, dino) => {
    if (human.diet === dino.diet) {
        return `You  and ${dino.species} have the same diet !!`
    } else {
       return `You and ${dino.species} have different diet !!`
    }
};

/*
_____________
| 1 | 2 | 3 |
-------------
| 4 | H | 6 |
-------------
| 7 | 8 | 9 |
_____________
*/
        // Add tiles to DOM
// On button click, prepare and display infographic
