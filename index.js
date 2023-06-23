//need a # for classes and . for id
const button = document.querySelector('#btn');
const input = document.querySelector('#input');
const divList = document.querySelector('#DivList');
button.addEventListener('click', () => {
  // CREATE new data
  fetch('/newtask', {
    method: 'POST',
    //do need headers content type
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: input.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      makeElement(data.input);
    });
});
// function to make divs
const makeElement = (text) => {
  const divMaker = document.createElement('div');

  // Make a div for buttons
  const buttonDiv = document.createElement('div');
  // Make buttons
  const updateButton = document.createElement('button');

  // The delete button
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', () => {
    fetch('/removetask', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: text }),
    })
      .then((res) => {
        // 1.0 Check the status of the response
        if (res.status === 200) {
          divMaker.remove();
        }

        // 2.0 If it is not 200, throw an error (to be caught by the subsequent )
        // 3.0 If it is 200, remove the element (by calling .remove() on divMaker)
        else {
          throw new Error('could not delete event');
        }
      })
      .catch((e) => {
        console.log('O shit o shit o shit: ' + e);
      });
  });
  // Add text to the buttons
  updateButton.textContent = 'Update';
  deleteButton.textContent = 'Delete';

  // Put the buttons in their own div
  buttonDiv.appendChild(updateButton);
  buttonDiv.appendChild(deleteButton);

  divMaker.textContent = text;

  // Put the buttonDiv on the element's div
  divMaker.appendChild(buttonDiv);
  divList.prepend(divMaker);
};

// READ previous data
fetch('/gettasks')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((datum) => {
      makeElement(datum.input);
    });
    // console.log(data);
  });
