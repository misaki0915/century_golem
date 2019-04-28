let textReadAloud = new Array();
let questionText = "";
let wordCount = 0;
let gameNumber = 1;

function set_ready(){
	//各div代入
  document.getElementById("game_number").innerHTML= "<font size='6'>" + gameNumber + "</font>問目";
	document.getElementById("start_btn_area").innerHTML = "";
	document.getElementById("next_area").innerHTML = "<input type='button' value='Next' class='set_next_btn' onclick='setNextText()''>";
  document.getElementById("answer_area").innerHTML = "	<form name='answer_form'>答え：<input type='text' name='player_answer' value=''><br><input type='button' value='回答' onclick='answer_judge()'><br></form>";

  //問題シャッフル
	for (var i = qa.length - 1; i >= 0; i--){
	  var j = Math.floor(Math.random() * (i + 1));
	  [qa[i], qa[j]] = [qa[j], qa[i]];
	}

	//テキスト分割
	for(var s = 0; s < qa.length; s++){
	  textReadAloud[s] = qa[s][1].split('');
	}

	setNextText();
}

function setNextText() {
	if(wordCount > qa[gameNumber - 1][2] - 1){
		questionText += "<font color='red'>" + textReadAloud[gameNumber - 1][wordCount] + "</font>";
	} else {
		questionText += textReadAloud[gameNumber - 1][wordCount];
	}
	wordCount++;
	document.getElementById("question_text").innerHTML = questionText;
	document.getElementById("word_count").innerHTML= "<font size='4'>" + wordCount + "</font>文字目";
}

function answer_judge() {
	var playerAnswer = document.answer_form.player_answer.value;
  if(playerAnswer === qa[gameNumber - 1][0]) {
		alert("正解！( ˙ㅂ˙)b");
		gameNumber++;
		wordCount = 0;
		questionText = textReadAloud[gameNumber - 1][wordCount];
		wordCount++;
		document.getElementById("game_number").innerHTML= "<font size='6'>" + gameNumber + "</font>問目";
		document.getElementById("question_text").innerHTML = questionText;
		document.getElementById("word_count").innerHTML= "<font size='4'>" + wordCount + "</font>文字目";
	} else {
		alert("不正解( ˙ㅂ˙)p")
	}
}

function retrieval_judge() {
	var retrievalWord = document.retrieval_form.retrieval.value;
	document.getElementById("retrieval_text").innerHTML = retrievalWord + "：";
	for(var ch = 0; ch < qa.length; ch++){
    if(qa[ch][0] == retrievalWord){
			let resultBlack = qa[ch][1].slice(0, qa[ch][2]);
			let resultRed = qa[ch][1].slice(qa[ch][2], qa[ch][1].length);
		  document.getElementById("retrieval_text").innerHTML += resultBlack + "<font color='red'>" + resultRed + "</font>";
		  break;
  	}
  }
}
