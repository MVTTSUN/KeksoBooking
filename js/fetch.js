const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Не загрузились маркеры объявлений на карте. Попробуйте перезагрузить страницу.');
      }
    })
    .then((marks) => onSuccess(marks))
    .catch((err) => {
      if(!document.querySelector('.error')) {
        document.body.insertAdjacentHTML('afterbegin',
          `<div class="error">
            <p class="error__message">${err.message}</p>
          </div>`);
        setTimeout(() => {
          document.querySelector('.error').remove();
        }, 2000);
      }
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://25.javascript.pages.academy/keksobookin',
    {
      method: 'POST',
      body: body
    })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
