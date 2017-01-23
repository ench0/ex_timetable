/**
 * @file Prayer Timetable
 * @author Ensar ensar@farend.net
 * @copyright Ensar ensar@farend.net
 * @license Used momentjs library for time manipulation, rest of code free for distribution provided this info is included.
 */


(function () {

function timeDef(nextDay) {
// 
	
	var nextDay = nextDay;

	var now = moment().tz("Europe/Dublin").add(nextDay, 'd');;
	if (now.year()%4 == 0) var leap = true; else var leap = false;
	// console.log(leap);

	var dayOfYear = now.dayOfYear();
	if (leap == true) daysInYear = 366; else daysInYear = 365;
	// console.log(dayOfYear);
	if (leap == false & dayOfYear > 59) dayOfYear += 1;
	var prayerTimes = timetable[dayOfYear];

	var fajrTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+prayerTimes[0];
	var shurooqTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+prayerTimes[1];
	var dhuhrTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+prayerTimes[2];
	var asrTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+prayerTimes[3];
	var maghribTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+prayerTimes[4];
	var ishaTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+prayerTimes[5];
	var jummuahTimeStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+'13:10';


	var fajrTime = moment(fajrTimeStr,"YYYY-M-D hh:mm");
	var shurooqTime = moment(shurooqTimeStr,"YYYY-M-D hh:mm");
	var dhuhrTime = moment(dhuhrTimeStr,"YYYY-M-D hh:mm");
	var asrTime = moment(asrTimeStr,"YYYY-M-D hh:mm");
	var maghribTime = moment(maghribTimeStr,"YYYY-M-D hh:mm");
	var ishaTime = moment(ishaTimeStr,"YYYY-M-D hh:mm");
	var midnightTimePass = now.clone().startOf('day');
	var midnightTimeNext = now.clone().endOf('day');
	var jummuahTime = moment(jummuahTimeStr,"YYYY-M-D hh:mm");



	/********** Next Prayer **********/
	var checkBeforeFajr = moment(now).isBefore(fajrTime);
	var checkBeforeShurooq = moment(now).isBefore(shurooqTime);
	var checkBeforeDhuhr = moment(now).isBefore(dhuhrTime);
	var checkBeforeAsr = moment(now).isBefore(asrTime);
	var checkBeforeMaghrib = moment(now).isBefore(maghribTime);
	var checkBeforeIsha = moment(now).isBefore(ishaTime);
	var checkBeforeMidnight = moment(now).isBefore(midnightTimeNext);
	
	if (checkBeforeMidnight == true) {
		var nextPrayerName = "fajr";
		var nextPrayerTime = fajrTime;
		var currentPrayerName = "isha";
		var nextDay = 1;
	}
	if (checkBeforeIsha == true) {
		var nextPrayerName = "isha";
		var nextPrayerTime = ishaTime;
		var currentPrayerName = "maghrib";
		var nextDay = 0;
	}
	if (checkBeforeMaghrib == true) {
		var nextPrayerName = "maghrib";
		var nextPrayerTime = maghribTime;
		var currentPrayerName = "asr";
		var nextDay = 0;
	}
	if (checkBeforeAsr == true) {
		var nextPrayerName = "asr";
		var nextPrayerTime = asrTime;
		var currentPrayerName = "dhuhr";
		var nextDay = 0;
	}
	if (checkBeforeDhuhr == true) {
		var nextPrayerName = "dhuhr";
		var nextPrayerTime = dhuhrTime;
		var currentPrayerName = "duha";
		var nextDay = 0;
	}
	if (checkBeforeShurooq == true) {
		var nextPrayerName = "dhuhr";
		var nextPrayerTime = dhuhrTime;
		var currentPrayerName = "fajr";
		var nextDay = 0;
	}
	if (checkBeforeFajr == true) {
		var nextPrayerName = "fajr";
		var nextPrayerTime = fajrTime;
		var currentPrayerName = "night prayer";
		var nextDay = 0;
	}
	
	/********** Ramadan **********/
	if (checkBeforeFajr == true) {
		var fastingTime = fajrTime;
		var fastingTimeName = "fasting";
	}
	else if (checkBeforeMaghrib == true) {
		var fastingTime = maghribTime;
		var fastingTimeName = "iftar";
	}
	else {
		var fastingTime = fajrTime.add(1, 'd');
		var fastingTimeName = "fasting";
	}
	
	
	/********** Countdown **********/
	var countNextPrayerTime = moment.utc(moment(nextPrayerTime).diff(moment(now))).endOf('second').add(1, 's').format("HH:mm:ss");
	var countFastingTime = moment.utc(moment(fastingTime).diff(moment(now))).add(1, 's').format("HH:mm:ss");
	

// jama'ah times: fixed, afterthis, beforenext - getting innerText from spans
// var fajrJammahType = [document.getElementById("fajr-method").innerText, document.getElementById("fajr-number").innerText]

// var dhuhrJamaahType = [document.getElementById("dhuhr-method").innerText, document.getElementById("dhuhr-number").innerText]
// var asrJamaahType = [document.getElementById("asr-method").innerText, document.getElementById("asr-number").innerText]
// var maghribJamaahType = [document.getElementById("maghrib-method").innerText, document.getElementById("maghrib-number").innerText]
// var ishaJamaahType = [document.getElementById("isha-method").innerText, document.getElementById("isha-number").innerText]


// var fajrJamaah = moment(shurooqTime).subtract(fajrJammahType[1], 'minutes');

// var dhuhrJamaahStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+dhuhrJamaahType[1];
// var dhuhrJamaah = moment(dhuhrJamaahStr,"YYYY-M-D hh:mm");

// var asrJamaah = moment(asrTime).add(asrJamaahType[1], 'minutes');

// var maghribJamaah = moment(maghribTime).add(maghribJamaahType[1], 'minutes');

// var ishaJamaahStr = now.year()+'-'+(now.month()+1)+'-'+now.date()+' '+ishaJamaahType[1];
// var ishaJamaah = moment(ishaJamaahStr,"YYYY-M-D hh:mm");

var fajrJamaahOffset = document.getElementById("fajr-offset").innerText;
var dhuhrJamaahOffset = document.getElementById("dhuhr-offset").innerText;
var asrJamaahOffset = document.getElementById("asr-offset").innerText;
var maghribJamaahOffset = document.getElementById("maghrib-offset").innerText;
var ishaJamaahOffset = document.getElementById("isha-offset").innerText;
var hijriOffset = document.getElementById("hijri-offset").innerText;

var fajrJamaah = moment(fajrTime).add(fajrJamaahOffset, 'minutes');
var dhuhrJamaah = moment(dhuhrTime).add(dhuhrJamaahOffset, 'minutes');
var asrJamaah = moment(asrTime).add(asrJamaahOffset, 'minutes');
var maghribJamaah = moment(maghribTime).add(maghribJamaahOffset, 'minutes');
var ishaJamaah = moment(ishaTime).add(ishaJamaahOffset, 'minutes');
// // console.log(fajrJamaah.format('HH:mm'))
// console.log(shurooqTime.format('HH:mm'))
// console.log(dhuhrJamaah.format('HH:mm'))






	return {now:now,countNextPrayerTime:countNextPrayerTime,nextDay:nextDay,nextPrayerName:nextPrayerName,
			fajrTime:fajrTime, shurooqTime:shurooqTime, dhuhrTime:dhuhrTime, asrTime:asrTime, maghribTime:maghribTime, ishaTime:ishaTime, jummuahTime:jummuahTime,
			nextPrayerName:nextPrayerName, countNextPrayerTime:countNextPrayerTime,fastingTimeName:fastingTimeName,countFastingTime:countFastingTime,
			dayOfYear:dayOfYear, daysInYear:daysInYear,hijriOffset: hijriOffset,
			fajrJamaah: fajrJamaah, dhuhrJamaah: dhuhrJamaah, asrJamaah:asrJamaah, maghribJamaah:maghribJamaah, ishaJamaah:ishaJamaah
			};


};


if (!nextDay) var nextDay = 0;//if nextDay is not defined


(function timeDisplay(nextDay) {
	
	var def = timeDef(nextDay);

	var nextDay = def.nextDay;

	// Hijri adjustment
	var hijri = moment(def.now).add(def.hijriOffset, 'days').format('iD iMMMM iYYYY');
	var gregorian = def.now.format('dddd, D MMMM YYYY');

	/********** Parse to HTML **********/
	document.getElementById("time").innerHTML = def.now.format('HH:mm:ss');
	//document.getElementById("date").innerHTML = def.now.format('[<div>]dddd [</div><div>] D MMMM YYYY [</div>]');//without hijri
	// document.getElementById("date").innerHTML = def.now.format('[<span>]dddd [</span> &middot; <span>] iD iMMMM iYYYY [</span> &middot; <span>] D MMMM YYYY [</span>]');
	document.getElementById("date").innerHTML = gregorian + " &middot; " + hijri;

	// if Ramadan
	if (def.now.format('iMMMM') == "Ramadan") {
		var iftar = true;
	}
	else {var iftar = false}

	// if Friday do Jummuah
	if (def.now.format('dddd') == "Friday") {calcDhuhr = def.jummuahTime.format('HH:mm')}
	else {calcDhuhr =  def.dhuhrJamaah.format('HH:mm')}


	// Prayer time display
	document.getElementById("prayer-time-fajr").innerHTML = def.fajrTime.format('HH:mm');
	document.getElementById("prayer-time-shurooq").innerHTML = def.shurooqTime.format('HH:mm');
	document.getElementById("prayer-time-dhuhr").innerHTML = def.dhuhrTime.format('HH:mm');
	document.getElementById("prayer-time-asr").innerHTML = def.asrTime.format('HH:mm');
	document.getElementById("prayer-time-maghrib").innerHTML = def.maghribTime.format('HH:mm');
	document.getElementById("prayer-time-isha").innerHTML = def.ishaTime.format('HH:mm');
	// Jamaah time display
	document.getElementById("jamaah-time-fajr").innerHTML = def.fajrJamaah.format('HH:mm');
	document.getElementById("jamaah-time-dhuhr").innerHTML = calcDhuhr;
	document.getElementById("jamaah-time-asr").innerHTML = def.asrJamaah.format('HH:mm');
	document.getElementById("jamaah-time-maghrib").innerHTML = def.maghribJamaah.format('HH:mm');
	document.getElementById("jamaah-time-isha").innerHTML = def.ishaJamaah.format('HH:mm');

	//pending
	document.getElementById("row-fajr").className = "";//reset
	document.getElementById("row-dhuhr").className = "";
	document.getElementById("row-asr").className = "";
	document.getElementById("row-maghrib").className = "";
	document.getElementById("row-isha").className = "";
	document.getElementById("row-"+def.nextPrayerName).className = "warning";



 	//document.getElementById("days-year").innerHTML = def.dayOfYear + "/" + def.daysInYear;

 	document.getElementById("pending-name").innerHTML = def.nextPrayerName;
 	document.getElementById("timetoprayer").innerHTML = def.countNextPrayerTime;
 	//document.getElementById("timetofast").innerHTML = def.countFastingTime;
 	//document.getElementById("next-fast").innerHTML = def.fastingTimeName;

	setTimeout(function(){timeDisplay(nextDay)}, 1000);


	// document.getElementById("fajr").className = "";document.getElementById("shurooq").className = "";document.getElementById("dhuhr").className = "";
	// document.getElementById("asr").className = "";document.getElementById("maghrib").className = "";document.getElementById("isha").className = "";
	// document.getElementById(def.nextPrayerName).className = "next";


	return nextDay;
})(nextDay);


})();




function screenRefresh(counter) {

	document.getElementById("refresh").style = "display:block;";
	var message = document.getElementById("message"+counter).innerText;

	var elem = document.getElementById("refresh");   
	var pos = -100;
	var id = setInterval(frame, 72);

 	document.getElementById("message-text").innerHTML = message;


	function frame() {
		if (pos == 2100) {
		clearInterval(id);
		document.getElementById("refresh").style = "display:none;";
		} else {
		pos++; 
		elem.style.top = pos + 'px'; 
		//   elem.style.left = pos + 'px'; 
		}
	}
};

var counter = 0;
var refreshTimeout = (document.getElementById("refresh-timeout").innerText) * 1000 * 60;
// console.log(refreshTimeout);
screenRefresh(counter);//start immediately

var interval = function(){
	// console.log(refreshTimeout);
	counter ++;
	screenRefresh(counter);
	if (counter == 10) counter = 0;
}

setInterval(interval, refreshTimeout);
