const calculateTax = input =>{
  return {
    taxForSellSide: calculateTaxForSellSide(input),
    taxForBuySide: calculateTaxForBuySide(input)
  }
}

const calculateTaxForSellSide = input => {
  return [{
      value:2.5 * input.size,
      display: "交易手续费",
      display2: "tradeCommission",
      order: 0,
      stand:"2.5元/平方米×建筑面积",
      payTo:"房屋交易管理机构"
  }, {
      value: input.size * input.sellPrice * 0.05 / 100,
      display: "合同印花税",
    display2: "contractPaper",
    order: 1,
    stand: "房屋成交总额×0.05%（免交）",
    payTo: "国家财税局"
    }, {
      value: calculateBusinessTax(input),
      display: "营业税",
      display2: "businessTax",
      order: 2,
      stand: "2.5元/平方米×建筑面积",
      payTo: "国家财税局"
  }, {
      value: calculateIndividualIncomeTax(input),
      display: "个人所得税",
    display2: "individualIncomeTax",
    order: 3,
    stand: "2.5元/平方米×建筑面积",
    payTo: "国家财税局"
    }, {
      value: input.size * input.sellPrice * 1 / 100,
      display: "中介费",
      display2: "agencyFee",
      order: 4,
      stand: "房屋成交总额x1%",
      payTo: "中介公司"
    }
  ]
}

const calculateBusinessTax = input=>{
  var rate = 5/100;
  if(input.isNormalHouse){
    if(!input.isMoreThan2Years){
      return input.size * input.sellPrice * rate;
    }else{
      return 0;
    }
  }else{
    if(!input.moreThan2Years){
      return input.size * input.sellPrice * rate;
    }else{
      return input.size * (input.sellPrice - input.buyPrice) * rate
    }
  }
}

const calculateIndividualIncomeTax = input =>{
  if (input.isNormalHouse){
    if (!input.isMoreThan5Years || !input.isOnlyHouse){
      var tax1 = input.sellPrice * input.size * 1/100;
      var tax2 = (input.sellPrice - input.buyPrice) * input.size * 20 /100
      return tax1>tax2? tax2:tax1;
    }else{
      return 0;
    }
  }
}

const calculateTaxForBuySide = input=>{
  return [{
    value: calculateDeedTax(input),
    display: "契税",
    order: 0,
    payTo: "国家财税局"
  }, {
      value: 2.5 * input.size,
      display: "交易手续费",
    order: 1,
    payTo: "房屋交易管理机构"
    }, {
      value: input.size * input.sellPrice * 0.05 / 100,
      display: "合同印花税",
      order: 2,
      payTo: "国家财税局"
  }, {
    value: 5,
    display: "权证印花税",
    order: 3,
    payTo: "国家财税局"
    }, {
      value: input.size * input.sellPrice * 1 / 100,
      display: "中介费",
      order: 4,
      payTo: "中介公司"
    }]
  return { 
    deedTax: calculateDeedTax(input),
    transactionFee: 2.5 * input.size,
    stampTax: input.size * input.sellPrice * 0.05/100,
    StampDutyTax: 5,
    tradeRegisterFee: input.isNormalHouse?40:550,
    pictureFee:25,
    agencyFee: input.size * input.sellPrice * 1 / 100
    }
}

const calculateDeedTax = input => {
  var rate= 0;
  if (input.isNormalHouse){
    if (input.size < 90 && input.isFirstBuy){
      rate = 1 /100;
    }else{
      rate = 1.5 /100
    }
  }else{
    rate = 3/100
  }
  return input.size * input.sellPrice * rate;
}


module.exports = {
  calculateTax: calculateTax
}