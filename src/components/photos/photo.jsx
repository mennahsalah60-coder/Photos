import styles from './photo.module.css'
import image from './images/image-2.svg'

function Photo({ searched, loader }) {
    return (
        <>
            {!searched && !loader && (
                <section>
                    <div className={styles.nothing}>
                        <img src={image} alt="" />
                        <h2>Star Your Search</h2>
                        <p>Enter a keyword to discover beautiful photos from Pexels</p>
                    </div>
                </section>
            )}
            {loader && (
                <span className={styles.loader}></span>
            )}

            <footer>
                <h3>Photos provided by <span className={styles.pixel}>Pexels</span></h3>
            </footer>

        </>
    )
}
export default Photo
