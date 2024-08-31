import { getPicturesData } from './data.js';
import { renderGallery } from './gallery.js';
import { openInputFileModal } from './form.js';

renderGallery(getPicturesData());
openInputFileModal();
