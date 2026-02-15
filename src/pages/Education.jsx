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
      <p>Informatique théorique, systèmes, C, structures de données, électronique, systèmes embarqués.</p>
    </div>
  </div>

   <div className="edu-item" ref={addToRefs}>
    <div className="edu-dot"></div>
    <div className="edu-content">
      <h2>BTS SIO – Option SLAM</h2>
      <p className="edu-year">2022 – 2023</p>
      <p>Développement logiciel, algorithmique, bases de données, conception d’applications.</p>
    </div>
  </div>

    <div className="edu-item" ref={addToRefs}>
    <div className="edu-dot"></div>
    <div className="edu-content">
      <h2>Baccalauréat scientifique</h2>
      <p className="edu-year">2021 – 2022</p>
      <p>Microcontrôleurs, Arduino/STM32, OS embarqués, optimisation mémoire, protocoles bas niveau.</p>
    </div>
  </div>

</div>

      
    </div>
  )
}


// function Education() {
//   const logo = "./assets/images/localisateur.png";
//   class Formation {
//     constructor(nomFormation, date, lieu, etablissement){
//       this.nomFormation = nomFormation;
//       this.date = date;
//       this.lieu = lieu;
//       this.etablissement = etablissement;
//     }
//   }
//   const arrayFormations=[];
//   arrayFormations.push(new Formation("BTS SIO - SLAM", "2020 - 2021", "Paris - 13 ème arrondissement", "Cours Diderot"));
//   arrayFormations.push(new Formation("Licence Mathématiques et Informatique", "2022 - présent", "Paris - 6ème arrondissement", "Université de Paris cité"));
  
//   return (
//     <div>
//       <section className="section education">
//         <h2>Formations</h2> 
//         {/*Liste des formations*/}
//         <div className="education-list">
//           {
//             arrayFormations.map((formation, index) => (
//               <div key={index} className="education-item">
//                 <div className="education-date">{formation.date}</div>
//                 <div className="education-info">
//                   <h3>{formation.nomFormation}</h3>
//                   <p>{formation.etablissement}</p>
//                   <div className="lieu">
//                     <img src={logo} alt="Localisateur" className="icone"/>
//                     <p>{formation.lieu}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </section>    
//     </div>
//   );
// }
// export default Education