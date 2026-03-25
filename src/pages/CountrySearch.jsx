import {useContext, useState} from 'react';
import {CountriesContext} from '../contexts/CountriesContext';
import CountryCard from '../components/CountryCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const CountrySearch = () => {
  const {allCountries, loading, error} = useContext(CountriesContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <section className='text-center'>
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-6">Pencarian Negara</h1>
      <div className="mb-12">
        <input
          type="text"
          placeholder="Cari negara yang anda inginkan ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {filteredCountries.length === 0 ? (
            <p className="text-center text-gray-500">Negara yang anda cari tidak ada.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries.map(country => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  </section>
  );
};

export default CountrySearch;