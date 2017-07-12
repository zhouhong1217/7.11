'use strict';
function loadAllItems() {
  return [
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
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}

const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];



function findItemInfo(tags){
  //获取销售物品的编号和数量
  var orderItems = [];
  let arr = [];
  for(let item of tags) {
    if(item.split("-")[1] == undefined){
      //item分割后面没有数目的情况下，判断arr[item]是否存在，不存在则创建，存在则count++
      if(!arr[item]){
        arr[item]= {};
        arr[item].barcode = item;
        arr[item].count = 1;
      }else{
        arr[item].count++ ;
      }
    }else{
      //item分割后面有数目的情况下，创建obj，将barcode和count分别遍历出来
      var obj = {};
      obj.firstchar = item.split("-")[0];
      obj.lastchar = parseFloat(item.split("-")[1]);
      //判断arr[obj.barcode]是否存在，不存在创建，存在count++
      if(!arr[obj.firstchar]){
        arr[obj.firstchar] = {};
        arr[obj.firstchar].barcode = obj.firstchar;
        arr[obj.firstchar].count = obj.lastchar;
      }else {
        arr[obj.firstchar].count += obj.lastchar;
      }
    }
  }
  //将arr遍历到orderItems
  for(let value in arr){
    orderItems.push(arr[value]);
  }
  var allItems = loadAllItems();
  //根据barcode，获取销售物品的其他信息添加进orderItems
  for(let i = 0;i < orderItems.length;i++){
    for(let j = 0;j < allItems.length;j++){
      if(orderItems[i].barcode == allItems[j].barcode){
        orderItems[i].name = allItems[j].name;
        orderItems[i].unit = allItems[j].unit;
        orderItems[i].price = allItems[j].price;
        orderItems[i].savecount = 0;
      }
    }
  }
  // console.log(orderItems)
  return orderItems;
}


function findReceiptInfo(orderItems){
  var promotions = loadPromotions();
  
  for(let i = 0;i < orderItems.length;i++){
    //判断该商品是否参与促销，a[j]指的是promotions内的barcode放入a[j]数组中
    for(let j = 0;j < promotions.length;j++){
      var a = [];
      for(let item in promotions){
        a.push(promotions[item].barcodes);
      }
      for(let q = 0 ;q < a[j].length;q++){
        if(orderItems[i].barcode == a[j][q]){
          //判断数量是否大于3，大于的话，计算savecount的数量，小于的话，savecount=0
          if(promotions[j].type == 'BUY_TWO_GET_ONE_FREE'){
            if(orderItems[i].count >= 3){
              for(let k = orderItems[i].count;k / 3 >= 1;k = k-3){
                orderItems[i].savecount++;
                // console.log(orderItems[i].savecount)
              }
            }
             break;
          }
          break; 
        }
      }
    }
    
    orderItems[i].itemsumprice = orderItems[i].price * (orderItems[i].count - orderItems[i].savecount);
    // console.log(orderItems[i].itemsumprice)
  }
  return orderItems; 
}


function builduserItem(receiptInfo){
  var useritemsinfo = "";//全部物品输出
  var useriteminfo = ""; //单个物品输出
  var summary = 0;
  var savemoney = 0;
  
  //遍历orderItems，获得summary、savemoneyuseritemsinfo
  for(let i = 0;i < receiptInfo.length;i++){
    summary += receiptInfo[i].itemsumprice;
    savemoney += receiptInfo[i].savecount * receiptInfo[i].price;
    if(i != receiptInfo.length-1){
      useriteminfo = "名称：" + receiptInfo[i].name + "，数量：" + receiptInfo[i].count + receiptInfo[i].unit + "，单价：" + receiptInfo[i].price.toFixed(2) + "(元)，小计：" + receiptInfo[i].itemsumprice.toFixed(2) +"(元)\n"; 
    }else{
      useriteminfo = "名称：" + receiptInfo[i].name + "，数量：" + receiptInfo[i].count + receiptInfo[i].unit + "，单价：" + receiptInfo[i].price.toFixed(2) + "(元)，小计：" + receiptInfo[i].itemsumprice.toFixed(2) +"(元)";  
    }
    useritemsinfo += useriteminfo;
    // console.log(useritemsinfo)
  }
  return `***<没钱赚商店>收据***
${useritemsinfo}
----------------------
总计：${summary.toFixed(2)}(元)
节省：${savemoney.toFixed(2)}(元)
**********************`;
}


function printReceipt(tags){
  var orderItems = findItemInfo(tags);
  var receiptInfo = findReceiptInfo(orderItems);
  var print =  builduserItem(receiptInfo);
  console.log(print)
}
printReceipt(tags);
