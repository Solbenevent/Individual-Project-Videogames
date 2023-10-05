import image from "../imagenes/fotomia.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "../About/About.css";

const About = () => {
  return (
    <div className="container-about">
      <div className="icon-about">
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          beat
          size="xl"
          style={{ color: "#4c007d" }}
        />
      </div>

      <h1 className="title-about">nice to meet you!</h1>
      <p className="p-content">
        My name is María Sol Benevent, and I'm a web developer from Argentina.
        I'm passionate about programming and I'm always looking for new ways to
        learn and improve. I'm currently working on a project to create a
        website that helps people learn about the history of video games. I'm
        excited to see this project through to completion and to share it with
        the world. I'm also a big fan of video games, and I love playing them in
        my free time. I'm always looking for new games to try, and I'm always
        happy to share my recommendations with others. I'm always looking for
        new challenges, and I'm excited to see what the future holds for me as a
        web developer.
      </p>
      <img src={image} className="image-about" />
    </div>
  );
};

export default About;
