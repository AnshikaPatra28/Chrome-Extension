let myLeads=[]
let oldLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl=document.getElementById("ul-el")
//console.log(ulEl)
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
//console.log(leadsFromLocalStorage)
 
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function renderLeads(Leads){
let listItem=" "
for (let i = 0; i < Leads.length; i++) {
     listItem += ` 
     <li> 
         <a href="${Leads[i]}" target="_blank">
            ${Leads[i]} 
         </a> 
     </li>
     `
}
ulEl.innerHTML=listItem
}

deleteBtn.addEventListener("dblclick", function() {
    //console.log("double clicked!")
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

inputBtn.addEventListener("click", function() {
myLeads.push(inputEl.value )
//console.log(myLeads)    
inputEl.value = " "
localStorage.setItem("myLeads",JSON.stringify(myLeads))
//console.log(localStorage.getItem("myLeads"))
renderLeads(myLeads)
})
 
