import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
  const {name} = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCountry = async () => {
      try {
        const fields = 'name,flags,capital,population,area,currencies,languages,maps,independent,coatOfArms';
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=${fields}`,
          { signal: controller.signal }
        );
        setCountry(response.data[0]);
        setError(null);
      } catch (err) {
        if (err.name !== "Error") {
          setError("Data negara tidak berhasil diambil. Coba lagi nanti.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
    return () => controller.abort();
  }, [name]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <Link to="/search" className="text-blue-600 hover:underline mt-4 inline-block">Back to Search</Link>
      </div>
    );
  }

  if (!country) return null;

  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/search" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Kembali ke pencarian</Link>

      <div className="flex flex-wrap gap-20 items-start justify-center mb-6">
  <div className="text-center">
    <img 
      src={country.flags.svg} 
      alt={`Flag of ${country.name.common}`}
      className="w-64 h-auto shadow-sm"
    />
  </div>
  {country.coatOfArms?.svg && (
    <div className="text-center">
      <img 
        src={country.coatOfArms.svg} 
        alt={`Coat of arms of ${country.name.common}`}
        className="w-32 h-auto shadow-sm"
      />
    </div>
  )}
</div>
      
      <br></br>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-semibold">Nama Negara (dalam bahasa Inggris):</span> {country.name.official}</p>
              <p><span className="font-semibold">Ibu Kota / Capital:</span> {country.capital?.[0] || 'N/A'}</p>
              <p><span className="font-semibold">Populasi / Population:</span> {country.population?.toLocaleString() || 'N/A'}</p>
              <p><span className="font-semibold">Luas / Area:</span> {country.area?.toLocaleString() || 'N/A'} km²</p>
            </div>
            <div>
              <p><span className="font-semibold">Mata Uang / Currencies:</span> {currencies}</p>
              <p><span className="font-semibold">Bahasa / Languages:</span> {languages}</p>
              <p>
                <span className="font-semibold">Peta / Map:</span>{' '}
                <a href={country.maps?.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Lihat di Google Map / View on Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;