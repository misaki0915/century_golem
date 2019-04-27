let textReadAloud = new Array();
let questionText = "";
let wordCount = 0;
let gameNumber = 1;

set_ready();

function set_ready(){
  document.getElementById("game_number").innerHTML= "<font size='6'>" + gameNumber + "</font>問目";
  //問題シャッフル
	for (var i = qa.length - 1; i >= 0; i--){
	  var j = Math.floor(Math.random() * (i + 1));
	  [qa[i], qa[j]] = [qa[j], qa[i]];
	}
	//テキスト分割
	for(var i = 0; i <= qa.length; i++){
	  textReadAloud[i] = qa[i][1].split('');
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
		document.getElementById("question_text").innerHTML = questionText
		document.getElementById("word_count").innerHTML= "<font size='4'>" + wordCount + "</font>文字目";
	} else {
		alert("不正解( ˙ㅂ˙)p")
	}

}
