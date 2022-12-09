import "./social.styles.scss";
import { BsGithub } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useState } from "react";



const Social = () => {
    const [display, setDisplay] = useState(false);

    const socialIconHandler = () => setDisplay(display ? false : true);


    return <div className="social-container-wrap">

        <div className="social-container">
            {display ?
                <MdOutlineClose className='Social GitHub Close' onClick={socialIconHandler} />
                :
                <BsGithub className='Social GitHub' onClick={socialIconHandler} />
            }

            <img alt="Mazan"  onClick={() => window.open("https://github.com/thespecialone1", "_blank")} className={display ? "lahra lahra-active" : "lahra"} src='https://avatars.githubusercontent.com/u/76862693?v=4' />
            <img alt="Lahrasab"  onClick={() => window.open("https://github.com/mazanlabeeb", "_blank")} className={display ? "maza maza-active" : "maza"} src='https://avatars.githubusercontent.com/u/22959243?s=400&u=367c928168737e95adc8f801c9ad32a9c59f51bc&v=4' />


        </div>

    </div>;
}

export default Social;