package cmd

import (
	"fmt"
	authn "ingrid/v1/services/authn"
	"net"

	"github.com/spf13/cobra"
)

var authnCmd = &cobra.Command{
	Use: "authn",
	Short: "Starts authn service",
	Long: "Starts authn service",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Listening on:", net.JoinHostPort("0.0.0.0", "8082"))
		server := authn.NewServer(net.JoinHostPort("0.0.0.0", "8082"))
		return server.Run()
	},
}

func init() {
	RootCmd.AddCommand(authnCmd)
}