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


function targyakPoweredByKovacsEdit(item){
    let itemValue = myData.Game.Character.Inventory[item];
    document.getElementById("targyak").innerHTML += itemValue;// Add the items value to the HTML element
}

function marValtozoDologPoweredByKovacsEdit(){
    let arany = myData.Game.Character.Inventory.Gold;
    let ekkovek = myData.Game.Character.Inventory.Ekkovek;
    let italok = myData.Game.Character.Inventory.Italok;
    let elelmiszerek = myData.Game.Character.Inventory.Food;
    document.getElementById("arany").innerHTML += " "+ arany;// Add the gold value to the HTML element
    if( ekkovek != null)// Checks if there is any ekkő
        {
        document.getElementById("ekkovek").innerHTML += " "+ ekkovek;// Add the ekkovek value to the HTML}
        };
    if( italok != null)// Checks if there is any potion
        {
        document.getElementById("italok").innerHTML += " "+italok;// Add the italok value to the HTML
        }
    document.getElementById("elelmiszerek").innerHTML += " "+elelmiszerek;// Add the food value to the HTML
}

function generalas()
{
    let skill = Math.floor(Math.random() * 6) + 1 + 6;
    let stamina = Math.floor(Math.random() * 12) + 1 + 12;
    let luck = Math.floor(Math.random() * 6) + 1 + 6;
    document.getElementById("skill").innerHTML += skill;// generate the value of skill and add to the HTML
    document.getElementById("stamina").innerHTML += stamina;// generate the value of stamina and add to the HTML
    document.getElementById("luck").innerHTML += luck;// generate the value of luck and add to the HTML
    const button = document.getElementById('generalas');
    button.remove();
}

function dobbas() {
    let x = Math.floor(Math.random() * 6) + 1;
    return x
}

function kartyaKereses(id){
    return myData.Game.Nodes.Node.find(node => node._id == id);
}

function kartya(id){
    const node = kartyaKereses(id);
    const kartya = document.getElementById("kartya");
    const harc = document.getElementById("harc");
    const div = document.createElement("div");
    const gombok = document.getElementById("gombok");
    const button = document.createElement("button");
    div.innerHTML = `<h2>${node._id}</h2><p>${node.Description}</p>`;
    kartya.appendChild(div);
    if(!node.End){
        const enemies = node.enemies?.enemy;
        if (enemies) 
        {
            let sebzes = 0;
            if (Array.isArray(enemies))
            {
                enemies.forEach(enemy => {
                    const enemyDiv = document.createElement("div");
                    enemyDiv.innerHTML = `<h2>${enemy.name}</h2><p>${enemy.description}</p>`;
                    harc.appendChild(enemyDiv);
                });
            }
            else{
                const enemyDiv = document.createElement("div");
                enemyDiv.innerHTML = `<h2>${enemies.name}</h2><p>Ügyessége: ${enemies.skill}</p><p>Élet: ${enemies.stamina}</p><p id="sebzes">Sebzeés:</p>`;
                harc.appendChild(enemyDiv);
            }
            let f = true;
            let futas = true;
            while(f && futas){
                
            }

        } 
        else 
        {
            console.log("Enemies is undefined");
        }

    }
    else{
        button.innerText = "újrakezdés?";
        gombok.appendChild(button);
    }

}

// Call the fetchData function and store the result in a variable
let myData;
fetchData().then(data => {
    myData = data; // Store the fetched data in the variable
    marValtozoDologPoweredByKovacsEdit();
    console.log(kartya(18));
    
});

