import { useState } from "react"

function Contact() {
  const [captchaValue, setCaptchaValue] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [sent, setSent] = useState(false)

  const captchaCode = "7F3A"

  const handleSubmit = (e) => {
    e.preventDefault()

    if (captchaValue !== captchaCode) {
      setCaptchaValid(false)
      return
    }

    setCaptchaValid(true)

    // Animation de succès
    setSent(true)

    // Ouvre le client mail du visiteur
    const name = e.target.from_name.value
    const email = e.target.from_email.value
    const message = e.target.message.value

    const subject = encodeURIComponent("Contact depuis le portfolio")
    const body = encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`
    )

    window.location.href = `mailto:sdayar318@gmail.com?subject=${subject}&body=${body}`

    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="section contact">
      <h2>Contact</h2>
      <p className="section-subtitle">
        N’hésite pas à me contacter pour une alternance ou un projet.
      </p>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input type="text" name="from_name" placeholder="Votre nom" required />
          </label>

          <label>
            Email
            <input type="email" name="from_email" placeholder="Votre email" required />
          </label>

          <label>
            Message
            <textarea name="message" placeholder="Votre message" required />
          </label>

          <button type="submit" className="primary-button">
            Envoyer
          </button>

          {sent && (
            <div className="success-box">
              <div className="led"></div>
              <span>Transmission effectuée — Système OK ✔</span>
            </div>
          )}
        </form>

        {/* CAPTCHA */}
        <div className="captcha-box">
          <h4>Vérification</h4>
          <div className="captcha-code">{captchaCode}</div>

          <input
            type="text"
            placeholder="Entrez le code"
            value={captchaValue}
            onChange={(e) => setCaptchaValue(e.target.value)}
            className={!captchaValid && captchaValue ? "captcha-error" : ""}
          />

          {!captchaValid && captchaValue && (
            <p className="captcha-error-text">Code incorrect</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact

