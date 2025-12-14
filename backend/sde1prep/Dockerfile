FROM python:3.11-slim

WORKDIR /app

# Copy requirements from the app directory
COPY app/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8000

# Run the application
# Note: We use app.main:app because the main.py is inside the app package
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]