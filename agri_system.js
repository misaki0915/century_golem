let textReadAloud = new Array();
let questionText = "";
let questionBlackText = "";
let questionRedText = "";
let wordCount = 0;
let gameNumber = 1;
let history = "";

function set_ready(){
	//各div代入
  document.getElementById("game_number").innerHTML= "<font size='6'>" + gameNumber + "</font>問目：";
	document.getElementById("start_btn_area").innerHTML = "";
	document.getElementById("next_area").innerHTML = "<input type='button' value='▷' id='set_next_btn' class='set_next_btn' onclick='setNextText()'>";
  document.getElementById("answer_area").innerHTML = "<form name='answer_form'><input type='text' name='player_answer' placeholder='回答を入力'>　<input class='player_answer' type='button' value='回答' onclick='answer_judge()'></form>";
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
	if(wordCount >= qa[gameNumber - 1][1].length - 1){
	  document.getElementById("next_area").innerHTML = "<input type='button' value='▷' id='set_next_btn' class='set_next_btn' onclick='setNextText()' disabled>";
	}
	if(wordCount > qa[gameNumber - 1][2] - 1){
		questionRedText += textReadAloud[gameNumber - 1][wordCount];
	} else {
		questionBlackText += textReadAloud[gameNumber - 1][wordCount];
	}
	wordCount++;
	document.getElementById("question_text").innerHTML = "<p>　" + questionBlackText + "<font color='red'>" + questionRedText + "</font></p>";
	document.getElementById("word_count").innerHTML= "<font size='5'>" + wordCount + "</font>文字目";
}

function answer_judge() {
	var playerAnswer = document.answer_form.player_answer.value;
  if(playerAnswer === qa[gameNumber - 1][0]) {
		let resultBlack = qa[gameNumber - 1][1].slice(0, qa[gameNumber - 1][2]);
		let resultRed = qa[gameNumber - 1][1].slice(qa[gameNumber - 1][2], qa[gameNumber - 1][1].length);
		document.getElementById("qa_result_area").innerHTML = "<div class='qa_result_area_red'>◎正解</div>"
		document.getElementById("qa_result_area").innerHTML += "<p>" + qa[gameNumber - 1][0] + "：" + resultBlack + resultRed;
		gameNumber++;
		wordCount = 0;
		questionBlackText = questionRedText = "";
		document.getElementById("game_number").innerHTML= "<font size='6'>" + gameNumber + "</font>問目";
		document.getElementById("next_area").innerHTML = "<input type='button' value='▷' id='set_next_btn' class='set_next_btn' onclick='setNextText()'>";
		setNextText();
	} else {
		history += "<li>" + playerAnswer + "</li>"
		document.getElementById("qa_result_area").innerHTML = "<div class='qa_result_area_blue'>×不正解</div><p>これまでの回答</p>" + history;
	}
}

function retrieval_judge() {
	var retrievalWord = document.retrieval_form.retrieval.value;
	for(var ch = 0; ch < qa.length; ch++){
    if(qa[ch][0] == retrievalWord){
			let resultBlack = qa[ch][1].slice(0, qa[ch][2]);
			let resultRed = qa[ch][1].slice(qa[ch][2], qa[ch][1].length);
			document.getElementById("retrieval_result_box").innerHTML = "<div id='retrieval_text'></div>"
			document.getElementById("retrieval_text").innerHTML = "<span class='box-title'>" + retrievalWord + "</span>";
		  document.getElementById("retrieval_text").innerHTML += resultBlack + "<font color='red'>" + resultRed + "</font>";
		  break;
  	} else{
			document.getElementById("retrieval_result_box").innerHTML = "<font color='red'>「" + retrievalWord + "」は職業一覧から見つかりませんでした。</font>"
		}
  }
}
