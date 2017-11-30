// create an array of the list
const students = document.getElementsByClassName('student-item');

// Define number of students per page
const studentsPerPage = 10;

// defines page title so we can change for search results
let title = document.getElementById('page-title');

// Define how many page numbers are needed based on # of list items in .student-list
let pagesDiv;
let currentPageNumber = 1;

// initialize search results at 0, set up array
let searchResultNumber = 0;
let searchResultsArray = [];

// Change students that are visible based on the page number
function showPage(relevantArray, newPageNumber) {
  // Hide all students currently on page
  for(var i = 0; i < relevantArray.length; i++) {
    relevantArray[i].classList.add("hidden");
  }

  // clear any search result title
  if (relevantArray === students) {
    title.innerHTML = `Students`;
  }

  // Capture the student indexes that should be shown on  page
  let newStartIndex = (newPageNumber * studentsPerPage - studentsPerPage);
  let newEndIndex = newPageNumber * studentsPerPage;

  // This fixes the issue of the last page breaking.
  // Is there a cleaner way to do this?
  if (newEndIndex > relevantArray.length) {
    newEndIndex = relevantArray.length;
  }
  // Set relevant students to be visible
  for(var i = newStartIndex; i < newEndIndex; i++) {
    relevantArray[i].classList.remove("hidden");
  }
};

function appendPageLinks(relevantArray, currentPageNumber){
  // Remove the old page link section from the site
  pagesDiv = document.getElementsByClassName('pagination')[0];
  pagesDiv.innerHTML = "";

  // sets pages variable based on array length
  let pages =  Math.ceil( relevantArray.length / studentsPerPage ) + 1;

  // Create page link html
  let pagesHTML = `<ul> `;

  // Loop on page numbers
  for(var i = 1; i < pages; i++) {
    // Add link to the ul for each page
    if (i === currentPageNumber) {
      // Changes array input for students or search results so pagination
      // links to the correct array
      // (Is there a cleaner way to do this?)
      if (relevantArray === students) {
        pagesHTML += `<li>
          <a href="#" class="active" onclick="appendPageLinks(students,${i})";>${i}</a>
          </li>`;
      } else {
        pagesHTML += `<li>
          <a href="#" class="active" onclick="appendPageLinks(searchResultsArray,${i})";>${i}</a>
          </li>`;
      }
    } else {
      if (relevantArray === students) {
        pagesHTML += `<li>
          <a href="#" onclick="appendPageLinks(students,${i})">${i}</a>
          </li>`;
      } else {
        pagesHTML += `<li>
          <a href="#" onclick="appendPageLinks(searchResultsArray,${i})">${i}</a>
          </li>`;
      }
    }
    };
  pagesHTML += '</ul>'

  showPage(relevantArray,currentPageNumber);

  // Displays created HTML on page
  pagesDiv.innerHTML = pagesHTML;

};

function createSearchBox() {
  let searchDiv = document.getElementsByClassName('student-search')[0];
  //when it leaves focus clear search box?
  // "x" to clear
  searchDiv.innerHTML =  `<div id="student-search"><input id="search-input" onkeypress="detectIfEnter(event)" placeholder="Search for students..."> <button onClick="searchButtonPress()">Search</button></div>`;
};

function detectIfEnter(e) {
  if(e.keyCode === 13){
      e.preventDefault(); // Ensure it is only this code that rusn
      searchButtonPress();
  };
};

function searchButtonPress() {
  // Stores search input and clears box
  let searchInput = document.getElementById("search-input").value;
  document.getElementById("search-input").value = "";

  // compare it to the strings
  // if it's empty, just show the normal page
  if (searchInput != '') {
    for(var i = 0; i < students.length; i++) {
      students[i].classList.add("hidden");
    }
    pagesDiv.innerHTML = "";
  } else {
    appendPageLinks(students,currentPageNumber);
    return;
  }

  // translate filter to lowercase for comparison
  let filter = searchInput.toLowerCase();
  // set up "no results" scenario
  let ul = document.getElementsByClassName('student-list')[0];
  let noResults = `<p>No results</p>`;
  // resets number of results to 0
  searchResultsArray = [];
  searchResultNumber = 0;

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < students.length; i++) {
     result = students[i].getElementsByTagName("h3")[0];
     if (result.innerHTML.toLowerCase().indexOf(filter) > -1) {
         students[i].classList.remove("hidden");
         searchResultsArray.push(students[i]);
         searchResultNumber += 1;
     } else {
         students[i].classList.add("hidden");
     };
  };

  // If there's too many students to show on one page (>10),
  // paginate search results
  if (searchResultNumber > studentsPerPage) {
    appendPageLinks(searchResultsArray, 1);
  }

  // if there's no results
  if (searchResultNumber === 0) {
    pagesDiv.innerHTML = noResults;
  };

  // sets page title to indicate # of search results
  if (searchResultNumber === 1) {
    title.innerHTML = `Students - ${searchResultNumber} search result for "${filter}" <a href="#" class="clear-results" onclick="appendPageLinks(students,1)";>clear</a>`;
  } else {
    title.innerHTML = `Students - ${searchResultNumber} search results for "${filter}" <a href="#" class="clear-results" onclick="appendPageLinks(students,1)";>clear</a>`;
  }
};

// Initializes page on page 1.
appendPageLinks(students, 1);
createSearchBox();
