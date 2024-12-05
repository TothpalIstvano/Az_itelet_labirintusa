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
    document.getElementById("ekkovek").innerHTML += " "+ ekkovek;// Add the ekkovek value to the HTML
    document.getElementById("italok").innerHTML += " "+italok;// Add the italok value to the HTML
    document.getElementById("elelmiszerek").innerHTML += " "+elelmiszerek;// Add the food value to the HTML
}

// Call the fetchData function and store the result in a variable
let myData;
fetchData().then(data => {
    myData = data; // Store the fetched data in the variable
    marValtozoDologPoweredByKovacsEdit();


});

