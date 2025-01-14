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
let tobbEnemy = false;
let elsoHalott = false;

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

    document.getElementById("health").max = limitStamina;
    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;  //működik, jó adatokat ad
    
    const button = document.getElementById('generalas');
    button.remove();
    
}

function etkezes(){
    const elelmiszer = document.getElementById('elelmiszerek');
    const eleterő = document.getElementById('stamina');
    elelmiszerek = myData.Game.Character.Inventory.Food;
    const eves = document.createElement('button');
    eves.id = 'eves';
    eves.innerHTML = 'Evés';
    eves.addEventListener('click', () => {
        if(elelmiszerek>0){
            myData.Game.Character.Inventory.Food -= 1;
            elelmiszerek -= 1;
            myData.Game.Character.Stats.Stamina += 4;
            elelmiszer.innerText = elelmiszerek;
            eleterő.innerText = myData.Game.Character.Stats.Stamina;

            document.getElementById("health").value = myData.Game.Character.Stats.Stamina;

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
    ivas.id = 'ivas';
    ivas.innerHTML = 'Ivás';

    ivas.addEventListener('click', () => {
        if(potik>0){
            myData.Game.Character.Inventory.Potion.Uses -= 1;
            potik -= 1;
            italok.innerText = potik;
            const buttonSkill = document.createElement('button');
            const buttonStamina = document.createElement('button');
            const buttonLuck = document.createElement('button');
            buttonSkill.textContent = '<--';
            buttonStamina.textContent = '<--';
            buttonLuck.textContent = '<--';
            buttonSkill.addEventListener('click', () => {
                myData.Game.Character.Stats.Skill = limitSkill;
                document.getElementById("skill").innerText = myData.Game.Character.Stats.Skill;
                buttonLuck.remove();
                buttonStamina.remove();
            })
            buttonStamina.addEventListener('click', () => {
                myData.Game.Character.Stats.Stamina = limitStamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                
                buttonLuck.remove();
                buttonSkill.remove();
            })
            buttonLuck.addEventListener('click', () => {
                myData.Game.Character.Stats.Luck = limitLuck + 1;
                document.getElementById("luck").innerText = myData.Game.Character.Stats.Luck;
                buttonStamina.remove();
                buttonSkill.remove();
            })
            document.getElementById("skill").appendChild(buttonSkill);
            document.getElementById("stamina").appendChild(buttonStamina);
            document.getElementById("luck").appendChild(buttonLuck);
            
            potion();
        }    
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

/**
 * Simulates a battle scenario where the player attempts to flee from an enemy encounter.
 *
 * @param {string} id - The identifier of the node containing enemy details.
 *
 * The function retrieves the enemy data associated with the given node ID and performs a 
 * comparison of attack strength between the player and a fleeing enemy. If the player's attack 
 * is higher, the enemy's stamina is reduced. If the enemy's attack is higher, the player's 
 * stamina is reduced by the enemy's damage amount plus an additional 2 points. If the attacks 
 * are equal, the function recursively calls itself to simulate continuous combat until one 
 * side's stamina is depleted. The player's stamina is updated in the DOM after each encounter.
 */

function Harc(id){
    const node = kartyaKereses(id);
    const Enemies  = node.enemies?.enemy; 
    let myAttack = dobbas() + dobbas() + myData.Game.Character.Stats.Skill;
    if(tobbEnemy){
        if(node.KuzdesEgyesevel){
            if(!elsoHalott){
                let enemyAttack = dobbas() + dobbas() + Enemies[0].Skill;
                if (enemyAttack > myAttack) {
                    myData.Game.Character.Stats.Stamina += Enemies[0].sebzes;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                } else if (myAttack > enemyAttack) {
                    enemyStamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else if(myAttack == enemyAttack){
                    Harc(id);
                }
            }else{
                let enemyAttack = dobbas() + dobbas() + Powers[1].Skill;
                if (enemyAttack > myAttack) {
                    myData.Game.Character.Stats.Stamina += Enemies[1].sebzes;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                } else if (myAttack > enemyAttack) {
                    enemyStamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else if(myAttack == enemyAttack){
                    Harc(id);
                }
            }
        }
        else{
            let enemyAttack = dobbas() + dobbas() + Enemies[0].Skill;
            let enemyAttack2 = dobbas() + dobbas() + Enemies[1].Skill;
            if (enemyAttack > myAttack) {
                myData.Game.Character.Stats.Stamina += Enemies[0].sebzes;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
            } else if (myAttack > enemyAttack) {
                enemyStamina -= 2;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
            }
            else if(myAttack == enemyAttack){
                Harc(id);
            }
            if (enemyAttack2 > myAttack) {
                myData.Game.Character.Stats.Stamina += Enemies[1].sebzes;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
            } else if (myAttack2 > enemyAttack) {
                enemyStamina -= 2;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
            }
            else if(myAttack == enemyAttack){
                Harc(id);
            }
        }



    }else{

    }




    if (enemyAttack > myAttack) {
        myData.Game.Character.Stats.Stamina += fleeingEnemy.sebzes;
        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
    } else if (myAttack > enemyAttack) {
        enemyStamina -= 2;
        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
    }
    else if(myAttack == enemyAttack){
        Harc(id);
    }
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
                tobbEnemy = true;
            } else {
                enemyDiv.id = "enemy";
                enemyDiv.innerHTML = `<h2>${enemies.name}</h2><p>Ügyessége: ${enemies.skill}</p><p>Élet: ${enemies.stamina}</p><p id="tamadoero">Támadóerő:</p>`;
            }
            Harc(node._id);
            harc.appendChild(enemyDiv);
        }
        if (node.Dice) {
            
            if (node.Dice.mit == "szerencse") {
                const szerencseButton = document.createElement("button");
                let szerencseEredmeny = false;
                szerencseButton.innerText = "Ted próbára a szerencsédet";
                szerencseButton.className = "choiceButton";
                szerencseButton.addEventListener('click', () => {
                    szerencseEredmeny = szerencse();
                    console.log(szerencseEredmeny);
                    if (szerencseEredmeny) {
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[0].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                            kartya(node.Choices.Choice[0]._targetNode);
                    });
                        gombok.appendChild(rbutton); 
                    }
                    else{
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[1].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                            kartya(node.Choices.Choice[1]._targetNode);    
                    });
                        gombok.appendChild(rbutton);  
                    }
                    szerencseButton.remove();
                });
            
                gombok.appendChild(szerencseButton);
            }            
            
            if (node.Dice.mit == "Stamina") {
                const staminaButton = document.createElement("button");
                let staminaEredmeny = dobbas();
                staminaButton.innerText = "Ted próbára az életedet";
                staminaButton.className = "choiceButton";
                staminaButton.addEventListener('click', () => {
                console.log(staminaEredmeny);
                    if(node.Dice.pluszminusz == "minusz"){
                        myData.Game.Character.Stats.Stamina -= staminaEredmeny;
                        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    }
                    else{
                        myData.Game.Character.Stats.Stamina += staminaEredmeny;
                        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    }
                    const rbutton = document.createElement("button");
                    rbutton.innerText = node.Choices.Choice.__text;
                    rbutton.className = "choiceButton";
                    rbutton.addEventListener('click', () => {
                        const choiceButtons = document.querySelectorAll(".choiceButton");
                        choiceButtons.forEach(button => button.remove());
                        document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                        document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                        kartya(node.Choices.Choice._targetNode);
                });
                    gombok.appendChild(rbutton); 
                    staminaButton.remove();
                });
                gombok.appendChild(staminaButton);
            }

            if (node.Dice.mitNez == "ügyesség") {
                const ugyessegButton = document.createElement("button");
                let ugyessegEredmeny = dobbas() + dobbas();
                ugyessegButton.innerText = "Ted próbára a ügyeségedet";
                ugyessegButton.className = "choiceButton";
                ugyessegButton.addEventListener('click', () => {

                    console.log(ugyessegEredmeny);
                    if (ugyessegEredmeny > myData.Game.Character.Stats.Skill) {
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[0].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                            kartya(node.Choices.Choice[0]._targetNode);
                        
                    });
                        gombok.appendChild(rbutton); 
                    };
                    if(ugyessegEredmeny <= myData.Game.Character.Stats.Skill){
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[1].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                            kartya(node.Choices.Choice[1]._targetNode);
                    });
                    gombok.appendChild(rbutton);  
                    }
                    ugyessegButton.remove();
                });
            
                gombok.appendChild(ugyessegButton);
            }
            if (node.Dice.mitNez == "eredmény") {
                const erredmenyButton = document.createElement("button");
                
                let eredmenyEredmeny = dobbas();
                console.log(eredmenyEredmeny)
                erredmenyButton.innerText = "Ted próbára a ügyeségedet";
                erredmenyButton.className = "choiceButton";
                erredmenyButton.addEventListener('click', () => {
                    const rbutton = document.createElement("button");
                    rbutton.innerText = "próbálkozzás";
                    rbutton.className = "choiceButton";
                    rbutton.addEventListener('click', () => {
                    while (eredmenyEredmeny < 5 || myData.Game.Character.Stats.Stamina != 0) {
                           myData.Game.Character.Stats.Stamina += intParse(node.Dice.vesztesEletero);
                            document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                            document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                           eredmenyEredmeny += dobbas();
                           console.log(eredmenyEredmeny)
                    };
                        gombok.appendChild(rbutton);
                    });
                    
                    if(eredmenyEredmeny > 4 && myData.Game.Character.Stats.Stamina > 0){
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice.__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            document.querySelectorAll("#harc #enemy").forEach(element => element.remove());
                            kartya(node.Choices.Choice._targetNode);
                    });
                    gombok.appendChild(rbutton);  
                    }
                   
                });
            
                gombok.appendChild(erredmenyButton);
            }
        }

        if(node.gold){
            myData.Game.Character.Inventory.Gold = parseInt(myData.Game.Character.Inventory.Gold) + node.gold;
            document.getElementById("arany").innerText = myData.Game.Character.Inventory.Gold;
        }

        if(node.eletero){
            myData.Game.Character.Stats.Stamina = myData.Game.Character.Stats.Stamina + node.eletero;
            document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
            document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
        }

        if(node.szerencse){
            myData.Game.Character.Stats.Luck += node.szerencse;
            document.getElementById("luck").innerText = myData.Game.Character.Stats.Luck;
        }

        if(node.food){
            myData.Game.Character.Inventory.Food += node.food;
            document.getElementById("elelmiszerek").innerText = myData.Game.Character.Inventory.Food;
        }

        if(node.szerencseMin){
            limitLuck = node.szerencseMin;
        }

        if(node.szerencseVisszaallitPluszEgy){
            limitLuck += 1;
            myData.Game.Character.Stats.Luck = limitLuck;
        }

        if(node.tovabbiTamadoero){
            tamadoero += node.tovabbiTamadoero;
        }

        if (node.Choices && node.Choices.Choice && !node.Dice) {
            /*const gif = document.getElementById("gif");
            gif.src = "jofuto.gif";*/


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
        button.className = "ujrakezdes";
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
    generalasButton.className = "generalas";  //nem mükszik idk
    generalasButton.addEventListener('click', () => {
        generalas();
        
    });
    generalas();
    kartya(196);
    
});


