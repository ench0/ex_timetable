# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :timetable, Timetable.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "KD+R54N53l7fqrmE+PXJzFm8eC89JC4GbiTrGeMP6T1J5RK2FFcgNKLuWj+6Np3P",
  render_errors: [view: Timetable.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Timetable.PubSub,
           adapter: Phoenix.PubSub.PG2]#,
  # reloadable_compilers: [:gettext, :phoenix, :elixir]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
  