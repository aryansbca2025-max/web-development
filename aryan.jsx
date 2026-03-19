import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Contact"];

const SKILLS = [
  { name: "Core Java", icon: "☕", level: 70 },
  { name: "HTML", icon: "🌐", level: 85 },
  { name: "CSS", icon: "🎨", level: 80 },
  { name: "VS Code", icon: "💻", level: 90 },
  { name: "Git & GitHub", icon: "🐙", level: 65 },
];

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%";

function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);

  const glitch = () => {
    let iter = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            i < iter
              ? text[i]
              : char === " "
              ? " "
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          )
          .join("")
      );
      iter += 0.5;
      if (iter >= text.length) clearInterval(intervalRef.current);
    }, 30);
  };

  useEffect(() => {
    glitch();
    return () => clearInterval(intervalRef.current);
  }, []);

  return <span onMouseEnter={glitch}>{display}</span>;
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={{ ...styles.header, ...(scrolled && styles.headerScroll) }}>
        <h2 style={styles.logo}>ARYAN</h2>
        <nav>
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                ...styles.navBtn,
                ...(active === item && styles.activeBtn),
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* HOME */}
      <section id="home" style={styles.home}>
        <h1 style={styles.title}>
          <GlitchText text="Aryan Sen" />
        </h1>
        <p style={styles.subtitle}>BCA 1st Year Student 🎓</p>
        <p style={styles.college}>Aryan Sen College</p>
      </section>

      {/* ABOUT */}
      <section id="about" style={styles.section}>
        <h2>About Me</h2>
        <p>
          Hello! My name is <b>Aryan Sen</b>. I am a BCA 1st year student from{" "}
          <b>Aryan Sen College</b>.
        </p>
        <p>I am currently learning Core Java, HTML, and CSS.</p>
      </section>

      {/* SKILLS */}
      <section id="skills" style={styles.sectionAlt}>
        <h2>Skills</h2>
        {SKILLS.map((skill) => (
          <div key={skill.name} style={styles.skillBox}>
            <span>{skill.name}</span>
            <div style={styles.bar}>
              <div
                style={{
                  ...styles.fill,
                  width: ${skill.level}%,
                }}
              ></div>
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <h2>Contact</h2>
        <p>📞 +91 9691073843</p>
        <p>📧 aryans.bca2025@ssism.org</p>
        <p>📍 Madhya Pradesh, India</p>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 Aryan Sen
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: "sans-serif",
    background: "#030b14",
    color: "#fff",
  },

  header: {
    position: "fixed",
    width: "100%",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    background: "transparent",
  },

  headerScroll: {
    background: "#000",
  },

  logo: {
    color: "#00ffe7",
  },

  navBtn: {
    margin: "0 10px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  activeBtn: {
    color: "#00ffe7",
  },

  home: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: "40px",
  },

  subtitle: {
    marginTop: "10px",
  },

  college: {
    color: "#00ffe7",
  },

  section: {
    padding: "100px 20px",
    textAlign: "center",
  },

  sectionAlt: {
    padding: "100px 20px",
    background: "#111",
    textAlign: "center",
  },

  skillBox: {
    margin: "15px 0",
  },

  bar: {
    width: "200px",
    height: "6px",
    background: "#333",
    margin: "5px auto",
  },

  fill: {
    height: "100%",
    background: "#00ffe7",
  },

  footer: {
    padding: "20px",
    textAlign: "center",
    background: "#000",
  },
};
