import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initUploadPictureModal } from './upload.js';
import { initFilters } from './filters.js';


initUploadPictureModal();
getData()
  .then((picturesData) => {
    initFilters(picturesData);
    renderGallery(picturesData);
  })
  .catch((err) => {
    showAlert(err.message);
  });
