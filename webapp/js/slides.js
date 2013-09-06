
/*
 *
 *     CONFIRMAR SE ESTA FUNCIONANDO COMANDO DO ARDUINO (DEIXAR APENAS NO SLIDE CERTO)
 *     
 */ 

var ipaddr = "192.168.2.8"; // "172.16.1.6";
var active = true;
var command_active = false;

var contador_burra = 0;


var NOME = "";

var LAMPADA_CRISTO = "2";
var LAMPADA_LUMINARIA = "1";

var LAMPADA_3 = "5";
var LAMPADA_4 = "3";
var LAMPADA_5 = "1";



var oicasa_counter = 0;
var tocou_aviso_amigo = false;


var dmx_controller_skip_init=true; // to avoid conflict with the ilumnichromedemo

var COLOR_UPDATE_INTERVAL=60;
var TIME_FOR_COLOR_CHANGE=2000;


var video_odisseia = document.getElementById("video_odisseia");
var video_googleio2013 = document.getElementById("video_googleio2013");


var audio_ativo = new Audio();
var audio_inativo = new Audio();

audio_ativo.src = "media/oicasa.mp3";
audio_inativo.src = "media/audio_inativo.mp3";



video_googleio2013.addEventListener('ended', function(){
  this.currentTime = 0;
  this.pause();
  window.slidedeck.loadSlide(1);
});

video_odisseia.addEventListener('ended', function(){
  this.currentTime = 0;
  this.pause();
  window.slidedeck.loadSlide(1);
  //window.slidedeck.nextSlide();
});






var comando_on = function() {
  command_active = true;
  set_lamp_state(LAMPADA_LUMINARIA, true, 25000, 255, 255, "none");
  audio_ativo.currentTime = 0;
  audio_ativo.play();
};

var comando_off = function() {
  command_active = false;
  set_lamp_state(LAMPADA_LUMINARIA, false);
  oicasa_counter = 0;
};




var COR_VERMELHO = [0, 255, 255]; //rgbToHsl(255, 0, 0);
var COR_VERDE = [255, 0, 0]; //rgbToHsl(0, 255, 0);
var COR_AZUL = []; //rgbToHsl(0, 0, 255);
var COR_PRETA = []; //rgbToHsl(0, 0, 0);
var COR_LARANJA = []; //rgbToHsl(255, 255, 0);
var COR_ROXA = []; //rgbToHsl(255, 0, 255);
var COR_CIANO = []; //rgbToHsl(0, 255, 255);
var COR_BRANCA = []; //rgbToHsl(255, 255, 255);
var COR_AMARELA = []; //rgbToHsl(255, 255, 125);






var slides = [
  "start",
  "me",
  "garoa",
  "assistirfilme",

  "comoera2011", //
  "mudoutudo",
  "exemplos",
  "comofunciona",
  "baixarcodigo",

  "googleio2013",

  "duvidas"
];








var stop_tudo = function() {

  if (!audio_ativo.paused) audio_ativo.pause();
  if (!audio_inativo.paused) audio_inativo.pause();

  if (!video_odisseia.paused) video_odisseia.pause();
  if (!video_googleio2013.paused) video_googleio2013.pause();

}


var limpar_timers = function(){
  if (tmr_countdown_2013to1962) clearInterval(tmr_countdown_2013to1962);
  if (tmr_countdown_1962to2013) clearInterval(tmr_countdown_1962to2013);
  if (tmr_democasa) clearInterval(tmr_democasa);
  if (tmr_demoamigo) clearTimeout(tmr_demoamigo);
  if (tmr_duvidas) clearInterval(tmr_duvidas);

}






var tmr_duvidas = null;






/* * * * * * * * * * * * * * * * * * * *  TROCA DE SLIDES  * * * * * * * * * * * * * * * * * * * */

document.addEventListener('slideenter', function(e) {

  stop_tudo();
  limpar_timers();



  console.log("troca de slides", slides[e.slideNumber - 1]);

  var slide_name = slides[e.slideNumber - 1];

  switch(slide_name) {
    case "start":
      //set_group_state(false);
      //set_lamp_state(LAMPADA_LUMINARIA, true, 40000, 255, 255, "none");
      break;

    case "me":
      break;

    case "garoa":
      break;



    case "assistirfilme":
      //set_group_state(false);
      video_odisseia.volume = 1;
      video_odisseia.currentTime = 0;
      video_odisseia.play();
      break;

    case "googleio2013":
      video_googleio2013.currentTime = 0;
      video_googleio2013.play();


    case "duvidas":

      /*
      if (tmr_duvidas) clearInterval(tmr_duvidas);
      var count_duvidas = 0;

      tmr_duvidas = setInterval(function(){
        count_duvidas++;
        if (count_duvidas < 5) {
          set_lamp_state(count_duvidas, true, null, null, null, "colorloop");
        } else {
          clearInterval(tmr_duvidas);
        }

      }, 3000);
      //set_group_state(true, 255, 255, 255, "colorloop");
      */
      break;

  }


}, false);

/* * * * * * * * * * * * * * * * * * * *  /ROCA DE SLIDES  * * * * * * * * * * * * * * * * * * * */











current_slide = 0;



SLIDE_CAMERA = 1;
SLIDE_ODISSEIA = 2;
SLIDE_HALLKILLS = 3;



function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO RELOGIOS  * * * * * * * * * * * * * * * * * * * */


var set_relogio = function(){
  var d = new Date();
  var data_hora = d.getHours() + ":" + pad(d.getMinutes(), 2);
  $(".relogio.current").text(data_hora);
};


setInterval(set_relogio, 1000);
  




/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO WEBSPEECH  * * * * * * * * * * * * * * * * * * * */

lang = "pt-BR";




  var comandos = [

    "oi casa",
    "querida cheguei",
    "olá casa",
    "ok casa",
    "okey casa",
    "mestre mandou",

    "burra",



    "cancelar",



    "cheguei",
    "faz de conta que estou aí",
    "faz de conta que tô aí",
    "finge que estou aí",
    "finge que tô aí",
    "pra mostrar aqui pro pessoal",
    "pra mostrar pro pessoal",
    "quero fazer um teste",
    "estou palestrando",
    "se apresenta",
    "sozinho",
    "faxineira",
    "o que você disse pra ela",
    "disse para ela",
    "disse para ela",
    "o que tem na geladeira",
    "comida na geladeira",
    "quanto tempo está na geladeira",
    "não tem nada aí",
    "não tem mais nada",
    "pedir pizza",
    "pedi pizza",
    "eu quero uma pizza",
    "estou com fome",
    "vegetariano",
    "coca cola",
    "0 não",
    "zero não",

    "estou com frio",
    "ligar o aquecedor",

    "tv no filme",
    "quero assistir um filme",
    "quero ver um filme",
    "deixa assistir filme",
    "deixa assistir o filme",
    "deixa ver filme",
    "deixa ver o filme",



    "como era 2011",
    "como era em 2011",
    "dois mil e onze",
    "2011",
    "mudou agora",
    "um exemplo",
    "você pode me dar exemplos",
    "você pode dar exemplos",
    "como funciona",
    "como isso funciona",
    "baixar o código",

    "qual é a novidade",


    "quem sou eu",
    "quem só eu",

    "e o que mais",
    "que mais",
    "mais o quê",
    "fala mais",




    "voltar para início",
    "voltar para o início",
    "recomeçar apresentação",
    "recomeçar",

    "próximo slide",
    "avançar slide",
    "próxima tela",
    "avançar tela",
    "passar tela",

    "slide anterior",
    "voltar slide",
    "tela anterior",

    "mussarela",
    "calabreza",


    "quantas horas",

    "me chama de",
    "me chamam de",
    "chamar de",
    "não me chama de nada",
    "não me chame de nada",

    "até mais",
    "tchau",
    "tiau",

  ];


function executar_comando(comando, args) {

    //stop_tudo();

    switch(comando) {

      case "oi casa":
      case "querida cheguei":
      case "olá casa":
      case "ok casa":
      case "okey casa":
      case "mestre mandou":

        //definir cor verde
        //reduzir audio do que tiver tocando

        if (command_active) {
          oicasa_counter++;
          if (oicasa_counter >= 2) {
            if (oicasa_counter >= 3) {
              falar("vai chamar a tua mãe! seu filho da puta!");
              oicasa_counter = 0;
            } else {
              falar("se você falar isso mais uma vez eu juro que te encho de porrada!");
            }
            return;
          }
        }


        comando_on();
        break;

      case "burra":
        contador_burra++;
        var prefix = "já é a "+contador_burra+"ª vez que você me chama assim. ";
        switch(contador_burra) {
          case 3: falar(prefix + "Foi você que me fez assim, viu!"); break;
          case 5: falar(comando + " é a tua mãe!"); break;
          case 6: falar("Jumento!"); break;
          case 8: falar(prefix + "Tô chatiada."); break;
          case 10: falar("Cansei. Você que é um imbecil!", function(){ chrome.app.window.current().close(); }); break;
          default:
            falar("eu ouvi isso!");
        }
        break;


      default:

        if (!command_active) return;

        switch(comando) {
          case "cancelar":
            comando_off();
            oicasa_counter = 0;
            break;

          case "cheguei":
            falar("não chegou, você acabou de dar checkin no Gogoo.");
            return;
            break;

          case "faz de conta que estou aí":
          case "faz de conta que tô aí":
          case "finge que estou aí":
          case "finge que tô aí":
            falar("E por que eu faria isso?", function(){
              comando_on();
            });
            return;
            break;


          case "pra mostrar aqui pro pessoal":
          case "pra mostrar pro pessoal":
          case "quero fazer um teste":
            falar("Pra quem? Você está palestrando hoje?", comando_on);
            return;
            break;

          case "estou palestrando":
            falar("ei gente, tô me sentindo famosa hoje!");
            //TODO: incluir REGEX "/d pessoas"
            return;
            break;


          case "se apresenta":
            falar("eu sou a casa, prazer! Controlo tudo por aqui, só não faço faxina.", comando_on);
            return;
            break;

          case "sozinho":
            falar("mas você mora comigo! Falando nisso, você não recolheu o lixo hoje.", comando_on);
            return;
            break;

          case "faxineira":
            falar("não. ela ligou dizendo que estava cansada deu dar comandos pra ela.", comando_on);
            return;
            break;

          case "o que você disse pra ela":
          case "disse para ela":
          case "disse para ela":
            falar("mandei ela desligar o telefone.");
            return;
            break;


          case "o que tem na geladeira":
          case "comida na geladeira":
            falar("só leite.", comando_on);
            return;
            break;


          case "quanto tempo está na geladeira":
            falar("alguns meses.", comando_on);
            return;
            break;

          case "não tem nada aí":
          case "não tem mais nada":
            falar("Tem café.", comando_on);
            return;
            break;

          case "estou com fome":
            falar("Vou pedir esfirra de carne!", comando_on);
            return;
            break;

          case "pedir pizza":
          case "pedi pizza":
          case "eu quero uma pizza":
            falar("isso denovo não. Você já pediu sábado e ontem. Vou pedir esfirra de carne!", comando_on);
            return;
            break;

          case "vegetariano":
            falar("tá bom, leãozinho. Peço de escarola pra você.", comando_on);
            return;
            break;

          case "coca cola":
            falar("tudo bem, vou pedir coca-cola,,, zero.", comando_on);
            return;
            break;

          case "0 não":
          case "zero não":
            falar("ai, o que eu não faço por você?");
            return;
            break;


          case "estou com frio":
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&q=Sao%20Paulo,%20BR", function(data){
              var tempo = Math.round(data.main.temp);
              var cidade = data.name;

              if (tempo <= 16) {
                falar("tem razão, leãozinho. Faz "+tempo+" graus aqui em "+cidade+". Você quer que eu ligue o aquecedor?", comando_on);
              } else {
                falar("olha, são "+tempo+" graus aqui em "+cidade+". Se você está com frio acho que deve ir no médico.");
              }
            });
            return;
            break;


          case "ligar o aquecedor":
            falar("tá bom, mas vai gastar energia.");
            return;
            break;

          case "tv no filme":
          case "quero assistir um filme":
          case "quero ver um filme":
            falar("não dá, eu estou assistindo a novela.", comando_on);
            return;
            break;

          case "deixa assistir filme":
          case "deixa assistir o filme":
          case "deixa ver filme":
          case "deixa ver o filme":
            falar("tá bom, mas a última vez que eu passei isso eu entrei em modo de espera.", function(){
              window.slidedeck.loadSlide(slides.indexOf("assistirfilme")+1);
              comando_off();
            });
            return;
            break;


          case "qual é a novidade":
            falar("a novidade é que agora dá pra conversar com o buscador!", function(){
              falar("finalmente tenho alguém que vai me entender. Olha a demonstração!", function(){
              
                window.slidedeck.loadSlide(slides.indexOf("googleio2013")+1);
                comando_off();
              });
            });
            return;
            break;






          case "como era 2011":
          case "como era em 2011":
          case "dois mil e onze":
          case "2011":
            window.slidedeck.loadSlide(slides.indexOf("comoera2011")+1);
            falar("em 2011 era assim: tinha que cologar uma tag no campo do formulário para aparecer o microfone.", function(){ 
              falar("A interface também era fixa e não podia mudar.", function(){
                falar("No mais, tinha que tratar tudo em javascript");
              }); 
            });
            return;
            break;




          case "mudou agora":
            window.slidedeck.loadSlide(slides.indexOf("mudoutudo")+1);
            falar("Mudou tudo! Agora é tudo via javascript. Tem até uma biblioteca se quiser facilitar.");
            return;
            break;



          case "um exemplo":
          case "você pode me dar exemplos":
          case "você pode dar exemplos":
            window.slidedeck.loadSlide(slides.indexOf("exemplos")+1);
            falar("Aqui está. O primeiro funciona para escrever mensagens e o segundo para adicionar legendas.");
            return;
            break;

          case "como funciona":
          case "como isso funciona":
            window.slidedeck.loadSlide(slides.indexOf("comofunciona")+1);
            break;


          case "baixar o código":
            falar("Nesse endereço aqui você pode baixar o codilébi");
            window.slidedeck.loadSlide(slides.indexOf("baixarcodigo")+1);
            break;




          case "quem sou eu":
          case "quem só eu":
            window.slidedeck.loadSlide(slides.indexOf("me")+1);
            falar("Você é o Luís Leão!");
            break;



          case "e o que mais":
          case "que mais":
          case "mais o quê":
          case "fala mais":
            window.slidedeck.loadSlide(slides.indexOf("garoa")+1);
            falar("Você também é membro do Garoa! Acessa o site gente, pra saber mais.");
            break;







          case "acender luz":
          case "acender a luz":
          case "acender luzes":
          case "acenda as luzes":
            set_group_state(true, COR_BRANCA[0], COR_BRANCA[1], COR_BRANCA[2], "none");
            falar("luz acesa!");
            break;

          case "apagar luz":
          case "apagar a luz":
          case "apagar luzes":
            set_group_state(false, 0, 255, 255, "none");
            falar("luzes apagadas!");
            break;

          case "desligar luz":
          case "desligar a luz":
          case "desligar luzes":
            set_group_state(false, 0, 255, 255, "none");
            falar("luzes desligadas!");
            break;





          case "cor leitura":
          case "cor para leitura":
          case "como leitura":
            set_group_state(true, 36000, 255, 255, "none");
            falar("luz com cor para leitura!");
            break;


          case "moto balada":
          case "modo balada":
            set_group_state(true, 46000, 255, 255, "none");

            set_group_state(true, 0, 255, 255, "colorloop");
            falar("modo balada ativado!");
            break;



          case "voltar para início":
          case "voltar para o início":
          case "recomeçar apresentação":
          case "recomeçar":
            window.slidedeck.loadSlide(1);
            break;






          case "próximo slide":
          case "avançar slide":
          case "próxima tela":
          case "avançar tela":
          case "passar tela":
            window.slidedeck.nextSlide();
            break;
        
          case "slide anterior":
          case "voltar slide":
          case "tela anterior":
            window.slidedeck.prevSlide();
            break;








          case "mussarela":
            falar("Pedi uma pizza de mussarela agora. Eles me entregarão daqui a 45 minutos.");
            return;
            break;

          case "calabreza":
            falar("mas você não disse que é vegetariano?", function(){
              comando_on();
            });
            return;
            break;








          case "me chama de":
          case "me chamam de":
          case "chamar de":

            NOME = args.substring(args.indexOf(comando)+comando.length+1).trim();
            console.log("novo nome ", NOME);

            if (NOME == "filho da puta") {
              falar("nem precisa pedir.");

            } else {
              console.log(args);
              falar("tudo bem.");
            }
            return;
            break;


          case "não me chama de nada":
          case "não me chame de nada":
            NOME = "";
            falar("melhor assim do que perder o respeito, né?");
            return;
            break;





          case "até mais":
          case "tchau":
          case "tiau":
            falar("tô indo nessa, galera. Qualquer dúvida pode perguntar pro Leão!");
            window.slidedeck.loadSlide(slides.indexOf("duvidas")+1);
            return;
            break;


          case "quantas horas":
            //todo: valores no singular

            var d = new Date();
            var data_hora = d.getHours() + " horas, " + d.getMinutes() + " minutos e " + d.getSeconds() + " segundos. ";
            var data_hora = d.getHours() + " horas e " + d.getMinutes() + " minutos.";
            console.log(data_hora);

            falar("São " + data_hora);
            return;
            break;

        }

        comando_off();
        //oicasa_counter = 0;
    }

}



function falar(texto, callback) {
  //acender luz azul
  set_lamp_state(LAMPADA_LUMINARIA, true, 55000, 255, 255, "none"); //45000

  console.log("AUDIO: ", texto);

  var audio_especial = new Audio();
  audio_especial.addEventListener('ended', function(){
    if (callback) { 
      callback();
    } else {
      //apagar luzes
      comando_off();
    }
  });

  audio_especial.src = "http://translate.google.com.br/translate_tts?ie=UTF-8&tl=pt&prev=input&q=" + texto + " " + NOME + "";
  console.log(audio_especial.src);
  audio_especial.play();

}


  var recognizing = false;
  var ignore_onend = false;



  var recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "pt-BR";
  recognition.maxAlternatives = 3;


  recognition.onstart = function() {
    recognizing = true;
    console.log("reconhecendo...");
  };

  recognition.onerror = function(event) {
    console.log("ERRO!", event.error);
    

    if (command_active) { //event.error == "no-speech" && 
      comando_off();
      oicasa_counter = 0;

      audio_inativo.currentTime = 0;
      audio_inativo.play();
    }

    /*
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
    */

  };

  recognition.onend = function() {
    console.log("onEND!");


    recognizing = false;
    if (ignore_onend) {
      return;
    }

    recognition.start();

  };

  recognition.onresult = function(event) {

    // verificar comandos aqui
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      var r = event.results[i];
      for (var j = 0; j< r.length; j++) {
        console.log(i, j, r[j])

        for (indice in comandos) {
          var comando = comandos[indice];

          if (r[j].transcript.indexOf(comando)!= -1) {
            console.log("COMANDO: " + comando);
            executar_comando(comando, r[j].transcript.trim());
            return;

          }
        }

      }

      if (command_active) {
        audio_inativo.currentTime = 0;
        audio_inativo.play();
      }
      comando_off();



    }

  };


  recognition.start();








/* * * * * * * * * * * * * * * * * * * *  CONFIGURANDO HUE  * * * * * * * * * * * * * * * * * * * */

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h*255, s*255, l&255];
}




var config_data = {
  "devicetype": "frontinrio",
  "username": "frontinrio"
};

var lights = null;


var get_hue_ip = function() {
  $.getJSON("https://www.meethue.com/api/nupnp", function(data) {
    if (data.length > 0) {
      console.log("RECEBEU HUE " + data[0].id + " IP: " + data[0].internalipaddress);
      ipaddr = data[0].internalipaddress;
      active = true;
    }
  });
};
//get_hue_ip();

var set_group_state = function(onOff, hue, sat, bri, effect, transitionTime, lamp_alert) {
  set_state("/groups/0/action", onOff, bri, hue, sat, effect, transitionTime, lamp_alert);
}



var set_lamp_state = function(lamp_id, onOff, hue, sat, bri, effect, transitionTime, lamp_alert) {
  set_state("/lights/" + lamp_id + "/state", onOff, bri, hue, sat, effect, transitionTime, lamp_alert);
}


//var set_lamp_state = function(lamp_id, onOff, bri, hue, sat, effect, transitionTime, lamp_alert) {
//  set_state("/lights/" + lamp_id + "/state", onOff, bri, hue, sat, effect, transitionTime, lamp_alert);
//}



var set_state = function(addr, onOff, bri, hue, sat, effect, transitionTime, lamp_alert) {
  if (!ipaddr || !active) {
    //get_hue_ip();
    return;
  }

  var lamp_state = {};
  if (onOff != undefined)           lamp_state.on = onOff;
  if (bri != undefined)             lamp_state.bri = bri;
  if (hue != undefined)             lamp_state.hue = hue;
  if (sat != undefined)             lamp_state.sat = sat; 
  if (effect != undefined)          lamp_state.effect = effect;
  if (transitionTime != undefined)  lamp_state.transitiontime = transitionTime;
  if (lamp_alert != undefined)      lamp_state.alert = lamp_alert;

  var change_url = "http://"+ipaddr+"/api/" + config_data.username + addr;

  console.log(change_url, lamp_state);
  $.ajax({
    url: change_url,
    type: "PUT",
    data: JSON.stringify(lamp_state),
    success: function(result) {

      console.log(result);
      // Do something with the result
    }
  });
}





/* * * * * * * * * * * * * * * * * * * *  /CONFIGURANDO HUE  * * * * * * * * * * * * * * * * * * * */















var addVisibilityChangeListener=function(slides, callback) {

  var observer=new WebKitMutationObserver(function(changes) {
    for (var i=0; i<changes.length; i++) {
      var target=changes[i].target;
      callback(target);
    }
  });

  for (var i=0; i<slides.length; i++) {
    observer.observe(slides[i], 
      {attributes: true, attributeFilter: ['class']});
  }

}

var desiredColor=[255,255,255];
var currentColor=[0,0,0];

var msUntilChange=TIME_FOR_COLOR_CHANGE;

var requestColorChange=function(colorHex, transitionMs) {
  // ///////////////// geral.acende();


/*
  var hsbColor = rgbToHsl(color[0], color[1], color[1]);

  //set_lamp_state(lamp_id, onOff, bri, hue, sat, effect, transitionTime, lamp_alert)
  set_group_state(true, 255, Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), "none", null, null);
  set_lamp_state("2", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  set_lamp_state("3", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  set_lamp_state("4", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  set_lamp_state("5", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);

*/


  if (color[0]===desiredColor[0] &&
      color[1]===desiredColor[1] &&
      color[2]===desiredColor[2]
    ) {
    return;
  }

  desiredColor=color;
  msUntilChange=transitionMs;


}

var convertColor=function(str) {
  var n=window.parseInt(str, 16);
  return [
    n>>16 & 0xff,
    n>>8 & 0xff,
    n & 0xff
  ];
};

(function() {

  var moveDelta=function(c, percent) {
    var delta=desiredColor[c]-currentColor[c];
    var newColor=Math.round(currentColor[c]+delta*percent);
    if (delta>0 && newColor<currentColor[c] ||
        delta<0 && newColor>currentColor[c]) { // should move up but some calculation went wrong
      newColor=desiredColor[c];
    }
    currentColor[c]=Math.min(Math.max(newColor, 0), 255);
  }

  var lastTime=Date.now();

  window.setInterval(function() {
    var now=Date.now();
    var deltaTime=now-lastTime;
    lastTime=now;
    if (desiredColor[0]===currentColor[0] && 
        desiredColor[1]===currentColor[1] &&
        desiredColor[2]===currentColor[2]) {
      msUntilChange=0;
      return;
    }
    msUntilChange-=deltaTime;
    if (msUntilChange<=0) {
      msUntilChange=0;
      currentColor[0]=desiredColor[0];
      currentColor[1]=desiredColor[1];
      currentColor[2]=desiredColor[2];
    } else {
      var percent=(deltaTime/msUntilChange);
      moveDelta(0, percent);
      moveDelta(1, percent);
      moveDelta(2, percent);
    }
    changeColor(currentColor[0], currentColor[1], currentColor[2]);

  }, COLOR_UPDATE_INTERVAL);
})();

var changeColor=function(r, g, b) {
  // ///////////////// geral.setColor(r, g, b);
  /// REMOVI DAQUI!!!!


  var hsbColor = rgbToHsl(r, g, b);

  //set_lamp_state(lamp_id, onOff, bri, hue, sat, effect, transitionTime, lamp_alert)
  //set_lamp_state("1", null, 255, Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);
  //set_group_state(true, 255, Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]));

  //set_lamp_state("1", null, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), null, null, null);



  var el=document.getElementById("colortester");
  if (!el) {
    el=document.createElement('div');
    el.id='colortester';
    el.style.position='absolute';
    el.style.bottom='60px';
    el.style.right='60px';
    el.style.width='10px';
    el.style.height='10px';
    el.style.borderRadius='5px';
    document.body.appendChild(el);
  }
  var color='#'+
  (r<16?'0':'')+r.toString(16)+
  (g<16?'0':'')+g.toString(16)+
  (b<16?'0':'')+b.toString(16);
  el.style.backgroundColor=color;
}

var colorMap={
  greenlights: "00FF00",
  yellowlights: "FFFF00",
  bluelights: "0000FF",
  redlights: "FF0000",
  nolights: "000000"
};


var spotControl={
  spot_on: true,
  spot_off: false
};

addVisibilityChangeListener(document.querySelectorAll("slide"), 
  function(element) {
      var visible=element.className.indexOf("current")>=0;
      if (visible) {
        var classes=element.className.split(' ');
        for (var i=0; i<classes.length; i++) {
          var cl=classes[i];
          if (colorMap[cl]) {


            //requestColorChange(colorMap[cl], TIME_FOR_COLOR_CHANGE);
            
            var color = convertColor(colorMap[cl]);
            var hsbColor = rgbToHsl(color[0], color[1], color[2]);

            console.log(color, hsbColor);

            //             onOff, bri, hue, sat, effect, transitionTime, lamp_alert
            set_group_state(true, Math.round(255*hsbColor[2]), Math.round(65535*hsbColor[0]), Math.round(255*hsbColor[1]), "none", null, null);


          } else if (typeof(spotControl[cl])==='boolean') {
            if (spotControl[cl]) {

              //pulpito.setBrightness(150);
              //pernas.acende();
              //logo.setBrightness(80);
            
            } else {
              //pulpito.apaga();
              //logo.acende();
              //pernas.apaga();
            
            }
          }
        }
      }
  });





