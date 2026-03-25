import {NavLink} from 'react-router-dom';

const Navbar = () => {
  const activeClass = "font-bold border-b-2 border-white pb-1";
  return (
    <nav className="bg-blue-800 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
         <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <img src="image.png" alt="WorldUniversity icon" className="h-8 w-auto" />
          <span>WorldUniversity</span>
        </NavLink>
        <ul className="flex space-x-4">
          <li><NavLink to="/" className={({isActive}) => isActive ? activeClass : "hover:underline"}>Home</NavLink></li>
          <li><NavLink to="/search" className={({isActive}) => isActive ? activeClass : "hover:underline"}>Search</NavLink></li>
          <li><NavLink to="/filter" className={({isActive}) => isActive ? activeClass : "hover:underline"}>Filter</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? activeClass : "hover:underline"}>Tentang Kami</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;