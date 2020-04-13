// Show input
document.getElementById('enter').addEventListener('click', function(e) {

  document.getElementById('name-list').style.display = "none";

  document.getElementById('name').style.display = "block";

});


// Send name to server
document.getElementById('inputForm').addEventListener('submit', function(e) {

  const name = document.getElementById('name').value;

  document.getElementById('name').value = '';

  sendItem(name);

  e.preventDefault();

});

function sendItem(name) {

  let postBody = {'item': name};

  const options = {

    method: 'POST',

    body: JSON.stringify(postBody),

    headers: {

        "Content-Type": "application/json"

      }

  };

  fetch('http://localhost:8000/', options)

    .then((response) => {

      return response.json();

    })

    .then((data) => {

      console.log(data);

    });
}


// Retrieve input
document.getElementById('retrieve').addEventListener('click', function(e) {

  document.getElementById('name').style.display = "none";

  retrieve();

});

function retrieve() {

  const options = {

    method: 'GET',

    headers: {

        "Content-Type": "application/json"

      }

  };

  fetch('http://localhost:8000/', options)

    .then((response) => {

      return response.json();

    })

    .then((data) => {

      display(data);

    });
}

function display(data) {

  document.getElementById('name-list').style.display = "block";

  let list = document.getElementById('name-list');

  while (list.hasChildNodes()) {

    list.removeChild(list.firstChild);

  }

  for (let i = 0; i < data.length; i++) {

    let node = document.createElement('LI');

    let textnode = document.createTextNode(`${data[i]}`);

    node.appendChild(textnode);

    document.getElementById('name-list').appendChild(node);

  }
}


// Clear
document.getElementById('clear').addEventListener('click', function(e) {

  document.getElementById('name-list').style.display = "none";

  const options = {

    method: 'DELETE',

    headers: {

        "Content-Type": "application/json"

      }

  };

  fetch('http://localhost:8000/del/', options)

    .then((response) => {

      return response.json();

    })

    .then((data) => {

      display(data);

    });

})
