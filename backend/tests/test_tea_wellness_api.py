"""
Backend API tests for HibiscusPlus Tea Wellness Guide
Tests: recipes, products, blog, newsletter endpoints
Includes verification of recipe content, branding, and research-backed benefits
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestRecipesAPI:
    """Tests for /api/recipes endpoint - verify all 12 recipes load with correct content"""
    
    def test_get_all_recipes_returns_12(self):
        """Verify all 12 recipes load on homepage via /api/recipes endpoint"""
        response = requests.get(f"{BASE_URL}/api/recipes")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert data["count"] == 12
        assert len(data["data"]) == 12
    
    def test_recipe_7_has_beetroot_and_research_keywords(self):
        """Verify recipe 7 (Original Hibiscus Wellness Zobo) has beetroot and research-backed benefits"""
        response = requests.get(f"{BASE_URL}/api/recipes/7")
        assert response.status_code == 200
        
        data = response.json()
        recipe = data["data"]
        
        assert recipe["name"] == "Original Hibiscus Wellness Zobo"
        
        # Check beetroot in ingredients
        ingredients_str = " ".join(recipe.get("ingredients", [])).lower()
        assert "beetroot" in ingredients_str, "Recipe 7 should include beetroot"
        
        # Check research-backed keywords
        benefits = recipe.get("benefits", "").lower()
        assert "anthocyanin" in benefits, "Recipe 7 should mention anthocyanin"
    
    def test_recipe_8_vanilla_comfort_no_beetroot(self):
        """Verify recipe 8 (Vanilla Comfort Zobo) does NOT include beetroot"""
        response = requests.get(f"{BASE_URL}/api/recipes/8")
        assert response.status_code == 200
        
        data = response.json()
        recipe = data["data"]
        
        assert recipe["name"] == "Vanilla Comfort Zobo"
        
        # Verify NO beetroot in ingredients
        ingredients_str = " ".join(recipe.get("ingredients", [])).lower()
        assert "beetroot" not in ingredients_str, "Recipe 8 (Vanilla Comfort) should NOT include beetroot"
    
    def test_recipe_9_has_beetroot(self):
        """Verify recipe 9 (Tropical Ginger Pineapple Zobo) has beetroot"""
        response = requests.get(f"{BASE_URL}/api/recipes/9")
        assert response.status_code == 200
        
        data = response.json()
        recipe = data["data"]
        
        ingredients_str = " ".join(recipe.get("ingredients", [])).lower()
        assert "beetroot" in ingredients_str, "Recipe 9 should include beetroot"
        
        # Check for bromelain keyword
        benefits = recipe.get("benefits", "").lower()
        assert "bromelain" in benefits, "Recipe 9 should mention bromelain"
    
    def test_recipe_10_beetroot_lime_reviver(self):
        """Verify recipe 10 is 'Beetroot Lime Zobo Reviver' (replaced watermelon version)"""
        response = requests.get(f"{BASE_URL}/api/recipes/10")
        assert response.status_code == 200
        
        data = response.json()
        recipe = data["data"]
        
        # Verify name is correct (beetroot lime, not watermelon)
        assert recipe["name"] == "Beetroot Lime Zobo Reviver", f"Recipe 10 should be 'Beetroot Lime Zobo Reviver', got: {recipe['name']}"
        
        # Verify beetroot in ingredients
        ingredients_str = " ".join(recipe.get("ingredients", [])).lower()
        assert "beetroot" in ingredients_str, "Recipe 10 should include beetroot"
        
        # Verify no watermelon
        assert "watermelon" not in ingredients_str, "Recipe 10 should NOT include watermelon"
        
        # Check for nitric oxide keyword
        benefits = recipe.get("benefits", "").lower()
        assert "nitric oxide" in benefits, "Recipe 10 should mention nitric oxide"
    
    def test_recipe_11_has_beetroot_and_cinnamaldehyde(self):
        """Verify recipe 11 (Spiced Cinnamon Vanilla Zobo) has beetroot and cinnamaldehyde"""
        response = requests.get(f"{BASE_URL}/api/recipes/11")
        assert response.status_code == 200
        
        data = response.json()
        recipe = data["data"]
        
        # Check beetroot in ingredients
        ingredients_str = " ".join(recipe.get("ingredients", [])).lower()
        assert "beetroot" in ingredients_str, "Recipe 11 should include beetroot"
        
        # Check cinnamaldehyde keyword
        benefits = recipe.get("benefits", "").lower()
        assert "cinnamaldehyde" in benefits, "Recipe 11 should mention cinnamaldehyde"
    
    def test_recipe_12_has_beetroot(self):
        """Verify recipe 12 (Citrus Lime Zing Zobo) has beetroot"""
        response = requests.get(f"{BASE_URL}/api/recipes/12")
        assert response.status_code == 200
        
        data = response.json()
        recipe = data["data"]
        
        ingredients_str = " ".join(recipe.get("ingredients", [])).lower()
        assert "beetroot" in ingredients_str, "Recipe 12 should include beetroot"
    
    def test_recipes_have_required_fields(self):
        """Verify all recipes have required fields"""
        response = requests.get(f"{BASE_URL}/api/recipes")
        assert response.status_code == 200
        
        data = response.json()
        required_fields = ["id", "name", "category", "ingredients", "instructions", "benefits"]
        
        for recipe in data["data"]:
            for field in required_fields:
                assert field in recipe, f"Recipe {recipe.get('id', 'unknown')} missing field: {field}"


class TestProductsAPI:
    """Tests for /api/products endpoint"""
    
    def test_get_products(self):
        """Verify products endpoint returns successfully"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "data" in data


class TestBlogAPI:
    """Tests for /api/blog endpoint"""
    
    def test_get_blog_posts(self):
        """Verify blog endpoint returns successfully"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "data" in data


class TestNewsletterAPI:
    """Tests for /api/newsletter endpoint"""
    
    def test_newsletter_subscribe(self):
        """Test newsletter subscription"""
        import uuid
        test_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        
        response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": test_email}
        )
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True


class TestFeedbackAPI:
    """Tests for /api/feedback endpoint - Chester Tea Tasting Event feedback"""
    
    def test_submit_feedback(self):
        """Test feedback submission"""
        import uuid
        test_feedback = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
            "blend": "Metabo Ignite",
            "rating": 5,
            "taste": "Bold and spicy",
            "wouldBuy": "Absolutely",
            "comments": "Test feedback submission"
        }
        
        response = requests.post(f"{BASE_URL}/api/feedback", json=test_feedback)
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "success"
        assert data["message"] == "Feedback received"
    
    def test_get_feedback(self):
        """Test retrieving feedback"""
        response = requests.get(f"{BASE_URL}/api/feedback")
        assert response.status_code == 200
        
        data = response.json()
        assert "count" in data
        assert "data" in data
        assert isinstance(data["data"], list)


class TestAPIHealth:
    """Basic API health checks"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
