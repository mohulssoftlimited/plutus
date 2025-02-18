# Stage: Backend build
FROM python:3.10-slim AS builder
WORKDIR /backend

# Copy dependency file first for better caching
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy all application code
COPY . .

# Framework-specific instructions
RUN apt-get update && apt-get install -y libpq-dev

# Verify entry point exists
RUN test -f main.py || (echo "Entry point main.py not found" && exit 1)

# Final stage
FROM python:3.10-slim
WORKDIR /backend

# Copy everything from builder
COPY --from=builder /backend ./

# Set environment variables
ENV PYTHONPATH=/
ENV PORT=5000

# Runtime instructions
RUN pip install -r requirements.txt

EXPOSE 5000

# Start FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]

