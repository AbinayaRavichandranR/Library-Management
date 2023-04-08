const bookTableElement = document.querySelector('#booktable');
const BOOKNAME = document.querySelector('#bookname');
const AUTHOR = document.querySelector('#author');
const COUNT = document.querySelector('#count');

let books = [];

document.querySelector(".searchInput").addEventListener("input",function(){
  let srch = document.querySelector(".searchInput").value.toLowerCase();
  console.log(srch)
  let filteredBooks = [];
  books.forEach(element => {
    if(element.name.toLowerCase().includes(srch) || element.author.toLowerCase().includes(srch)){
      filteredBooks.push(element);
    }
  });
  showBooks(filteredBooks);
  
})

const ADDBTN = document.querySelector('#addbtn');
let addbook = function () {
let bookname = BOOKNAME.value.trim();
let authorname = AUTHOR.value.trim();
if(bookname === '' || authorname=== '' || count === '' || !Number(COUNT.value)){
  // alert("Please enter a valid input");
  document.querySelector(".errMgs").style.display="block"
}
else{
  const book = {
    name: bookname,
    author:authorname,
    count: COUNT.value,
    id: Math.random(Math.random() * 10),
  };
  BOOKNAME.value = "";
  AUTHOR.value = "";
  COUNT.value = "";

  books.push(book);
  console.log(books);

  const STRINGARRAY = JSON.stringify(books);
  console.log("string" + STRINGARRAY)

  let len = localStorage.length



  let x = localStorage.setItem(`books`, STRINGARRAY);
  console.log()
  GetBooks();
  display();
}

}

let GetBooks = function(){
  const getbooks = localStorage.getItem(`books`);
  bookn = JSON.parse(getbooks);
  showBooks(bookn)
}

let showBooks = function (bookn) {

  
  bookTableElement.innerHTML = "";
  bookTableElement.innerHTML += `<tr>
    <th>ID</th>
    <th>Book's Name</th>
    <th>Author's Name</th>
    <th>Count</thaction="page_submission_URL" method="POST">
    <th>Actions</th>
</tr>`
  for (let i = 0; i < bookn.length; i++) {
    const showbook = bookn[i];
    bookTableElement.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${showbook.name}</td>
          <td>${showbook.author}</td>
          <td class="example">${showbook.count}</td>
           <td > <button onclick=deletebook(this) id="${i}" width=30px>Delete</button><button id="${i}" width='30px' onclick=edits(this) style='margin-left:20px'>Edit</button></td>
          <div>
          </div>
        </tr>
      `;
  }


}

ADDBTN.addEventListener('click', addbook);

whenReload();
function whenReload() {
  try {
    GetBooks();
    const getbooks = localStorage.getItem(`books`);
    bookn = JSON.parse(getbooks);
    bookn.forEach(element => {
      books.push(element);
    });
  } catch (error) {
    console.log(error);
  }
}

function deletebook(t) {
  let book_id = t.id;
  console.log(book_id);
  let y = books.splice(book_id, 1);
  console.log(y);
  const STRINGARRAY = JSON.stringify(books);
  x = localStorage.setItem(`books`, STRINGARRAY);
  GetBooks();
}






function edits(t) {
  const EDITDETAILS=document.querySelector('.editdetails');
    bookTableElement.classList.add('hide');
    EDITDETAILS.classList.add('show');
  const EDITEDNAME = document.querySelector('#editname');
  const EDITAUTHOR = document.querySelector('#editauthor');
  let book_id = t.id;
  console.log(book_id)
  
  book = books[book_id];
  console.log(book)
  EDITEDNAME.value = book.name;
  EDITAUTHOR.value = book.author;

  const EDITBTN = document.querySelector('.editbtn');
  EDITBTN.setAttribute("id",book_id);

}
  function EditSave(t) {
    const EDITDETAILS=document.querySelector('.editdetails');
    bookTableElement.classList.remove('hide');
    EDITDETAILS.classList.remove('show');
    const EDITEDNAME = document.querySelector('#editname');
    const EDITAUTHOR = document.querySelector('#editauthor');
    
    let book_id = t.id;
    book = books[book_id];
    book.name = EDITEDNAME.value;
    book.author = EDITAUTHOR.value;
    const STRINGARRAY = JSON.stringify(books);
    x = localStorage.setItem(`books`, "");
    x = localStorage.setItem(`books`, STRINGARRAY);
    GetBooks();
  }

const NAV=document.querySelector('nav');
const DETAILS=document.querySelector('.details');
NAV.addEventListener('click',function(ele){
let targetElement=ele.target;
if(targetElement.innerText==='Add Book'){
  document.querySelector(".errMgs").style.display="none"

  bookTableElement.classList.add('hide');
  DETAILS.classList.add('show');
}
})

const BACKBTN=document.querySelector('#backbtn');
BACKBTN.addEventListener('click',display)

function display(){
  DETAILS.classList.remove('show');
  bookTableElement.classList.remove('hide');
  BOOKNAME.value = "";
  AUTHOR.value = "";
  COUNT.value = "";
}