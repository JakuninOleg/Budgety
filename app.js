var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type == 'exp') {
        newItem = new Expense(type, des, val);
      } else if (type == 'inc') {
        newItem = new Income(type, des, val);
      }

      data.allItems[type].push(newItem);

      return newItem;
    }
  };

})();


var UIController = (function () {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },

    addListItem: function (obj, type) {
      var html, element;

      if (type == 'inc') {
        element = DOMStrings.incomeContainer;
        html = `<div class="item clearfix" id="income-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
            <div class="item__value">+ ${obj.value}</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
          </div>
        </div>`
      } else if (type == 'exp') {
        element = DOMStrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
            <div class="item__value">- ${obj.value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
          </div>
         </div>
         `
      }

      document.querySelector(element).insertAdjacentHTML('beforeend', html);

    },

    clearFields: function () {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();

    },

    getDOMStrings: function () {
      return DOMStrings;
    }
  };

})();

var controller = (function (budgetCtrl, UICtrl) {

  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode == 13 || event.which == 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function () {


  };

  var ctrlAddItem = function () {
    var input, newItem;

    // 1. Getting the input data from UI
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4. Clear the fields
    UICtrl.clearFields();
  };

  return {
    init: function () {
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
