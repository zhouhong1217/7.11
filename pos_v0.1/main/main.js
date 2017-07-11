'use strict';
const inputs = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00

      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      }
    ];


printReceipt(inputs);


function printReceipt(inputs) {
  var newlist = loadUserItem(inputs);
  userItem(newlist);
  console.log(userItem(newlist))
}


function loadUserItem(inputs){
  var newlist = [];
  for(let i = 0;i < inputs.length;i++){
    var flag = true;
    for(let j = 0;j < newlist.length;j++){
      if(inputs[i].barcode == newlist[j].barcode){
        newlist[j].count ++;
        flag = false;
        break;
      }
    }
    if(flag){
      var item = {};
      item.barcode = inputs[i].barcode;
      item.name = inputs[i].name;
      item.unit = inputs[i].unit;
      item.price = inputs[i].price;
      item.count = 1;
      newlist.push(item);
    }
  }
  // console.log(newlist)
  return newlist;
}

function userItem(newlist){
  // console.log(inputs)
  var useritemsinfo = "";//全部物品输出
  var useriteminfo = ""; //单个物品输出
  var summary = 0;
  for(let i = 0;i < newlist.length;i++){
    newlist[i].itemsumprice = newlist[i].price * newlist[i].count;
    summary += newlist[i].itemsumprice;
    if(i != newlist.length-1){
      useriteminfo = "名称：" + newlist[i].name + "，数量：" + newlist[i].count + newlist[i].unit + "，单价：" + newlist[i].price.toFixed(2) + "(元)，小计：" + newlist[i].itemsumprice.toFixed(2) +"(元)\n"; 
    }else{
      useriteminfo = "名称：" + newlist[i].name + "，数量：" + newlist[i].count + newlist[i].unit + "，单价：" + newlist[i].price.toFixed(2) + "(元)，小计：" + newlist[i].itemsumprice.toFixed(2) +"(元)";  
    }
    useritemsinfo += useriteminfo;
}
  return `***<没钱赚商店>收据***
${useritemsinfo}
----------------------
总计：${summary.toFixed(2)}(元)
**********************`;
}

