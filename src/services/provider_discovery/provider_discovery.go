package provider_discovery

import (
	"fmt"
	"io"
	"net/http"
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
	muxServer.Handle("/", http.HandlerFunc(s.discovery))
	return http.ListenAndServe(s.hostPort, muxServer)
}

func copyHeader(dst, src http.Header) {
	for k, vv := range src {
		for _, v := range vv {
			dst.Add(k, v)
		}
	}
}

func (s *Server) discovery(w http.ResponseWriter, r *http.Request) {

	sendRequestParseBody := func(provider string) error {
		resp, err := http.Get(provider)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return err
		}
		defer resp.Body.Close()

		copyHeader(w.Header(), resp.Header)
		// write the response code
		w.WriteHeader(resp.StatusCode)

		// copies over body
		io.Copy(w, resp.Body)
		return nil
	}

	provider := r.FormValue("provider")
	switch provider {
	case "GITHUB":
		username := r.FormValue("username")
		if username == "" {
			w.WriteHeader(http.StatusBadRequest)
		}
		sendRequestParseBody(fmt.Sprintf("providers-rust:8084/github?username=%s", username))
	}

}