var currentIdx = 0;
var words = "";
var chars = 0;
var isFinished =false;
var isStarted = false;
var timeoutID = "";
var intervalID = "";
var timeLimit = 60000;
var secondLimit = 59;

$( document ).ready(function() {
	var text  = "";
    var text1 = "Эдгар По бол дэлхийн хамгийн гайхамшигтай, хамгийн уянгалаг эохиолчдын нэг мөн. Аугаа зохиолчийн хувьд Америкийн уран зохиолд хүндтэй байр суурийг эзэлнэ. Гэвч идэр залуудаа мөрийтэй тоглоом, бор дарсанд толгойгоо мэдүүлсэн учир Виржинийн их сургуулиас хөөгдөж байжээ. Тэрчилэн Америкийн цэргийн тэргүүлэх сургууль болох Вест-Пойнт дахь Цэргийн академид элсэж чадсан хэдий ч бусад нь сургалтын талбайд дадлага хийж байхад хуарандаа шигдэн сууж шүлэг бичин, цэргийн дүрэм ноцтой зөрчсөн учир бас хасагджээ.";	 
    var text2 = "Тэмээн поло-2016 улсын аварга шалгаруулах тэмцээн Өмнөговь аймгийн Даланзадгад хотод өнөөдөр эхэллээ. Энэ удаагийн тэмцээнд долоон аймгийн 19 баг оролцож байгаа юм. Дундговь, Өмнөговь, Дорноговь, Говь-Алтай, Баянхонгор, Өвөр Монголын өөртөө засах орноос мөн тэмээчид иржээ. Албан ёсны нээлтийн ажиллагаа өнөөдөр 14.00 цагт болно. Тэмээн пол улсын аварга шалгаруулах тэмцээний шагналын сан 11 сая төгрөг. Энэ жилийн хувьд зохион байгуулалт өндөр түвшинд болж байгаагаараа онцлог гэдгийг оролцогчид онцолж байлаа. Эрүүл мэнд спортын яам, Биеийн тамир спортын хөгжлийн төв, Монголын тэмээн полоны холбоо, Өмнөговь аймгийн Засаг даргын тамгын газар хамтран зохион байгуулж байгаа юм.";
    var text3 = "Бүгд Найрамдах Түрк улсын Кайсери хотод суугаа Монгол Улсын Өргөмжит консул, ноён Хасан Хаскараманы санаачлагаар зохиолч Рыфат Сэртоглугийн бичсэн “Чингис хааны Монгол” ном түрк хэл дээр хэвлэгдэн гарлаа.Уг номыг дунд сургуулийн хүүхдүүдэд зориулж товч, энгийн хэллэгээр бичсэн бөгөөд Чингис хааны бага болон залуу насны амьдрал, тархай бутархай олон аймгийг нэгтгэн Их Монгол Улсыг байгуулан хаан ширээнд суусан түүх, түүний байлдан дагуулалт, цэргийн зохион байгуулалт, хүчин чадлын тухай өгүүлжээ. Мөн өнөөгийн Монгол Улс, нийслэл Улаанбаатар хотын эдийн засаг, нийгэм, соёл, боловсролын хөгжлийн талаар товч мэдээллүүдийг багтаасан байна.";
    var random = Math.floor((Math.random() * 3) + 1);
    switch(random){
		case 1:
			text = text1;
        break;
    	case 2:
			text = text2;
        break;
        case 3:
			text = text3;
        break;
        default:
        	text = text3;
        	break;
    }
    //text = "asd "+text;
    //typing speed test
    text  = text.trim();
    
 	words = text.split(' ');
 	word_template();
 	$("#words span#0").addClass("highlight")
 	$("#editor").on("keyup", function(event) { 
 		keyup(event);
 	});
  
  if(document.getElementById('editor')!=null){
    document.getElementById('editor').focus();
  }
}); 

function word_template(){
   var html=""
   for (i = 0; i < words.length; i++) {
  	 html = html + "<span id='"+i+"'>"+words[i]+"</span>"; 
   }
   $('#words').html(html);
}

function keyup(event){
	checker();
	if(!isFinished){
		chars = chars + 1;	
		$("#cpm").text(chars);
	}
	typingStart();
} //keyup


$("#editor").on("keydown", function(event) { 
 	switch(event.which){
		case 8:
			checker();
        break;
		    
	    case 32:
	      if ($('#editor').val().trim() == "")
            return false;
          else
          	//check
          	if(checker() && $('#editor').val().length===words[currentIdx].length){
          		$("#words span#" + currentIdx).removeClass("highlight");
          		currentIdx ++;
          		$("#wpm").text(currentIdx);
          		$("#words span#" + currentIdx).addClass("highlight");
          		$("#editor").val("");
          		scroll ();
          	}
	    break;
	}
 });
	
function checker(){
	$('#editor').val($('#editor').val().trim());
	
	if(currentIdx >= words.length){
    	$("#editor").val("");
    	//text empty
    	if(!isFinished){
    		typingFinish();
    	}
    	return true;
    } 

	var selectedWord = words[currentIdx];
	var wroteText = $("#editor").val();
    var length = wroteText.length;

    if(selectedWord.length >= length && selectedWord.substring(0, length).indexOf(wroteText) > -1){
       $("#words span#" + currentIdx).removeClass("highlight-wrong");
       $("#words span#" + currentIdx).removeClass("highlight");
       $("#words span#" + currentIdx).addClass("highlight");
       return true;
    }else{
 	   $("#words span#" + currentIdx).removeClass("highlight");
       $("#words span#" + currentIdx).addClass("highlight-wrong");
       return false;
    }
}


function typingStart(){
	if(!isStarted){
		intervalID = setInterval(function(){ 
			$("#timer").text(secondLimit);
			secondLimit = secondLimit - 1;
		 }, 1000);

		timeoutID = setTimeout(typingFinish, timeLimit);
		isStarted = true;
		
	}
}

function typingFinish(){
	window.clearTimeout(timeoutID);
	clearInterval(intervalID);
	secondLimit = 0;
	$("#timer").text(secondLimit);
	isFinished = true;
	$("#editor-container").hide();
	$.cpm = chars;
	$.wpm = currentIdx;
	var result = "<p id=fbpost><button class=fbbutton href onclick='fbpost($.cpm, $.wpm);return false;'>SHARE ХИЙХ</button></p>";
	$("#typing-result").html(result);
	$("#typing-result").show();
}

function scroll () {
        var $words_el = document.getElementById('words');

        var $scrollbase_el  = document.getElementById(currentIdx);

        var $scroll = (
            $scrollbase_el.offsetTop - document.getElementById(currentIdx).offsetHeight
        );

        $scroll -= $words_el.offsetTop;

        if ($scroll < 0) $scroll = 0;
        if ($scroll > $( $words_el ).scrollTop() + 5
         || $scroll < $( $words_el ).scrollTop() - 5)
            $( $words_el ).stop(true, true).animate({ scrollTop: $scroll }, 500);
};

function fbpost($cpm, $wpm) {

    if (!FB) return;

        FB.ui({
            method: 'feed',
            caption: "Нэг минутанд хэдэн үг бичиж чадахаа үзээрэй ;)",
            //picture: 'http://typing-speed-test.aoeu.eu/badges/' + $cpm + '.png',
            picture: 'http://hutuch.mn/assets/img/default.png',
            name: 'Миний шивэх хурд : нэг минутанд '+$cpm+' тэмдэгт дарж '+$wpm+' үг бичлээ. Та хэдэн үг бичиж чадах вэ? hutuch.mn',
            link: 'http://hutuch.mn/typing?source=fb',
        }, function (r) {
            if (r && !r.error) {
                $("#fbpost").html("Таний facebook дээр постлогдлоо!");
                // $.get("/log.plp/fbpost", { ab: $ab });
                //$.get("/log.plp/fbpost");
            } else {
                var message = r && r.error ? r.error.message : "Unknown error";
                // $.get("/log.plp/fbpost", { "error": message, ab: $ab });
                //$.get("/log.plp/fbpost", { "error": message });
            }
	    
        });
}


