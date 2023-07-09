import styles from './loader.css';

export function Loader() {
  return (
    <div className="loader-container">
      <h1 className="loader">Cargando</h1>
      <div className="lds-dual-ring"></div>
    </div>
  );
}
