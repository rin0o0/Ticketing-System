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

    let title = document.getElementById('game-no');
    title.textContent = columns[0].textContent;

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

// ---------------------------------MAIN CONTENT-------------------------------------

document.addEventListener('DOMContentLoaded', function() {

    

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
            assignRowFieldValues(row);
            showHideModalButtons(row);
        });
    });

    // -------------------------EDIT BUTTON---------------------------
    editButton = document.querySelectorAll('.edit-game');
    editButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            assignRowFieldValues(row);
            
            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id !="field-status" && "date-created")
                input.removeAttribute("disabled");
            });

            showHideModalButtons(row,"edit");
        });
    });

    // -------------------------MODAL SAVE BUTTON---------------------------

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