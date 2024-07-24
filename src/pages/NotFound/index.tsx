import styles from './styles.module.scss'

export const NotFound = () => {
  return (
    <div className={styles.wr}>
      <div className={styles.wr__error}>404</div>
      <div className={styles.wr__text}>{'page not found'.toUpperCase()}</div>
    </div>
  )
}
