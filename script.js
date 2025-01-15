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
let generalvaG = false;
let tamadoero = 0;

let tobbEnemy = false;
let elsoHalott = false;

let targyak = [];
let gyuruoButton;
let szoborButton;
let folyadekButton;
let aranykulcsButton;
let bronzkulcsButton;
let kopenyButton;


let nyert = false;


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

    document.getElementById("luckszerencse").max = limitLuck;
    document.getElementById("luckszerencse").value = myData.Game.Character.Stats.Luck;

    document.getElementById("skillugyesseg").max = limitSkill;
    document.getElementById("skillugyesseg").value = myData.Game.Character.Stats.Skill;
    
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
                document.getElementById("skillugyesseg").value = myData.Game.Character.Stats.Skill;
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
                document.getElementById("luckszerencse").value = myData.Game.Character.Stats.Luck;
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
                document.getElementById("luckszerencse").value = myData.Game.Character.Stats.Luck;
                return false;
            }
            if (dobas < myData.Game.Character.Stats.Luck) {
                myData.Game.Character.Stats.Luck -= 1;
                document.getElementById("luck").innerHTML = myData.Game.Character.Stats.Luck;
                document.getElementById("luckszerencse").value = myData.Game.Character.Stats.Luck;
                return true;
            } else {
                myData.Game.Character.Stats.Luck -= 1;
                document.getElementById("luckszerencse").value = myData.Game.Character.Stats.Luck;
                return szerencse();
            }
        }

    } catch (error) {
        console.error('Character stats are undefined');
        return false;
    }
    // generate the value of luck and add to the HTML
}


function dobbas() {
    let x = Math.floor(Math.random() * 6) + 1;
    return x
}

function kartyaKereses(id){
    return myData.Game.Nodes.Node.find(node => node._id == id);
}

function targyakGomb() {
    const hely = document.getElementById("targyak");
folyadekButton = document.createElement("button");
folyadekButton.className = "targyakgomb";
folyadekButton.disabled = true;
hely.appendChild(folyadekButton);

                kopenyButton = document.createElement("button");
                kopenyButton.className = "targyakgomb";
                kopenyButton.disabled = true;
                hely.appendChild(kopenyButton);

                gyuruoButton = document.createElement("button");
                gyuruoButton.className = "targyakgomb";
                gyuruoButton.disabled = true;
                hely.appendChild(gyuruoButton);

                bronzkulcsButton = document.createElement("button");
                bronzkulcsButton.className = "targyakgomb";
                bronzkulcsButton.disabled = true;
                hely.appendChild(bronzkulcsButton);

                aranykulcsButton = document.createElement("button");
                aranykulcsButton.className = "targyakgomb";
                aranykulcsButton.disabled = true;
                hely.appendChild(aranykulcsButton);

                szoborButton = document.createElement("button");
                szoborButton.className = "targyakgomb";
                szoborButton.disabled = true;
                hely.appendChild(szoborButton);

                generalvaG = true;
}

function kartya(id){

    if(!generalva){
        etkezes();
    }

    if(!generalvaP){
        potion();
    }

    if (!generalvaG) {
        targyakGomb();
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
    const korEredmeny = document.createElement('p');
    const korEredmenyHely = document.getElementById('harcgomb');
    korEredmenyHely.appendChild(korEredmeny);
    let kor = 0;

    const szerencseButton = document.createElement("button");
    szerencseButton.innerText = "Szerencse probálás";
    szerencseButton.classList.add("choiceButton");

    szerencseButton.addEventListener('click', () => {
        if(Array.isArray(node.enemies)){
            
            if(szerencse1 == false && szerencse2 == false){
                if(szerencse()){
                    myData.Game.Character.Stats.Stamina += 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else{
                    myData.Game.Character.Stats.Stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
            }
            else if(szerencse1 == true && szerencse2 == false){
                if(szerencse()){
                    myData.Game.Character.Stats.Stamina += 1;
                    enemies[0].stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else{
                    myData.Game.Character.Stats.Stamina -= 1;
                    enemies[0].stamina += 1;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
            }
            else if(szerencse1 == false && szerencse2 == true){
                if(szerencse()){
                    myData.Game.Character.Stats.Stamina += 1;
                    enemies[1].stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else{
                    myData.Game.Character.Stats.Stamina -= 1;
                    enemies[1].stamina += 1;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
            }
            else if(szerencse1 == true && szerencse2 == true){
                if(szerencse()){
                    myData.Game.Character.Stats.Stamina += 1;
                    enemies[0].stamina -= 2;
                    enemies[1].stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else{
                    myData.Game.Character.Stats.Stamina -= 1;
                    enemies[0].stamina += 1;
                    enemies[1].stamina += 1;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
            }
        }
        else{
            if(szerencse1 == false){
                if(szerencse()){
                myData.Game.Character.Stats.Stamina += 1;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else{
                myData.Game.Character.Stats.Stamina -= 1;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
            }
            else{
                if(szerencse()){
                    enemies.stamina -= 2;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
                else{
                enemies.stamina += 1;
                document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                }
            }
        }

    });








    if(!node.End){
        

        if (node.enemies) {
            const enemies = node.enemies?.enemy;
            const enemyDiv = document.createElement("div");
            const harcButton = document.createElement("button");
            harcButton.innerText = "Harc megkezdés";
            harcButton.classList.add("choiceButton");
            const tamadoero = document.getElementById("támadóerő");
            if (Array.isArray(enemies)) {
                let i = 0;
                enemies.forEach(enemy => {
                    i++;
                    enemyDiv.id = "enemy";
                    enemyDiv.innerHTML += `<h2>${enemy?.name}</h2><p>Ügyessége: ${enemy?.skill}</p><p">Élet: <spanid="enemyStamina${i}">${enemy?.stamina}</span></p><p id="tamadoero">Támadóerő:</p>`;
                });
                tobbEnemy = true;
            } else {
                enemyDiv.id = "enemy";
                enemyDiv.innerHTML = `<h2>${node.enemies.enemy.name}</h2><p>Ügyessége: ${node.enemies.enemy.skill}</p><p>Élet: <span id="enemyStamina">${node.enemies.enemy.stamina}</span></p><p id="tamadoero">Támadóerő:</p>`;
                tobbEnemy = false;
            }
            harc.appendChild(enemyDiv);
            let kor = 0;

            harcButton.addEventListener('click', () => {
            let myAttack = dobbas() + dobbas() + myData.Game.Character.Stats.Skill;
   
            let szerencse1 = false;
            let szerencse2 = false;


            tamadoero.innerText = myAttack + "\nKör: " + kor;

            const gif = document.getElementById("gif");
            gif.src = "joharcos.gif";

            
            if(tobbEnemy){
                if(node.kuzdesEgyesevel){
                    if(enemies[0].stamina > 0){
                        console.log(myData.Game.Character.Stats.Stamina, enemies[0].stamina);
                        let enemyAttack = dobbas() + dobbas() + enemies[0].skill;
                        enemyDiv.innerHTML = `<h2>${enemies[0].name}</h2><p>Ügyessége: ${enemies[0].skill}</p><p>Élet: <span id="enemyStamina">${enemies[0].stamina}</span></p><p id="tamadoero">Támadóerő: ${enemyAttack}</p>`;


                        if (enemyAttack > myAttack) {
                            myData.Game.Character.Stats.Stamina += enemies[0].sebzes;
                            document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                            document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;

                            szerencse1 = false;
                            korEredmeny.innerText = "Kör: Vesztett";
                            korEredmenyHely.appendChild(korEredmeny);
                        } else if (myAttack > enemyAttack) {
                            enemies[0].stamina -= 2;
                            korEredmeny.innerText = "Kör: Nyert";
                            korEredmenyHely.appendChild(korEredmeny);
                            szerencse1 = true;

                        }
                        else if(myAttack == enemyAttack){
                            harcButton.click();
                        }
                    }else if(enemies[1].stamina > 0 && enemies[0].stamina <= 0){
                        console.log(myData.Game.Character.Stats.Stamina, enemies[1].stamina);
                        let enemyAttack2 = dobbas() + dobbas() + enemies[1].skill;
                        enemyDiv.innerHTML = `<h2>${enemies[1].name}</h2><p>Ügyessége: ${enemies[1].skill}</p><p>Élet: <span id="enemyStamina">${enemies[1].stamina}</span></p><p id="tamadoero">Támadóerő: ${enemyAttack2}</p>`;

                        if (enemyAttack2 > myAttack) {
                            myData.Game.Character.Stats.Stamina += enemies[1].sebzes;
                            document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                            document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;

                            szerencse2 = false;
                            korEredmeny.innerText = "Kör: Vesztett";
                            korEredmenyHely.appendChild(korEredmeny);
                        } else if (myAttack > enemyAttack2) {
                            enemies[1].stamina -= 2;
                            korEredmeny.innerText = "Kör: Nyert";
                            korEredmenyHely.appendChild(korEredmeny);
                            szerencse2 = true;

                        }
                        else if(myAttack == enemyAttack2){
                            harcButton.click();
                        }
                    }
                    if(enemies[0].stamina <= 0 && enemies[1].stamina <= 0){
                        const nyertButton = document.createElement("button");
                        nyertButton.innerText = "Nyertél";
                        nyertButton.className = "choiceButton";
                        nyertButton.addEventListener('click', () => {
                            const rbutton = document.createElement("button");
                            rbutton.innerText = node.Choices.Choice[0].__text;
                            rbutton.className = "choiceButton";
                            rbutton.addEventListener('click', () => {
                                const choiceButtons = document.querySelectorAll(".choiceButton");
                                choiceButtons.forEach(button => button.remove());
                                document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                                kartya(node.Choices.Choice[0]._targetNode);
                            });
                            gombok.appendChild(rbutton);
                            nyertButton.remove();
                        });
                        harc.appendChild(nyertButton);
                        harcButton.remove();
                        tamadoero.innerText = '';
                        korEredmenyHely.innerText = '';
                    }
                }
                else{
                    let enemyAttack = dobbas() + dobbas() + enemies[0].skill;
                    enemyDiv.innerHTML = `<h2>${enemies[0].name}</h2><p>Ügyessége: ${enemies[0].skill}</p><p>Élet: <span id="enemyStamina">${enemies[0].stamina}</span></p><p id="tamadoero">Támadóerő: ${enemyAttack}</p>`;

                    let enemyAttack2 = dobbas() + dobbas() + enemies[1].skill;
                    enemyDiv.innerHTML = `<h2>${enemies[1].name}</h2><p>Ügyessége: ${enemies[1].skill}</p><p>Élet: <span id="enemyStamina">${enemies[1].stamina}</span></p><p id="tamadoero">Támadóerő: ${enemyAttack2}</p>`;

                    if (enemyAttack > myAttack && enemies[0].stamina > 0) {
                        myData.Game.Character.Stats.Stamina += enemies[0].sebzes;
                        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                        szerencse1 = false
                    }
                    if (myAttack > enemyAttack && enemies[0].stamina > 0) {
                        enemies[0].stamina -= 2;
                        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                        szerencse1 = true
                    }
                    if (enemyAttack2 > myAttack && enemies[1].stamina > 0) {
                        myData.Game.Character.Stats.Stamina += enemies[1].sebzes;
                        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                        szerencse2 = false
                    }
                    if (myAttack > enemyAttack2 && enemies[1].stamina > 0) {
                        console.log(enemies[1].stamina);
                        enemies[1].stamina -= 2;
                        document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                        document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                        szerencse2 = true
                    }
                    if(myAttack == enemyAttack || myAttack == enemyAttack2){
                        harcButton.click();
                    }
                    if(enemies[0].stamina <= 0 && enemies[1].stamina <= 0){
                        const nyertButton = document.createElement("button");
                        nyertButton.innerText = "nyertél";
                        nyertButton.className = "choiceButton";
                        nyertButton.addEventListener('click', () => {
                            const rbutton = document.createElement("button");
                            rbutton.innerText = node.Choices.Choice[0].__text;
                            rbutton.className = "choiceButton";
                            rbutton.addEventListener('click', () => {
                                const choiceButtons = document.querySelectorAll(".choiceButton");
                                choiceButtons.forEach(button => button.remove());
                                document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                                kartya(node.Choices.Choice[0]._targetNode);
                            });
                            gombok.appendChild(rbutton);
                            nyertButton.remove();
                        });
                        harc.appendChild(nyertButton);
                        harcButton.remove();
                    }
                
                if(enemies[0].menkeules || enemies[1].menekules){
                    myData.Game.Character.Stats.Stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                    const menekulesButton = document.createElement("button");
                    menekulesButton.innerText = "Menekülés";
                    menekulesButton.className = "choiceButton";
                    menekulesButton.addEventListener('click', () => {
                        const choiceButtons = document.querySelectorAll(".choiceButton");
                        choiceButtons.forEach(button => button.remove());
                        document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[0].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            kartya(node.Choices.Choice[1].__text);
                        });
                        gombok.appendChild(rbutton);
                    }); 
                    harc.appendChild(menekulesButton);
                    
                    harcButton.remove();
                }
                }
            }          
            else if(!tobbEnemy){
                let enemyAttack = dobbas() + dobbas() + enemies.skill;
                enemyDiv.innerHTML = `<h2>${node.enemies.enemy.name}</h2><p>Ügyessége: ${node.enemies.enemy.skill}</p><p>Élet: <span id="enemyStamina">${node.enemies.enemy.stamina}</span></p><p id="tamadoero">Támadóerő: ${enemyAttack}</p>`;

                if (enemyAttack > myAttack && enemies.stamina > 0) {
                    myData.Game.Character.Stats.Stamina += enemies.sebzes;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;

                    korEredmeny.innerText = "Kor: vesztett";
                    szerencse1 = false


                    korEredmeny.innerText = "Kör: Vesztett";
                    korEredmenyHely.appendChild(korEredmeny);

                }
                if (myAttack > enemyAttack && enemies.stamina > 0) {
                    enemies.stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;

                    szerencse1 = true


                    korEredmeny.innerText = "Kör: Nyert";
                    korEredmenyHely.appendChild(korEredmeny);

                    
                }
                if(myAttack == enemyAttack){
                    harcButton.click();
                }
                if(enemies.stamina <= 0){
                    const nyertButton = document.createElement("button");
                    nyertButton.innerText = "Nyertél";
                    nyertButton.className = "choiceButton";
                    nyertButton.addEventListener('click', () => {
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[0].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            kartya(node.Choices.Choice[0]._targetNode);
                        });
                        gombok.appendChild(rbutton);
                        nyertButton.remove();
                    });
                    harc.appendChild(nyertButton);
                    harcButton.remove();
                    tamadoero.innerText = '';
                    korEredmenyHely.innerText = '';
                }
                if(enemies.menkeules){
                    myData.Game.Character.Stats.Stamina -= 2;
                    document.getElementById("health").value = myData.Game.Character.Stats.Stamina;
                    document.getElementById("stamina").innerText = myData.Game.Character.Stats.Stamina;
                    const menekulesButton = document.createElement("button");
                    menekulesButton.innerText = "Menekülés";
                    menekulesButton.className = "choiceButton";
                    menekulesButton.addEventListener('click', () => {
                        const rbutton = document.createElement("button");
                        rbutton.innerText = node.Choices.Choice[1].__text;
                        rbutton.className = "choiceButton";
                        rbutton.addEventListener('click', () => {
                            const choiceButtons = document.querySelectorAll(".choiceButton");
                            choiceButtons.forEach(button => button.remove());
                            document.querySelectorAll("#kartya h2, #kartya p").forEach(element => element.remove());
                            kartya(node.Choices.Choice[1]._targetNode);
                        });
                        gombok.appendChild(rbutton);
                    });
                    harc.appendChild(menekulesButton);
                    harcButton.remove();
                }
            }
            
                
            
            
            harcButton.appendChild(szerencseButton);

            if(myData.Game.Character.Stats.Stamina <= 0){
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
            
            kor++;
            tamadoero.innerText = myAttack + "\nKör:" + kor;
            },
            document.getElementById("harc").appendChild(harcButton)
            


        )};
        const gif = document.getElementById("gif");
        gif.src = "jofuto.gif"; 
        
        
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
                    rbutton.innerText = "Próbálkozás";
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

        if(node.itemAdd) {
            

            if (node.itemAdd == "Folyadék") {

                folyadekButton.innerText = node.itemAdd;
                targyak.push(node.itemAdd);
            }

            else if (node.itemAdd == "Köpeny") { 
                
                kopenyButton.innerText = node.itemAdd;
                targyak.push(node.itemAdd);
            }

            else if (node.itemAdd == "Gyűrű") {
                
                targyak.push(node.itemAdd);
                gyuruoButton.innerText = node.itemAdd;

            }

            else if (node.itemAdd == "Bronzkulcs") {
                
                targyak.push(node.itemAdd);
                bronzkulcsButton.innerText = node.itemAdd;

            }

            else if (node.itemAdd == "Aranykulcs") {
                
                targyak.push(node.itemAdd);
                aranykulcsButton.innerText = node.itemAdd;

            }

            else if (node.itemAdd == "Szobor") {
                
                targyak.push(node.itemAdd);
                szoborButton.innerText = node.itemAdd;

            }
        }

        if(node.itemAdd1) {
            
            targyak.push(node.itemAdd1);
            folyadekButton.innerText = node.itemAdd1;

        }

        if(node.itemAdd2) {
            
            kopenyButton.innerText = node.itemAdd2;
            targyak.push(node.itemAdd2);
        }

        /*if (node.Choices.Choice[0]._requiresItem || node.Choices.Choice[1]._requiresItem) {
            if (targyak.includes(node.Choices.Choice[0]._requiresItem) && node.Choices.Choice[0]._requiresItem == "Gyűrű") {
                gyuruoButton.disabled = false;
            } else if (targyak.includes(node.Choices.Choice[0]._requiresItem) && node.Choices.Choice[0]._requiresItem == "Köpeny") {
                kopenyButton.disabled = false;
            } else if (targyak.includes(node.Choices.Choice[0]._requiresItem) && node.Choices.Choice[0]._requiresItem == "Bronzkulcs") {
                bronzkulcsButton.disabled = false;
            } else if (targyak.includes(node.Choices.Choice[0]._requiresItem) && node.Choices.Choice[0]._requiresItem == "Aranykulcs") {
                aranykulcsButton.disabled = false;
            } else if (targyak.includes(node.Choices.Choice[0]._requiresItem) && node.Choices.Choice[0]._requiresItem == "Szobor") {
                szoborButton.disabled = false;
            }
        
            if (targyak.includes(node.Choices.Choice[1]._requiresItem) && node.Choices.Choice[1]._requiresItem == "Folyadék") {
                folyadekButton.disabled = false;
            }  if (targyak.includes(node.Choices.Choice[1]._requiresItem) && node.Choices.Choice[1]._requiresItem == "Köpeny") {
                kopenyButton.disabled = false;
            }  if (targyak.includes(node.Choices.Choice[1]._requiresItem) && node.Choices.Choice[1]._requiresItem == "Szobor") {
                szoborButton.disabled = false;
            }
    
        }*/

        /*if (node.Choices.Choice[2]._requiresItem1) {
            if (targyak.includes(node.Choices.Choice[2]._requiresItem1) && node.Choices.Choice[2]._requiresItem1 == "Folyadék") {
                folyadekButton.disabled = false;
            }
        }*/
        
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

        if(node.ekko) {
            document.getElementById("ekkovek").innerText = node.ekko;
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

        if (node.Choices && node.Choices.Choice && !node.Dice && !node.enemies) {
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

                    if (targyak.includes(choice._requiresItem) && choice._requiresItem == "Gyűrű") {
                        gyuruoButton.disabled = false;
                    } else if (targyak.includes(choice._requiresItem) && choice._requiresItem == "Köpeny") {
                        kopenyButton.disabled = false;
                    } else if (targyak.includes(choice._requiresItem) && choice._requiresItem == "Bronzkulcs") {
                        bronzkulcsButton.disabled = false;
                    } else if (targyak.includes(choice._requiresItem) && choice._requiresItem == "Aranykulcs") {
                        aranykulcsButton.disabled = false;
                    } else if (targyak.includes(choice._requiresItem) && choice._requiresItem == "Szobor") {
                        szoborButton.disabled = false;
                    }
                    else if (targyak.includes(choice._requiresItem) && choice._requiresItem == "Folyadék") {
                        folyadekButton.disabled = false;
                    }

                    else if (!targyak.includes(choice._requiresItem)) {
                        choiceButton.disabled = true;
                    }
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
    generalasButton.className = "generalas"; 
    generalasButton.addEventListener('click', () => {
        generalas();
        
    });
    generalas();
    kartya(153);
    
});


