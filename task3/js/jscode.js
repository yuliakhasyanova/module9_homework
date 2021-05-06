function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Response status: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Error! Response status: ', xhr.status);
  };
  
  xhr.send();
};

function displayResult(apiData) {
  let images = '';
  
  apiData.forEach(item => {
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

// Get HTML tags
const btnNode = document.querySelector('.btn');
const resultNode = document.querySelector('.result'); 


btnNode.addEventListener('click', () => {

  const value = +document.querySelector('input').value;

  if ( value >= 1 && value <= 10 ) {
    let url = `https://picsum.photos/v2/list/?limit=${value}`;
    useRequest( url, displayResult);
  } else {
    alert('Число вне диапазона от 1 до 10');
  }
  
})