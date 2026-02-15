function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-image">
        <img src={project.image} alt={project.title} />
        {/* Petit badge microcontrôleur discret */}
        <div className="card-badge">
          {project.mcu}
        </div>
      </div>
      
      <div className="card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        
        <div className="card-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
