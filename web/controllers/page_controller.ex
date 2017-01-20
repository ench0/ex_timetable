defmodule Timetable.PageController do
  use Timetable.Web, :controller

  def index(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()
    settings = File.read!(filesettings) |> Poison.decode!()

    # [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    # IO.puts "+++++"
    # IO.inspect prayerjamaah
    # # IO.inspect asr["method"]
    # IO.puts "+++++"

    render conn, "index.html", prayerjamaah: prayerjamaah, settings: settings
  end

  defp filejamaah() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/jamaah.json")
  end

  defp filesettings() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/settings.json")
  end

end

