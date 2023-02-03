//storage controller
const StorageCtrl = (function () {

    return {

    };
})();

//UI controller
const UICtrl = (function () {
    const UISelector = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearAllBtn: '.clear-btn',
        itemNameInput: '#item-name',
        calorieInput: '#calories',
        calorieCount: '.calorie-count',
    } 

    return {
        populateListItem: function(items) {
            html = '';

            items.forEach((item) => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>
                `;
            });

            document.querySelector(UISelector.itemList).innerHTML = html;
        },
        addNewItem: function(newItem) {
            //create new list item
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${newItem.id}`;

            html = `
                <strong>${newItem.name}: </strong> <em>${newItem.calorie} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;

            //append the html  inside li
            li.innerHTML = html;

            document.querySelector(UISelector.itemList).appendChild(li);

            this.clearInput();
        },
        clearInput: function() {
            document.querySelector(UISelector.itemNameInput).value = '';
            document.querySelector(UISelector.calorieInput).value = '';
        },
        getInputItem: function() {
            return {
                name: document.querySelector(UISelector.itemNameInput).value,
                calorie: document.querySelector(UISelector.calorieInput).value
            };
        },
        getUISelectors: function() {
            return UISelector;
        },
        hideListElem: function() {
            document.querySelector(UISelector.itemList).style.display = 'none';
        },
        showListElem: function() {
            document.querySelector(UISelector.itemList).style.display = 'block';
        },
        showCalorieCount: function(calorieCount) {
            document.querySelector(UISelector.calorieCount).textContent = calorieCount;
        }, 
        addItemToField: function() {
            document.querySelector(UISelector.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelector.calorieInput).value = ItemCtrl.getCurrentItem().calorie;
            this.changeToEditState();
        }, 
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelector.listItems);
            
            //convert node list into array
            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;
                }
            });
        },
        clearEditState: function() {
            this.clearInput();
            document.querySelector(UISelector.addBtn).style.display = 'inline';
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
        },
        changeToEditState: function() {
            document.querySelector(UISelector.addBtn).style.display = 'none';
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
        },
        removeAllItems: function() {
            let listItems = document.querySelector(UISelector.listItems);
            listItems = Array.from(listItems);

            listItems.forEach(listItem => listItem.remove());

            this.hideListElem();
        }, 
        removeCurrentItem: function(id) {
            const itemID = `item-${id}`;
            const item = document.querySelector(`#${itemID}`);
            item.remove();
        }
    };
})();

//Item controller
const ItemCtrl = (function () {
    //item elements
    const Item = function(id, name, calorie) {
        this.id = id;
        this.name = name;
        this.calorie = calorie;
    }

    //data structure for the application
    const data = {
        items: [
            // {id:0, name:'item1', calorie:300},
            // {id:1, name:'item2', calorie:200},
            // {id:2, name:'item3', calorie:500},
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function() {[]
            return data.items;
        }, 
        getItemById: function(id) {
            return data.items.find(item => {
                return item.id === id;
            });
        },
        addItem: function(item) {
            let id;

            if(data.items.length > 0) {
                id = data.items[items.length - 1].id + 1;
            } else {
                id = 0
            }

            const calorie = parseInt(item.calorie);

            const newItem = new Item(id, item.name, calorie);
            data.items.push(newItem);

            return newItem;
        }, 
        setCurrentItem: function(item) {
            data.currentItem = item;
        }, 
        getCurrentItem: function() {
            return data.currentItem;
        }, 
        updateItem: function(updatedItem) {
            let found = null;

            data.items.forEach(item => {
                if(item.id === data.currentItem.id) {
                    item.name = updatedItem.name;
                    item.calorie = parseInt(updatedItem.calorie);
                    found = item;
                }
            });

            return found;
        }, 
        deleteCurrentItem: function() {
            //get index of current item
            const ids = data.items.map(item => item.id);
            const index = ids.indexOf(ItemCtrl.getCurrentItem().id);

            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        getTotalCalories: function () {
            let calorieSum = 0;
            //loop through all the items
            data.items.forEach(item => {
                calorieSum += item.calorie;
            })

            data.totalCalories = calorieSum;

            return calorieSum;
        },
        logData: function() {
            return data;
        }
    };
})();

//App controller
const AppCtrl = (function (ItemCtrl, UICtrl, StorageCtrl) {
    const loadEventListners = function() {
        const UISelector = UICtrl.getUISelectors();

        //add item listner
        document.querySelector(UISelector.addBtn).addEventListener('click', addItem);

        //add edit state listner
        document.querySelector(UISelector.itemList).addEventListener('click', changeToEditState);

        //add update button listner
        document.querySelector(UISelector.updateBtn).addEventListener('click', updateItem);

        //add delete button listner
        document.querySelector(UISelector.deleteBtn).addEventListener('click', deleteItem);

        //add back button listner
        document.querySelector(UISelector.backBtn).addEventListener('click', (e) => {
            UICtrl.clearEditState();
            e.preventDefault();
        });

        //add clear all button listner
        document.querySelector(UISelector.clearAllBtn).addEventListener('click', clearAllItems);
    }

    //listner callback for adding new item to list 
    const addItem = function(e) {
        //show ul eleement
        UICtrl.showListElem();

        const inputItem = UICtrl.getInputItem();

        if(inputItem.name !== '' && inputItem.calorie !== '') {
            const newItem = ItemCtrl.addItem(inputItem);
            UICtrl.addNewItem(newItem);

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //display total calorie in the UI
            UICtrl.showCalorieCount(totalCalories);
        }

        e.preventDefault();
    };

    //listner callback for changing to update state
    const changeToEditState = function (e) {
        if(e.target.classList.contains('edit-item')) {
            //get item id
            const elemId = e.target.parentElement.parentElement.id;
            const ID = elemId.split('-');
            console.log(ID[1]);

            //get item by ID
            const item = ItemCtrl.getItemById(parseInt(ID[1]));
            console.log(item);

            //set the current item
            ItemCtrl.setCurrentItem(item);

            UICtrl.addItemToField();
        }
        e.preventDefault();
    }

    //callback for update item
    const updateItem = function(e) {
        const inputItem = UICtrl.getInputItem();

        if(inputItem.name !== '' && inputItem.calorie !== '') {
            const updatedItem = ItemCtrl.updateItem(inputItem);

            UICtrl.updateListItem(updatedItem);

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //display total calorie in the UI
            UICtrl.showCalorieCount(totalCalories);
        }

        e.preventDefault();
    }

    //callback for deleting an item
    const deleteItem = function(e) {
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deleteCurrentItem();

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();        
        //display total calorie in the UI
        UICtrl.showCalorieCount(totalCalories);

        UICtrl.removeCurrentItem(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //callback for clearing all items
    const clearAllItems = function(e) {
        ItemCtrl.clearAllItems();

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
                
        //display total calorie in the UI
        UICtrl.showCalorieCount(totalCalories);

        UICtrl.removeAllItems();

        e.preventDefault();
    }

    return {
        init: function() {
            //load event listners
            loadEventListners();

            //clear edit state
            UICtrl.clearEditState();

            //fetch items 
            items = ItemCtrl.getItems();

            if(items.length > 0) {
                //show ul element
                UICtrl.showListElem();

                //populate item list
                UICtrl.populateListItem(items);

                //get total calories
                const totalCalories = ItemCtrl.getTotalCalories();
                
                //display total calorie in the UI
                UICtrl.showCalorieCount(totalCalories);
            } else {
                UICtrl.hideListElem();
            }
            
        }
    };
})(ItemCtrl, UICtrl, StorageCtrl);

//Initialize App
AppCtrl.init();