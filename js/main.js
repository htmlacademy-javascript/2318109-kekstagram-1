import { renderGallery } from './gallery.js';
import { openInputFileModal } from './modal.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { submitForm } from './form.js';

getData()
  .then((picturesData) => {
    renderGallery(picturesData);
  })
  .catch((err) => {
    showAlert(err.message);
  });

openInputFileModal();
submitForm();
