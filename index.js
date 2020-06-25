let taskData = [];
let input = document.querySelector('#newTask');

document.querySelector('#addTask').addEventListener('click', addData);
document.querySelector('#clearAllTask').addEventListener('click', clearAllData);
document.querySelector('#taskList').addEventListener('click', updateData);


// Add Data 增加資料
function addData() {
  if (input.value.trim() !== ''){
    taskData.push({
    id: Math.floor(Date.now()),
    text: input.value,
    completed: false,
    });
  };
  render();
  input.value = '';
}

// Clear All Data 刪除所有資料
function clearAllData(e) {
  e.preventDefault();
  taskData = [];
  render();
};


// Update Data
// Delete Data and Checked 
function updateData(e){
  
  if (e.target.dataset.action == 'remove') {

    taskData.forEach((item, key) => {
      if (e.target.dataset.id == item.id) {
        newIndex = key;
      }
    });
    taskData.splice(newIndex, 1);

  } else if (e.target.dataset.action == 'complete') {
    taskData.forEach(function (item) {
      if (e.target.dataset.id == item.id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
    });

  }
  render();
  
};


// render畫面
function render() {
  let str = '';

  taskData.forEach(item => {
    str += `<li class="list-group-item">
                <input class="checkbox" type="checkbox" ${
                  item.completed ? 'checked' : ''
                } data-action="complete" data-id="${item.id}">

                <label class="check-label ${
                  item.completed ? 'completed' : ''
                }" data-action="complete" data-id="${item.id}">${item.text}</label>
                
              <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true" data-action="remove" data-id="${
                      item.id
                    }">&times;
                    </span>
              </button>
            </li>`;
  });


  document.querySelector('#taskList').innerHTML = str;
  document.querySelector('#taskCount').textContent = taskData.length;
}