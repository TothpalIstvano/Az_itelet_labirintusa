async function fetchData() {
    try {
        const response = await fetch('tartalom.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error('Nem okés a JSON');
        }
        const data = await response.json(); // Parse the JSON data
        console.log(data); // Now 'data' is a JavaScript object
        return data; // Return the data if needed
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
let limitSkill 
let limitStamina
let limitLuck
let arany
let ekkovek
let italok
let elelmiszerek
let generalva = false;
let generalvaP = false;
let tamadoero = 0;
function targyakPoweredByKovacsEdit(item){
    let itemValue = myData.Game.Character.Inventory[item];
    document.getElementById("targyak").innerHTML += itemValue;// Add the items value to the HTML element
}

function marValtozoDologPoweredByKovacsEdit(){
    const gomb =  document.createElement("button");
    arany = myData.Game.Character.Inventory.Gold;
    ekkovek = myData.Game.Character.Inventory.Ekkovek;
    italok = myData.Game.Character.Inventory.Potion.Uses;
    elelmiszerek = myData.Game.Character.Inventory.Food;
    document.getElementById("arany").innerHTML = arany;// Add the gold value to the HTML element
    if( ekkovek != null)// Checks if there is any ekkő
    {
        document.getElementById("ekkovek").innerHTML = ekkovek;// Add the ekkovek value to the HTML}
    }
    if( italok != null)// Checks if there is any potion
    {
        document.getElementById("italok").innerHTML = italok;// Add the italok value to the HTML
    }
    document.getElementById("elelmiszerek").innerHTML = elelmiszerek;// Add the food value to the HTML
}

function generalas()
{
    limitSkill = Math.floor(Math.random() * 6) + 1 + 6;
    limitStamina = Math.floor(Math.random() * 12) + 1 + 12;
    limitLuck = Math.floor(Math.random() * 6) + 1 + 6;
    myData.Game.Character.Stats.Skill = limitSkill;
    myData.Game.Character.Stats.Stamina = limitStamina;
    myData.Game.Character.Stats.Luck = limitLuck;
    document.getElementById("skill").innerHTML = myData.Game.Character.Stats.Skill;// generate the value of skill and add to the HTML
    document.getElementById("stamina").innerHTML = myData.Game.Character.Stats.Stamina;// generate the value of stamina and add to the HTML
    document.getElementById("luck").innerHTML = myData.Game.Character.Stats.Luck;// generate the value of luck and add to the HTML
    const button = document.getElementById('generalas');
    button.remove();
    
}

function etkezes(){
    const elelmiszer = document.getElementById('elelmiszerek');
    elelmiszerek = myData.Game.Character.Inventory.Food;
    const eves = document.createElement('button');
    eves.innerHTML = 'Eves';
    eves.addEventListener('click', () => {
        if(elelmiszerek>0){
            myData.Game.Character.Inventory.Food -= 1;
            elelmiszerek -= 1;
            elelmiszer.innerText = elelmiszerek;
            etkezes();
            
        } 
        
    })
     elelmiszer.appendChild(eves);
     generalva = true;
}

function potion(){
    const italok = document.getElementById('italok');
    potik = myData.Game.Character.Inventory.Potion.Uses;
    const ivas = document.createElement('button');
    ivas.innerHTML = 'ivas';
    ivas.addEventListener('click', () => {
        if(potik>0){
            myData.Game.Character.Inventory.Potion.Uses -= 1;
            potik -= 1;
            italok.innerText = potik;
            const buttonSkill = document.createElement('button');
            const buttonStamina = document.createElement('button');
            const buttonLuck = document.createElement('button');
            document.getElementById("skill").appendChild(buttonSkill);
            document.getElementById("stamina").appendChild(buttonStamina);
            document.getElementById("luck").appendChild(buttonLuck);
            ivas.style.visibility = "hidden"
            
            
        } 
        potion();
    })
     italok.appendChild(ivas);
     generalvaP = true;
}








function szerencse() {
    try {
        if (myData?.Game?.Character?.Stats) {
            let dobas = dobbas() + dobbas();
            if (dobas > myData.Game.Character.Stats.Luck) {
                myData.Game.Character.Stats.Luck -= 1;
                document.getElementById("luck").innerHTML = myData.Game.Character.Stats.Luck;
                return false;
            }
            if (dobas < myData.Game.Character.Stats.Luck) {
                myData.Game.Character.Stats.Luck -= 1;
                document.getElementById("luck").innerHTML = myData.Game.Character.Stats.Luck;
                return true;
            } else {
                myData.Game.Character.Stats.Luck -= 1;
                return szerencse();
            }
        }
               
    } catch (error) {
        console.error('Character stats are undefined');
        return false;
    }
    // generate the value of luck and add to the HTML
}

function harc(id){
    const node = kartyaKereses(id);
    const enemies = node.enemies?.enemy;
    let f = true;
    let menekules = enemies.menekules;
    if (menekules) {
        let szorny = dobbas() + dobbas() + myData.Game.Character.Stats.Skill;
        document.getElementById("tamadoero").innerHTML += szorny;
        let te = dobbas() + dobbas() + enemies.skill;
        if (szorny > te) {
            myData.Character.Stats.Stamina -= enemies.sebzes;
        }
        if(te>szorny){
            enemies.stamina -= myData.Character.Stats.Stamina;
        }
    }

    let nyert = false;
    const harcgomb = document.getElementById("harcgomb");
    const button = document.createElement("button");
    button.innerText = "harc folytatása";
    button.addEventListener("click", () => {
        f = true;
    });
    while (f) {
        let szorny = dobbas() + dobbas() + enemies.skill;
        document.getElementById("tamadoero").innerHTML ="Támadóerő: "+szorny;
        let te = dobbas() + dobbas() + myData.Game.Character.Stats.Skill + tamadoero;
        if (szorny > te) {
            myData.Character.Stats.Stamina -= enemies.sebzes;
        }
        if(te>szorny){
            enemies.stamina -= myData.Character.Stats.Stamina;
        }
        if (myData.Character.Stats.Stamina <= 0) {
            f = false;
            nyert = true;
        }
        if (enemies.stamina <= 0) {
            f = false;
        }
    }
    harcgomb.appendChild(button);
}

function dobbas() {
    let x = Math.floor(Math.random() * 6) + 1;
    return x
}

function kartyaKereses(id){
    return myData.Game.Nodes.Node.find(node => node._id == id);
}

function kartya(id){

    if(!generalva){
        etkezes();
    }

    if(!generalvaP){
        potion();
    }
    const node = kartyaKereses(id);
    const kartya1 = document.getElementById("kartyak");
    const harc = document.getElementById("harc");
    const div = document.createElement("div");
    const gombok = document.getElementById("gombok");
    const button = document.createElement("button");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    h2.innerText = node._id;
    p.innerText = node.Description;
    div.appendChild(h2);
    div.appendChild(p);
    div.id = "kartya";
    kartya1.appendChild(div);
    if(!node.End){
        
        if (node.enemies) {
            const enemies = node.enemies?.enemy;
            const enemyDiv = document.createElement("div");

            if (Array.isArray(enemies)) {
                enemies.forEach(enemy => {
                    enemyDiv.id = "enemy";
                    enemyDiv.innerHTML += `<h2>${enemy?.name}</h2><p>Ügyessége: ${enemy?.skill}</p><p>Élet: ${enemy?.stamina}</p><p id="tamadoero">Támadóerő:</p>`;
                });
            } else {
                enemyDiv.id = "enemy";
                enemyDiv.innerHTML = `<h2>${enemies.name}</h2><p>Ügyessége: ${enemies.skill}</p><p>Élet: ${enemies.stamina}</p><p id="tamadoero">Támadóerő:</p>`;
            }
            harc.appendChild(enemyDiv);
        }

        if (node.Choices && node.Choices.Choice) {
            const choices = Array.isArray(node.Choices.Choice) ? node.Choices.Choice : [node.Choices.Choice];
            choices.forEach(choice => {
                if(choice.__text != ""){
                const choiceButton = document.createElement("button");
                choiceButton.innerText = choice.__text;
                choiceButton.className = "choiceButton";
                choiceButton.addEventListener('click', () => {
                    const choiceButtons = document.querySelectorAll(".choiceButton");
                    choiceButtons.forEach(button => button.remove());
                    document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                    document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                    kartya(choice._targetNode);
                });
                gombok.appendChild(choiceButton);
            }
            });
        }
    }
    else
    {
        button.innerText = "Újrakezdés";
        button.addEventListener('click', () => {
            fetchData().then(data => {
                myData = data;
                marValtozoDologPoweredByKovacsEdit();
                const generalasButton = document.getElementById('generalas');
                generalasButton.addEventListener('click', () => {
                    generalas();
                    button.remove();
                });
                kartya(1);
                button.remove();
            })
        });
        gombok.appendChild(button);
        
    }
}



// Call the fetchData function and store the result in a variable
let myData;
fetchData().then(data => {
    myData = data; // Store the fetched data in the variable
    marValtozoDologPoweredByKovacsEdit();
    const generalasButton = document.getElementById('generalas');
    generalasButton.addEventListener('click', () => {
        generalas();
    });
    kartya(1);
    
});


