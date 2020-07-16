// Show input
document.getElementById('enter').addEventListener('click', function(e) {

  document.getElementById('name-list').style.display = "none";

  document.getElementById('name').style.display = "block";

});


// Send name to server
document.getElementById('inputForm').addEventListener('submit', function(e) {

  e.preventDefault();

  const name = document.getElementById('name').value;

  document.getElementById('name').value = '';

  sendItem(name);

});

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


// Retrieve names
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

  document.getElementById('name-list').style.display = "block";

  let list = document.getElementById('name-list');

  while (list.hasChildNodes()) {

    list.removeChild(list.firstChild);

  }

  const l = data.length;

  for (let i = 0; i < l; i++) {

    let node = document.createElement('li');

    let textnode = document.createTextNode(`${data[i]}`);

    node.appendChild(textnode);

    document.getElementById('name-list').appendChild(node);

  }
}


// Clear names
document.getElementById('clear').addEventListener('click', function(e) {

  document.getElementById('name-list').style.display = "none";

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
})
