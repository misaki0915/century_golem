let jewelColorCount = new Array;
jewelColorCount[0] = 0;
jewelColorCount[1] = 0;
jewelColorCount[2] = 0;
jewelColorCount[3] = 0;
let allJewel = 0;
let possessionCardList = new Array;
possessionCardList[1] = "";
possessionCardList[2] = "";
possessionCardList[3] = "";
possessionCardList[4] = "";
possessionCardList[5] = "";

let golemPossession = new Array;

let jewelText;
let gameTurn = 1;
let golemNumber = 0;
let marketCount = 4;
let golemMarketPlase = 0;


function set_ready(){
  for(golemNumber = 0; golemNumber < 5; golemNumber++){
    golemPossession[golemNumber] = "<p>【" + golem[golemNumber][0] + "点】" + golem[golemNumber][6] + "<a onclick='purchase_golem(" + golemNumber + ")' class=''> [購入]</a>";
  document.getElementById("golem_market").innerHTML += golemPossession[golemNumber];
  }

  for(let cardPossession = 2; cardPossession < 8; cardPossession++){
    let position = cardPossession - 2;
    document.getElementById("card_market").innerHTML += "<li>" + handCard[cardPossession][10] + "<a onclick='payment_jewel(" + position + "," + 0 + "," + position + "," + cardPossession + ")' class=''> [購入]</a></li>";
  };

  hand_description();

  document.getElementById("game_turn").innerHTML = gameTurn + "turn";
}

function use_card(cardPossession, reuse){// handCard[cardPossession] を使用する
  allJewel = jewelColorCount[0] + jewelColorCount[1] + jewelColorCount[2] + jewelColorCount[3];
  if(allJewel > 10){
    return;
  }
  if(handCard[cardPossession][8] > 0){
    handCard[cardPossession][14] = 1;
    hand_description();
    gradeup_jewel(1, handCard[cardPossession][8]);
  } else if(jewelColorCount[0] >= handCard[cardPossession][0] && jewelColorCount[1] >= handCard[cardPossession][1] && jewelColorCount[2] >= handCard[cardPossession][2] && jewelColorCount[3] >= handCard[cardPossession][3]){
    handCard[cardPossession][14] = 1;
    hand_description();
    for(var x = 0; x < 4; x++){
      jewelColorCount[x] = jewelColorCount[x] - handCard[cardPossession][x];
      jewelColorCount[x] = jewelColorCount[x] + handCard[cardPossession][x + 4];
    }
    jewel_description();
    over_jewel_check();
    if(reuse == null){
      gameTurn++;
      document.getElementById("game_turn").innerHTML = gameTurn + "turn";
    }
    if(handCard[cardPossession][11] == 1){
      document.getElementById("test_text").innerHTML += "( ˙ㅂ˙)";
      document.getElementById("gradeup_jewel_area").innerHTML = "<a onclick='use_card(" + cardPossession + ", 1)' class=''>[🔁もう1度使う]</a>";
    };
  } else {
    alert("使えないよ┏( .-. ┏) ┓")
  }
}


function gradeup_jewel(count, allCount, gradeupColor){
  switch (gradeupColor) {
    case 0:
      jewelColorCount[0]--;
      jewelColorCount[1]++;
      break;

    case 1:
      jewelColorCount[1]--;
      jewelColorCount[2]++;
      break;

    case 2:
      jewelColorCount[2]--;
      jewelColorCount[3]++;
      break;

    default:
    break;
  }
  if(count <= allCount){
    document.getElementById("gradeup_jewel_area").innerHTML = count + "/" + allCount + "回目のグレードアップ";
    count++;
    let gradeupSelect = "";
    for(var i = 0; i < jewelColorCount[0]; i++){
      gradeupSelect += "<font color='yellow'><a onclick='gradeup_jewel(" + count + "," + allCount + ", 0)' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[1]; i++){
      gradeupSelect += "<font color='green'><a onclick='gradeup_jewel(" + count + "," + allCount + ", 1)' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[2]; i++){
      gradeupSelect += "<font color='blue'><a onclick='gradeup_jewel(" + count + "," + allCount + ", 2)' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[3]; i++){
      gradeupSelect += "<font color='red'>●</a></font>";
    };
    document.getElementById("gradeup_jewel_area").innerHTML += gradeupSelect + "<a onclick='gradeup_jewel(" + count + "," + allCount + ")' class=''>skip</a></font>";;
  } else {
    document.getElementById("gradeup_jewel_area").innerHTML = "";
    gameTurn++;
    document.getElementById("game_turn").innerHTML = gameTurn + "turn";
  }
  jewel_description();
}

function purchase_golem(golemNumber){
  allJewel = jewelColorCount[0] + jewelColorCount[1] + jewelColorCount[2] + jewelColorCount[3];
  if(allJewel > 10){
    return;
  }

  if(jewelColorCount[0] >= golem[golemNumber][1] && jewelColorCount[1] >= golem[golemNumber][2] && jewelColorCount[2] >= golem[golemNumber][3] && jewelColorCount[3] >= golem[golemNumber][4]){
    alert(golem[golemNumber][0] + "点ゴーレムを購入しました");
    gameTurn++;
    document.getElementById("game_turn").innerHTML = gameTurn + "turn";

    for(var x = 0; x < 4; x++){
      jewelColorCount[x] = jewelColorCount[x] - golem[golemNumber][x + 1];
    }

    jewel_description();
    golem[golemNumber][5] = 1;
    document.getElementById("golem_market").innerHTML = "";
    let j = 0;
    for(i = 0; i < golem.length, j < 5; i++){
      if(golem[i][5] == 0){
        if(j == 0){
          //document.getElementById("golem_market").innerHTML += "<p>⑶</p>"
        } else if(j == 1){
          //document.getElementById("golem_market").innerHTML += "<p>⑴</p>"
        }
        document.getElementById("golem_market").innerHTML += "<p>【" + golem[i][0] + "点】" + golem[i][6] + "<a onclick='purchase_golem(" + i + ")' class=''> [購入]</a></p>";
        j++;
      }
    }
  } else {
    alert("足りないよ( ˙ㅂ˙)ﾉ");
  }
}

function payment_jewel(position, count, allCount, cardPossession, colorNumber){
  allJewel = jewelColorCount[0] + jewelColorCount[1] + jewelColorCount[2] + jewelColorCount[3];
  if(allJewel > 10){
    return;
  }
  let total = jewelColorCount[0] + jewelColorCount[1] + jewelColorCount[2] + jewelColorCount[3];
  if(count > 0){
    jewelColorCount[colorNumber] = jewelColorCount[colorNumber] - 1;
    jewel_description();
    document.getElementById("payment").innerHTML = "カード購入のため、" + position + "個のジュエルが必要です（" + count + "個目）";
    //jewelの設置
    let j = 0;
    for(i = 2; i < handCard.length - 1, j < 5; i++){
      if(handCard[i][9] == 0 && i !== cardPossession){
        j++;
        if(j == count){
          let putJewel = colorNumber + 11;
          handCard[i][putJewel]++;
          break;
        }
      }
    }
  }

  if(count == 0 && position > total){
    document.getElementById("payment").innerHTML = "";
    alert("ジュエルが足りない( ˙ㅂ˙)");
  } else if(position == count){
    purchase_card(cardPossession);
  } else {
    document.getElementById("payment").innerHTML = "カード購入のため、" + position + "個のジュエルが必要です（" + count + "個目）";
    count++;
    let jewelSelect = "";
    for(var i = 0; i < jewelColorCount[0]; i++){
      jewelSelect += "<font color='yellow'><a onclick='payment_jewel(" + position + "," + count + "," + allCount + "," + cardPossession + "," + 0 + ")' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[1]; i++){
      jewelSelect += "<font color='green'><a onclick='payment_jewel(" + position + "," + count + "," + allCount + "," + cardPossession + "," + 1 + ")' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[2]; i++){
      jewelSelect += "<font color='blue'><a onclick='payment_jewel(" + position + "," + count + "," + allCount + "," + cardPossession + "," + 2 + ")' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[3]; i++){
      jewelSelect += "<font color='red'><a onclick='payment_jewel(" + position + "," + count + "," + allCount + "," + cardPossession + "," + 3 + ")' class=''>●</a></font>";
    };
    document.getElementById("payment").innerHTML += jewelSelect + "<a onclick='gradeup_jewel()' class=''>cancel</a></font>";//cancel 未実装
  }
}

function purchase_card(cardNumber){
  document.getElementById("hand_card_area").innerHTML += "<li>" + handCard[cardNumber][10] + "<a onclick='use_card(" + cardNumber + ")' class=''> [使う]</a></li>";
  handCard[cardNumber][9] = 1;//player1購入
  gameTurn++;
  document.getElementById("game_turn").innerHTML = gameTurn + "turn";
  let j = 0;
  document.getElementById("card_market").innerHTML = "";
  document.getElementById("payment").innerHTML = "購入しました！";

  //設置jewelの回収
  for(let i = 0; i < 4; i++){
    plusJewel = i + 11;
    jewelColorCount[i] = jewelColorCount[i] + handCard[cardNumber][plusJewel];
  }
  over_jewel_check();
  jewel_description();

  for(i = 2; i < handCard.length - 1, j < 6; i++){
    if(handCard[i][9] == 0){

      //設置jewel描写
      handCard[i][15] = "";
      for(x = 11; x < 15; x++){
        jewelText = "";
        for(var k = 0; k < handCard[i][x]; k++){
          jewelText += "●"
        };
        switch (x) {
          case 11:
            handCard[i][15] += "<font color='yellow'>" + jewelText + "</font>";
            break;

          case 12:
            handCard[i][15] += "<font color='green'>" + jewelText + "</font>";
            break;

          case 13:
            handCard[i][15] += "<font color='blue'>" + jewelText + "</font>";
            break;

          case 14:
            handCard[i][15] += "<font color='red'>" + jewelText + "</font>";
            break;

          default: alert("error");
        }
      }

      document.getElementById("card_market").innerHTML += "<li>" + handCard[i][10] + "<a onclick='payment_jewel(" + j + "," + 0 + "," + j + "," + i + ")' class=''> [購入]</a> " + handCard[i][15] + "</li>";
      j++;
    }
  }
}

function jewel_description(){
  document.getElementById("jewel_area").innerHTML = "";
  for(x = 0; x < 4; x++){
    jewelText = "";
    for(var i = 0; i < jewelColorCount[x]; i++){
      jewelText += "●"
    };
    switch (x) {
      case 0:
        document.getElementById("jewel_area").innerHTML += "<font color='yellow'>" + jewelText + "</font>";
        break;

      case 1:
        document.getElementById("jewel_area").innerHTML += "<font color='green'>" + jewelText + "</font>";
        break;

      case 2:
        document.getElementById("jewel_area").innerHTML += "<font color='blue'>" + jewelText + "</font>";
        break;

      case 3:
        document.getElementById("jewel_area").innerHTML += "<font color='red'>" + jewelText + "</font>";
        break;

      default: alert("error");
    }
  }
}

function over_jewel_check(discardColor){
  switch (discardColor) {
    case 0:
      jewelColorCount[0]--;
      break;

    case 1:
      jewelColorCount[1]--;
      break;

    case 2:
      jewelColorCount[2]--;
      break;

    case 3:
      jewelColorCount[3]--;
      break;

    default:
    break;
  }

  allJewel = jewelColorCount[0] + jewelColorCount[1] + jewelColorCount[2] + jewelColorCount[3];
  if(allJewel > 10){
    document.getElementById("discard_jewel_area").innerHTML = "jewelが10個以上あります。捨てるジュエルを選んでください。";
    let discardSelect = "";
    for(var i = 0; i < jewelColorCount[0]; i++){
      discardSelect += "<font color='yellow'><a onclick='over_jewel_check(0)' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[1]; i++){
      discardSelect += "<font color='green'><a onclick='over_jewel_check(1)' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[2]; i++){
      discardSelect += "<font color='blue'><a onclick='over_jewel_check(2)' class=''>●</a></font>";
    };
    for(var i = 0; i < jewelColorCount[3]; i++){
      discardSelect += "<font color='red'><a onclick='over_jewel_check(3)' class=''>●</a></font>";
    };
    document.getElementById("discard_jewel_area").innerHTML += discardSelect;
  } else {
    document.getElementById("discard_jewel_area").innerHTML = "";
  }
  jewel_description();
}


function hand_description(){
  possessionCardList[1] = "所持カード　<a onclick='hand_refresh()' class=''>[Refresh!]</a>";
  if(handCard[0][14] == 0){
    possessionCardList[1] += "<li>" + handCard[0][10] + "<a onclick='use_card(0)' class=''> [使う]</a></li>";
  }
  if(handCard[0][14] == 1){
    possessionCardList[1] += "<li>" + handCard[0][10] + "</li>";
  }
  if(handCard[1][14] == 0){
    possessionCardList[1] += "<li>" + handCard[1][10] + "<a onclick='use_card(1)' class=''> [使う]</a></li>";
  }
  if(handCard[1][14] == 1){
    possessionCardList[1] += "<li>" + handCard[1][10] + "</li>";
  }

  for(i = 2; i < handCard.length; i++){
    if(handCard[i][9] == 1 && handCard[i][14] == 0){
      possessionCardList[1] += "<li>" + handCard[i][10] + "<a onclick='use_card(" + i + ")' class=''> [使う]</a></li>";
    }
    if(handCard[i][9] == 1 && handCard[i][14] == 1){
      possessionCardList[1] += "<li>" + handCard[i][10] + "</li>";
    }
  }

  document.getElementById("hand_card_area").innerHTML = possessionCardList[1];
}

function hand_refresh(){
  handCard[0][14] = 0;
  handCard[1][14] = 0;
  for(i = 2; i < handCard.length; i++){
    if(handCard[i][9] == 1){
      handCard[i][14] = 0;
    }
  }
  gameTurn++;
  document.getElementById("game_turn").innerHTML = gameTurn + "turn";
  hand_description();
}
