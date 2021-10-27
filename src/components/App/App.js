import './App.css';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import api from '../../services/gallery-api';
import Loader from '../Loader/Loader';

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
  const [error, setError] = useState(null);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (status === Status.PENDING) {
      api
        .fetchImages(imageName, page)
        .then(newImages => {
          if (newImages.length === 0) {
            toast.error(`Oops, we did not find such picture as ${imageName}`);
            setStatus(Status.IDLE);
            return;
          }
          setImages(state => [...state, ...newImages]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }

    if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [imageName, page, status, error]);

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
    </div>
  );
}
