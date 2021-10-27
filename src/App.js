import './App.css';
import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import api from './services/gallery-api';
import Loader from './components/Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: Status.IDLE,
    page: 1,
    selectedImage: null,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { status, imageName, images, page } = this.state;
    if (status === Status.RESOLVED && images.length === 0) {
      toast.error(`Oops, we did not find such picture as ${imageName}`);
      this.setState({ status: Status.IDLE });
    }

    if (status === Status.PENDING) {
      api
        .fetchImages(imageName, page)
        .then(newImages =>
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            status: Status.RESOLVED,
          })),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    if (this.state.page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = imageName => {
    if (imageName.trim() !== '') {
      this.setState({
        status: Status.PENDING,
        imageName,
        images: [],
        page: 1,
      });
    }

    // if (this.state.imageName !== imageName) {
    //     this.setState({
    //         images: [],
    //         page: 1,
    //     })
    //  }
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  clickImages = selectedImage => {
    this.setState({ selectedImage });
    this.toggleModal();
  };

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: Status.PENDING,
    }));
  };

  render() {
    const { images, status, showModal, selectedImage } = this.state;
    const {
      handleFormSubmit,
      clickImages,
      toggleModal,
      handleLoadMoreBtnClick,
    } = this;
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
}

export default App;
