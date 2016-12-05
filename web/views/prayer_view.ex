defmodule Timetable.PrayerView do
  use Timetable.Web, :view


  def render("index.json", %{prayers: prayers}) do
    render_many(prayers, __MODULE__, "prayer.json")
  end

  def render("show.json", %{prayer: prayer}) do
    render_one(prayer, __MODULE__, "prayer.json")
  end

  def render("prayer.json", %{prayer: prayer}) do
    %{
      name: prayer["prayer"],
      method: prayer["method"],
      number: prayer["number"]
    }
  end


end
