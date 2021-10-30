import './App.css';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Container from '../Container/Container';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import fetchImages from '../../services/gallery-api';
import Loader from '../Loader/Loader';
import scrollPageDown from '../../helpers/scrollPageDown';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [imageName, setImageName] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [, setError] = useState(null);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (status === Status.PENDING) {
      fetchImages(imageName, page)
        .then(newImages => {
          if (newImages.length === 0) {
            toast.error(`Oops, we did not find such picture as ${imageName}`);
            setStatus(Status.IDLE);
            return;
          }
          setImages(images => [...images, ...newImages]);
          setStatus(Status.RESOLVED);
          if (page !== 1) scrollPageDown();
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleFormSubmit = imageName => {
    if (imageName.trim() !== '') {
      setStatus(Status.PENDING);
      setImageName(imageName);
      setImages([]);
      setPage(1);
    }
  };

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  const clickImages = selectedImage => {
    setSelectedImage(selectedImage);
    toggleModal();
  };

  const handleLoadMoreBtnClick = () => {
    setPage(state => state + 1);
    setStatus(Status.PENDING);
  };

  return (
    <div className="App">
      <Container>
        <Searchbar onSearch={handleFormSubmit} />
        <Toaster position="top-right" />
        <ImageGallery images={images} onModal={clickImages} />
        {status === Status.RESOLVED && (
          <Button type="button" onClick={handleLoadMoreBtnClick}>
            Load more
          </Button>
        )}

        {showModal && (
          <>
            <Loader />
            <Modal onModal={toggleModal}>
              <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
            </Modal>
          </>
        )}

        {status === Status.PENDING && <Loader />}
      </Container>
    </div>
  );
}
