function changeModalHeaderColor(status){
    let modalHeader = document.getElementById('modal-header');
    modalHeader.classList.remove('bg-blue','bg-red','bg-green','bg-grey');

    switch (status) { 
        case 'add':
            modalHeader.classList.add('bg-primary');
            break; 
        case 'Ongoing':
            modalHeader.classList.add('bg-blue');
            break;
        case 'On Queue':
            modalHeader.classList.add('bg-grey');
            break;
        case 'Completed':
            modalHeader.classList.add('bg-green');
            break;  
        default:
            modalHeader.classList.add('bg-red');
            break;                    
    } 
}

function changeStatusInModal(status){
    let note = document.querySelector('.statusInModal');
    let fieldstatus = document.getElementById('field-status');
    

    switch (status) { 
        case 'Ongoing':
            note.style.backgroundColor =  "#4f7c9b";
            fieldstatus.value = "Ongoing";
            break; 
        case 'On Queue':
            note.style.backgroundColor =  "#44484b";
            fieldstatus.value = "On Queue";
            break;
        case 'Completed':
            note.style.backgroundColor =  "#6c8726";
            fieldstatus.value = "Completed";
            break;  
        default:
            note.style.backgroundColor =  "#9c1f1f";
            fieldstatus.value = "Canceled";
            break;         
    } 
}

function ChangeTierTitle(tier){
    let gametier = document.getElementById('tier');
    
    switch (tier) { 
        case 'Tier 1':
            gametier.value = "Tier 1: Local Heroes";
            break; 
        case 'Tier 2':
            gametier.value = "Tier 2: Heroes of the Realm";
            break;
        case 'Tier 3':
            gametier.value = "Tier 3: Masters of the Realm";
            break;
        default:
            gametier.value = "Tier 4: Masters of the World";
            break;         
    } 
}

let toastCtr = 0;
function generateToast(bgColor = "", textMessage =""){
    toastCtr++;
    let toastHtml = `<div class="toast align-items-center ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true"  id="liveToast${toastCtr}">
                        <div class="d-flex">
                        <div class="toast-body">
                            ${textMessage}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`;
    const toastWrapper = document.querySelector('.toast-container');
    toastWrapper.innerHTML += toastHtml;

    const toastMain = document.querySelector('#liveToast'+toastCtr);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMain);
    toastBootstrap.show();
}

function assignRowFieldValues(row){

    let columns = row.getElementsByTagName('td');
    let gameNo = row.getElementsByTagName('th');

    let modalTitle  = document.getElementById('modal-game-title');
    modalTitle.textContent = gameNo[0].textContent; 

    let title = document.getElementById('game-title');
    title.value = columns[0].textContent;

    let description = document.getElementById('game-description');
    description.value = columns[8].textContent;

    let players = document.getElementById('players');
    players.value = columns[9].textContent;

    let DungeonMaster = document.getElementById('dungeon-master');
    DungeonMaster.value = columns[1].textContent;

    let dateCreated = document.getElementById('date-created');
    dateCreated.value = columns[3].textContent;

    let SchedCreated = document.getElementById('sched-date');
    SchedCreated.value = columns[4].textContent;

    let time = document.getElementById('time');
    time.value = columns[7].textContent;

    
    changeModalHeaderColor(columns[6].textContent)
    changeStatusInModal(columns[6].textContent)
    ChangeTierTitle(columns[2].textContent)
}

function breakByHTMLChars(statusHtml = ""){
    const tagRegex = /<[^>]*>/g;
    const resultArray = statusHtml.split(tagRegex);

    return resultArray.filter(item => item.trim() !== '');
}

function showHideModalButtons(row, state = '') {
    const columns = row.getElementsByTagName('td');
    const status = breakByHTMLChars(columns[6].innerHTML);
    const modalMain = document.querySelector('#viewGameModal');

    removeBtns = modalMain.querySelectorAll("#modal-btn-early,#modal-btn-complete,#modal-btn-save,#modal-btn-create,#modal-btn-cancel");
    removeBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
    });

    if (status.includes("Completed")) {
        removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete");
        removeBtns.forEach(btnCol => {
            btnCol.classList.add('d-none');
        });


    } else if (status.includes("On Queue")) {
        removeBtns = modalMain.querySelectorAll("#modal-btn-complete");
        removeBtns.forEach(btnCol => {
            btnCol.classList.add('d-none');
        });

        if (state == "") {
            showBtns = modalMain.querySelectorAll("#modal-btn-early,#modal-btn-cancel");
            showBtns.forEach(btnCol => {
                btnCol.classList.remove('d-none');
            });
        } else {
            showBtns = modalMain.querySelectorAll("#modal-btn-save");
            showBtns.forEach(btnCol => {
                btnCol.classList.remove('d-none');
            });
        }

    } else if (status.includes("Ongoing")) {
        removeBtns = modalMain.querySelectorAll("#modal-btn-early");
        removeBtns.forEach(btnCol => {
            btnCol.classList.add('d-none');
        });

        if (state == "") {
            showBtns = modalMain.querySelectorAll("#modal-btn-complete");
            showBtns.forEach(btnCol => {
                btnCol.classList.remove('d-none');
            });
        } else {
            showBtns = modalMain.querySelectorAll("#modal-btn-complete");
            showBtns.forEach(btnCol => {
                btnCol.classList.add('d-none');
            });

            showBtns = modalMain.querySelectorAll("#modal-btn-save");
            showBtns.forEach(btnCol => {
                btnCol.classList.remove('d-none');
            });
        }
    }
}

function clearFieldValues() {
    let modalMain = document.querySelector('#viewGameModal');
    let modalTitle  = document.getElementById('modal-game-title');

    let tier = document.getElementById('tier');
    let status      = document.getElementById('field-status');
    let title = document.getElementById('game-title');
    let description = document.getElementById('game-description');
    let players    = document.getElementById('players');
    let dateCreated = document.getElementById('date-created');
    let SchedCreated = document.getElementById('sched-date');
    let DungeonMaster = document.getElementById('dungeon-master');
    let time = document.getElementById('time');

    let date = new Date();
    date.setDate(date.getDate() + 7);
    newDateTarget = date.toISOString().split('T')[0];
    
    
    changeModalHeaderColor("add");
    changeStatusInModal("On Queue")
    tier.value    = '';
    status.value      = 'On Queue';
    title.value       = '';
    description.value = '';
    players.value = '';
    dateCreated.value = new Date().toISOString().split('T')[0];
    SchedCreated.value  = newDateTarget;
    DungeonMaster.value = '';

    modalTitle.textContent = 'A New Game';

    status.setAttribute("disabled","");
    dateCreated.setAttribute("disabled","");

    removeBtns = modalMain.querySelectorAll("#modal-btn-early,#modal-btn-complete,#modal-btn-save,#modal-btn-create,#modal-btn-cancel");
    removeBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
    });
    showBtns = modalMain.querySelectorAll("#modal-btn-create");
    showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
    });
    
}

function addTicketRecord(){
    let newGameNo = `NO-${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}`
    let title = document.getElementById('game-title');
    let DungeonMaster = document.getElementById('dungeon-master');
    let tier = document.getElementById('tier');
    let dateCreated = document.getElementById('date-created');
    let SchedDate = document.getElementById('sched-date');
    let time = document.getElementById('time');
    let status      = document.getElementById('field-status');
    let description = document.getElementById('game-description');
    let players    = document.getElementById('players');

    
    const tblRow   = document.querySelector("#table-onqueue");
    const tblBody  = tblRow.querySelector('tbody');

    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0); //game no
    let col2 = newRow.insertCell(1); //game title
    let col3 = newRow.insertCell(2); //dungeon master
    let col4 = newRow.insertCell(3); //tier
    let col5 = newRow.insertCell(4); //date created
    let col6 = newRow.insertCell(5); //sched date
    let col7 = newRow.insertCell(6); // time
    let col8 = newRow.insertCell(7); // status
    let col9 = newRow.insertCell(8); //buttons
    let col10 = newRow.insertCell(9); //description
    let col11 = newRow.insertCell(10); //players

    col1.outerHTML = `<th class="align-middle fs-6">${newGameNo}</th>`;
    col2.outerHTML = `<td class="align-middle fs-6">${title.value}</td>`;
    col3.outerHTML = `<td class="align-middle fs-6">${DungeonMaster.value}</td>`;
    col4.outerHTML = `<td class="align-middle fs-6">${tier.value}</td>`;
    col5.outerHTML = `<td class="align-middle fs-6">${dateCreated.value}</td>`;
    col6.outerHTML = `<td class="align-middle fs-6">${SchedDate.value}</td>`;
    col7.outerHTML = `<td class="align-middle fs-6">${time.value}</td>`;
    col8.outerHTML = `<td class="align-middle fs-6"><span class="badge rounded-pill bg-grey">${status.value}</span></td>`;

    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info view-game" data-bs-toggle="modal" data-bs-target="#viewGameModal">view</button>
                        <button class="btn btn-warning edit-game" data-bs-toggle="modal" data-bs-target="#viewGameModal">Edit</button>
                        <button class="btn btn-danger delete-game" >Delete</button>
                    </td>`;

    col10.outerHTML = `<td class="align-middle d-none">${description.value}</td>`;
    col11.outerHTML = `<td class="align-middle d-none">${players.value}</td>`;

    generateToast("text-bg-primary",`Game <strong>${newGameNo[0].textContent}</strong> ADDED`);


}

// ---------------------------------MAIN CONTENT-------------------------------------

document.addEventListener('DOMContentLoaded', function() {

    let activeRow = null;
    let modalView = new bootstrap.Modal('#viewGameModal');

    // ------------------HIDING UNNECESSARY BUTTONS---------------------
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
            const columns = row.getElementsByTagName('td');
            if(columns[6].textContent == 'Completed'){
                let removeButtons = columns[7].querySelectorAll(".edit-game, .delete-game");
                removeButtons[0].classList.add('d-none'); //edit
                removeButtons[1].classList.add('d-none'); //delete
            }
            if(columns[6].textContent == 'Canceled'){
                let removeButtons = columns[7].querySelectorAll(".edit-game");
                removeButtons[0].classList.add('d-none'); //edit
            }

            
        });

        

    // -------------------------VIEW BUTTON---------------------------
    viewButton = document.querySelectorAll('.view-game');
    viewButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            activeRow = row;
            assignRowFieldValues(row);
            showHideModalButtons(row);
            console.log(activeRow);
            
        });
    });

    // -------------------------EDIT BUTTON---------------------------
    editButton = document.querySelectorAll('.edit-game');
    editButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            activeRow = row;
            assignRowFieldValues(row);
            console.log(activeRow);
            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id !="field-status" && input.id != "date-created"){
                    input.removeAttribute("disabled");
                }
                
            });

            showHideModalButtons(row,"edit");
        });
    });
    

    // -------------------------MODAL SAVE BUTTON---------------------------
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('td');
        const modalMain = document.querySelector('#viewGameModal');
        const gameNo    = activeRow.getElementsByTagName('th');

        columns[0].textContent = modalMain.querySelector('#game-title').value
        columns[1].textContent = modalMain.querySelector('#dungeon-master').value
        columns[2].textContent = modalMain.querySelector('#tier').value
        columns[3].textContent = modalMain.querySelector('#date-created').value
        columns[4].textContent = modalMain.querySelector('#sched-date').value
        columns[5].textContent = modalMain.querySelector('#time').value
        columns[8].textContent = modalMain.querySelector('#game-description').value
        columns[9].textContent = modalMain.querySelector('#players').value
        
        generateToast("text-bg-success",`Game <strong>${gameNo[0].textContent}</strong> UPDATED`);
    });

    modalWindow =  document.querySelector('#viewGameModal');
    modalWindow.addEventListener("hidden.bs.modal", function(){
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
            input.setAttribute("disabled","");
        });

    });

    // -------------------------ADD BUTTON---------------------------
    addButton = document.querySelector('#add-schedule');
    addButton.addEventListener('click', function(){

    
        clearFieldValues()
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
            if(input.id !="field-status" && input.id != "date-created"){
                input.removeAttribute("disabled");
            }
        });

        // -------------------------CREATE BUTTON---------------------------
        const createButton = document.querySelector("#modal-btn-create");
        createButton.addEventListener('click', function(){
            addTicketRecord()
            modalView.hide()
            
        });
    });

    






    // -------------------------DELETE BUTTON---------------------------
    deleteButton = document.querySelectorAll('.delete-game');
    deleteButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row           = this.parentElement.parentElement;
            const gameNo    = row.getElementsByTagName('th');
            const modalDelete = document.querySelector("#deleteGameModal")
            const myModal     = new bootstrap.Modal(modalDelete);
            const modalText   = modalDelete.querySelector("#delete-prompt"); 
            modalText.innerHTML = `Are you sure you want to delete <strong>${gameNo[0].textContent}</strong> ?`;
            myModal.show();
            
            const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
            confirmDelBtn.addEventListener("click", function(){
                myModal.hide();
                row.remove();        
                generateToast("text-bg-danger",`Game <strong>${gameNo[0].textContent}</strong> DELETED`);
                });
            });
        });
});
