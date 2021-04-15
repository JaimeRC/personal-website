import { useContext } from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { LanguageContext } from '../LanguageProvider';

function Footer() {
    const { translate: { about } } = useContext(LanguageContext)
    return (
        <div class="footer">
            <div class="container py-5">
                <div class="row pb-2">
                    <div class="col-12 text-center">
                        <a
                            rel="noreferrer"
                            className="mx-5 text-light"
                            href="https://github.com/JaimeRC"
                            target="_blank">
                            <FontAwesomeIcon icon={faGithub} className={'fa-2x margin'}/>
                        </a>
                        <a
                            rel="noreferrer"
                            className="mx-5 text-light"
                            href="https://es.stackoverflow.com/users/100834/planta4"
                            target="_blank">
                            <FontAwesomeIcon icon={faStackOverflow} className={'fa-2x margin'}/>
                        </a>
                        <a
                            className="mx-5 text-light"
                            rel="noreferrer"
                            href="https://www.linkedin.com/in/jaimerubiocaballero/"
                            target="_blank">
                            <FontAwesomeIcon icon={faLinkedin} className={'fa-2x margin'}/>
                        </a>
                    </div>
                </div>
                <div className="line"/>
                <div className="row pt-2">
                    <div className="col-12 text-center">
                        <label>{`${about.name} ${about.surname} ©2021`}</label>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Footer
