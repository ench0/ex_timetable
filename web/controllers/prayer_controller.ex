defmodule Timetable.PrayerController do
  use Timetable.Web, :controller

  alias Timetable.Prayer


  def index(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()

    [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    IO.puts "+++++"
    IO.inspect fajr["id"]
    IO.inspect asr["method"]
    IO.puts "+++++"

    render conn, prayerjamaah: prayerjamaah, fajr: fajr, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha
  end




  # GET http://localhost:4000/prayers/new
  def new(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()

    [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    IO.puts "+++++"
    IO.inspect fajr["id"]
    IO.inspect asr["method"]
    IO.puts "+++++"

    render conn, prayerjamaah: prayerjamaah, fajr: fajr, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha
  end

def create(conn, _params) do
      #get prayerjamaah
      prayerjamaah = File.read!(filejamaah) |> Poison.decode!()
      [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah

      #modify prayerjamaah
      prayerjamaah_new = IO.inspect conn.params["prayerjamaah"]
      fajr = %{"id" => 1, "name" => "fajr", "method" => prayerjamaah_new["fajr_method"], "hour" => prayerjamaah_new["fajr_hour"], "minute" => prayerjamaah_new["fajr_minute"]}
      dhuhr = %{"id" => 2, "name" => "dhuhr", "method" => prayerjamaah_new["dhuhr_method"], "hour" => prayerjamaah_new["dhuhr_hour"], "minute" => prayerjamaah_new["dhuhr_minute"]}
      asr = %{"id" => 3, "name" => "asr", "method" => prayerjamaah_new["asr_method"], "hour" => prayerjamaah_new["asr_hour"], "minute" => prayerjamaah_new["asr_minute"]}
      maghrib = %{"id" => 4, "name" => "maghrib", "method" => prayerjamaah_new["maghrib_method"], "hour" => prayerjamaah_new["maghrib_hour"], "minute" => prayerjamaah_new["maghrib_minute"]}
      isha = %{"id" => 5, "name" => "isha", "method" => prayerjamaah_new["isha_method"], "hour" => prayerjamaah_new["isha_hour"], "minute" => prayerjamaah_new["isha_minute"]}

      #post prayerjamaah
      prayerjamaah = [fajr, dhuhr, asr, maghrib, isha]
      {:ok, filejamaah} = File.open filejamaah, [:write]
      IO.binwrite filejamaah, Poison.encode!(prayerjamaah)

      File.close filejamaah

      IO.puts "+++++ppp"
      IO.inspect conn.params["prayerjamaah"]#["asr_hour"]
      IO.puts "-----"
      IO.inspect prayerjamaah
      IO.puts "-----"
      IO.inspect prayerjamaah_new["fajr_method"]
      #IO.inspect fajr
      IO.puts "+++++ppp"
      redirect conn, to: "/prayers"
end



  defp filejamaah() do
    Path.join(:code.priv_dir(:timetable), "db/jamaah.json")
  end

  defp file2() do
    Path.join(:code.priv_dir(:timetable), "db/jamaah2.json")
  end

end
