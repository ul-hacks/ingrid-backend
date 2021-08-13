package cmd

import (
	"fmt"
	server "ingrid/v1/services/server/go"
	"net"

	"github.com/spf13/cobra"
)

var serverCmd = &cobra.Command{
	Use: "server",
	Short: "Starts provider service",
	Long: "Starts provider service",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Listening on:", net.JoinHostPort("0.0.0.0", "8081"))
		server := server.NewServer(net.JoinHostPort("0.0.0.0", "8081"))
		return server.Run()
	},
}

func init() {
	RootCmd.AddCommand(serverCmd)
}