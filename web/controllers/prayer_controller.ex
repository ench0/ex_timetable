defmodule Timetable.PrayerController do
  use Timetable.Web, :controller
  use Timex

  # alias Timetable.Prayer


  def index(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()
    modified = File.read!(filemodified) |> Poison.decode!()
    settings = File.read!(filesettings) |> Poison.decode!()

    day_in_year = Timex.format!(Timex.now, "%j", :strftime)
    if String.starts_with?(day_in_year, "0"), do: day_in_year = String.trim_leading(day_in_year, "0")

    # [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    # IO.puts "+++++"
    # IO.inspect prayerjamaah
    # IO.inspect settings
    # # IO.inspect asr["method"]
    # IO.puts "+++++"

    # Phoenix.CodeReloader.reload!(:timetable)
    render conn, prayerjamaah: prayerjamaah, day_in_year: day_in_year, modified: modified, settings: settings
  end




  # GET http://localhost:4000/prayers/new
  def new(conn, _params) do
    prayerjamaah = File.read!(filejamaah) |> Poison.decode!()
    modified = File.read!(filemodified) |> Poison.decode!()
    # user = Timetable.get_env(:timetable, :basic_auth)[:username]

    settings = File.read!(filesettings) |> Poison.decode!()
    messages = File.read!(filemessages) |> Poison.decode!()

    day_in_year = Timex.format!(Timex.now, "%j", :strftime)
    if String.starts_with?(day_in_year, "0"), do: day_in_year = String.trim_leading(day_in_year, "0")

# {:ok, filesettings} = File.open filesettings, [:write]

    # IO.puts "+++++"
    # IO.inspect System.cmd("whoami", [])
    # IO.inspect File.read(filesettings)
    # IO.inspect is_bitstring day_in_year
    # IO.inspect String.starts_with? day_in_year, "0"
    # IO.inspect String.trim_leading(day_in_year, "0")
    # IO.puts "+++++"
    # [fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
    # IO.puts "+++++"
    # # IO.inspect fajr["id"]
    # IO.inspect prayerjamaah
    # IO.puts "+++++"

    render conn, prayerjamaah: prayerjamaah, day_in_year: day_in_year, modified: modified, settings: settings, messages: messages#, fajr: fajr, dhuhr: dhuhr, asr: asr, maghrib: maghrib, isha: isha
  end




  #POST
  def create(conn, params) do
      #get prayerjamaah
      # prayerjamaah = File.read!(filejamaah) |> Poison.decode!()
      #[fajr, dhuhr, asr, maghrib, isha] = prayerjamaah
      prayers = File.read!(fileprayers) |> Poison.decode!()

      #get times
      _leap = Timex.is_leap?(Timex.now)#to be used later?
      _today = Timex.format!(Timex.now, "%Y-%m-%d", :strftime)
      day_in_year = Timex.format!(Timex.now, "%j", :strftime)
      if String.starts_with?(day_in_year, "0"), do: day_in_year = String.trim_leading(day_in_year, "0")#trim leading 0



      # IO.puts "+++++c+++++"
      # # IO.inspect prayers
      # # IO.inspect day_in_year
      # # IO.inspect prayers[2]
      # IO.inspect params["prayerjamaah"]["title"]
      # IO.puts "+++++"



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
      prayerjamaah_new = params["prayerjamaah"]

      #use func to calculate final jamaah time h:m
      fajr_jamaah_time = jamaah_time(prayerjamaah_new["fajr_hour"], prayerjamaah_new["fajr_minute"], fajr_prayer_hour, fajr_prayer_minute, prayerjamaah_new["fajr_method"], shurooq_prayer_hour, shurooq_prayer_minute)
      dhuhr_jamaah_time = jamaah_time(prayerjamaah_new["dhuhr_hour"], prayerjamaah_new["dhuhr_minute"], dhuhr_prayer_hour, dhuhr_prayer_minute, prayerjamaah_new["dhuhr_method"], asr_prayer_hour, asr_prayer_minute)
      asr_jamaah_time = jamaah_time(prayerjamaah_new["asr_hour"], prayerjamaah_new["asr_minute"], asr_prayer_hour, asr_prayer_minute, prayerjamaah_new["asr_method"], maghrib_prayer_hour, maghrib_prayer_minute)
      maghrib_jamaah_time = jamaah_time(prayerjamaah_new["maghrib_hour"], prayerjamaah_new["maghrib_minute"], maghrib_prayer_hour, maghrib_prayer_minute, prayerjamaah_new["maghrib_method"], isha_prayer_hour, isha_prayer_minute)
      isha_jamaah_time = jamaah_time(prayerjamaah_new["isha_hour"], prayerjamaah_new["isha_minute"], isha_prayer_hour, isha_prayer_minute, prayerjamaah_new["isha_method"], isha_prayer_hour, isha_prayer_minute)

      #use func to calculate jamaah time offset in minutes
      fajr_jamaah_offset = jamaah_offset(prayerjamaah_new["fajr_hour"], prayerjamaah_new["fajr_minute"], fajr_prayer_hour, fajr_prayer_minute, prayerjamaah_new["fajr_method"], shurooq_prayer_hour, shurooq_prayer_minute)
      dhuhr_jamaah_offset = jamaah_offset(prayerjamaah_new["dhuhr_hour"], prayerjamaah_new["dhuhr_minute"], dhuhr_prayer_hour, dhuhr_prayer_minute, prayerjamaah_new["dhuhr_method"], asr_prayer_hour, asr_prayer_minute)
      asr_jamaah_offset = jamaah_offset(prayerjamaah_new["asr_hour"], prayerjamaah_new["asr_minute"], asr_prayer_hour, asr_prayer_minute, prayerjamaah_new["asr_method"], maghrib_prayer_hour, maghrib_prayer_minute)
      maghrib_jamaah_offset = jamaah_offset(prayerjamaah_new["maghrib_hour"], prayerjamaah_new["maghrib_minute"], maghrib_prayer_hour, maghrib_prayer_minute, prayerjamaah_new["maghrib_method"], isha_prayer_hour, isha_prayer_minute)
      isha_jamaah_offset = jamaah_offset(prayerjamaah_new["isha_hour"], prayerjamaah_new["isha_minute"], isha_prayer_hour, isha_prayer_minute, prayerjamaah_new["isha_method"], fajr_prayer_hour, fajr_prayer_minute)
 
      #construct prayer jsons
      fajr = %{"id" => 1, "name" => "fajr", "method" => prayerjamaah_new["fajr_method"], "jamaah_hour_calc" => prayerjamaah_new["fajr_hour"], "jamaah_minute_calc" => prayerjamaah_new["fajr_minute"], "prayer_hour" => fajr_prayer_hour, "prayer_minute" => fajr_prayer_minute, "jamaah_time" => fajr_jamaah_time, "jamaah_offset" => fajr_jamaah_offset}
      dhuhr = %{"id" => 2, "name" => "dhuhr", "method" => prayerjamaah_new["dhuhr_method"], "jamaah_hour_calc" => prayerjamaah_new["dhuhr_hour"], "jamaah_minute_calc" => prayerjamaah_new["dhuhr_minute"], "prayer_hour" => dhuhr_prayer_hour, "prayer_minute" => dhuhr_prayer_minute, "jamaah_time" => dhuhr_jamaah_time, "jamaah_offset" => dhuhr_jamaah_offset}
      asr = %{"id" => 3, "name" => "asr", "method" => prayerjamaah_new["asr_method"], "jamaah_hour_calc" => prayerjamaah_new["asr_hour"], "jamaah_minute_calc" => prayerjamaah_new["asr_minute"], "prayer_hour" => asr_prayer_hour, "prayer_minute" => asr_prayer_minute, "jamaah_time" => asr_jamaah_time, "jamaah_offset" => asr_jamaah_offset}
      maghrib = %{"id" => 4, "name" => "maghrib", "method" => prayerjamaah_new["maghrib_method"], "jamaah_hour_calc" => prayerjamaah_new["maghrib_hour"], "jamaah_minute_calc" => prayerjamaah_new["maghrib_minute"], "prayer_hour" => maghrib_prayer_hour, "prayer_minute" => maghrib_prayer_minute, "jamaah_time" => maghrib_jamaah_time, "jamaah_offset" => maghrib_jamaah_offset}
      isha = %{"id" => 5, "name" => "isha", "method" => prayerjamaah_new["isha_method"], "jamaah_hour_calc" => prayerjamaah_new["isha_hour"], "jamaah_minute_calc" => prayerjamaah_new["isha_minute"], "prayer_hour" => isha_prayer_hour, "prayer_minute" => isha_prayer_minute, "jamaah_time" => isha_jamaah_time, "jamaah_offset" => isha_jamaah_offset}

      #post prayerjamaah
      prayerjamaah = [fajr, dhuhr, asr, maghrib, isha]
      {:ok, filejamaah} = File.open filejamaah, [:write]
      IO.binwrite filejamaah, Poison.encode!(prayerjamaah)
      File.close filejamaah

      #post modified
      time = Timex.format!(Timex.now, "%H:%M", :strftime)
      date = Timex.format!(Timex.now, "%d/%m/%Y", :strftime)
      modified = %{"time": time, "date": date}
      {:ok, filemodified} = File.open filemodified, [:write]
      IO.binwrite filemodified, Poison.encode!(modified)
      File.close filemodified

      #post settings
      title = prayerjamaah_new["title"]
      body = prayerjamaah_new["body"]
      announcement = prayerjamaah_new["announcement"]
      hijrioffset = prayerjamaah_new["hijrioffset"]
      refreshtimeout = prayerjamaah_new["refreshtimeout"]
      settings = %{"title": title, "body": body, "announcement": announcement, "hijrioffset": hijrioffset, "refreshtimeout": refreshtimeout}
      {:ok, filesettings} = File.open filesettings, [:write]
      IO.binwrite filesettings, Poison.encode!(settings)
      File.close filesettings

      #post messages
      message0 = prayerjamaah_new["message0"]; message1 = prayerjamaah_new["message1"]; message2 = prayerjamaah_new["message2"]; message3 = prayerjamaah_new["message3"]; message4 = prayerjamaah_new["message4"]
      message5 = prayerjamaah_new["message5"]; message6 = prayerjamaah_new["message6"]; message7 = prayerjamaah_new["message7"]; message8 = prayerjamaah_new["message8"]; message9 = prayerjamaah_new["message9"]
      messages = %{"message0": message0, "message1": message1, "message2": message2, "message3": message3, "message4": message4, "message5": message5, "message6": message6, "message7": message7, "message8": message8, "message9": message9}
      {:ok, filemessages} = File.open filemessages, [:write]
      IO.binwrite filemessages, Poison.encode!(messages)
      File.close filemessages

      conn
        |> put_flash(:extra, [Phoenix.HTML.Tag.content_tag(:div, [Phoenix.HTML.Tag.content_tag(:i, "", class: "info left aligned icon"), "Timetable modified successfully."], class: "ui left aligned header")])
        |> redirect(to: prayer_path(conn, :index))
      # IO.puts "+++++ppp"
      # IO.inspect params
      # IO.inspect conn.params["prayerjamaah"]#["asr_hour"]
      # IO.puts "-----prayerjamaah:"
      # IO.inspect fajr
      # IO.puts "-----"
      # IO.inspect fajr_jamaah_time

      # redirect conn, to: prayer_path(conn, :index)
  end



  defp jamaah_time(jhour, jminute, phour, pminute, method, nexthour, nextminute) do
    #jhour <> ":" <> jminute <> " " <> phour <> ":" <> pminute <> " " <> method <> " " <> nexthour <> ":" <> nextminute
     
    case method do
      "beforenext" ->
        next_prayer_minutes =  String.to_integer(nexthour)*60 + String.to_integer(nextminute)
        # current_prayer_minutes =  String.to_integer(phour)*60 + String.to_integer(pminute)
        jamaah_calc_minutes =  String.to_integer(jhour)*60 + String.to_integer(jminute)

        total = next_prayer_minutes - jamaah_calc_minutes

        hour = Integer.to_string(div(total, 60))#back to string to calc length
        minute = Integer.to_string(rem(total, 60))

        #if minute < 10, do: minute = "0" <> Integer.to_string(minute), else: minute = Integer.to_string(minute)

        if String.length(minute) == 1, do: minute = "0" <> minute
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




  defp jamaah_offset(jhour, jminute, phour, pminute, method, nexthour, nextminute) do
     
    case method do
      "beforenext" ->
        next_prayer_minutes =  String.to_integer(nexthour)*60 + String.to_integer(nextminute)
        current_prayer_minutes =  String.to_integer(phour)*60 + String.to_integer(pminute)
        jamaah_calc_minutes =  String.to_integer(jhour)*60 + String.to_integer(jminute)
        offset = next_prayer_minutes - current_prayer_minutes - jamaah_calc_minutes
      "fixed" ->
        current_prayer_minutes =  String.to_integer(phour)*60 + String.to_integer(pminute)
        jamaah_calc_minutes = String.to_integer(jhour)*60 + String.to_integer(jminute)
        offset = jamaah_calc_minutes - current_prayer_minutes
      "afterthis" ->
        offset = String.to_integer(jhour)*60 + String.to_integer(jminute)
    end
  end




  def reboot(conn, _params) do
    IO.puts "+++++"
    IO.inspect System.cmd("whoami", [])
    IO.inspect System.cmd("ls", ["-a"])
    #IO.inspect System.cmd("echo", ["hello"], [])
    IO.inspect System.cmd("sudo", ["reboot"], [])

    render conn

  end



  def remove_zero(arg) do
    Regex.replace(~r/0/, arg, "")#removes "0" from HH
  end



  defp filejamaah() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/jamaah.json")
  end

  defp fileprayers() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/prayers.json")
  end

  defp filemodified() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/modified.json")
  end

  defp filesettings() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/settings.json")
  end

  defp filemessages() do
    Path.join(:code.priv_dir(:timetable), "static/js/db/messages.json")
  end

end
