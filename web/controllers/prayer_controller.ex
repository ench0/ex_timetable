defmodule Timetable.PrayerController do
  use Timetable.Web, :controller
  use Timex

  # alias Timetable.Prayer


  def index(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()

    # [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    # IO.puts "+++++"
    # IO.inspect prayerjamaah
    # # IO.inspect asr["method"]
    # IO.puts "+++++"


    render conn, prayerjamaah: prayerjamaah
  end




  # GET http://localhost:4000/prayers/new
  def new(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()

    # [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    # IO.puts "+++++"
    # # IO.inspect fajr["id"]
    # IO.inspect prayerjamaah
    # IO.puts "+++++"

    render conn, prayerjamaah: prayerjamaah#, fajr: fajr, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha
  end




  #POST
  def create(conn, _params) do
      #get prayerjamaah
      # prayerjamaah = File.read!(filejamaah) |> Poison.decode!()
      #[fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
      prayers = File.read!(fileprayers) |> Poison.decode!()

      #get times
      _leap = Timex.is_leap?(Timex.now)#to be used later?
      _today = Timex.format!(Timex.now, "%Y-%m-%d", :strftime)
      day_in_year = Timex.format!(Timex.now, "%j", :strftime)
      
      [fajr_prayer, shurooq_prayer, dhuhr_prayer, asr_prayer, maghrib_prayer, isha_prayer] = prayers[day_in_year]
      fajr_prayer_hour = remove_zero(String.slice(fajr_prayer, 0,2))
      fajr_prayer_minute = String.slice(fajr_prayer, 3,2)
      shurooq_prayer_hour = String.slice(shurooq_prayer, 0,2)
      shurooq_prayer_minute = String.slice(shurooq_prayer, 3,2)
      dhuhr_prayer_hour = String.slice(dhuhr_prayer, 0,2)
      dhuhr_prayer_minute = String.slice(dhuhr_prayer, 3,2)
      asr_prayer_hour = String.slice(asr_prayer, 0,2)
      asr_prayer_minute = String.slice(asr_prayer, 3,2)
      maghrib_prayer_hour = String.slice(maghrib_prayer, 0,2)
      maghrib_prayer_minute = String.slice(maghrib_prayer, 3,2)
      isha_prayer_hour = String.slice(isha_prayer, 0,2)
      isha_prayer_minute = String.slice(isha_prayer, 3,2)

      #modify prayerjamaah
      prayerjamaah_new = IO.inspect conn.params["prayerjamaah"]

      #use func to calculate final jamaah time h:m
      fajr_jamaah_time = jamaah_time(prayerjamaah_new["fajr_hour"], prayerjamaah_new["fajr_minute"], fajr_prayer_hour, fajr_prayer_minute, prayerjamaah_new["fajr_method"], shurooq_prayer_hour, shurooq_prayer_minute)
      dhuhr_jamaah_time = jamaah_time(prayerjamaah_new["dhuhr_hour"], prayerjamaah_new["dhuhr_minute"], dhuhr_prayer_hour, dhuhr_prayer_minute, prayerjamaah_new["dhuhr_method"], asr_prayer_hour, asr_prayer_minute)
      asr_jamaah_time = jamaah_time(prayerjamaah_new["asr_hour"], prayerjamaah_new["asr_minute"], asr_prayer_hour, asr_prayer_minute, prayerjamaah_new["asr_method"], maghrib_prayer_hour, maghrib_prayer_minute)
      maghrib_jamaah_time = jamaah_time(prayerjamaah_new["maghrib_hour"], prayerjamaah_new["maghrib_minute"], maghrib_prayer_hour, maghrib_prayer_minute, prayerjamaah_new["maghrib_method"], isha_prayer_hour, isha_prayer_minute)
      isha_jamaah_time = jamaah_time(prayerjamaah_new["isha_hour"], prayerjamaah_new["isha_minute"], isha_prayer_hour, isha_prayer_minute, prayerjamaah_new["isha_method"], isha_prayer_hour, isha_prayer_minute)

      #construct prayer jsons
      fajr = %{"id" => 1, "name" => "fajr", "method" => prayerjamaah_new["fajr_method"], "jamaah_hour_calc" => prayerjamaah_new["fajr_hour"], "jamaah_minute_calc" => prayerjamaah_new["fajr_minute"], "prayer_hour" => fajr_prayer_hour, "prayer_minute" => fajr_prayer_minute, "jamaah_time" => fajr_jamaah_time}
      dhuhr = %{"id" => 2, "name" => "dhuhr", "method" => prayerjamaah_new["dhuhr_method"], "jamaah_hour_calc" => prayerjamaah_new["dhuhr_hour"], "jamaah_minute_calc" => prayerjamaah_new["dhuhr_minute"], "prayer_hour" => dhuhr_prayer_hour, "prayer_minute" => dhuhr_prayer_minute, "jamaah_time" => dhuhr_jamaah_time}
      asr = %{"id" => 3, "name" => "asr", "method" => prayerjamaah_new["asr_method"], "jamaah_hour_calc" => prayerjamaah_new["asr_hour"], "jamaah_minute_calc" => prayerjamaah_new["asr_minute"], "prayer_hour" => asr_prayer_hour, "prayer_minute" => asr_prayer_minute, "jamaah_time" => asr_jamaah_time}
      maghrib = %{"id" => 4, "name" => "maghrib", "method" => prayerjamaah_new["maghrib_method"], "jamaah_hour_calc" => prayerjamaah_new["maghrib_hour"], "jamaah_minute_calc" => prayerjamaah_new["maghrib_minute"], "prayer_hour" => maghrib_prayer_hour, "prayer_minute" => maghrib_prayer_minute, "jamaah_time" => maghrib_jamaah_time}
      isha = %{"id" => 5, "name" => "isha", "method" => prayerjamaah_new["isha_method"], "jamaah_hour_calc" => prayerjamaah_new["isha_hour"], "jamaah_minute_calc" => prayerjamaah_new["isha_minute"], "prayer_hour" => isha_prayer_hour, "prayer_minute" => isha_prayer_minute, "jamaah_time" => isha_jamaah_time}

      #post prayerjamaah
      prayerjamaah = [fajr, dhuhr, asr, maghrib, isha]
      {:ok, filejamaah} = File.open filejamaah, [:write]
      IO.binwrite filejamaah, Poison.encode!(prayerjamaah)

      File.close filejamaah

      # IO.puts "+++++ppp"
      # IO.inspect conn.params["prayerjamaah"]#["asr_hour"]
      # IO.puts "-----prayerjamaah:"
      # IO.inspect fajr
      # IO.puts "-----"
      # IO.inspect fajr_jamaah_time
      # IO.puts "+++++ppp"
      redirect conn, to: prayer_path(conn, :index)
  end



  defp filejamaah() do
    Path.join(:code.priv_dir(:timetable), "static/db/jamaah.json")
  end

  defp fileprayers() do
    Path.join(:code.priv_dir(:timetable), "static/db/prayers.json")
  end

  defp jamaah_time(jhour, jminute, phour, pminute, method, nexthour, nextminute) do
    #jhour <> ":" <> jminute <> " " <> phour <> ":" <> pminute <> " " <> method <> " " <> nexthour <> ":" <> nextminute
     
    case method do
      "beforenext" ->
        total = String.to_integer(nexthour)*60 + String.to_integer(nextminute) - String.to_integer(jhour)*60 - String.to_integer(jminute)
        hour = Integer.to_string(div(total, 60))#back to string to calc length
        minute = Integer.to_string(rem(total, 60))
        if String.length(minute) == 1, do: minute = minute <> "0"
        time = hour <> ":" <>  minute
      "fixed" ->
        if String.length(jminute) == 1, do: jminute = jminute <> "0"
        time = jhour <> ":" <>  jminute
      "afterthis" ->
        total = String.to_integer(phour)*60 + String.to_integer(pminute) + String.to_integer(jhour)*60 + String.to_integer(jminute)
        hour = div(total, 60)
        minute = rem(total, 60)
        if minute < 10, do: minute = "0" <> Integer.to_string(minute), else: minute = Integer.to_string(minute)
        hour = Integer.to_string(hour)
        # if String.length(minute) == 1, do: minute = minute <> "0"
        # phour <> ":" <>pminute<>" "<>jhour<>":"<>jminute
        time = hour <> ":" <>  minute
    end
  end

  def remove_zero(arg) do
    Regex.replace(~r/0/, arg, "")#removes "0" from HH
  end

end
