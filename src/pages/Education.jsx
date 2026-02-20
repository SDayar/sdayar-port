import { useEffect, useRef } from "react"


export default function Education() {
  const sectionsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionsRef.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = el => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="education-page">
      <h1 className="edu-title" ref={addToRefs}>
        Formations
      </h1>
      <div className="edu-timeline">
      <div className="edu-line"></div>

 

  <div className="edu-item" ref={addToRefs}>
    <div className="edu-dot"></div>
    <div className="edu-content">
      <h2>Licence Mathématiques & Informatique</h2>
      <p className="edu-year">2023 – Présent</p>
      <p>Informatique théorique, mathématiques et applications, systèmes d'exploitation, C, Assembleur (Motorola 68000), structures de données, algorithmie, électronique et systèmes embarqués.</p>
    </div>
  </div>

    <div className="edu-item" ref={addToRefs}>
    <div className="edu-dot"></div>
    <div className="edu-content">
      <h2>Baccalauréat scientifique</h2>
      <p className="edu-year">2021 – 2022</p>
      <p>Bac scientifique, mathématiques et calcul et science appliquée.</p>
    </div>
  </div>

</div>

      
    </div>
  )
}

