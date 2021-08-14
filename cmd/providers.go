package cmd

import (
	"fmt"
	providers "ingrid/v1/src/services/providers/go"
	"net"

	"github.com/spf13/cobra"
)

var providerCmd = &cobra.Command{
	Use: "provider",
	Short: "Starts provider service",
	Long: "Starts provider service",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Listening on:", net.JoinHostPort("0.0.0.0", "8085"))
		server := providers.NewServer(net.JoinHostPort("0.0.0.0", "8085"))
		return server.Run()
	},
}

func init() {
	RootCmd.AddCommand(providerCmd)
}