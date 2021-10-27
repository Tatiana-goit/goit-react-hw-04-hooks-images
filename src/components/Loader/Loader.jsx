import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default function LoaderSpinner() {
  return (
    <div className={s.Loader}>
      <Loader
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}
        timeout={3000}
      />
    </div>
  );
}
