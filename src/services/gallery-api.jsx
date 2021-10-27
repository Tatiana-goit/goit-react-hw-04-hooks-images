import axios from 'axios';
const API_KEY = '21768835-de3419a52772d349dcef7b4fc';

async function fetchImages(imageName, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  if (response.status === 200) {
    return response.data.hits;
  }
}

const api = {
  fetchImages,
};

export default api;

// const fetchImages = async imageName => {
//   const {data}= await axios.get
//   ( `https://pixabay.com/api/?q=${imageName}&page=${1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
//   return data.hits;
// }

// export default fetchImages;
