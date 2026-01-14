# API Contracts & Backend Integration Plan

## Overview
This document outlines the API contracts, data models, and integration strategy for Hibiscus & Beyond full-stack application.

---

## 1. Data Models (MongoDB Collections)

### 1.1 Recipes Collection
```python
{
  "_id": ObjectId,
  "name": str,
  "category": str,  # "Stress Relief", "Immunity Boost", "Digestive Health", "Heart Health", "Sleep Aid"
  "ailments": [str],  # ["stress relief", "anxiety"]
  "ingredients": [str],
  "instructions": [str],
  "benefits": str,
  "prep_time": str,
  "image": str,
  "created_at": datetime,
  "updated_at": datetime
}
```

### 1.2 Products Collection
```python
{
  "_id": ObjectId,
  "name": str,
  "category": str,  # "Dried Herbs", "Tea Blends", "Accessories"
  "price": float,
  "description": str,
  "weight": str,
  "image": str,
  "in_stock": bool,
  "created_at": datetime,
  "updated_at": datetime
}
```

### 1.3 Blog Posts Collection
```python
{
  "_id": ObjectId,
  "title": str,
  "excerpt": str,
  "content": str,  # Full article content
  "category": str,  # "History", "Health", "Gardening", "Lifestyle"
  "author": str,
  "date": datetime,
  "read_time": str,
  "image": str,
  "created_at": datetime,
  "updated_at": datetime
}
```

### 1.4 Newsletter Subscribers Collection
```python
{
  "_id": ObjectId,
  "email": str,  # unique, validated
  "subscribed_at": datetime,
  "is_active": bool,
  "source": str  # "website", "stall", etc.
}
```

### 1.5 Saved Recipes Collection (User Favorites)
```python
{
  "_id": ObjectId,
  "session_id": str,  # Browser session/user identifier
  "recipe_id": ObjectId,
  "saved_at": datetime
}
```

---

## 2. API Endpoints

### 2.1 Recipes API

#### GET /api/recipes
**Description**: Fetch all recipes with optional filtering
**Query Parameters**:
- `category` (optional): Filter by category
- `search` (optional): Search in name/ingredients
- `ailment` (optional): Filter by ailment

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "ailments": ["string"],
      "ingredients": ["string"],
      "instructions": ["string"],
      "benefits": "string",
      "prep_time": "string",
      "image": "string"
    }
  ],
  "count": 6
}
```

#### GET /api/recipes/:id
**Description**: Fetch single recipe by ID
**Response**: Single recipe object

---

### 2.2 Products API

#### GET /api/products
**Description**: Fetch all products with optional filtering
**Query Parameters**:
- `category` (optional): Filter by category
- `in_stock` (optional): Filter by availability

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "category": "string",
      "price": 14.99,
      "description": "string",
      "weight": "string",
      "image": "string",
      "in_stock": true
    }
  ],
  "count": 6
}
```

#### GET /api/products/:id
**Description**: Fetch single product by ID
**Response**: Single product object

---

### 2.3 Blog Posts API

#### GET /api/blog
**Description**: Fetch all blog posts with pagination
**Query Parameters**:
- `category` (optional): Filter by category
- `limit` (optional): Number of posts per page (default: 10)
- `page` (optional): Page number (default: 1)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string",
      "category": "string",
      "author": "string",
      "date": "2025-01-15",
      "read_time": "5 min read",
      "image": "string"
    }
  ],
  "count": 4,
  "total_pages": 1
}
```

#### GET /api/blog/:id
**Description**: Fetch single blog post with full content
**Response**: Single blog post object with full content

---

### 2.4 Newsletter API

#### POST /api/newsletter/subscribe
**Description**: Subscribe to newsletter
**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Email already subscribed"
}
```

---

### 2.5 Saved Recipes API (Future Enhancement)

#### POST /api/saved-recipes
**Description**: Save a recipe to favorites
**Request Body**:
```json
{
  "recipe_id": "string",
  "session_id": "string"
}
```

#### GET /api/saved-recipes/:session_id
**Description**: Get all saved recipes for a session

---

## 3. Mock Data Migration

### Current Mock Data Location: `/app/frontend/src/mock.js`

**Data to Seed in MongoDB**:
- ✅ 6 Recipes (all categories covered)
- ✅ 6 Products (herbs, blends, accessories)
- ✅ 4 Blog Posts
- ✅ 6 Hibiscus Benefits (for About section)

**Migration Strategy**:
1. Create seed script: `/app/backend/seed_data.py`
2. Parse data from mock.js or create Python equivalent
3. Insert data into MongoDB collections
4. Run seed script once during backend setup

---

## 4. Frontend Integration Changes

### Files to Update:

#### `/app/frontend/src/pages/Home.js`
**Changes Required**:
- Replace `import { recipes, products, blogPosts, hibiscusBenefits } from '../mock'`
- Add axios API calls to backend endpoints
- Implement loading states
- Handle error states
- Keep localStorage for saved recipes (client-side)

**API Integration Points**:
```javascript
// Recipes
const fetchRecipes = async (filters) => {
  const response = await axios.get(`${API}/recipes`, { params: filters });
  setRecipes(response.data.data);
}

// Products
const fetchProducts = async () => {
  const response = await axios.get(`${API}/products`);
  setProducts(response.data.data);
}

// Blog Posts
const fetchBlogPosts = async () => {
  const response = await axios.get(`${API}/blog`);
  setBlogPosts(response.data.data);
}

// Newsletter Subscription
const handleNewsletterSignup = async (e) => {
  e.preventDefault();
  await axios.post(`${API}/newsletter/subscribe`, { email });
  toast.success('Thank you for subscribing!');
  setEmail('');
}
```

---

## 5. Backend Implementation Steps

### Phase 1: Setup & Models
1. ✅ Create MongoDB models in `/app/backend/models/`
2. ✅ Create seed data script
3. ✅ Seed initial data

### Phase 2: API Endpoints
1. ✅ Recipes endpoints (GET all, GET by ID)
2. ✅ Products endpoints (GET all, GET by ID)
3. ✅ Blog endpoints (GET all, GET by ID)
4. ✅ Newsletter subscription endpoint

### Phase 3: Testing
1. Test all endpoints with curl/Postman
2. Verify data retrieval
3. Test filtering and search

### Phase 4: Frontend Integration
1. Remove mock.js imports
2. Add API calls
3. Add loading states
4. Test full flow

---

## 6. Important Notes

### Current Status:
- ✅ Frontend fully functional with mock data
- ✅ Shop section has "Coming Soon" banner
- ✅ Newsletter signup ready for backend
- ⏳ Backend APIs to be implemented

### Post-Launch Considerations:
- Payment gateway integration (Stripe/PayPal) - after registration
- User authentication (optional for phase 1)
- Order management system (future)
- Admin panel for content management (future)

---

## 7. Testing Strategy

### Backend Testing:
```bash
# Test recipes endpoint
curl http://localhost:8001/api/recipes

# Test with filters
curl "http://localhost:8001/api/recipes?category=Stress%20Relief"

# Test newsletter subscription
curl -X POST http://localhost:8001/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Integration Testing:
- Verify recipes display correctly
- Test search and filter functionality
- Test newsletter signup flow
- Verify product display
- Check blog post rendering

---

## Timeline

**Phase 1 (Backend Setup)**: ~30 minutes
**Phase 2 (API Implementation)**: ~45 minutes
**Phase 3 (Frontend Integration)**: ~30 minutes
**Phase 4 (Testing)**: ~20 minutes

**Total Estimated Time**: ~2 hours

---

*Last Updated: January 14, 2025*
