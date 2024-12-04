async function fetchData() {
    try {
        const response = await fetch('tartalom.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data
        console.log(data); // Now 'data' is a JavaScript object
        return data; // Return the data if needed
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call the fetchData function and store the result in a variable
let myData;
fetchData().then(data => {
    myData = data; // Store the fetched data in the variable
    let kovi = (myData.Game.Nodes.Node[0].Choices.Choice._targetNode);
    console.log(myData.Game.Nodes.Node[kovi])
});