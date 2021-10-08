
let myLeads = [];

const textInput = document.querySelector("#input-el")
const saveInputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn");
const deleteBtn = document.querySelector("#delete-btn");
const ulEl = document.querySelector("#ul-el");

// Get the leads from the localStorage and store them in a variable
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a href="${leads[i]}" target="_blank">
          ${leads[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}


// ALTERNATIVE to line 13
// for (let i = 0; i < leads.length; i++) {
//   const li = document.createElement("li");
//   li.textContent = leads[i];
//   ulEl.append(li);
// }

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

saveInputBtn.addEventListener("click", () => {
  myLeads.push(textInput.value);
  textInput.value = ""; // clear out the input field
  
  // Save the myLeads array to localStorage
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads);
});


