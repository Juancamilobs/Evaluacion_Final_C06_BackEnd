var datos = new Array();
/*
Funcion para inicializar los select
*/
function selectInit(){
  $(document).ready(function() {
    $('select').material_select();
  });
}
/*
Funcion para cargar los datos
*/
function cargarDatos(){

  $.ajax({
    url: './data-1.json',
   }).done(function(data){
    datos = data;
    return datos
  }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  }).then(function () {
      cargarTipo(datos);
      cargarCiudad(datos);
      cargarFiltros();
      mostrarTodos(datos);
      filtrar();

  });

}
/*
  Funcion para cargar la lista de ciudades
*/
function cargarCiudad (archivo){
  for (i=0;i<archivo.length;i++){
    ciudad = archivo[i].Ciudad;
    if ($("option[value='"+ciudad+"']").length!=0){
      continue
    }else{
      estructura = "<option value='"+ciudad+"'>"+ciudad+"</option>";
      $('#selectCiudad').append(estructura);
    }
  }
  selectInit();
};
/*
  Funcion para cargar la lista de tipos de propiedades
*/
function cargarTipo (archivo){
  for (i=0;i<archivo.length;i++){
    tipo = archivo[i].Tipo;
    if ($("option[value='"+tipo+"']").length!=0){
      continue
    }else{
      estructura = "<option value='"+tipo+"'>"+tipo+"</option>";
      $('#selectTipo').append(estructura);
    }
  }
  selectInit();
};

/*
  Funcion para leer los filtros de la busqueda personalizada
*/
  function cargarFiltros(){
    filtroCiudad = $('#selectCiudad').val();
    filtroTipo = $('#selectTipo').val();
    filtroMinimo = toNumber($('.irs-from').text());
    filtroMaximo = toNumber($('.irs-to').text());
  }

  /*
  Funcion para convertir los rangos de precios a numeros
  */
  function toNumber(cifra){
    numeroTemp = Number(cifra.replace("$","").replace(" ",""));
    return numeroTemp
  }
/*
  Funcion para activar el boton mostrar todos
*/
  function mostrarTodos(datos){
    $('#btnTodos').on('click',function(){
        for (i=0;i<datos.length;i++){
          estructura = "<div class='itemMostrado card'>" +
                       "<img src='img/home.jpg' alt='Demo'>" +
                       "<div class='card-stacked'>" +
                       "<strong>Dirección: </strong>" + datos[i].Direccion + "</br>" +
                       "<strong>Ciudad: </strong>" + datos[i].Ciudad + "</br>" +
                       "<strong>Teléfono: </strong>" + datos[i].Telefono + "</br>" +
                       "<strong>Código Postal: </strong>" + datos[i].Codigo_Postal + "</br>" +
                       "<strong>Tipo: </strong>" + datos[i].Tipo + "</br>" +
                       "<strong>Precio: </strong><span class='precioTexto'>" + datos[i].Precio + "</span></br>" +
                       "<div class='card-action'>VENTAS</div>" +
                       "</div>" +
                       "</div>";
          $('.colContenido').append(estructura);
        }
    })
  }
/*
  Funcion para filtrar las propiedades
*/
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
cargarDatos();
