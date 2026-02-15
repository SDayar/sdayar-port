import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import project1 from '../assets/images/project1.jpeg'
import project2 from '../assets/images/project2.png'
import project3 from '../assets/images/project3.png'
import project4 from '../assets/images/project4.png'

const projects = [
  {
    title: 'Main robotique INMOOV',
    description: 'Main robotique contrôlée par Arduino avec servomoteurs et capteurs de flexion.',
    details: "Projet de robotique open-source : impression 3D de la main, intégration de 5 servomoteurs pour les doigts, capteurs de flexion pour le contrôle gestuel. Programmation en C++ sur Arduino Mega avec gestion PWM et calibration des capteurs.",
    tags: ['Arduino', 'C++', 'Robotique', 'PWM', 'Capteurs'],
    image: project1,
    id: 1,
    code: 'https://github.com/SDayar/Defense-project-InMoov-Animate-body-parts',
    mcu: 'Arduino Mega'
  },
  {
    title: 'Calculateur assembleur 68000',
    description: 'Calculatrice scientifique codée en assembleur Motorola 68000.',
    details: "Développement d'une calculatrice complète en assembleur Motorola 68000. Implémentation des opérations arithmétiques de base, gestion des entrées/sorties via terminal. Optimisation mémoire et utilisation des registres processeur.",
    tags: ['Assembly', 'Motorola 68000', 'Bas niveau', 'CPU'],
    image: project2,
    id: 2,
    code: 'https://github.com/SDayar/AssemblyCalculator',
    mcu: 'Motorola 68000'
  },
  {
    title: 'ThermoLight Switch',
    description: 'Indicateur lumineux de température avec Arduino et LEDs.',
    details: "Système embarqué de monitoring température : capteur analogique mesure la température ambiante, affichage par code couleur (LED bleue = froid, LED rouge = chaud). Interrupteur physique pour couper l'alimentation.",
    tags: ['Arduino', 'C++', 'Capteurs', 'Électronique'],
    image: project3,
    id: 3,
    code: 'https://github.com/SDayar/FaceScan',
    mcu: 'Arduino Uno'
  },
  {
    title: 'FaceScan',
    description: 'Système de reconnaissance faciale sur Raspberry Pi.',
    details: "Portage d'un algorithme de reconnaissance faciale sur Raspberry Pi 4 avec caméra. Utilisation d'OpenCV optimisé pour ARM, base de données locale SQLite pour stocker les visages.",
    tags: ['Raspberry Pi', 'Python', 'OpenCV', 'ARM'],
    image: project4,
    id: 4,
    code: 'https://github.com/SDayar/FaceScan',
    mcu: 'Raspberry Pi 4'
  }
]

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="projects-container">
      {/* En-tête simple */}
      <div className="projects-header">
        <h2>Projets systèmes embarqués</h2>
        <p className="projects-subtitle">
          Une sélection de projets hardware et software bas niveau
        </p>
      </div>

      {/* Grille des projets */}
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onClick={() => setSelectedProject(project)} 
          />
        ))}
      </div>

      {/* MODAL SIMPLE */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            <div className="modal-grid">
              {/* Image */}
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>

              {/* Infos */}
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                
                {/* Microcontrôleur (petite touche embarquée) */}
                <div className="modal-mcu">
                  <span className="mcu-label">MCU</span>
                  <span className="mcu-value">{selectedProject.mcu}</span>
                </div>

                <p className="modal-description">{selectedProject.details}</p>

                {/* Tags */}
                <div className="modal-tags">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Lien code */}
                <a 
                  href={selectedProject.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-link"
                >
                  Voir le code source →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects