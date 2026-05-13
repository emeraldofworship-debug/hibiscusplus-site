# HibiscusPlus Backend — Railway Production Image
# Slim image. All Python deps have pre-built wheels 
FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies (better layer caching)
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r backend/requirements.txt \
    && pip install --no-cache-dir emergentintegrations \
       --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Copy backend source
COPY backend/ ./backend/

WORKDIR /app/backend

# Railway injects $PORT at runtime
EXPOSE 8001

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}"]
