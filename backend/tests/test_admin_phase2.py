"""Phase 2 — HibiscusPlus admin panel backend tests.

Covers: login happy/error paths, /me, /stats, admin CRUD for recipes/products/blog,
public GET regression, and brute-force lockout.
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://tea-wellness-guide.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "emeraldofworship@hibiscusplus.co.uk"
ADMIN_PASSWORD = "Hibiscus2025!"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def token(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "access_token" in data
    assert data.get("token_type") == "bearer"
    return data["access_token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---------- Login ----------

class TestLogin:
    def test_login_success_shape(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        data = r.json()
        assert "access_token" in data and isinstance(data["access_token"], str)
        assert data["token_type"] == "bearer"
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        assert "password_hash" not in data["user"]

    def test_login_wrong_password(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": "wrongpass123"})
        assert r.status_code == 401
        assert r.json().get("detail") == "Invalid email or password"

    def test_login_malformed_email(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"email": "not-an-email", "password": "whatever"})
        assert r.status_code == 422


# ---------- /me ----------

class TestMe:
    def test_me_with_token(self, api, auth_headers):
        r = api.get(f"{BASE_URL}/api/admin/me", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "password_hash" not in data

    def test_me_no_token(self, api):
        r = requests.get(f"{BASE_URL}/api/admin/me")
        assert r.status_code == 401

    def test_me_invalid_token(self, api):
        r = requests.get(f"{BASE_URL}/api/admin/me", headers={"Authorization": "Bearer not-a-jwt"})
        assert r.status_code == 401


# ---------- /stats ----------

class TestStats:
    def test_stats_requires_auth(self):
        r = requests.get(f"{BASE_URL}/api/admin/stats")
        assert r.status_code == 401

    def test_stats_returns_counts(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        for key in ("recipes", "products", "blog_posts", "newsletter_subscribers", "feedback"):
            assert key in data
            assert isinstance(data[key], int)


# ---------- CRUD: Recipes ----------

class TestRecipesCRUD:
    created_id = None

    def test_create_requires_auth(self):
        r = requests.post(f"{BASE_URL}/api/admin/recipes", json={"name": "TEST no auth"})
        assert r.status_code == 401

    def test_create_update_delete(self, auth_headers):
        payload = {"name": "TEST_Recipe_Phase2", "category": "test", "ingredients": ["a"], "benefits": "testing"}
        r = requests.post(f"{BASE_URL}/api/admin/recipes", json=payload, headers=auth_headers)
        assert r.status_code == 200, r.text
        data = r.json()["data"]
        assert data["name"] == payload["name"]
        assert "id" in data and len(data["id"]) > 0
        rid = data["id"]

        # verify via public GET
        g = requests.get(f"{BASE_URL}/api/recipes/{rid}")
        assert g.status_code == 200
        assert g.json()["data"]["name"] == payload["name"]

        # update
        u = requests.put(f"{BASE_URL}/api/admin/recipes/{rid}", json={"name": "TEST_Recipe_Phase2_updated"}, headers=auth_headers)
        assert u.status_code == 200
        assert u.json()["data"]["name"] == "TEST_Recipe_Phase2_updated"

        # delete
        d = requests.delete(f"{BASE_URL}/api/admin/recipes/{rid}", headers=auth_headers)
        assert d.status_code == 200
        assert d.json()["deleted"] == rid

        # 404 after delete
        g2 = requests.get(f"{BASE_URL}/api/recipes/{rid}")
        assert g2.status_code == 404


# ---------- CRUD: Products ----------

class TestProductsCRUD:
    def test_create_update_delete(self, auth_headers):
        payload = {"name": "TEST_Product_Phase2", "price": 9.99, "in_stock": True, "category": "test"}
        r = requests.post(f"{BASE_URL}/api/admin/products", json=payload, headers=auth_headers)
        assert r.status_code == 200, r.text
        pid = r.json()["data"]["id"]

        u = requests.put(f"{BASE_URL}/api/admin/products/{pid}", json={"price": 19.99}, headers=auth_headers)
        assert u.status_code == 200
        assert u.json()["data"]["price"] == 19.99

        d = requests.delete(f"{BASE_URL}/api/admin/products/{pid}", headers=auth_headers)
        assert d.status_code == 200

        g = requests.get(f"{BASE_URL}/api/products/{pid}")
        assert g.status_code == 404

    def test_delete_nonexistent(self, auth_headers):
        r = requests.delete(f"{BASE_URL}/api/admin/products/{uuid.uuid4()}", headers=auth_headers)
        assert r.status_code == 404


# ---------- CRUD: Blog ----------

class TestBlogCRUD:
    def test_create_update_delete(self, auth_headers):
        payload = {"title": "TEST_BlogPost_Phase2", "category": "test", "excerpt": "x", "content": "y"}
        r = requests.post(f"{BASE_URL}/api/admin/blog", json=payload, headers=auth_headers)
        assert r.status_code == 200, r.text
        bid = r.json()["data"]["id"]

        u = requests.put(f"{BASE_URL}/api/admin/blog/{bid}", json={"title": "TEST_BlogPost_Phase2_updated"}, headers=auth_headers)
        assert u.status_code == 200
        assert u.json()["data"]["title"] == "TEST_BlogPost_Phase2_updated"

        d = requests.delete(f"{BASE_URL}/api/admin/blog/{bid}", headers=auth_headers)
        assert d.status_code == 200

        g = requests.get(f"{BASE_URL}/api/blog/{bid}")
        assert g.status_code == 404


# ---------- Public regression ----------

class TestPublicRegression:
    def test_recipes_public(self):
        r = requests.get(f"{BASE_URL}/api/recipes")
        assert r.status_code == 200
        assert r.json()["success"] is True

    def test_products_public(self):
        r = requests.get(f"{BASE_URL}/api/products")
        assert r.status_code == 200

    def test_blog_public(self):
        r = requests.get(f"{BASE_URL}/api/blog")
        assert r.status_code == 200


# ---------- Brute-force lockout ----------
# Run LAST so subsequent login tests (if any) aren't affected. Uses a dedicated
# email so it does not lock out the real admin.

class TestBruteForce:
    def test_lockout_after_wrong_attempts(self):
        """Note: behind the ingress, requests can arrive from multiple proxy source
        IPs, so we fire >15 attempts from a keep-alive session and assert that the
        429 lockout kicks in by the end. This matches real-world behaviour where
        a single attacker hitting from one upstream will be throttled."""
        email = "bruteforce-test-2@hibiscusplus.co.uk"
        s = requests.Session()
        statuses = []
        for i in range(20):
            r = s.post(
                f"{BASE_URL}/api/admin/login",
                json={"email": email, "password": "wrong"},
                headers={"Content-Type": "application/json"},
            )
            statuses.append(r.status_code)
        assert 429 in statuses, f"no 429 lockout observed in 20 attempts; got {statuses}"
        # After the first 429, subsequent attempts should also be 429
        first_lock = statuses.index(429)
        assert all(c == 429 for c in statuses[first_lock:]), f"lockout did not persist: {statuses}"
