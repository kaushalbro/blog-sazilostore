#!/bin/bash
# ==============================================================================
# Sazilo Store - Unified Docker Management Script
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

CONTAINER_NAME="sazilo-store-app"

# Styling
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}======================================================${NC}"
    echo -e "${CYAN}   🛍️  Sazilo Store - All-in-One Docker Control        ${NC}"
    echo -e "${BLUE}======================================================${NC}"
}

cmd_update() {
    echo -e "${YELLOW}>>> Rebuilding and updating code in container...${NC}"
    docker compose up -d --build
    echo -e "${GREEN}>>> Code updated and container restarted successfully!${NC}"
    echo -e "${GREEN}Frontend: http://localhost:4321${NC}"
    echo -e "${GREEN}Strapi Admin: http://localhost:1337/admin${NC}"
}

cmd_start() {
    echo -e "${YELLOW}>>> Starting Sazilo Store container...${NC}"
    docker compose up -d
    echo -e "${GREEN}>>> Sazilo Store is now running!${NC}"
}

cmd_stop() {
    echo -e "${YELLOW}>>> Stopping Sazilo Store container...${NC}"
    docker compose down
    echo -e "${GREEN}>>> Sazilo Store container stopped.${NC}"
}

cmd_restart() {
    echo -e "${YELLOW}>>> Restarting container...${NC}"
    docker restart "$CONTAINER_NAME"
    echo -e "${GREEN}>>> Container restarted successfully!${NC}"
}

cmd_refresh_blog() {
    echo -e "${YELLOW}>>> Rebuilding Astro blog frontend inside container...${NC}"
    docker exec "$CONTAINER_NAME" supervisorctl restart astro
    echo -e "${GREEN}>>> Astro blog rebuild triggered and live!${NC}"
}

cmd_logs() {
    echo -e "${YELLOW}>>> Streaming live container logs (Ctrl+C to exit)...${NC}"
    docker compose logs -f
}

cmd_status() {
    print_header
    echo -e "\n${CYAN}1. Container Status:${NC}"
    docker ps --filter "name=$CONTAINER_NAME"
    
    echo -e "\n${CYAN}2. Live Resource Usage (RAM / CPU):${NC}"
    docker stats --no-stream "$CONTAINER_NAME"
    
    echo -e "\n${CYAN}3. Services inside container:${NC}"
    docker exec "$CONTAINER_NAME" supervisorctl status 2>/dev/null || echo "Container is not currently running."
}

cmd_backup_db() {
    BACKUP_FILE="backup_blog_$(date +%Y%m%d_%H%M%S).sql"
    echo -e "${YELLOW}>>> Creating database backup to $BACKUP_FILE...${NC}"
    docker exec "$CONTAINER_NAME" mariadb-dump -u root -p@root123 blog > "$BACKUP_FILE"
    echo -e "${GREEN}>>> Database successfully exported to $BACKUP_FILE (${NC}$(du -h "$BACKUP_FILE" | cut -f1)${GREEN})${NC}"
}

cmd_reset_admin() {
    EMAIL="${2:-admin@vritico.com}"
    if [ -n "$3" ]; then
        NEW_PASS="$3"
    else
        read -p "Enter new admin password for $EMAIL: " NEW_PASS
    fi
    if [ -z "$NEW_PASS" ]; then
        echo -e "${RED}Password cannot be empty.${NC}"
        return
    fi
    echo -e "${YELLOW}>>> Resetting Strapi Admin password for $EMAIL...${NC}"
    docker exec "$CONTAINER_NAME" bash -c "cd /app/blog-cms && DATABASE_CLIENT=mysql DATABASE_HOST=127.0.0.1 DATABASE_PORT=3306 DATABASE_NAME=blog DATABASE_USERNAME=root DATABASE_PASSWORD='@root123' APP_KEYS='lxLQVuOI4c5zA+U76ZTChw==,wzayKU1ID4OPqF87tvR9YQ==,+iq3/kDD1phTgaqCoHSxcA==' API_TOKEN_SALT='AoQ7/6hERXSLanFWkRWazg==' ADMIN_JWT_SECRET='qMtK16lGuJXSuvtG1Cuu1w==' JWT_SECRET='/yLEiwPHuYLCFGFxN27OAQ==' TRANSFER_TOKEN_SALT='KBgcYG7j1Dc6WUHIEL2+IA==' ENCRYPTION_KEY='V+vIeG92Faa2mOjC7+fxTA==' npx strapi admin:reset-user-password --email '$EMAIL' --password '$NEW_PASS'"
    echo -e "${GREEN}>>> Admin password updated successfully!${NC}"
}

show_menu() {
    print_header
    echo "1) update        - Rebuild container with latest code changes"
    echo "2) refresh-blog  - Re-generate Astro blog after adding new Strapi posts"
    echo "3) start         - Start the container in background"
    echo "4) stop          - Stop the container"
    echo "5) restart       - Quick restart the container"
    echo "6) logs          - View live container logs"
    echo "7) status        - Check container status and RAM consumption"
    echo "8) backup-db     - Export full database backup to .sql file"
    echo "9) reset-admin   - Reset Strapi admin password"
    echo "0) exit          - Exit"
    echo ""
    read -p "Select an option [0-9]: " choice
    case "$choice" in
        1) cmd_update ;;
        2) cmd_refresh_blog ;;
        3) cmd_start ;;
        4) cmd_stop ;;
        5) cmd_restart ;;
        6) cmd_logs ;;
        7) cmd_status ;;
        8) cmd_backup_db ;;
        9) cmd_reset_admin ;;
        0) exit 0 ;;
        *) echo -e "${RED}Invalid option.${NC}" ;;
    esac
}

# Process CLI args
case "$1" in
    update|build)
        cmd_update
        ;;
    start)
        cmd_start
        ;;
    stop)
        cmd_stop
        ;;
    restart)
        cmd_restart
        ;;
    refresh|refresh-blog)
        cmd_refresh_blog
        ;;
    logs)
        cmd_logs
        ;;
    status)
        cmd_status
        ;;
    backup|backup-db)
        cmd_backup_db
        ;;
    reset-admin)
        cmd_reset_admin "$@"
        ;;
    "")
        show_menu
        ;;
    *)
        echo "Usage: ./manage.sh [update|refresh-blog|start|stop|restart|logs|status|backup-db|reset-admin]"
        exit 1
        ;;
esac
