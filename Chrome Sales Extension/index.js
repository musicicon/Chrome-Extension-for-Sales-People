const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn")
let myLeads = [];

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener("click", function () {

    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);


})


deleteBtn.addEventListener("dblclick", function () {
    myLeads = [];
    inputEl.value = "";
    localStorage.clear();
    render(myLeads);
})

let tabbtn = document.getElementById("tab-btn");

tabbtn.addEventListener("click", function () {
    // This is how we call chrome api giving us the address of active tabs
    // const tab = [{url: "https://www.linkedin.com/in/aditya-dangle-8465201b2/"}] this is how tabs are stored in chrome api tab[0] is current tab.
    chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {  
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
        
    });
    
})





function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {

        listItems += `<li>
                         <a href = ${leads[i]} target = '_blank'>
                            ${leads[i]}
                        </a>
                      </li>`


    }

    ulEl.innerHTML = listItems
}
