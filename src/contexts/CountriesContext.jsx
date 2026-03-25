import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const CountriesContext = createContext();
export const CountriesProvider = ({ children }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    const fetchAllCountries = async () => {
      try {
        const fields = 'name,flags,capital,population,region,languages,independent,cca3';
        const response = await axios.get(
          `https://restcountries.com/v3.1/all?fields=${fields}`,
          { signal: controller.signal }
        );
        setAllCountries(response.data);
        setError(null);
      } catch (err) {
        if (err.name !== "Error") {
          setError("Data negara tidak berhasil diambil. Coba lagi nanti.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAllCountries();
    return () => controller.abort();
  }, []);

  return (
    <CountriesContext.Provider value={{ allCountries, loading, error }}>
      {children}
    </CountriesContext.Provider>
  );
};