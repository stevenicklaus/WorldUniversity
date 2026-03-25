import {useContext, useState, useMemo} from 'react';
import {CountriesContext} from '../contexts/CountriesContext';
import CountryCard from '../components/CountryCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const CountryFilter = () => {
  const { allCountries, loading, error } = useContext(CountriesContext);
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [independent, setIndependent] = useState(false);

  const regions = useMemo(() => [...new Set(allCountries.map(c => c.region).filter(Boolean))], [allCountries]);
  const languages = useMemo(() => [...new Set(allCountries.flatMap(c => Object.values(c.languages || {})))], [allCountries]);

  let filtered = allCountries;
  if (region) filtered = filtered.filter(c => c.region == region);
  if (language) filtered = filtered.filter(c => Object.values(c.languages || {}).includes(language));
  if (independent) filtered = filtered.filter(c => c.independent == true);

  return (
  <section className='text-center'>
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Filter Negara</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        {loading ? (
          <p className="text-gray-500">Loading filter options...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-2">Benua / Continent</label>
              <select 
                value={region} 
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Semua / All</option>
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Bahasa / Language</label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Semua / All</option>
                {languages.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-4">
                <input 
                  type="checkbox" 
                  checked={independent}
                  onChange={(e) => setIndependent(e.target.checked)}
                  className="form-checkbox h-6 w-6 text-blue-600"
                />
                <span className="font-semibold">Hanya negara merdeka / Independent only</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada negara yang anda inginkan. / No countries match the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map(country => (
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

export default CountryFilter;