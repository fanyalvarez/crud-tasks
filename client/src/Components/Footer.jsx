import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="flex justify-center ">
      <footer className="absolute bottom-0 border-2 border-t-slate-500 border-transparent w-11/12 pt-2 px-5 flex justify-between items-center">
        <p className=" text-base">Create by @FanyAlv</p>

        <div>
          <ul className="w-28 flex ">
            <li className="p-3">
              <Link to="https://github.com/fanyalvarez">
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </Link>
            </li>

            <li className="p-3">
              <Link to="http://www.linkedin.com/in/estefp-alvarezp">
                <FontAwesomeIcon icon={faLinkedin} size="xl" />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
