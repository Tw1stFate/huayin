let forma = document.querySelector("#forma")
    let mwidth = document.querySelector("#mwidth");
    let mheight = document.querySelector("#mheight");
    let msize = document.querySelector("#msize");
    let Material = document.querySelector("#Material");
    let Printing = document.querySelector("#Printing");
    let YsTyp = document.getElementsByName("YsTyp");
    let CkData = document.getElementsByName("CkData");
    let Tprice = document.querySelector("#Tprice");
    let Dprice = document.querySelector("#Dprice");
	//let Format = document.querySelector("#Format");
    forma.addEventListener("input", mySystem);

    function mySystem(){
      for(let i=0;i<YsTyp.length;i++){
        if(YsTyp[i].checked){
          let mSquare = (parseFloat(mwidth.value) + 7) * (parseFloat(mheight.value) + 4) / 1000000 * parseFloat(msize.value); //平方值
          let cpMm = (parseFloat(mheight.value) + 4) / 1000 * parseFloat(msize.value); //成品米数
          let sjMm = cpMm * 1.05 + 200; //实际米数
              if (mSquare >= 200){
                sjMm = cpMm * 1.05 + 200; //实际米数
              }else{
                sjMm = cpMm + 200; //实际米数
              }
          let Cydata = (parseFloat(mwidth.value) + 7) / 1000 * sjMm; //常用数据
          let Mate = Cydata * parseFloat(Material.value) * 1.1; //材料费用
              if(mSquare < 5000){
                Mate = Cydata * parseFloat(Material.value) * 1.1;
              }else if(mSquare > 5000 && mSquare < 10000){
                Mate = Cydata * parseFloat(Material.value) * 1.05;
              }else{
                Mate = Cydata * parseFloat(Material.value) * 1.03;
              }
          let Spcolor = Cydata * 0.5; //专色费用
          let Print = mSquare * parseFloat(Printing.value); //印刷费用
              if (Print > 350 && mSquare < 5000){
                Print = mSquare * parseFloat(Printing.value);
              }else if(Print > 350 && mSquare > 5000 && mSquare < 10000){
                Print = mSquare * 1.2;
              }else if(Print > 350 && mSquare > 10000){
                Print = mSquare * 1.1;
              }else{
                Print = 350;
              }
          let YjorGm = Cydata * parseFloat(YsTyp[i].value); //光膜或亚胶费用
          let OtherAll = []; //复选框数组
          // 复选框综合计算
          for(let k=0;k<CkData.length;k++){
           if(CkData[k].checked){
            let ArrData = Cydata * parseFloat(CkData[k].value);        
            OtherAll.push(ArrData);
           }else{
            OtherAll.push(0);
           }
          }
          
          let Label= JBPrice(); //卷标费用
 
          //判断复选框最低值
          if (!OtherAll[0] == 0 && OtherAll[0] <= 130){
            OtherAll[0]= 130;
          }
          if (!OtherAll[1] == 0 && OtherAll[1] <= 130){
            OtherAll[1]= 130;
          }
          let tjPice = tjPrice(); //烫金价格
          let tjbPice = tjbPrice() //烫金版价格
          let KpcolorPrice= KSPrice(Spcolor); //专色价格
          let SpcolorPrice= SCPrice(Cydata); //白墨价格
          let Tarrprice = sum(OtherAll); //数组总和赋值
          let Mprice = Print + YjorGm + Mate + Label + Tarrprice + tjPice + tjbPice + KpcolorPrice + SpcolorPrice + 100; // 总价
              if (mSquare > 2000){
                Mprice = Print + YjorGm + Mate + Label + Tarrprice + tjPice + tjbPice + KpcolorPrice + SpcolorPrice; // 总价
              }else{
                Mprice = Print + YjorGm + Mate + Label + Tarrprice + tjPice + tjbPice + KpcolorPrice + SpcolorPrice + 100; // 总价
              }
          let Sprice = Mprice / parseFloat(msize.value); // 单价
          console.log(mSquare,Print)
          if (!isNaN(parseFloat(mwidth.value)) && !isNaN(parseFloat(mheight.value)) && !isNaN(parseFloat(msize.value))){
          Tprice.innerHTML= "总价：<span>￥" + parseInt(Mprice) + "<span>";
          Dprice.innerHTML= "单价：<span>￥" + Sprice.toFixed(3) + "<span>";
          }
       }
      }
    }

    //数组结算方法
    function sum(arr) {
    return eval(arr.join("+"));
    };

    //烫金价格
    let TjData = document.querySelector("#TjData");
    let twidth = document.querySelector("#twidth");
    let theight = document.querySelector("#theight");
    let tsize = document.querySelector("#tsize");
    function tjPrice() {
      if(TjData.checked && !isNaN(parseFloat(twidth.value)) && !isNaN(parseFloat(theight.value)) && !isNaN(parseFloat(tsize.value))){
        let tSquare = (parseFloat(twidth.value) + 7) * (parseFloat(theight.value) + 4) / 1000000 * parseFloat(tsize.value);//平方值
        let tpMm = (parseFloat(theight.value) + 4) / 1000 * parseFloat(tsize.value); //成品米数
        let tjMm = tpMm * 1.05 + 200; //实际米数
            if (tSquare >= 200){
              tjMm = tpMm * 1.05 + 200; //实际米数
              tSquare = (parseFloat(twidth.value) + 7) * (parseFloat(theight.value) + 4) / 1000000 * parseFloat(tsize.value); //平方值
            }else{
              tjMm = tpMm + 200; //实际米数
              tSquare = 200; //平方值
            }

          if ((parseFloat(twidth.value) + 5) * (parseFloat(theight.value) + 5) / 1000000 * parseFloat(tsize.value) * 2 > 300){
            return (parseFloat(twidth.value) + 5) * (parseFloat(theight.value) + 5) / 1000000 * parseFloat(tsize.value) * 2;
          }else{
            return 300;
          }
      }else{
        return 0;
      }
    }

    //烫金版
    let TjbData = document.querySelector("#TjbData");
    function tjbPrice() {
      if(TjData.checked && !isNaN(parseFloat(twidth.value)) && !isNaN(parseFloat(theight.value)) && !isNaN(parseFloat(tsize.value))){
        return (parseFloat(twidth.value) + 5) * (parseFloat(theight.value) + 5) / 100 * 0.4;
      }else{
        return 0;
      }
    }


    // 白墨价格
    let ZsData = document.querySelector("#ZsData");
    function SCPrice(ev) {
      if(ZsData.checked){
          if (ev * 0.3 >= 100){
            return ev * 0.3;
          }else{
            return 100;
          }
      }else{
        return 0;
      }
    }

    // 专色价格
    let KsData = document.querySelector("#KsData");
    let Kssize = document.querySelector("#Kssize");
    function KSPrice(ev) {
      if(KsData.checked && !isNaN(parseFloat(Kssize.value)) && ev > 120){
        return ev * parseFloat(Kssize.value);
      }else if(KsData.checked && !isNaN(parseFloat(Kssize.value)) && ev < 120){
        return 120 * parseFloat(Kssize.value);
      }else{
        return 0;
      }
    }

    // 卷标费
    let JbData = document.querySelector("#JbData");
    let Jbsize = document.querySelector("#Jbsize");
    function JBPrice() {
      if(JbData.checked && !isNaN(parseFloat(Jbsize.value)) && parseFloat(Jbsize.value) > 50){
        return (30 + (parseFloat(Jbsize.value) - 50)) * 1.3;
      }else if(JbData.checked && !isNaN(parseFloat(Jbsize.value)) && parseFloat(Jbsize.value) <= 50){
        return 30;
      }else{
        return 0;
      }
    }
    