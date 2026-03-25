import {Link} from 'react-router-dom';

const CountryCard = ({country}) => {
  return (
    <Link to={`/country/${encodeURIComponent(country.name.common)}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white">
        <img 
          src={country.flags?.svg} 
          alt={`Flag of ${country.name.common}`} 
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{country.name.common}</h2>
          <p className="text-gray-600">Capital / Ibu Kota: {country.capital?.[0] || 'N/A'}</p>
          <p className="text-gray-600">Population / Populasi: {country.population?.toLocaleString() || 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;