import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import EntertainerList from './pages/EntertainerList';
import EntertainerDetails from './pages/EntertainerDetails';
import AddEntertainer from './pages/AddEntertainer';
import PageWrapper from './components/PageWrapper';


function App() {
  return (
    <div className="w-100 bg-light min-vh-100">
      <Router>
        <Navbar />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/entertainers" element={<EntertainerList />} />
            <Route path="/entertainers/:id" element={<EntertainerDetails />} />
            <Route path="/entertainers/new" element={<AddEntertainer />} />
          </Routes>
        </PageWrapper>
      </Router>
    </div>
  );
}

export default App;
