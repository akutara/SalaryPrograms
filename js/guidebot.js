var timenowok = new Date(),
    mybotsalaris = document.getElementById('dialog')
    myboth2 = document.getElementById('chatblog'),
    timebot= document.getElementById('timenow')

    timebot.innerHTML = timenowok.getHours()+":"+timenowok.getMinutes();

function changeText(a){
  myboth2.innerHTML = a
  timebot.innerHTML = timenowok.getHours()+":"+timenowok.getMinutes();
}