function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-image">
        <img src={project.image} alt={project.title} />
        <div className="card-badge">
          <span className="badge-led"></span>
          {project.mcu}
        </div>
        <div className="card-status-leds">
          <span className={`led ${project.status === 'running' ? 'green' : 'red'}`}></span>
          <span className="led yellow"></span>
          <span className="led green"></span>
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
