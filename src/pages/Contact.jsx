import { useState } from "react"

function Contact() {
  const [captchaValue, setCaptchaValue] = useState("")
  const [captchaValid, setCaptchaValid] = useState(false)
  const [captchaError, setCaptchaError] = useState(false)
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: ""
  })

  // code CAPTCHA aléatoire (6 caractères alphanumériques)
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const [captchaCode, setCaptchaCode] = useState(generateCaptcha())

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha())
    setCaptchaValue("")
    setCaptchaError(false)
    setCaptchaValid(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Vérification du CAPTCHA
    if (captchaValue !== captchaCode) {
      setCaptchaError(true)
      setCaptchaValid(false)
      return
    }

    setCaptchaError(false)
    setCaptchaValid(true)

    // Vérifie si tous les champs sont remplies
    if (!formData.from_name || !formData.from_email || !formData.message) {
      alert("Veuillez remplir tous les champs")
      return
    }

    // Animation de succès
    setSent(true)

    // Ouvre le client mail du visiteur
    const subject = encodeURIComponent("Contact depuis le portfolio")
    const body = encodeURIComponent(
      `Nom : ${formData.from_name}\nEmail : ${formData.from_email}\n\nMessage :\n${formData.message}`
    )

    window.location.href = `mailto:sdayar318@gmail.com?subject=${subject}&body=${body}`

    // Reset du formulaire après envoi
    setTimeout(() => {
      setSent(false)
      setFormData({
        from_name: "",
        from_email: "",
        message: ""
      })
      setCaptchaValue("")
      refreshCaptcha()
    }, 3000)
  }

  return (
    <div className="section contact">
     <div className="section-header">
        <div className="terminal-command">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command-text">more contacts.md</span>
        </div>
      </div>
      <p className="section-subtitle">
        N'hésitez pas à me contacter pour une formation ou une offre en apprentissage.
      </p>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input 
              type="text" 
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              placeholder="Votre nom" 
              required 
            />
          </label>

          <label>
            Email
            <input 
              type="email" 
              name="from_email"
              value={formData.from_email}
              onChange={handleInputChange}
              placeholder="Votre email" 
              required 
            />
          </label>

          <label>
            Message
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Votre message" 
              required 
            />
          </label>

          <button type="submit" className="primary-button">
             <span className="dollar">$ </span><span className="command">mailto</span>
          </button>

          {sent && (
            <div className="success-box">
              <div className="led"></div>
              <span>Message prêt à être envoyé ✔</span>
            </div>
          )}
        </form>

        {/* CAPTCHA*/}
        <div className="captcha-box">
          <h4>Vérification anti-robot</h4>
          
          <div className="captcha-container">
            <div className="captcha-code">{captchaCode}</div>
            
            <button 
              type="button"
              className="captcha-refresh"
              onClick={refreshCaptcha}
              title="Générer un nouveau code"
            >
              ↻
            </button>
          </div>

          <input
            type="text"
            placeholder="Entrez le code ci-dessus"
            value={captchaValue}
            onChange={(e) => {
              setCaptchaValue(e.target.value)
              setCaptchaError(false)
            }}
            className={captchaError ? "captcha-error" : ""}
          />
          {/* Les vérifications du captcha*/ }
          {captchaError && (
            <p className="captcha-error-text">
              ✖ Code incorrect. Veuillez réessayer.
            </p>
          )}

          {captchaValid && captchaValue && !captchaError && (
            <p className="captcha-success-text">
              ✓ Code valide ! Vous pouvez envoyer le message.
            </p>
          )}

          <p className="captcha-hint">
            Le code est sensible à la casse
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact