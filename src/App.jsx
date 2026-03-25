import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {CountriesProvider} from './contexts/CountriesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CountrySearch from './pages/CountrySearch';
import CountryDetail from './pages/CountryDetail';
import CountryFilter from './pages/CountryFilter';
import About from './pages/About';

const NotFound = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-xl text-gray-600">Page not found.</p>
    <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">Go to Home</a>
  </div>
);

function App() {
  return (
    <CountriesProvider>
      <Router>
        <Navbar />
        <main className="bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<CountrySearch />} />
            <Route path="/country/:name" element={<CountryDetail />} />
            <Route path="/filter" element={<CountryFilter />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </CountriesProvider>
  );
}

export default App;