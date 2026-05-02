import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPets, searchPets } from '../services/api';

const defaultImages = {
  dog: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
};

function PetList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    age: '',
    location: '',
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async (filterParams = {}) => {
    setLoading(true);
    setCurrentIndex(0);
    try {
      const response = await getPets();
      setPets(response.data.pets || []);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentIndex(0);
    try {
      const response = await searchPets(filters);
      setPets(response.data.pets || []);
    } catch (error) {
      console.error('Error searching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = (petId) => {
    if (user?.role === 'admin') {
      alert('Admins cannot adopt pets. Use the Admin panel to manage applications.');
      return;
    }
    navigate(`/apply/${petId}`);
  };

  const getPetImage = (pet) => {
    if (pet.image) return pet.image;
    const speciesLower = pet.species?.toLowerCase() || 'dog';
    return defaultImages[speciesLower] || defaultImages.dog;
  };

  const handleNext = () => {
    if (currentIndex < pets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentPet = pets[currentIndex];

  return (
    <div className="pet-list-container">
      <div className="pet-list-header">
        <h1>Find Your Match</h1>
        <p>Swipe to meet your new best friend</p>
      </div>

      <form className="pet-filters" onSubmit={handleSearch}>
        <div className="filter-group">
          <select
            name="species"
            value={filters.species}
            onChange={handleFilterChange}
          >
            <option value="">All Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>

          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={filters.breed}
            onChange={handleFilterChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={filters.age}
            onChange={handleFilterChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />

          <button type="submit" className="btn-primary">Search</button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => {
              setFilters({ species: '', breed: '', age: '', location: '' });
              fetchPets();
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {loading ? (
        <div className="loading">Loading pets...</div>
      ) : pets.length === 0 ? (
        <div className="no-pets">No pets found matching your criteria.</div>
      ) : (
        <div className="hinge-container">
          <div className="hinge-cards">
            {currentPet && (
              <div className="hinge-card" onClick={handleNext}>
                <div className="hinge-card-image">
                  <img 
                    src={getPetImage(currentPet)} 
                    alt={currentPet.name}
                  />
                </div>
                <div className="hinge-card-info">
                  <div className="hinge-card-name">{currentPet.name}</div>
                  <div className="hinge-card-details">
                    <span>{currentPet.breed}</span>
                    <span>•</span>
                    <span>{currentPet.age ? `${currentPet.age} yrs` : '?'}</span>
                  </div>
                  <div className="hinge-card-description">
                    {currentPet.description || `${currentPet.species} looking for a forever home`}
                  </div>
                  <div className="hinge-card-location">
                    📍 {currentPet.location || 'Unknown'}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hinge-actions">
            {user?.role === 'admin' ? (
              <div className="admin-notice">
                Admins cannot adopt. Go to Admin panel to manage applications.
              </div>
            ) : (
              <>
                <button className="hinge-btn skip" onClick={handleNext}>
                  ✕ Skip
                </button>
                <button 
                  className="hinge-btn apply"
                  onClick={() => handleApply(currentPet?.id)}
                >
                  ❤️ Adopt
                </button>
              </>
            )}
          </div>

          <div className="hinge-dots">
            {pets.slice(0, 5).map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="pet-count">
            {currentIndex + 1} of {pets.length} pets
          </div>
        </div>
      )}
    </div>
  );
}

export default PetList;