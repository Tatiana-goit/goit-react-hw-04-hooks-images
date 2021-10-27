import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onModal }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id} 
            src={image.webformatURL}
            alt={image.tags}
            image={image}
            onClickModal={onModal}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string,
      alt: PropTypes.string,
      image: PropTypes.node,
    }),
  ),
  onModal: PropTypes.func.isRequired,
};
