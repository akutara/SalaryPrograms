let cl = document.getElementById('closemeok'),
    cg = document.getElementById('checkdetail'),
    ic = document.getElementsByClassName('icon-edit');
var editdata;

cl.addEventListener('click' , function(){
    cg.classList.toggle('none');
    if(document.getElementsByClassName('p1')[0].classList.contains('remove-page')){
        document.getElementsByClassName('p1')[0].classList.remove('remove-page')
        document.getElementsByClassName('p2')[0].classList.add('remove-page')
        document.getElementsByClassName('detail-title')[0].innerHTML="Detail User"
    }
})


function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

for(let ttt = 0 ; ttt<ic.length; ttt++){
    ic[ttt].addEventListener('click',function(){
        if(document.getElementsByClassName('edittrue').length==1){
          document.getElementsByClassName('edittrue')[0].previousElementSibling.previousElementSibling.focus();
        }
        else if(this.previousElementSibling.hasAttribute('disabled')){
            this.previousElementSibling.removeAttribute('disabled');
            this.previousElementSibling.value = this.previousElementSibling.value.split(',').join("");
            this.previousElementSibling.focus();
            editdata = this.previousElementSibling.value;
            this.previousElementSibling.classList.add('bg-b');
            this.nextElementSibling.classList.remove('editnone');
            this.nextElementSibling.classList.add('edittrue');
        }else{
            this.previousElementSibling.disabled = true;
            this.previousElementSibling.classList.remove('bg-b');}
    })
}
for(let tttt = 0 ; tttt<document.getElementsByClassName('editbot').length; tttt++){
  document.getElementsByClassName('editbot')[tttt].addEventListener('click',function(){
    let b = this.parentNode.previousElementSibling.previousElementSibling;
    if(b.getAttribute('data-bonus') == 'false'){
      b.removeAttribute('data-bonus')
      b.setAttribute('data-bonus','true')
    }
    if(this.getAttribute('data-a') == 'ok'){
      let c;
      if(b.getAttribute('data-minus') == 'true'){
        if(b.value < 0) c = commaSeparateNumber( 1 * parseInt(b.value)).split(",")
        else c = commaSeparateNumber( -1 * parseInt(b.value)).split(",")
      }
      else c = commaSeparateNumber(parseInt(b.value)).split(",")
      b.value =  c;
      b.disabled = true;
    }
    else if(this.getAttribute('data-a') == 'cancel'){
      b.value = editdata;
      b.disabled = true;
    }
    else{alert('Opsss founded some ERROR. Please Refresh Your Browser')}
    b.classList.remove('bg-b');
    this.parentNode.classList.add('editnone');
    this.parentNode.classList.remove('edittrue');
    showCekDetail()
  })
}
function closepage(a,b){
    document.getElementsByClassName(a)[0].classList.add('remove-page');
    document.getElementsByClassName(b)[0].classList.remove('remove-page');
    if(a=='p1'){
      document.getElementsByClassName('detail-title')[0].innerHTML="Detail Gaji"
    }
    else{
      document.getElementsByClassName('detail-title')[0].innerHTML="Detail User"
    }showCekDetail();
  }

  function cuticlicker1(){
    let ea =  document.getElementById('cuti').value; 
    if(parseInt(ea)<=0){
      document.getElementById('cuti').value = 0;
    }
    else{document.getElementById('cuti').value = parseInt(ea) - 1;}
  
  }
  function cuticlicker2(){
    let ea =  document.getElementById('cuti').value;
    if(theirdata[0]>10){
      if(parseInt(ea)>=10)document.getElementById('cuti').value = 10;
      else document.getElementById('cuti').value = 1 +  parseInt(ea)
    } 
    else if(parseInt(ea)>=theirdata[0]) document.getElementById('cuti').value = theirdata[0];
    else document.getElementById('cuti').value = 1 +  parseInt(ea);
  }
function commaSeparateNumber (val) {
    val = val.toString();
    while (/(\d+)(\d{3})/.test(val)){
      val = val.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  
    //thx to epascarello from  https://stackoverflow.com/questions/14751802/split-string-every-3-characters-from-back-using-javascript to helping me create this function
  }
  
  function instantInsert(a , b){
    let ea = document.getElementsByClassName(a)[0];
    if(ea.hasAttribute('type')) ea.value = b
    else ea.innerHTML = b
  }
  function instantInsert2(a , b ,c){
    let ea = document.getElementsByClassName(a)[1];
    if(ea.hasAttribute('type')) ea.value = b
    else ea.innerHTML = b
  }
  
  function datadiri(a,b,c,d,e,f,g,h,i,j){
    instantInsert('i-telat',a)
    instantInsert('i-pelanggaran',b)
    instantInsert('i-lembur',c)
    instantInsert('i-gaji',d)
    instantInsert2('i-gaji',commaSeparateNumber(e).split(","))
    instantInsert2('i-telat',commaSeparateNumber(f).split(","))
    instantInsert2('i-pelanggaran',commaSeparateNumber(g).split(","))
    instantInsert2('i-lembur',commaSeparateNumber(h).split(","))
    document.getElementById('gajimu').innerHTML = commaSeparateNumber(i).split(",")
    instantInsert('i-bonus',commaSeparateNumber(j).split(","))
  }
  
  