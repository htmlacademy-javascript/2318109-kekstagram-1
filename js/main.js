import { getPicturesData } from './data.js';
import { renderGallery } from './gallery.js';
import { openInputFileModal } from './form.js';
import './scale.js';

renderGallery(getPicturesData());
openInputFileModal();
