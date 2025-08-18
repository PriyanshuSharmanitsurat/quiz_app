import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#1e1e1e',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  };

  const linkStyle = {
    color: '#f0f0f0',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const hoverStyle = {
    backgroundColor: '#2c2c2c',
    color: '#1f80e0',
  };

  // Local state to handle hover per link
  const links = ['/', '/login', '/signup'];
  const names = ['Home', 'Login', 'Signup'];
  const [hovered, setHovered] = React.useState(null);

  return (
    <nav style={navStyle}>
      {links.map((path, index) => (
        <Link
          key={path}
          to={path}
          style={hovered === index ? { ...linkStyle, ...hoverStyle } : linkStyle}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {names[index]}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
