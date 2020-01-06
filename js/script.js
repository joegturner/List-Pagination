/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
// by: Joe Turner
// Going for Exceeds!
// Rev 1: 1-5-2020


/*** Global Variables ***/

// array of student elements
const studentList = document.getElementsByClassName('student-item cf');
// number of items to display on each page
const itemsPerPage = 10;


/*** Functions ***/

/* "showPage" function */
// displays "list" of student elements
showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);

   // hide the entire "list"
   for (let c = 0; c < list.length; c++){
      list[c].style.display = 'none';
   }

   // display "list" of student elements
   for (let i = startIndex; i < endIndex; i++){
      if(list[i]) {
      list[i].style.display = '';
      }
   }

};


/* "searchResults" Function */
// called when Search is used
// similar to "showPage" function
searchResults = (list, page) => {
   
   // Start at [0], since these are the "found" students array
   const startIndex = 0;
   const endIndex = (page * itemsPerPage);

   // hide the entire "studentList"
   for (let i = 0; i < studentList.length; i++) {
      studentList[i].style.display = 'none';
   }

   // display "list" of found student elements
   for (let i = startIndex; i < endIndex; i++){
      if(list[i]) {
      list[i].style.display = '';
      }
   }
};

/* "appendPageLinks" function */
// generates, appends, and add functionality to the pagnation buttons
appendPageLinks = (list) => {
   
   /* "createLi" nested function */
   // creates li elements with <a href> children
   createLi = (pageNumber) => {
      const li = document.createElement('li');
      const aHref = document.createElement('a');
      aHref.href = '#';
      if (pageNumber === 1){
         aHref.className = 'active';
      }
      aHref.textContent = pageNumber;

      li.appendChild(aHref);
      return li;
   };

   /* "clearActives" nested function */
   // clears class names on page button elements
   clearActives = () => {
      const active = document.getElementsByClassName("active");
      for (let i = 0; i < active.length; i++) {
         active[i].className = '';
      }
   };

   /* "setActive" nested function */
   // sets class name on page button element to "active"
   setActive = (target) => {
      const pagination = document.querySelector("div.pagination");
      const lis = pagination.firstElementChild.children;
      for (let i = 0; i < lis.length; i++) {
         const aHref = lis[i].firstElementChild;
         if (aHref.textContent === target) {
           aHref.className = 'active';
         }
      }
   };

   // Create pagination div
   const pagesNeeded = Math.ceil(list.length / itemsPerPage);
   const page = document.querySelector('div.page');
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');
   
   // create li elements
   for (let i = 1; i <= pagesNeeded; i++){
      ul.appendChild(createLi(i));
   }
   
   // append pagination buttons to DOM
   div.appendChild(ul);
   page.appendChild(div);

   // add "click" event handler on page buttons
   const pageButtons = page.getElementsByTagName('a');

   for (let i = 0; i < pageButtons.length; i++){
      pageButtons[i].addEventListener('click', (e) => {
         const targetPage = e.target.textContent;
         clearActives();
         setActive(targetPage);
         showPage(list, targetPage);
      });
   }
};



/* "searchStudents" function */
// creates search div
// searches for user input based on "click" and "keyup" events
searchStudents = () => {

   // create search "input" and "button" in "header" div
   const header = document.getElementsByClassName('page-header cf')[0];
   const page = document.getElementsByClassName('page')[0];
   const student_search = document.createElement('div');
   student_search.className = 'student-search';
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   const button = document.createElement('button');
   button.textContent = 'Search';
   student_search.appendChild(input);
   student_search.appendChild(button);
   header.appendChild(student_search);
   
   // create "notFound" h2 for notifying searched name was not found
   const notFound = document.createElement('h2');
   notFound.textContent = 'Student was not found';
   notFound.id = 'notFound';
   notFound.style.display = 'none';
   page.appendChild(notFound);

   /* "searchMe" nested function */
   // returns "found" array of found student elements
   searchMe = (searchInput, names) => {
      const search = searchInput.value;
      const found = [];
   
      // checks if student li's h3 element (just the student's name) includes the search input value
      // if found, pushes the matched student element into the "found" array
      for (let i = 0; i < names.length; i++) {
         const h3 = names[i].getElementsByTagName('h3');
         if(search.length != 0 && h3[0].textContent.toLowerCase().includes(search.toLowerCase())) {
            found.push(names[i]);
         }
      }
      return found;
   };

   /* "searchFound" nested function */
   // changes style.display of "notFound" h2 depending on search results
   searchFound = (state) => {
      if (state === false) {
         notFound.style.display = '';
      } else if (state === true) {
         notFound.style.display = 'none';
      }
   };

   /* eventHandler function */
   // called by the "click" and "keyup" eventListeners
   searchEventHandler = () => {
      const found = searchMe(input, studentList);
      const pagesNeeded = Math.ceil(found.length / itemsPerPage);
   
      const pagination = document.querySelector('.pagination');
      pagination.remove();
   
      /* Update Page and Page Links, if: */
      // "found" array is greater than 0
      // or search input is not null 
      if (found.length > 0 || input.value) {
         searchResults(found, 1);
         appendPageLinks(found);
         searchFound(true);
      }
   
      /* Display "notFound" h2, if: */
      // "found" array is 0 
      // and search input is not empty
      if (found.length === 0 && input.value) {
         searchFound(false);
      }
   
      /* Reset Page and Page Links, if: */
      // search input is empty
      if (input.value === '') {
         showPage(studentList, 1);
         appendPageLinks(studentList);
         searchFound(true);
      }
   };

   // "click" and "keyup" EventListeners Adds
   button.addEventListener('click', (e) => {
      e.preventDefault();
      searchEventHandler();
   });
   
   input.addEventListener('keyup', (e) => {
      e.preventDefault();
      searchEventHandler();
   });
   
};


/*** Function calls for initial load ***/

// pass page "1" as default page to display
showPage(studentList, 1);

// creates pagination buttons for "studentList"
appendPageLinks(studentList);

// creates search div with "input" and "button"
searchStudents();

