defmodule Timetable.PrayerController do
  use Timetable.Web, :controller

  alias Timetable.Prayer

  # GET http://localhost:4000/api/prayers/
  def index(conn, _params) do
    prayers = File.read!(file) |> Poison.decode!()

    #File.open!(file2, prayers, [:write]) #|> Poison.encode!()

    #{:ok, file2} = File.open file2, [:write]
    #IO.binwrite file2,  Poison.encode!(prayers)
    #File.close file2

    [fajr, dhuhr, asr, maghrib, isha] = prayers
    IO.puts "+++++"
    IO.inspect fajr["id"]
    IO.inspect asr["method"]
    IO.puts "+++++"

    render conn, prayers: prayers
  end

  # GET http://localhost:4000/api/prayers/1
  def show(conn, params) do
    prayers = File.read!(file) |> Poison.decode!()
    render conn, prayer: prayers |> Enum.find(&(&1["id"] === String.to_integer(params["id"])))
  end


  # GET http://localhost:4000/api/prayers/new
  def new(conn, _params) do
    prayers = File.read!(file) |> Poison.decode!()


    #File.open!(file2, prayers, [:write]) #|> Poison.encode!()
    #changeset = Prayer.changeset(%Prayer{}, %{})

    IO.puts "+++++"
    IO.inspect conn.params
    IO.puts "+++++"

    #{:ok, file2} = File.open file2, [:write]
    #IO.binwrite file2,  Poison.encode!(prayers)
    #File.close file2

    [fajr, dhuhr, asr, maghrib, isha] = prayers
    IO.puts "+++++"
    IO.inspect fajr["id"]
    IO.inspect asr["method"]
    IO.puts "+++++"

    render conn, prayers: prayers, fajr: fajr, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha
  end

def create(conn, _params) do
    #get prayers
    prayers = File.read!(file) |> Poison.decode!()
    [fajr, dhuhr, asr, maghrib, isha] = prayers

    #modify prayers
    #prayers_new = IO.inspect conn.params["prayers"]
    #fajr = 

    #post prayers
    prayers = [fajr, dhuhr, asr, maghrib, isha]
    {:ok, file2} = File.open file2, [:write]
    IO.binwrite file2, Poison.encode!(prayers)
    File.close file2
    IO.puts "+++++ppp"
    IO.inspect conn.params["prayers"]["asr_hour"]
    IO.puts "-----"
    IO.inspect prayers
    #IO.inspect fajr
    IO.puts "+++++ppp"
    redirect conn, to: "/edit"
end



  defp file() do
    Path.join(:code.priv_dir(:timetable), "db/jamaah.json")
  end

  defp file2() do
    Path.join(:code.priv_dir(:timetable), "db/jamaah2.json")
  end

end
