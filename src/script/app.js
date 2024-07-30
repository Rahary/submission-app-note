const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

//menampilkan add box/add note
addBox.addEventListener("click", () => {
    popupBox.classList.add("show");
});

const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
                "Agustus", "September", "Oktober", "November", "Desember"];

//mendapatkan Local Storage notes jika ada dan memisahkannya
//mengubah array kosong ke notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
})

//menutup box add note
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    // Popup blank ketika membuat note baru
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Tambahkan Catatan Baru";
    popupTitle.innerText = "Tambah Catatan";
    popupBox.classList.remove("show");
});

//menampilkan note di console
function showNotes() {

    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>

                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                    <ul class="menu">
                                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen">Edit</i></li>
                                        <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash">Delete</i></li>
                                    </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

// Menu
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", event => {
        if(event.target.tagName != "I" || event.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

// Delete
function deleteNote(noteId) {
    // konfirmasi penghapusan catatan
    let confirmDel = confirm("Apakah kamu yakin ingin menghapus catatan ini?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    //menghapus di local storage
    localStorage.setItem("notes", JSON.stringify(notes)); 
    showNotes();
}


//EDIT
function updateNote(noteId, title, desc) {
    console.log(noteId, title, desc)
}
//menambahkan note
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {

        //Menambahkan hari, bulan, tahun
        let dateObj = new Date(),
        date = dateObj.getDate(),
        month = months[dateObj.getMonth()],
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${date} ${month} ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo); 
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        //local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

window.showMenu = showMenu;
window.deleteNote = deleteNote;
window.updateNote = updateNote;
