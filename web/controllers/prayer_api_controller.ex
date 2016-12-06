defmodule Timetable.PrayerApiController do
  use Timetable.Web, :controller

  alias Timetable.PrayerApi

  # GET http://localhost:4000/api/prayers/
  def index(conn, _params) do
    prayer_apis = File.read!(filejamaah) |> Poison.decode!()

    [fajr, dhuhr, asr, maghrib, isha] = prayer_apis
    IO.puts "+++++"
    IO.inspect fajr["id"]
    IO.inspect asr["method"]
    IO.puts "+++++"

    render conn, prayer_apis: prayer_apis
  end

  # GET http://localhost:4000/api/prayers/1
  def show(conn, params) do
    prayer_apis = File.read!(filejamaah) |> Poison.decode!()
    render conn, prayer_api: prayer_apis |> Enum.find(&(&1["id"] === String.to_integer(params["id"])))
  end

 
  defp filejamaah() do
    Path.join(:code.priv_dir(:timetable), "db/jamaah.json")
  end

  defp fileprayers() do
    Path.join(:code.priv_dir(:timetable), "db/jamaah2.json")
  end

end
