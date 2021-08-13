package cmd

import (
	"fmt"
	provider_discovery "ingrid/v1/services/provider_discovery"
	"net"

	"github.com/spf13/cobra"
)

var providerDiscoveryCmd = &cobra.Command{
	Use: "provider_discovery",
	Short: "Starts provider_discovery service",
	Long: "Starts provider_discovery service",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("Listening on:", net.JoinHostPort("0.0.0.0", "8083"))
		server := provider_discovery.NewServer(net.JoinHostPort("0.0.0.0", "8083"))
		return server.Run()
	},
}

func init() {
	RootCmd.AddCommand(providerDiscoveryCmd)
}