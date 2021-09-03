const searchBook = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q= ${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data));

    // Input Field Emty 
    searchField.value = '';
}



const displaySearchResult = (books) => {
    const searchResult = document.getElementById('search-result');
    const mainDisplay = document.getElementById('display-here');
    const searchFound = document.getElementById('search-here');



    // Condition  For error Handaling 
    if (books === null || books === undefined || books.numFound === 0) {
        mainDisplay.innerHTML = `<div>
      <h2 class="text-center my-5 text-primary fs-1 "> Sorry Not  Found!!!</h2>
      </div>`
    } else {
        mainDisplay.innerHTML = '';
    }


    //display total search found

    searchFound.innerHTML = `Total searches found: ${books.numFound}`;

    // Crate New Div  & add Class 
    const totalBook = document.createElement('div');
    totalBook.classList.add('row', 'container', 'mx-auto', 'row-cols-1', 'row-cols-md-3', 'g-4', 'my-4');


    //  Loop Here 
    books.docs.slice(0, 30).forEach((book) => {


        let img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;


        //validation Image  .
        if (!book.cover_i) {
            img = ` https://upload.wikimedia.org/wikipedia/commons/4/47/GarvaGriha_in_KaryaBinayak.jpg`
        }

        const div = document.createElement('div');
        div.classList.add('col');
        // mainDisplay.innerHTML = '';
        div.innerHTML = `
        <div class="card h-100">
                <img src="${img}" class="card-img-top" alt="Image Not Found">
                <div class="card-body">
                    <h5 class="card-title">
                    <span class="fw-bold  text-info">Book Name : </span> ${book.title ? book.title : '<i>No Title Found</i>'}</h5>
                       <p class="card-text">
                       <span class="fw-bold text-info"> Author: </span> ${book.author_name ? book.author_name : '<i>No Author Found</i>'}
                        </p>
                        <p class="card-text">
                        <span class="fw-bold text-info">Publisher: </span> ${book.publisher ? book.publisher : '<i>No Publisher Found</i>'}</p>
                        <p class="card-text">
                        <span class="fw-bold text-info">First Published: </span> ${book.first_publish_year ? book.first_publish_year : '<i>No First Published Year Found</i>'}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
        mainDisplay.appendChild(totalBook);
    })
}

//add event listener to the search button

document.getElementById('button-search').addEventListener('click', (e) => {
    e.preventDefault();
    searchBook();
})