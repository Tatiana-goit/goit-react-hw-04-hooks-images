import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSearch }) {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.elements.imageName.value);
    e.target.elements.imageName.value = '';
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSearch}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            name="imageName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}