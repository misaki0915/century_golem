//問題と解答
golem = new Array();
golem[0] = [10,0,5,0,0,0];
golem[1] = [14,3,1,1,1,0];
golem[2] = [17,2,0,2,2,0];
golem[3] = [14,0,3,2,0,0];
golem[4] = [8,2,3,0,0,0];
golem[5] = [12,0,0,4,0,0];
golem[6] = [13,0,2,3,0,0];
golem[7] = [15,0,0,5,0,0];
golem[8] = [17,0,0,3,2,0];

for(var j = golem.length - 1; j >= 0; j--){
  jewelText = "<font color='yellow'>";
  for(var i = 0; i < golem[j][1]; i++){
    jewelText += "●"
  };
  jewelText += "</font><font color='green'>"
  for(var i = 0; i < golem[j][2]; i++){
    jewelText += "●"
  };
  jewelText += "</font><font color='blue'>"
  for(var i = 0; i < golem[j][3]; i++){
    jewelText += "●"
  };
  jewelText += "</font><font color='red'>"
  for(var i = 0; i < golem[j][4]; i++){
    jewelText += "●"
  };
  golem[j][6] = jewelText + "</font>";
}

for (var i = golem.length - 1; i >= 0; i--){
  var j = Math.floor(Math.random() * (i + 1));
  [golem[i], golem[j]] = [golem[j], golem[i]];
}

handCard = new Array();
handCard[0] = [0,0,0,0,0,0,0,0,2,9,"",0,0,0,0,0,0];
handCard[1] = [0,0,0,0,2,0,0,0,0,9,"",0,0,0,0,0,0];
handCard[2] = [0,0,0,0,0,0,0,0,3,0,"",0,0,0,0,0,0];
handCard[3] = [0,0,0,0,4,0,0,0,0,0,"",0,0,0,0,0,0];
handCard[4] = [0,2,0,0,2,0,0,1,0,0,"",0,0,0,0,0,0];
handCard[5] = [0,0,0,1,3,0,1,0,0,0,"",0,0,0,0,0,0];
handCard[6] = [0,0,0,0,0,2,0,0,0,0,"",0,0,0,0,0,0];
handCard[7] = [0,0,2,0,0,0,0,2,0,0,"",0,0,0,0,0,0];
handCard[8] = [0,0,3,0,0,0,0,3,0,0,"",0,0,0,0,0,0];
handCard[9] = [0,3,0,0,0,0,0,2,0,0,"",0,0,0,0,0,0];
handCard[10] = [0,0,0,1,1,1,1,0,0,0,"",0,0,0,0,0,0];
handCard[11] = [4,0,0,0,0,0,1,1,0,0,"",0,0,0,0,0,0];
handCard[12] = [0,0,0,1,0,3,0,0,0,0,"",0,0,0,0,0,0];

//handCard[カード番号] = [0必要黄,1必要緑,2必要青,3必要赤,4生成黄,5生成緑,6生成青,7生成赤,8改良数,9所持プレイヤー,10"表示テキスト",11put,12put,13put,14put,15設置jewel,16しようフラグ,17再利用];

for (var i = handCard.length - 1; i > 2; i--){
  var j = Math.floor(Math.random() * (i + 1) + 2);
  [handCard[i], handCard[j]] = [handCard[j], handCard[i]];
}

for(let possession = 0; 0 < handCard.length; possession++){
  if(handCard[possession][8] > 0){
    let text = "";
    for(var i = 0; i < handCard[possession][8]; i++){
      text += "⬆︎"
    };
    handCard[possession][10] = text;
  } else {
    let jewelBefore = "";
    for(var i = 0; i < handCard[possession][0]; i++){
      jewelBefore += "<font color='yellow'>●</font>"
    };
    for(var i = 0; i < handCard[possession][1]; i++){
      jewelBefore += "<font color='green'>●</font>"
    };
    for(var i = 0; i < handCard[possession][2]; i++){
      jewelBefore += "<font color='blue'>●</font>"
    };
    for(var i = 0; i < handCard[possession][3]; i++){
      jewelBefore += "<font color='red'>●</font>"
    };
    if(jewelBefore !== ""){
      handCard[possession][17] = 1;
      jewelBefore += "➡︎";
    }

    let jewelAfter = "";
    for(var i = 0; i < handCard[possession][4]; i++){
      jewelAfter += "<font color='yellow'>●</font>"
    };
    for(var i = 0; i < handCard[possession][5]; i++){
      jewelAfter += "<font color='green'>●</font>"
    };
    for(var i = 0; i < handCard[possession][6]; i++){
      jewelAfter += "<font color='blue'>●</font>"
    };
    for(var i = 0; i < handCard[possession][7]; i++){
      jewelAfter += "<font color='red'>●</font>"
    };
    handCard[possession][10] = jewelBefore + jewelAfter;
  }
}
