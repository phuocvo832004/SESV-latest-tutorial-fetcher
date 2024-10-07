document.addEventListener('DOMContentLoaded', () => {
    const getLatestTutorials = async () => {
        try {
            const response = await fetch("https://cors-anywhere.herokuapp.com/https://www.sesvtutorial.com/page-data/tutorials/page-data.json");
            if (!response.ok) {
                throw new Error('Failed to fetch tutorials');
            }
            const resultObject = await response.json();
            const dataTutorials = resultObject["result"]["data"]["posts"]["edges"];
            displayLatestTutorials(dataTutorials);
        } catch (error) {
            console.error('Error fetching tutorials:', error);
            const listElement = document.querySelector('.list');
            if (listElement) {
                listElement.innerHTML = '<li>Failed to load tutorials. Please try again later.</li>';
            }
        }
    };
  
    const displayLatestTutorials = (dataTutorials) => {
        const listElement = document.querySelector('.list');
        if (!listElement) {
            console.error('Could not find list element');
            return;
        }
        listElement.innerHTML = ''; // Clear existing content
        dataTutorials.forEach((element) => {
            const listItem = document.createElement('li');
            const titleElement = document.createElement('a');
            titleElement.setAttribute(
              'href', 
              `https://www.sesvtutorial.com${element["node"]["fields"]["slug"]}`
            );
            titleElement.textContent = element["node"]["frontmatter"]["title"];
            listItem.appendChild(titleElement);
            listElement.appendChild(listItem);
        });
    };
  
    document.getElementById('fetching').addEventListener('click', getLatestTutorials);
  });
  
