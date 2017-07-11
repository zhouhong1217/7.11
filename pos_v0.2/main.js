'use strict';

const inputs = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];


function printReceipt(inputs) {
  var orderItems = findItemInfo(inputs);
  userItem(orderItems);
  console.log(userItem(orderItems))
}

function findItemInfo(inputs){
  var allItems = loadAllItems();
  
  //获取销售物品的编号和数量
  var orderItems = [];
  let arr = [];
  for(let item of inputs) {
    if(!arr[item]){
      arr[item]= {};
      arr[item].barcode = item;
      arr[item].count = 1;
    }else{
      arr[item].count++;
    }
  }
  for(let value in arr){
    orderItems.push(arr[value]);
  }
  // console.log(orderItems)

  //根据barcode，获取销售物品的其他信息
  for(let i = 0;i < orderItems.length;i++){
    for(let j = 0;j < allItems.length;j++){
      if(orderItems[i].barcode == allItems[j].barcode){
        orderItems[i].name = allItems[j].name;
        orderItems[i].unit = allItems[j].unit;
        orderItems[i].price = allItems[j].price;
      }
    }
  }
  // console.log(orderItems)
  return orderItems;
}

function userItem(orderItems){
  // console.log(inputs)
  var useritemsinfo = "";//全部物品输出
  var useriteminfo = ""; //单个物品输出
  var summary = 0;
  for(let i = 0;i < orderItems.length;i++){
    orderItems[i].itemsumprice = orderItems[i].price * orderItems[i].count;
    summary += orderItems[i].itemsumprice;
    if(i != orderItems.length-1){
      useriteminfo = "名称：" + orderItems[i].name + "，数量：" + orderItems[i].count + orderItems[i].unit + "，单价：" + orderItems[i].price.toFixed(2) + "(元)，小计：" + orderItems[i].itemsumprice.toFixed(2) +"(元)\n"; 
    }else{
      useriteminfo = "名称：" + orderItems[i].name + "，数量：" + orderItems[i].count + orderItems[i].unit + "，单价：" + orderItems[i].price.toFixed(2) + "(元)，小计：" + orderItems[i].itemsumprice.toFixed(2) +"(元)";  
    }
    useritemsinfo += useriteminfo;
}
  return `***<没钱赚商店>收据***
${useritemsinfo}
----------------------
总计：${summary.toFixed(2)}(元)
**********************`;
}