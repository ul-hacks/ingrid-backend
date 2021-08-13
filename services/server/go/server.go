package server

import (
	"fmt"
	"net/http"
	"time"
)

type Server struct {
	hostPort string
}

func NewServer(hostPort string) *Server{
	return &Server{
		hostPort: hostPort,
	}
}

func (s *Server) Run() error {
	muxServer := http.NewServeMux()
	muxServer.Handle("/", http.HandlerFunc(s.greet))
	return http.ListenAndServe(s.hostPort, muxServer)
}

func (s *Server) greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World! %s", time.Now())
}
