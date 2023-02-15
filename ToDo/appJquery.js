let form, taskInput, taskList, clearBtn, filter;

// class to manage local storage
class localStorageManager {
    //get tasks from local storage
    getTasks() {
        if(localStorage.getItem('tasks') === null)
            return [];
        else 
            return JSON.parse(localStorage.getItem('tasks'));
    }

    // add to local storage
    addToLocalStorage(task) {
        let tasks = this.getTasks();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //remove from local storage
    removeFromLocalStorage(taskName) {
        let tasks = this.getTasks();

        tasks.forEach((task, index) => {
            if(task === taskName) {
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

const lsManager = new localStorageManager();

$(document).ready(() => {
    form = $('#task-form');
    taskInput = $('#task');
    taskList = $('.collection');
    clearBtn = $('.clear-tasks');
    filter = $('#filter');

    //get tasks from local storage and display 
    const tasks = lsManager.getTasks();

    tasks.forEach((task) => addTaskToUI(task));

    //event handler for add task
    form.submit((e) => {
        const taskName = $(taskInput).val();

        if( taskName == '') {
            alert('Add task');
        } else {
            addTaskToUI(taskName);

            $(taskInput).val('');

            //add to local storage
            lsManager.addToLocalStorage(taskName);
        }
        e.preventDefault();
    });

    //event handler for remove task
    taskList.click((e) => {
        if(e.target.parentElement.classList.contains('delete-item')) {
            e.target.parentElement.parentElement.remove();
            lsManager.removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
        }

        e.preventDefault();
    });

    //event hadler for clear task
    clearBtn.click((e) => {
        taskList.empty();

        e.preventDefault();
    });

    //event handler for task filter
    filter.keyup((e) => {
        const text = filter.val().toLowerCase();

        $('.collection-item').each((index, task) => {
            const item = $(task).text();
            if(item.toLowerCase().indexOf(text) != -1) 
                $(task).show();
            else 
                $(task).hide();
        });

        e.preventDefault();
    });
});

//utitlity function to add tasks to UI
let addTaskToUI = function (taskName) {
    const li = document.createElement('li');
    $(li).addClass('collection-item').append(document.createTextNode(taskName));

    const link = document.createElement('a');
    $(link).addClass('delete-item secondary-content').html('<i class="fa fa-remove"></i>')
    
    $(li).append($(link));
    taskList.append($(li));
}