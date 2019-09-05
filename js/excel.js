var input = document.getElementById('file'),
    input2 = document.getElementById('file2'),
    uploadfilenow = document.getElementById('uploadfilenow'),
    selectprogram = document.getElementsByClassName('selectprogram'),alreadychoose,jamkerjatoko=[],
    data1,data2,
    dtime = [],lembur,jam = 0,mnt=0, telat=0 , pelanggaran=0,cbonkas=0,cpelanggaranlain=0 ,
    theirdata = [],file1c = false , file2c=false,namadata;
    theirdata[0]=0,theirdata[1]=[];


    jamkerjatoko = [[6 , 14],[13 , 22],[5,12]]


    selectprogram[0].addEventListener('click',function(){alreadychoose = 'Toko';closeMenuSelect()})
    selectprogram[1].addEventListener('click',function(){alreadychoose = 'Pabrik',closeMenuSelect()})

    function closeMenuSelect(){
      document.getElementById('nextstep-1').classList.add('editnone')
      document.getElementById('nextstep-2').classList.remove('editnone')
      changeText('You have chosen [ '+alreadychoose+' ]')
    }

    
    input.addEventListener('change', function() {
      let check1 = input.files[0].name.split('.');
      if(check1[1] == 'xlsx'){
        readXlsxFile(input.files[0]).then(function(data) {
          document.getElementById('file-1').innerHTML = check1[0];
          data1 = data;
          file1c = true;
        })
      }
      else{
        alert('Format Salah');
      }
      
    })
    input2.addEventListener('change', function() {
      let check2 = input2.files[0].name.split('.');        
      if(check2[1] == 'xlsx'){
        readXlsxFile(input2.files[0]).then(function(data) {
          document.getElementById('file-2').innerHTML = check2[0];
          data2 = data;
          file2c = true;
        })
      } 
      else{
        alert('Format Salah 2')
      }
    })
    uploadfilenow.addEventListener('click',function(){
      if(file1c==true && file2c ==true){
        document.getElementById('template1').remove();
        document.getElementById('template2').style.display="block";
        createList();
        if(alreadychoose =="Toko")
          document.getElementsByClassName('bonusd')[0].value = 0
      }
    })


function createList(){
      if(data1[0].length <= 20){
        let b ;
        b = data2 ;
        data2 = data1;
        data1 = b;
      }
      forList(data1 , data2);
}


function forList(a,b){
  let checkemploy = 0;
  for(let i = 0 ; i < b.length ; i++){
    if(i+1 == b.length){
      break;
    }
    else{
      checkemploy++;
      let div1 = document.createElement("div"),
          div2 = document.createElement("div"),
          div3 = document.createElement("div"),
          div2div = document.createElement("div"),
          div2h3 = document.createElement("h3"),
          div3h4 = document.createElement("h4"),
          div3btn = document.createElement("button"),
          listem = document.getElementById('list-em');
      
          div1.className += "emp flex-sb";
          div2.classList.add("flex");
          div3.classList.add("flex");
          div3.classList.add("flex");
          
          div2div.classList.add("icon-u");
          div3h4.classList.add("salary");
          div3btn.classList.add("btn-detail");
      
          div3btn.innerHTML = "i";
          
          div2.appendChild(div2div);  
          div2.appendChild(div2h3);
          div3.appendChild(div3h4);  
          div3.appendChild(div3btn); 
      
          div1.appendChild(div2);
          div1.appendChild(div3);
  
          div2h3.innerHTML = b[i+1][0];
          div3h4.innerHTML = "Rp."+commaSeparateNumber(b[i+1][2]).split(",");
          div1.addEventListener('click',changeblue);
          listem.appendChild(div1);
    }
  }
  document.getElementById('getemploy').innerHTML = checkemploy
}


function changeblue(){
    let a = document.getElementsByClassName('active');
    if(a.length>=1){
      for(let i=0;i<a.length;i++){
        a[i].classList.remove('active');
      }
    }
    this.classList.toggle('active');
    showCekDetail();
}

function showCekDetail(){
  let ib = parseInt(document.getElementsByClassName('bonusd')[0].value);
  if(document.getElementsByClassName('none').length == 1){
    document.getElementById('checkdetail').classList.toggle('none');
  }
  document.getElementsByClassName('icon-p1')[0].addEventListener('click',cuticlicker1);
  document.getElementsByClassName('icon-p2')[0].addEventListener('click',cuticlicker2);
  
  ea = document.getElementsByClassName('active')[0].querySelector('h3');
  if(namadata == ea.innerHTML.toUpperCase()){
    if(document.getElementsByClassName('i-bonus')[0].getAttribute('data-bonus') == 'true'){
      ib = parseInt(document.getElementsByClassName('i-bonus')[0].value.split(',').join(""));
    }
    cbonkas = parseInt(document.getElementsByClassName('i-bonkas')[0].value.split(',').join(""));
    cpelanggaranlain =parseInt(document.getElementsByClassName('i-pelanggaranlain')[0].value.split(',').join(""));
  }
  else{
    document.getElementById('cuti').value = 0;
    namadata= ea.innerHTML.toUpperCase()
    cbonkas = 0;
    cpelanggaranlain = 0;
    document.getElementsByClassName('i-bonkas')[0].value = cbonkas
    document.getElementsByClassName('i-pelanggaranlain')[0].value = cpelanggaranlain
    document.getElementsByClassName('i-bonus')[0].removeAttribute('data-bonus')
    document.getElementsByClassName('i-bonus')[0].setAttribute('data-bonus','false')
  }
  dtime = [],lembur,jam = 0,mnt=0, telat=0 , pelanggaran=0;

  for(let i = 0 ; i<data1.length ; i++){
    if(i == data1.length){
      break;
    }
    else{
      if(data1[i][0] == "ID:"){
        if((data1[i][10]).toUpperCase() == ea.innerHTML.toUpperCase()){
          if(data1[i+1][0] == "ID:"){
            instantInsert('i-tidakhadir',0)
            instantInsert('noabsen',0)
            instantInsert('i-kehadiran',0)
          }
          else{
            theirdata[0] = 0
            theirdata[1] = []
            for(let aa = 0 ; aa <data1[i+1].length;aa++){

              theirdata[0] += data1[i+1][aa] == null ? 1 : 0
              if(data1[i+1][aa] == null) theirdata[1].push(" "+data1[2][aa]+" ")  
              
              if(data1[i+1][aa] == null){dtime[aa] = [0];}
              else{
              dtime[aa] = 
                [[parseInt(data1[i+1][aa].substr(0,2)) , parseInt(data1[i+1][aa].substr(3,2)) ], 
                 data1[i+1][aa].length >= 10 ? 
                 [parseInt(data1[i+1][aa].substr(data1[i+1][aa].length - 5,2)) ,parseInt(data1[i+1][aa].substr(data1[i+1][aa].length - 2,2)) ] :
                 [0]
              ];}
              
            }
            instantInsert('i-tidakhadir',theirdata[0])
            instantInsert('noabsen',theirdata[1].join())
            instantInsert('i-kehadiran',(data1[2].length - theirdata[0]))
          } 
        }
      } 
    }
  }
  for(let a = 0 ; a < data2.length; a++){
      
    if((data2[a][0]).toUpperCase() == ea.innerHTML.toUpperCase()){
      
      document.getElementById('username').innerHTML = ea.innerHTML.toUpperCase();
      document.getElementById('jobuser').innerHTML = data2[a][1].toUpperCase();
      if(alreadychoose == 'Pabrik')
        for(let z = 0 ; z < dtime.length ; z++){
          telat = 
              dtime[z] == 0 ? telat + 0 : 
              dtime[z][0][0] >= (data2[a][3].split(':'))[0] ? 
                  dtime[z][0][1] >15 ? telat + 1 : telat + 0 
              : telat + 0;
          pelanggaran = dtime[z][1] == 0 ? pelanggaran + 1 : pelanggaran + 0

            if(dtime[z][1] === undefined || dtime[z][1] == 0){
              jam +=0;
              mnt +=0;
            }
            else{
              if(dtime[z][1][0] > parseInt((data2[a][4].split(':'))[0])){
                jam += parseInt(dtime[z][1][0]) - (parseInt((data2[a][4].split(':'))[0])+ 1);
                mnt += parseInt(dtime[z][1][1]);
              }
            }
        }
      else if(alreadychoose == 'Toko')
        for(let z = 0 ; z < dtime.length ; z++){
          telat = (data2[a][1] == 'baker' || data2[a][1] == 'Baker'   )?
            dtime[z] == 0 ? telat + 0 : 
            dtime[z][0][0] >= jamkerjatoko[2][0] ? 
                dtime[z][0][1] >15 ? telat + 1 : telat + 0 
            :telat + 0
            
          : 
              dtime[z] == 0 ? telat + 0 : 
              dtime[z][0][0] >= jamkerjatoko[0][0] && dtime[z][0][0] <= (jamkerjatoko[1][0] - 1) ? 
                  dtime[z][0][1] >15 ? telat + 1 : telat + 0 
              :dtime[z][0][0] >= jamkerjatoko[1][0] ?  
                  dtime[z][0][1] >15 ? telat + 1 : telat + 0 
              :telat + 0
              
          pelanggaran = dtime[z][1] == 0 ? pelanggaran + 1 
                        : dtime[z][0] == 0 ? pelanggaran : 
                        dtime[z][0][0]> dtime[z][1][0] -1 ?
                        pelanggaran + 1 : pelanggaran + 0
          console.log( z,(dtime[z][0] == 0 ? pelanggaran : 
            dtime[z][0][0]> dtime[z][1][0] -1 ?
            true : false))
          if(dtime[z][1] === undefined || dtime[z][1] == 0){
              jam +=0;
              mnt +=0;
            }
            else{
              if(data2[a][1] == 'baker' || data2[a][1] == 'Baker' ){
                if(dtime[z][1][0] > parseInt(jamkerjatoko[2][1])){
                  jam += parseInt(dtime[z][1][0]) - (parseInt(jamkerjatoko[2][1] + 1));
                  mnt += parseInt(dtime[z][1][1]);
                }
              }
              else if(dtime[z][0][0] >=(jamkerjatoko[1][0] - 1)){
                if(dtime[z][1][0] > parseInt(jamkerjatoko[1][1])){
                  jam += parseInt(dtime[z][1][0]) - (parseInt(jamkerjatoko[1][1] + 1));
                  mnt += parseInt(dtime[z][1][1]);
                }
              }
              else if(dtime[z][0][0] <(jamkerjatoko[1][0] - 1)){
                if(dtime[z][1][0] > parseInt(jamkerjatoko[0][1])){
                  jam += parseInt(dtime[z][1][0]) - (parseInt(jamkerjatoko[0][1] + 1));
                  mnt += parseInt(dtime[z][1][1]);
                }
              }
            }
        }
      lembur = (jam + ((mnt - (mnt%60))/60));
      let checkcuti = theirdata[0] - parseInt(document.getElementById('cuti').value);
          checkcuti = checkcuti > 0 ? checkcuti : -1*checkcuti;
      let ig = Math.round( parseFloat(( data2[a][2] / 30) *(30 + (parseInt((data1[2].length - checkcuti)) - 27)))),
          it = telat * parseInt(document.getElementsByClassName('telatd')[0].value),
          ip = pelanggaran * parseInt(document.getElementsByClassName('pelanggarand')[0].value),
          il = lembur * parseInt(document.getElementsByClassName('lemburd')[0].value),
          tg;  
          ig = ig.toString().substring( ig.toString().length - 4, ig.toString().length) == '3333' ?
                ig + 1667 : 
                ig.toString().substring( ig.toString().length - 4, ig.toString().length) == '6666' ?
                 ig + 3334 :
                 ig.toString().substring( ig.toString().length - 4, ig.toString().length) == '9999' ?
                  ig + 1 : ig   
          
                  tg = ig + it + ip + il +ib+cbonkas+cpelanggaranlain
          datadiri(telat,pelanggaran,lembur,commaSeparateNumber( data2[a][2]).split(","),commaSeparateNumber(ig).split(","),
                  commaSeparateNumber(it).split(","),commaSeparateNumber(ip).split(","),
                  commaSeparateNumber(il).split(","), commaSeparateNumber(tg).split(","),ib)
                  
      break;
    }
    else datadiri(0,0,0,0,0,0,0,0,0,0)
  }
  document.getElementsByClassName('slip-g')[0].addEventListener('click',slipgajiboss)
} 

function slipgajiboss(){
  document.getElementsByClassName('periode')[0].innerHTML = data1[1][2]
  document.getElementsByClassName('sp-nama')[0].innerHTML = document.getElementById('username').innerHTML
  document.getElementsByClassName('sp-job')[0].innerHTML = document.getElementById('jobuser').innerHTML
  document.getElementsByClassName('sp-gaji')[0].innerHTML = document.getElementById('gajimu').innerHTML
  document.getElementsByClassName('sp-gaji')[1].innerHTML = document.getElementById('gajimu').innerHTML
  document.getElementsByClassName('sp-gajipokok')[0].innerHTML = document.getElementsByClassName('i-gaji')[1].value
  document.getElementsByClassName('sp-lembur')[0].innerHTML = document.getElementsByClassName('i-lembur')[1].value
  document.getElementsByClassName('sp-bonus')[0].innerHTML = document.getElementsByClassName('i-bonus')[0].value
  document.getElementsByClassName('sp-pendapatan')[0].innerHTML =commaSeparateNumber( 
  parseInt(document.getElementsByClassName('i-gaji')[1].value.split(',').join("")) +
  parseInt(document.getElementsByClassName('i-lembur')[1].value.split(',').join("")) +
  parseInt(document.getElementsByClassName('i-bonus')[0].value.split(',').join("")) ).split(",");
  document.getElementsByClassName('sp-telat')[0].innerHTML = document.getElementsByClassName('i-telat')[1].value
  document.getElementsByClassName('sp-pelanggaran')[0].innerHTML = commaSeparateNumber( parseInt(document.getElementsByClassName('i-pelanggaran')[1].value.split(',').join("")) + parseInt(document.getElementsByClassName('i-pelanggaranlain')[0].value.split(',').join("")) ).split(",");
  document.getElementsByClassName('sp-bon')[0].innerHTML = document.getElementsByClassName('i-bonkas')[0].value
  document.getElementsByClassName('sp-potongan')[0].innerHTML =commaSeparateNumber( 
  parseInt(document.getElementsByClassName('sp-telat')[0].innerHTML.split(',').join("")) +
  parseInt(document.getElementsByClassName('sp-pelanggaran')[0].innerHTML.split(',').join("")) +
  parseInt(document.getElementsByClassName('sp-bon')[0].innerHTML.split(',').join(""))).split(",");
  let dateObj = new Date(),
      month = dateObj.getUTCMonth() + 1,
      day = dateObj.getUTCDate(),
      year = dateObj.getUTCFullYear();
        newdate = (day >9 ? day : '0' + day) + " - " + (month > 9 ? month : '0'+month )+ " - " + year;
        document.getElementById('datenow').innerHTML = newdate
  if(document.getElementsByTagName('canvas').length==1)document.getElementsByTagName('canvas')[0].remove();
  document.getElementById('slipgaji').classList.remove('slipoff');
  let b=document.getElementById('savemeok')
  html2canvas(document.getElementById('screenmeplz')).then(function(canvas) {
    b.appendChild(canvas);
      document.getElementsByTagName('canvas')[0].style.zIndex = '10000'; 
  });
  document.getElementById('closescreen').addEventListener('click',function(){
    document.getElementById('slipgaji').classList.add('slipoff');
  })
}