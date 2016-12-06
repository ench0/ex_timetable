defmodule Timetable.PrayerApiView do
  use Timetable.Web, :view


  def render("index.json", %{prayer_apis: prayer_apis}) do
    render_many(prayer_apis, __MODULE__, "prayer.json")
  end

  def render("show.json", %{prayer_api: prayer_api}) do
    render_one(prayer_api, __MODULE__, "prayer.json")
  end

  def render("prayer.json", %{prayer_api: prayer_api}) do
    %{
      name: prayer_api["prayer"],
      method: prayer_api["method"],
      number: prayer_api["number"]
    }
  end


end
