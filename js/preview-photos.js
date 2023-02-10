const IMAGE_TYPES = ['png', 'jpeg', 'jpg'];
const previewAvatarUpload = document.querySelector('#avatar');
const previewAvatar = document.querySelector('#avatar-preview');
const previewImageUpload = document.querySelector('#images');
const previewImage = document.querySelector('.ad-form__photo');

const renderPreviewImage = (upload, container) => {
  upload.addEventListener('change', () => {
    const file = upload.files[0];
    const fileName = file.name.toLowerCase();

    const match = IMAGE_TYPES.some((el) => fileName.endsWith(el));

    if(match) {
      if(container.nodeName === 'IMG') {
        container.src = URL.createObjectURL(file);
      } else {
        container.innerHTML = '';
        container.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Аватар пользователя" style="width: 100%; max-height: 100%; object-fit: cover;">`;
      }
    }
  });
};

renderPreviewImage(previewAvatarUpload, previewAvatar);
renderPreviewImage(previewImageUpload, previewImage);
