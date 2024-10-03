// feature: get latest tutorials list
// input: none of input
// process:
// - wait fetch api from sesv to get response
// - convert response to Object
// - query data from Object to get dataTutorials
// - call display function
// output: the list display on screen
const getLatestTutorials = async () => {
    try {
        // fetch API
        const response = await fetch("https://www.sesvtutorial.com/page-data/tutorials/page-data.json");

        // kiểm tra nếu response không thành công
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // convert response to Object
        const resultObject = await response.json();

        // get data latest tutorials of Object
        const dataTutorials = resultObject["result"]["data"]["posts"]["edges"];

        // call display function
        displayLatestTutorials(dataTutorials);
    } catch (error) {
        console.error('Error fetching tutorials:', error);
        const listElement = document.querySelector('.list');
        listElement.innerHTML = '<li>Failed to load tutorials.</li>';
    }
};

// feature: display list to browser
// input: data latest tutorials object
// process: 
// - loop each element in list to get title and slug
// - create list item element, inner text = title and set attribute href = https://www.sesvtutorial.com/slug
// - appendChild Node to ul element 
// output: the list display on screen
const displayLatestTutorials = (dataTutorials) => {
    // clear previous content
    const listElement = document.querySelector('.list');
    listElement.innerHTML = '';

    dataTutorials.forEach((element) => {
        // create list item element to contain link and title
        const listItem = document.createElement("li");
        const titleElement = document.createElement("a");

        // set attribute href
        titleElement.setAttribute("href", `https://www.sesvtutorial.com${element["node"]["fields"]["slug"]}`);
        // inner text to anchor
        titleElement.innerText = `${element["node"]["frontmatter"]["title"]}`;
        // append anchor to list item
        listItem.appendChild(titleElement);
        // append list item to ul
        listElement.appendChild(listItem);
    });
};

// add event listener to button
document.getElementById("fetching").addEventListener("click", getLatestTutorials);
