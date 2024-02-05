# Make Go Builder
FROM golang:alpine as go-builder
WORKDIR /app
COPY ./go.mod .
COPY ./go.sum .
RUN go mod download
COPY ./cmd ./cmd
#COPY ./internal ./internal
COPY ./migrations ./migrations
#COPY ./pkg ./pkg
ENV CGO_ENABLED=0
RUN go build -o server ./cmd/server/main.go

# Make final image
FROM alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=go-builder /app/server ./server
ENTRYPOINT ["./server", "serve", "--http=0.0.0.0:80"]

EXPOSE 80
