#!/bin/bash

# RabbitMQ Setup Script

echo "🚀 Starting RabbitMQ with Docker Compose..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Installing..."
    exit 1
fi

# Start RabbitMQ
echo "📦 Starting RabbitMQ container..."
docker-compose -f docker-compose.rabbitmq.yml up -d

# Wait for RabbitMQ to be ready
echo "⏳ Waiting for RabbitMQ to be ready..."
sleep 10

# Check if RabbitMQ is running
if docker ps | grep -q practice-nest-rabbitmq; then
    echo "✅ RabbitMQ is running!"
    echo ""
    echo "📊 RabbitMQ Management UI: http://localhost:15672"
    echo "👤 Username: guest"
    echo "🔐 Password: guest"
    echo ""
    echo "📝 AMQP Connection: amqp://guest:guest@localhost:5672/"
    echo ""
    echo "Commands:"
    echo "  - View logs:    docker logs practice-nest-rabbitmq"
    echo "  - Stop:         docker-compose -f docker-compose.rabbitmq.yml down"
    echo "  - Full cleanup: docker-compose -f docker-compose.rabbitmq.yml down -v"
else
    echo "❌ Failed to start RabbitMQ"
    exit 1
fi
