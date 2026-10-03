import { useRef, useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { siteConfig } from "../config/site";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Contact.css";

function ContactLink({ href, icon, label, value }) {
  if (!href) return null;
  return (
    <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="contact-link">
      <span className="contact-link__icon">{icon}</span>
      <div className="contact-link__content">
        <span className="contact-link__label">{label}</span>
        <span className="contact-link__value">{value}</span>
      </div>
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message is too short";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // mailto fallback — no backend configured
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    setStatus("success");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="contact-form__field">
        <label htmlFor="contact-name" className="contact-form__label">Name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`contact-form__input ${errors.name ? "contact-form__input--error" : ""}`}
          placeholder="Your name"
          autoComplete="name"
        />
        {errors.name && <span className="contact-form__error"><AlertCircle size={12} />{errors.name}</span>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email" className="contact-form__label">Email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`contact-form__input ${errors.email ? "contact-form__input--error" : ""}`}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {errors.email && <span className="contact-form__error"><AlertCircle size={12} />{errors.email}</span>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">Message</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className={`contact-form__input contact-form__textarea ${errors.message ? "contact-form__input--error" : ""}`}
          placeholder="What's on your mind?"
          rows={5}
        />
        {errors.message && <span className="contact-form__error"><AlertCircle size={12} />{errors.message}</span>}
      </div>

      {status === "success" && (
        <div className="contact-form__success">
          <CheckCircle size={16} />
          Your email client should open. If not, email me directly at {siteConfig.email}
        </div>
      )}

      <button type="submit" className="btn btn-primary contact-form__submit">
        <Send size={15} />
        Send Message
      </button>

      <p className="contact-form__note">
        This form uses your email client. Alternatively, reach out directly at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    </form>
  );
}

export default function Contact() {
  const headRef = useRef(null);
  const contentRef = useRef(null);
  useScrollReveal(headRef);
  useScrollReveal(contentRef);

  return (
    <section id="contact" aria-label="Contact section">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Build Something</h2>
          <p className="section-subtitle">
            Have an opportunity, project idea, or just want to connect?
          </p>
        </div>

        <div ref={contentRef} className="contact-grid reveal">
          {/* Left: contact info */}
          <div className="contact-info">
            <p className="contact-info__text">
              I'm currently looking for opportunities to learn, collaborate, and contribute.
              Whether it's a project, internship, or just a conversation about tech — feel free to reach out.
            </p>

            <div className="contact-links">
              <ContactLink
                href={siteConfig.email ? `mailto:${siteConfig.email}` : null}
                icon={<Mail size={18} />}
                label="Email"
                value={siteConfig.email || "—"}
              />
              <ContactLink
                href={siteConfig.linkedin || null}
                icon={<Linkedin size={18} />}
                label="LinkedIn"
                value="prudhvi-chinthapalli"
              />
              <ContactLink
                href={siteConfig.github || null}
                icon={<Github size={18} />}
                label="GitHub"
                value="PRUDHVI15-HUB"
              />
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
