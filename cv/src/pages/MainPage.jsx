import styles from "./MainPage.module.scss"
const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.leftSide}>
                    <div>
                        <img className={styles.img} src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" alt="1" />
                        <h1 className={styles.firstLastName}>BLIAKHAR OREST</h1>
                        <h3 className={styles.profession}>Frontend Developer</h3>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Personal data</h3>
                        <div className={styles.divInfo}>
                            <p>Rudno, Lviv 79493</p>
                            <p>+380685161907</p>
                            <p>29-12-2006</p>
                            <p>blyakhar76@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Skills</h3>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>SCSS</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Git</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Experience</h3>
                        <div className={styles.divInfo}>
                            <p>No work experience</p>
                        </div>
                    </div>
                    <div>
                        <h3 className={styles.titles}>Languages</h3>
                        <ul>
                            <li>Ukrainian - native speaker</li>
                            <li>English - intermidiate</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Description</h2>
                        <p className={styles.description}>I'm Orest, 16 years old, I am purposeful, responsible, attentive, ready to learn new things,
                            want to work as a Front-end developer and develop myself in this direction.
                        </p>
                    </div>
                    <div>
                        <h2 className={styles.titlesRight}>Education</h2>
                        <div>
                            <ul className={styles.divInfoRight}>
                                <li>September 2012 - today:</li>
                                <li>Lyceum №74 named after Mariyka Pidhiryanka</li>
                                <li>September 2022 - May 2023:</li>
                                <li>Frontend developer - Logos</li>
                            </ul>
                            {/* <p>September 2012 - today:</p>
                            <p>Lyceum №74 named after Mariyka Pidhiryanka</p>
                            <p>September 2022 - May 2023:</p>
                            <p>Frontend developer - Logos</p> */}
                        </div>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Interests</h2>
                        <ul>
                            <li>Football</li>
                            <li>Computer games</li>
                            <li>Basketball</li>
                            <li>Sport</li>
                        </ul>
                    </div>
                    <div className={styles.divInfoRight}>
                        <h2 className={styles.titlesRight}>Social Networks</h2>
                        <ul>
                            <li>Instagram</li>
                            <li>Telegram</li>
                            <li>Discord</li>
                            <li>Tiktok</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainPage;