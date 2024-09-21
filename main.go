package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	// 静的ファイルのディレクトリを設定
	staticDir := "./build"

	// 静的ファイルを提供するハンドラを設定
	fs := http.FileServer(http.Dir(staticDir))
	http.Handle("/", fs)

	// ポートを設定
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s...", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
