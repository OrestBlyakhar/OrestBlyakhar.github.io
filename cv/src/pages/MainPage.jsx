import styles from "./MainPage.module.scss"
const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.leftSide}>
                    <div>
                        <img className={styles.img} src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" alt="1" />
                        <h1 className={styles.firstLastName}>BLIAKHAR OREST</h1>
                        <p>Frontend Developer</p>
                    </div>
                    <div>
                        <h3>Personal data</h3>
                        <div>
                            <p>Rudno, Lviv 79493</p>
                            <p>+380685161907</p>
                            <p>29-12-2006</p>
                            <p>blyakhar76@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <h3>Skills</h3>
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
                        <h3>Education</h3>
                        <div>
                            <p> September 2012 - today</p>
                            <p>Litsey №74 of Mariyku Pidgiryanku</p>
                            <p>September 2022 - May 2023</p>
                            <p>Frontend developer - Logos</p>
                        </div>
                    </div>
                    <div>
                        <h3>Experience</h3>
                        <div>
                            <p>April 2023</p>
                            <p>No work experience</p>
                        </div>
                    </div>
                    <div>
                        <h3>Languages</h3>
                        <ul>
                            <li>Ukrainian - native speaker</li>
                            <li>English - intermidiate</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div>
                        <h3>Description</h3>
                        <p>I'm Orest, 16 years old, I am purposeful, responsible, attentive, ready to learn new things,
                            want to work as a Front-end developer and develop myself in this direction.
                        </p>
                    </div>
                    <div>
                        <h3>Interests</h3>
                        <ul>
                            <li>Football</li>
                            <li>Computer games</li>
                            <li>Basketball</li>
                            <li>Sport</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Social Networks</h3>
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