import { useMemo, useState } from 'react';
import './style.css';
import providersData from './data/providers';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import Home from './pages/Home';
import ProfileModal from './components/ProfileModal';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import AdminDashboard from './pages/AdminDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import UserDashboard from './pages/UserDashboard';
import SupportDashboard from './pages/SupportDashboard';
import Browse from './pages/Browse';
import PostJob from './pages/PostJob';
import Become from './pages/Become';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [role, setRole] = useState('user');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState('relevance');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // merge providers from localStorage (created via Become page) with bundled providers
    let localProviders = [];
    try {
      const raw = localStorage.getItem('hirepro_providers');
      if (raw) localProviders = JSON.parse(raw);
    } catch (e) {
      localProviders = [];
    }

    // combine local providers first so recently added appear at top
    const allProviders = [...localProviders, ...providersData];

    let list = allProviders.filter((p) => {
      if (category !== 'all' && p.profession !== category) return false;
      if (!q) return true;
      return (
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.profession && p.profession.toLowerCase().includes(q)) ||
        ((p.skills || []).join(' ').toLowerCase().includes(q)) ||
        (p.bio && p.bio.toLowerCase().includes(q))
      );
    });

    if (sort === 'rating') {
      list = list.slice().sort((a,b) => b.rating - a.rating);
    } else if (sort === 'price-asc') {
      list = list.slice().sort((a,b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = list.slice().sort((a,b) => b.price - a.price);
    }

    return list;
  }, [query, category, sort]);

  function openProfile(p) {
    setSelectedProvider(p);
    setShowModal(true);
  }

  function closeProfile() {
    setShowModal(false);
    setSelectedProvider(null);
  }
  

  return (
    <div id="mainApp">
      <Header
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        role={role}
        onRoleChange={setRole}
      />

      <main>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard/></ProtectedRoute>} />
          <Route path="/professional" element={<ProtectedRoute allowedRoles={["professional"]}><ProfessionalDashboard/></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute allowedRoles={["support"]}><SupportDashboard/></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user","professional","admin","support"]}><UserDashboard/></ProtectedRoute>} />
          <Route
            path="/browse"
            element={
              <Browse
                onView={openProfile}
                providers={filtered}
                query={query}
                onQueryChange={setQuery}
                category={category}
                onCategoryChange={setCategory}
                sort={sort}
                setSort={setSort}
              />
            }
          />
          <Route path="/become" element={<Become />} />
          <Route path="/post-job" element={<ProtectedRoute allowedRoles={["user","admin"]}><PostJob/></ProtectedRoute>} />
          <Route path="/" element={<Home />} />
        </Routes>

        {showModal && selectedProvider && (
          <ProfileModal provider={selectedProvider} onClose={closeProfile} role={role} />
        )}
      </main>
    </div>
  );
}

export default App;
