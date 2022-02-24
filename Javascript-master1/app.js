class Dino {
    constructor({ species, weight, height, diet, where, when, fact }) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
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
class Human {
    constructor(name, height, weight, diet) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.diet = diet;

    }

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
        
            if (tileCount === 4) {
                mainGrid.innerHTML += createTile(human);
                
            }
          
            mainGrid.innerHTML += createTile(dino);
            tileCount += 1;
        }
       
    });
    mainGrid.style.display = "flex";


});



// Creating Tiles
function createTile(tile) {
 
if (tile.species==="Pigeon"){
    const pigeon=document.createElement('p')
    const div=document.createElement('div')
    
  pigeon.innerText=`${tile.fact}`
  
  console.log(pigeon);
  div.appendChild(pigeon)

  mainGrid.appendChild(div);

}

    return (tile instanceof Dino && tile.species!=="Pigeon") ? `
    <div class="grid-item " style="background-color: #e2ebf0">
        <h3>${tile.species}</h3>
        <img src="/images/${tile.species.toLowerCase()}.png" alt="Dino1-image">
   
    <h2>${tile.where}</h2>
    <h2>${tile.when}</h2>
  
    
     
        </div>
    `
        :
        `<div class="grid-item " style="background-color: #e2ebf0">
        <h3>${tile.name}</h3>
        <img src="./images/human.png" alt="human-image">
    </div>
    `
 ;
 
 

}


const getFact = (content, human) => {      

    if (content instanceof Dino && content.species !== "Pigeon") {
        console.log(content);
        return "<p>" + all(content, human) + "</p>";
    }

    if (content instanceof Dino && content.species === "Pigeon") {
        return "<p>" + content.fact + "</p>";      
    }

    return "";
      
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
let compareWeight = (human, dino) => {
    const humanWeight=human.weight;
    const dinoWeight=dino.weight;
    if (human.weight > dino.weight) {
        const diffInWeight=humanWeight-dinoWeight;
       return `Human is  ${diffInWeight} lbs  Heavier!! than ${dino.species}`;
    } else if (human.weight === dino.weight) {
        return `${human.name} and ${dino.species} weigh the same !!`;
    } else {
        const diffInWeight=dinoWeight-humanWeight;
        return `${dino.species} is  ${diffInWeight} lbs  Heavier!! than ${human.name}`;
    }
};


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
let compareHeight = (human, dino) => {
    const humanHeight= human.height;
    const dinoHeight=dino.height;
    if (human.height > dino.height) {
        const diffInHeight=human.height-dinoHeight;
        return `Human is  ${diffInHeight} inches much Taller!! than ${dino.species}`
    } else if (human.height === dino.height) {
        return `${human.name} and ${dino.species} are the same height!!`;
    } else {
        const diffInHeight=dinoHeight-humanHeight;
        return `Human is  ${diffInHeight} inches less Taller!! than ${dino.species}`

    }
};


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
let compareDiet = (human, dino) => {
    if (human.diet === dino.diet) {
        return `${human.name} and ${dino.species} have the same diet !!`
    } else {
       return `${human.name} and ${dino.species} have different diet !!`
    }
};


let all=(human, dino)=>{
    compareHeight(human, dino);
    compareWeight(human, dino);
    compareDiet(human, dino)
}

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