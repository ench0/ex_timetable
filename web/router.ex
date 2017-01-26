defmodule Timetable.Router do
  use Timetable.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :secure do
    plug :accepts, ["html"]
    plug BasicAuth, use_config: {:timetable, :pass}
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :admin_layout do
    plug :put_layout, {Timetable.LayoutView, :admin}
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Timetable do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Timetable do
    pipe_through :api
    resources "/prayers", PrayerApiController
  end

  scope "/prayers", Timetable do
    pipe_through [:secure, :admin_layout]
    get "/reboot", PrayerController, :reboot
    get "/confirm", PrayerController, :confirm
    resources "/", PrayerController
  end

  # Other scopes may use custom stacks.
  # scope "/api", Timetable do
  #   pipe_through :api
  # end
end
