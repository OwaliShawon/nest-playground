#!/bin/bash

# DDD Hexagonal Architecture - Quick Start Guide
# This script demonstrates how to test both persistence strategies

echo "======================================"
echo "DDD Hexagonal Architecture Demo"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}This example demonstrates:${NC}"
echo "1. Domain-Driven Design (DDD)"
echo "2. Hexagonal Architecture (Ports & Adapters)"
echo "3. Dynamic persistence switching (In-Memory vs ORM)"
echo ""

echo -e "${YELLOW}Option 1: Test with IN-MEMORY persistence${NC}"
echo "Data is stored in memory only (lost on restart)"
echo "Command: PERSISTENCE_TYPE=memory npm run start:dev"
echo ""

echo -e "${YELLOW}Option 2: Test with ORM persistence${NC}"
echo "Data is stored in PostgreSQL database (persists on restart)"
echo "Command: PERSISTENCE_TYPE=orm npm run start:dev"
echo "Or simply: npm run start:dev (orm is default)"
echo ""

echo -e "${GREEN}Quick Test Commands:${NC}"
echo ""

echo "# Create a task"
echo 'curl -X POST http://localhost:3000/ddd/tasks \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{"title":"Learn DDD","description":"Study hexagonal architecture"}'"'"''
echo ""

echo "# Get all tasks"
echo "curl http://localhost:3000/ddd/tasks"
echo ""

echo "# Get task count"
echo "curl http://localhost:3000/ddd/tasks/count"
echo ""

echo "# Complete a task (replace TASK_ID)"
echo "curl -X PATCH http://localhost:3000/ddd/tasks/TASK_ID/complete"
echo ""

echo "# Delete a task (replace TASK_ID)"
echo "curl -X DELETE http://localhost:3000/ddd/tasks/TASK_ID"
echo ""

echo -e "${GREEN}Testing Persistence Difference:${NC}"
echo ""
echo "1. Start with memory: PERSISTENCE_TYPE=memory npm run start:dev"
echo "2. Create some tasks"
echo "3. Stop the server (Ctrl+C)"
echo "4. Restart: PERSISTENCE_TYPE=memory npm run start:dev"
echo "5. Get tasks - SHOULD BE EMPTY (memory is volatile)"
echo ""
echo "6. Switch to ORM: PERSISTENCE_TYPE=orm npm run start:dev"
echo "7. Create some tasks"
echo "8. Stop the server (Ctrl+C)"
echo "9. Restart: PERSISTENCE_TYPE=orm npm run start:dev"
echo "10. Get tasks - SHOULD STILL BE THERE (database persisted)"
echo ""

echo -e "${BLUE}Use the REST client file:${NC}"
echo "Open: src/ddd-example/ddd-tasks.http"
echo "Use VS Code REST Client extension to test endpoints"
echo ""

echo "======================================"
