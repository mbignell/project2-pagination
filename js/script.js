// create an array of the list
const students = document.getElementsByClassName('student-item');

// Define number of images per page
const numberPerPage = 10;

// Define how many page numbers are needed based on # of list items in .student-list
const pages =  Math.ceil( students.length / numberPerPage ) + 1;

let pagesDiv;
let currentPageNumber = 1;

// On initial load, hide all students
for(var i = 0; i < students.length; i++) {
  students[i].classList.add("hidden");
}

// Change students that are visible
function showPage(newPageNumber) {
  // Hide all students currently on page
  for(var i = 0; i < students.length; i++) {
    students[i].classList.add("hidden");
  }
  // Capture the student indexes that should be shown on  page
  let newStartIndex = (newPageNumber * numberPerPage - numberPerPage);
  let newEndIndex = newPageNumber * numberPerPage;

  // This fixes the issue of the last page breaking.
  // Is there a cleaner way to do this?
  if (newEndIndex > students.length) {
    newEndIndex = students.length;
  }
  // Set relevant students to be visible
  for(var i = newStartIndex; i < newEndIndex; i++) {
    students[i].classList.remove("hidden");
  }
};

function appendPageLinks(currentPageNumber){
  // Remove the old page link section from the site
  pagesDiv = document.getElementsByClassName('pagination')[0];
  pagesDiv.innerHTML = "";

  // Create page link html
  let pagesHTML = `<ul>`;

  // Loop on page numbers
  for(var i = 1; i < pages; i++) {
    // Add link to the ul for each page
    if (i === currentPageNumber) {
      pagesHTML += `<li>
        <a href="#" class="active" onclick="appendPageLinks(${i})";>${i}</a>
        </li>`;
    } else {
      pagesHTML += `<li>
        <a href="#" onclick="appendPageLinks(${i})">${i}</a>
        </li>`;
    }
    };
  pagesHTML += '</ul>'

  showPage(currentPageNumber);

  // Displays created HTML on page
  pagesDiv.innerHTML = pagesHTML;

};

// function searchList(searchText) {
//     // Obtain the value of the search input
//     let searchText =
//     // remove the previous page link section
//     // Loop over the student list, and for each student…
// // ...obtain the student’s name…
// // ...and the student’s email…
// // ...if the search value is found inside either email or name…
//     		// ...add this student to list of “matched” student
//     // If there’s no “matched” students…
//            // ...display a “no student’s found” message
//     // If over ten students were found…
//            // ...call appendPageLinks with the matched students
//    // Call showPage to show first ten students of matched list
// }
//
// //on typing in search box, call search
// //on leaving focus. x to clear.

function createSearchBox() {
  let searchDiv = document.getElementsByClassName('student-search')[0];
  //when it leaves focus clear search box?
  // "x" to clear
  searchDiv.innerHTML =  `<div onKeyPress="searchKeyPress()" onKeyUp="searchKeyPress()" id="student-search"><input id="search-input" placeholder="Search for students..."> <button onClick="searchKeyPress()">Search</button></div>`;
};

// Initializes page on page 1.
appendPageLinks(1);
createSearchBox();

function searchKeyPress() {
  let searchInput = document.getElementById("search-input").value;
  console.log(searchInput);

  if (searchInput != '') {
    for(var i = 0; i < students.length; i++) {
      students[i].classList.add("hidden");
    }
    pagesDiv.innerHTML = "";
  } else {
    console.log("hey");
    showPage(currentPageNumber);
    pagesDiv.innerHTML = pagesHTML;
  }

  // Declare variables
  let filter = searchInput.toLowerCase();
  let ul = document.getElementsByClassName('student-list')[0];
  console.log(ul);
  var searchResultNumber = 0;

    // Loop through all list items, and hide those who don't match the search query
   for (i = 0; i < students.length; i++) {
       result = students[i].getElementsByTagName("h3")[0];
       if (result.innerHTML.toLowerCase().indexOf(filter) > -1) {
           students[i].classList.remove("hidden");
           searchResultNumber += 1;
       } else {
           students[i].classList.add("hidden");
       };
   };
   if (searchResultNumber > numberPerPage) {
     var searchResultPages = Math.ceil( searchResultNumber / numberPerPage ) + 1;
     appendPageLinks(searchResultPages);
   } else if (searchResultNumber === 0) {
     console.log("no reulsts!!!!!!");
     let noResultsHTML = `<p class="student-no-results">No results!</p>`;
     ul.innerHTML(noResultsHTML);
   } else {
    //  let noResultsHTML = document.getElementsByClassName('student-no-results')[0];
    //  noResultsHTML.style.display
   };
};


/// ADD ARROWS?