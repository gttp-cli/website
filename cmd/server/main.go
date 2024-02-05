package main

import (
	"log/slog"
	"os"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pterm/pterm"
	slogecho "github.com/samber/slog-echo"

	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	debug := true
	if os.Getenv("PROD") == "true" {
		debug = false
	}

	// Create logger
	var logger *slog.Logger

	if debug {
		logger = slog.New(pterm.NewSlogHandler(pterm.DefaultLogger.WithLevel(pterm.LogLevelDebug)))
	} else {
		logger = slog.New(slog.NewTextHandler(os.Stderr, nil))
	}

	logger.Debug("debug mode enabled")

	logger.Info("starting gttp.dev")
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Register middlewares
		e.Router.Use(middleware.CORS())
		e.Router.Use(middleware.Recover())
		e.Router.Use(apis.ActivityLogger(app))

		if !debug {
			e.Router.Use(slogecho.NewWithConfig(logger, slogecho.Config{
				WithRequestHeader: true,
				WithRequestBody:   true,
			}))
		}

		return nil
	})

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	if err := app.Start(); err != nil {
		logger.Error(err.Error())
	}
}
