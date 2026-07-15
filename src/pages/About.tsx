import "./../styles/About.css";
import { Link } from "react-router-dom";
import { IoCodeSlashOutline } from "react-icons/io5";
import { MdOutlinePeople, MdOutlineShield } from "react-icons/md";
import { HiOutlineBolt } from "react-icons/hi2";
import { IoIosRocket } from "react-icons/io";
import { IoIosLock } from "react-icons/io";

function About() {
  const features = [
    {
      icon: <IoIosRocket />,
      title: "Fast & Lightweight",
      class: "stat-icon-1",
      description:
        "No setup. No installation. Just open CodeNest and start coding instantly.",
    },
    {
      icon: <MdOutlinePeople />,
      title: "Collaborate in Real-Time",
      class: "stat-icon-2",
      description:
        "Create coding rooms and work together with friends from anywhere.",
    },
    {
      icon: <IoCodeSlashOutline />,
      title: "Multi-Language Support",
      class: "stat-icon-1",
      description:
        "Write, compile and execute programs in multiple programming languages.",
    },
    {
      icon: <IoIosLock />,
      title: "Private & Secure",
      class: "stat-icon-4",
      description:
        "Rooms are protected with passwords so only invited users can join.",
    },
  ];

  return (
    <div className="about-page">
      {/* Breadcrumb */}

      {/* <div className="breadcrumb">
        <span>Home</span>
        <span className="separator">/</span>
        <span>About</span>
      </div> */}

      {/* Hero */}

      <div className="about-header">
        <div>
          <h1>
            About <span>CodeNest</span>
          </h1>

          <p>
            Empowering developers to write, compile and collaborate seamlessly.
          </p>
        </div>

        <Link to="/" className="editor-btn">
          Go to Editor
        </Link>
      </div>

      {/* Main Hero Card */}

      <section className="hero-card card">
        <div className="hero-left">
          <h2>
            Built for Developers.
            <br />
            <span>By Shashank.</span>
          </h2>

          <p>
            CodeNest is an online compiler and collaborative coding platform
            that lets developers write, compile and run code from anywhere.
          </p>

          <p>
            Whether you're practicing DSA, preparing for interviews, teaching a
            friend or solving competitive programming questions together,
            CodeNest provides a clean and distraction-free coding experience.
          </p>

          <div className="stats">
            <div className="stat">
              <div className="stat-icon stat-icon-1">
                {/* <div className="nav-heading_img"> */}
                <IoCodeSlashOutline />
                {/* </div> */}
              </div>

              <div>
                <h3 className="stat-icon-1">10+</h3>
                <span>Languages</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon stat-icon-2">
                <MdOutlinePeople />
              </div>

              <div>
                <h3 className="stat-icon-1">Real-Time</h3>
                <span>Collaboration</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon stat-icon-3">
                <HiOutlineBolt />
              </div>

              <div>
                <h3 className="stat-icon-1">Instant</h3>
                <span>Execution</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon stat-icon-4">
                <MdOutlineShield />
              </div>

              <div>
                <h3 className="stat-icon-1">Secure</h3>
                <span>Room Access</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          {/* Replace this with your illustration */}

          <div className="hero-image">
            <div className="hero-image-placeholder">
              <img src="./my.jpeg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="features">
        <h2>
          Why Developers Love <span>CodeNest</span>
        </h2>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card card" key={index}>
              <div className={`feature-icon ${feature.class}`}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}

      <section className="mission card">
        <div className="mission-left">
          {/* <div className="mission-icon"> */}
          <img className="mission-icon-img" src="./target.png" alt="" />
          {/* </div> */}

          <div>
            <h2>Our Mission</h2>

            <p>
              Our mission is to make coding accessible, collaborative and
              enjoyable for every developer. Whether you're learning your first
              language or preparing for your next interview, CodeNest helps you
              focus on writing great code.
            </p>
          </div>
        </div>

        <div className="mission-right">
          <div className="code-logo"></div>

          <h2>
            Let's code the future,
            <br />
            together. 🚀
          </h2>

          <Link to="/" className="primary-btn">
            Go to Editor
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
