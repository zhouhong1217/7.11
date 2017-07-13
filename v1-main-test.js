'use strict';

describe('pos_v1',() => {
  it('when loadAllItems(),should print text',() => {
    let result = [
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

    expect(loadAllItems()).toEqual(result);
  });

  it('give tags,when findItemInfo(),should print text', () => {
    let tags = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000005'
    ];
    let result = [
        {
            barcode: "ITEM000001",
            count: 4,
            name: "雪碧",
            price: 3.00,
            savecount: 0,
            unit: "瓶"
        },
        {
            barcode: "ITEM000005",
            count: 1,
            name: "方便面",
            price: 4.50,
            savecount: 0,
            unit: "袋"
        }
    ];

    expect(findItemInfo(tags)).toEqual(result);
  });

  it('give orderItems,when findReceiptInfo(),should print text1', () => {
    let orderItems = [
        {
            barcode: "ITEM000005",
            count: 1,
            name: "方便面",
            price: 4.50,
            savecount: 0,
            unit: "袋"
        }
    ];
    let result = [
        {
            barcode: "ITEM000005",
            count: 1,
            name: "方便面",
            price: 4.50,
            savecount: 0,
            unit: "袋",
            itemsumprice:4.50
        }
    ];
    expect(findReceiptInfo(orderItems)).toEqual(result);
  });

    it('give orderItems,when findReceiptInfo(),should print text2', () => {
        let orderItems = [
            {
                barcode: "ITEM000001",
                count: 4,
                name: "雪碧",
                price: 3.00,
                savecount: 0,
                unit: "瓶"
            },
            {
                barcode: "ITEM000005",
                count: 1,
                name: "方便面",
                price: 4.50,
                savecount: 0,
                unit: "袋"
            }
        ];
        let result = [
            {
                barcode: "ITEM000001",
                count: 4,
                name: "雪碧",
                price: 3.00,
                savecount: 1,
                unit: "瓶",
                itemsumprice:9.00
            },
            {
                barcode: "ITEM000005",
                count: 1,
                name: "方便面",
                price: 4.50,
                savecount: 0,
                unit: "袋",
                itemsumprice:4.50
            }
        ];
        expect(findReceiptInfo(orderItems)).toEqual(result);
    });

    it('give orderItems,when findReceiptInfo(),should print text3', () => {
        let orderItems = [
            {
                barcode: "ITEM000001",
                count: 4,
                name: "雪碧",
                price: 3.00,
                savecount: 0,
                unit: "瓶"
            },
            {
                barcode: "ITEM000000",
                count: 2,
                name: "可口可乐",
                price: 3.00,
                savecount: 0,
                unit: "瓶"
            },
            {
                barcode: "ITEM000005",
                count: 6,
                name: "方便面",
                price: 4.50,
                savecount: 0,
                unit: "袋"
            }
        ];
        let result = [
            {
                barcode: "ITEM000001",
                count: 4,
                name: "雪碧",
                price: 3.00,
                savecount: 1,
                unit: "瓶",
                itemsumprice: 9.00
            },
            {
                barcode: "ITEM000000",
                count: 2,
                name: "可口可乐",
                price: 3.00,
                savecount: 0,
                unit: "瓶",
                itemsumprice: 6.00
            },
            {
                barcode: "ITEM000005",
                count: 6,
                name: "方便面",
                price: 4.50,
                savecount: 2,
                unit: "袋",
                itemsumprice: 18.00
            }
        ];
        expect(findReceiptInfo(orderItems)).toEqual(result);
    });

});




describe('pos', () => {

  it('should print text', () => {

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

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
