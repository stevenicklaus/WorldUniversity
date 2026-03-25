import {useContext} from 'react';
import {CountriesContext} from '../contexts/CountriesContext';
import CountryCard from '../components/CountryCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home = () => {
  const {allCountries, loading, error} = useContext(CountriesContext);
  const popularCountries = allCountries.slice(0, 16);

  return (
    <div className="container mx-auto py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">Selamat Datang ke WorldUniversity</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-20">
          Mencari negara dengan mudah, sekarang hanya di WorldUniversity!
        </p>
      </section>

      <section className='text-center'>
        <h2 className="text-2xl font-semibold mx-auto mb-10">Negara Populer / Popular Countries</h2>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularCountries.map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;