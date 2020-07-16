const Container = function() {

  // Variables
  let form = document.getElementById('inputForm');

  let enter = document.getElementById('enter');

  let nameInput = document.getElementById('name');

  let retrieveButton = document.getElementById('retrieve');

  let clear = document.getElementById('clear');

  let list = document.getElementById('name-list');

  let name;


  // Methods
  function sendItem(name) {

    let postBody = { 'item': name };

    const options = {

      method: 'POST',

      body: JSON.stringify(postBody),

      headers: {

          "Content-Type": "application/json"

        }
    };

    fetch('http://localhost:8000/', options)

      .then( response => {

        if (response.ok) {

          console.log(response);

        } else {

          throw new Error('An error occured.')

        }

      })

      .catch( error => {

        console.log(error);

      })
  }

  function retrieve() {

    const options = {

      method: 'GET',

      headers: {

          "Content-Type": "application/json"

        }
    };

    fetch('http://localhost:8000/', options)

      .then( response => {

        if (response.ok) {

          return response.json();

        } else {

          throw new Error('An error occured');

        }

      })

      .then( data => {

        display(data);

      })

      .catch( error => {

        console.log(error);

      })
  }

  function display(data) {

    list.style.display = "block";

    while (list.hasChildNodes()) {

      list.removeChild(list.firstChild);

    }

    for (let i = 0; i < data.length; i++) {

      let node = document.createElement('LI');

      let textnode = document.createTextNode(`${data[i]}`);

      node.appendChild(textnode);

      list.appendChild(node);

    }
  }

  function clearList() {

    const options = {

      method: 'DELETE',

      headers: {

          "Content-Type": "application/json"

        }
    };

    fetch('http://localhost:8000/del/', options)

      .then( response => {

        if (!response.ok) {

          throw new Error('An error occured.');

        } else {

          console.log(response);

        }
      })

      .catch( error => {

        console.log(error);

      })
  }


  // Initialization and event listeners
  enter.addEventListener('click', function(e) {

    list.style.display = "none";

    nameInput.style.display = "block";

    document.getElementById('inputForm').style.display = "block";

    document.getElementById('submitButton').style.display = "block";

  });

  form.addEventListener('submit', function(e) {

    e.preventDefault();

    name = document.getElementById('name').value;

    sendItem(name);

    document.getElementById('name').value = '';

  });

  retrieveButton.addEventListener('click', function(e) {

    document.getElementById('submitButton').style.display = "none";

    nameInput.style.display = "none";

    retrieve();

  });

  clear.addEventListener('click', function(e) {

    document.getElementById('inputForm').style.display = "none";

    document.getElementById('submitButton').style.display = "none";

    list.style.display = "none";

    clearList();

  })
}

Container();
