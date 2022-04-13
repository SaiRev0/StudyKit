const contentArray = [];

var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328", "#e94652", "#ff9337", "#fad301", "#75e8b7", "#d3d75d", "#31cfe4", "#a6c7f7", "#abcaf8", "#ff7db9", "#323c44", "#fa8893", "#f9baa6", "#f9e75b", "#c6ee8f", "#99cf72", "#a2ecf0", "#7be4fa", "#e1e5f6", "#fec7dc", "#cbd4d7", "#f2efd7", "#ecf368", "#cff4f5", "#a1c2f6", "#fbcbd8", "#cbe1f2", "#f3d9e2", "#e9f2f8"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
var index = 0;

window.onload = document.querySelector("#user_input").select();

async function createStickyNote (text) {
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("h1");
  let data = text;

  note.className = "note";
  details.className = "details";
  noteText.textContent = text;


  details.appendChild(noteText);
  note.appendChild(details);

  if(index > random_colors.length - 1)
    index = 0;

  note.setAttribute("style", `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);
  
  contentArray.push(data);

  note.addEventListener("dblclick", () => {
    note.remove();
  })

  document.querySelector("#all_notes").appendChild(note);
};

document.querySelector("#add_note").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "block";
  document.querySelector("#user_input").select();
});

document.querySelector("#hide").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
  document.querySelector("#user_input").value='';
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    if(document.querySelector("#user_input").value != 0){
      const text = document.querySelector("#user_input");
      createStickyNote(text.value);
      document.querySelector("#modal").style.display = "none";
      document.querySelector("#user_input").value='';
    } else {
      alert('Fill The Note');
      document.querySelector("#user_input").value='';
    };
  };
});



