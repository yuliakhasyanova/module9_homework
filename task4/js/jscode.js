// Get HTML tag
const btnNode = document.querySelector('.btn');

function useRequest(url) {

  fetch(url)

    .then((response) => {

      const resultNode = document.querySelector('.result'); 
      const image = `<img src="${url}" class="card-image"/>`;
      resultNode.innerHTML = image;
    })
    .catch(() => { console.log('error') });
}


btnNode.addEventListener('click', () => {

  let sizeJPG = '';

  const value = document.querySelectorAll('input').forEach( (item, index) => {

    if (!(Number(item.value))) {
      alert(`The client number ${++index} is blank`);

    } else if ( Number(item.value) < 100 || Number(item.value) > 300) {
            alert(`${item.value} - the client number does not match the range 100-300`);
    } else {
      sizeJPG = sizeJPG +  `/${item.value}`;
    }
  });

  if (sizeJPG) {
    useRequest( `https://picsum.photos${sizeJPG}` );
  }

})