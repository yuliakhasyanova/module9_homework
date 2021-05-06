// Get HTML tag
const btnNode = document.querySelector('.btn');
const resultNode = document.querySelector('.result'); 


// get data from local store if it exist 
function startPage() {

  let data = localStorage.getItem('dataStore');

  if ( data ) {
    const inputNumber = document.querySelector('.input-page');
    const inputLimit = document.querySelector('.input-limit');

    inputNumber.value = localStorage.getItem('pageStore');
    inputLimit.value = localStorage.getItem('limitStore');

    displayResult(JSON.parse( data ));
  }
}

// clean localStoreg data
function cleanUpData() {

  resultNode.textContent = '';
  localStorage.clear();
}

// check range of number
function checkRange(number) {

  return ( Number(number) &&  Number(number) > 1 && Number(number) < 10);

}

// output message if number doesn't match range
function displayError(text) {

  const errorText = `
      <div class="error-message">
        <p>${text} does not match the range 1-10.</p>
      </div>
    `;
  resultNode.innerHTML = errorText;
}

// set http request
function useRequest(page, limit) {

  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)

    .then( (response) => {
      return response.json();
    })

    .then( (data) => {
      localStorage.setItem( 'dataStore', JSON.stringify(data) );
      localStorage.setItem( 'pageStore', page );
      localStorage.setItem( 'limitStore', limit );
      displayResult( data );
      })

    .catch( (error) => {
      console.log(`error: ${error}`)
    });
}

// display result
function displayResult(apiData) {

  let images = '';
  
  apiData.forEach( item => {

    const imageBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    images = images + imageBlock;
  });
  resultNode.innerHTML = images;
}

// add event click to 'request' button
btnNode.addEventListener('click', () => { 

  cleanUpData();

  const page = document.querySelector('.input-page').value;
  const limit = document.querySelector('.input-limit').value;

  let pageFlag = checkRange(page);
  let limitFlag = checkRange(limit);

  if ( (pageFlag) && (limitFlag) ) {
    useRequest(page, limit);
  } else if (pageFlag) {
    displayError('Limit');
  } else if (limitFlag) {
    displayError('Page');
  } else {
    displayError('Page number and Limit');
  }
})

startPage();