import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  id,
  src,
  alt,
  image,
  onClickModal,
}) {
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItem_image}
        src={src}
        alt={alt}
        onClick={() => {
          onClickModal(image);
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
  onClickModal: PropTypes.func.isRequired,
};
