function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-led"></span>
        <span className="footer-copyright">© {year} Dayar SAIFIDINE</span>
      </div>
      <div className="footer-links">
        <a href="https://github.com/SDayar" target="_blank" rel="noreferrer">
          <span className="link-led"></span>
          github.com/SDayar
        </a>
        <a href="https://www.linkedin.com/in/dayar-saifidine-37244426b/" target="_blank" rel="noreferrer">
          <span className="link-led"></span>
          linkedin.com/in/dayar
        </a>
      </div>
     
    </footer>
  )
}

export default Footer