backend:
	@go run ./cmd/server serve

setup:
	@echo Installing Go dependencies...
	@cd ./cmd/server && go get
	@echo Installing Node dependencies...
	@cd ./web && pnpm install

frontend:
	@cd ./web && npm run dev

full:
	@docker compose build && docker compose up

down:
	@docker compose down

publish:
	@docker compose build && docker compose push gttp-backend && docker compose push gttp-frontend
