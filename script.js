// HirePro Application JavaScript

// Sample professional data
const professionals = [
  {
    id: 1,
    name: "John Doe",
    profession: "Web Developer",
    experience: "5 years",
    rating: 4.8,
    price: "$50/hour",
    category: "developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "UI/UX Designer",
    experience: "4 years",
    rating: 4.9,
    price: "$45/hour",
    category: "designer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Mike Johnson",
    profession: "Math Tutor",
    experience: "3 years",
    rating: 4.7,
    price: "$30/hour",
    category: "tutor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    profession: "Wedding Photographer",
    experience: "6 years",
    rating: 4.9,
    price: "$80/hour",
    category: "photographer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Alex Chen",
    profession: "Content Writer",
    experience: "2 years",
    rating: 4.5,
    price: "$25/hour",
    category: "writer",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=200&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Emily Davis",
    profession: "Mobile App Developer",
    experience: "4 years",
    rating: 4.6,
    price: "$55/hour",
    category: "developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop&crop=face"
  }
];

// DOM Elements
const loginPage = document.getElementById('loginPage');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const searchInput = document.getElementById('searchInput');
const logoutBtn = document.getElementById('logoutBtn');
const togglePassword = document.getElementById('togglePassword');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  displayProfessionals(professionals);
});

// Setup event listeners
function setupEventListeners() {
  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Password toggle
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  }
  
  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  // Category filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      filterByCategory(this.value);
    });
  }
  
  // Rating filter
  const ratingFilter = document.getElementById('ratingFilter');
  if (ratingFilter) {
    ratingFilter.addEventListener('change', function() {
      filterByRating(this.value);
    });
  }
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple validation (in real app, this would be proper authentication)
  if (username && password) {
    // Hide login page and show main app
    loginPage.style.display = 'none';
    mainApp.style.display = 'block';
    
    // Display professionals
    displayProfessionals(professionals);
  } else {
    alert('Please enter both username and password');
  }
}

// Handle logout
function handleLogout() {
  // Show login page and hide main app
  loginPage.style.display = 'flex';
  mainApp.style.display = 'none';
  
  // Clear form
  document.getElementById('loginForm').reset();
}

// Handle search (updated to work with filters)
function handleSearch() {
  applyFilters();
}

// Display professionals
function displayProfessionals(data) {
  const container = document.getElementById('professionalsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (data.length === 0) {
    container.innerHTML = '<p class="no-results">No professionals found.</p>';
    return;
  }
  
  data.forEach(pro => {
    const card = document.createElement('div');
    card.className = 'professional-card';
    card.innerHTML = `
      <img src="${pro.image}" alt="${pro.name}" />
      <div class="card-content">
        <h3>${pro.name}</h3>
        <p class="profession">${pro.profession}</p>
        <p class="experience">${pro.experience} experience</p>
        <div class="rating">
          <span class="stars">⭐ ${pro.rating}</span>
          <span class="price">${pro.price}</span>
        </div>
        <button class="btn-hire" onclick="hireProfessional(${pro.id})">
          Hire Now
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Current filter state
let currentCategoryFilter = 'all';
let currentRatingFilter = 'all';

// Filter professionals by category
function filterByCategory(category) {
  currentCategoryFilter = category;
  applyFilters();
}

// Filter professionals by rating
function filterByRating(rating) {
  currentRatingFilter = rating;
  applyFilters();
}

// Apply all filters
function applyFilters() {
  let filtered = [...professionals];
  
  // Apply category filter
  if (currentCategoryFilter !== 'all') {
    filtered = filtered.filter(pro => pro.category === currentCategoryFilter);
  }
  
  // Apply rating filter
  if (currentRatingFilter !== 'all') {
    const minRating = parseFloat(currentRatingFilter);
    filtered = filtered.filter(pro => pro.rating >= minRating);
  }
  
  // Apply search filter if there's a search query
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
  if (searchQuery) {
    filtered = filtered.filter(pro => 
      pro.name.toLowerCase().includes(searchQuery) ||
      pro.profession.toLowerCase().includes(searchQuery)
    );
  }
  
  displayProfessionals(filtered);
}

// Hire professional (globally accessible function)
// eslint-disable-next-line no-unused-vars
function hireProfessional(id) {
  const professional = professionals.find(pro => pro.id === id);
  if (professional) {
    alert(`You've requested to hire ${professional.name}! 
    
In a real application, this would:
- Send a request to the professional
- Set up payment processing
- Create a project workspace
- Send notifications`);
  }
}

console.log('HirePro application loaded successfully!');