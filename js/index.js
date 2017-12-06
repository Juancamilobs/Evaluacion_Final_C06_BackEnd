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
      mostrarTodos(datos);
      filtrar(datos);

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
    numeroTemp = Number(cifra.replace("$","").replace(" ","").replace(",",""));
    return numeroTemp
  }
/*
  Funcion para activar el boton mostrar todos
*/
  function mostrarTodos(datos){
    $('#btnTodos').on('click',function(){
       $('.itemMostrado').remove();
        for (i=0;i<datos.length;i++){
          $('.colContenido').append(plantilla(datos[i].Direccion,datos[i].Ciudad,datos[i].Telefono,datos[i].Codigo_Postal,datos[i].Tipo,datos[i].Precio));
        }
    })
  }
/*
  Funcion para filtrar las propiedades
*/
 function filtrar(datos){
   $('#formulario').submit(function(event){
     event.preventDefault();
     $('.itemMostrado').remove();
     cargarFiltros();
     if (filtroCiudad == null && filtroTipo == null){
       for (i=0;i<datos.length;i++){
         if (toNumber(datos[i].Precio) > filtroMinimo && toNumber(datos[i].Precio) < filtroMaximo){
           $('.colContenido').append(plantilla(datos[i].Direccion,datos[i].Ciudad,datos[i].Telefono,datos[i].Codigo_Postal,datos[i].Tipo,datos[i].Precio));
         }
       }
     }else if (filtroCiudad != null && filtroTipo == null) {
       for (i=0;i<datos.length;i++){
       if (datos[i].Ciudad == filtroCiudad && toNumber(datos[i].Precio) > filtroMinimo && toNumber(datos[i].Precio) < filtroMaximo){
         $('.colContenido').append(plantilla(datos[i].Direccion,datos[i].Ciudad,datos[i].Telefono,datos[i].Codigo_Postal,datos[i].Tipo,datos[i].Precio));
       }
      }
     }else if (filtroCiudad == null && filtroTipo != null) {
       for (i=0;i<datos.length;i++){
       if (datos[i].Tipo == filtroTipo && toNumber(datos[i].Precio) > filtroMinimo && toNumber(datos[i].Precio) < filtroMaximo){
         $('.colContenido').append(plantilla(datos[i].Direccion,datos[i].Ciudad,datos[i].Telefono,datos[i].Codigo_Postal,datos[i].Tipo,datos[i].Precio));
       }
      }
     }else if(filtroCiudad != null && filtroTipo != null){
       for (i=0;i<datos.length;i++){
       if (datos[i].Ciudad == filtroCiudad && datos[i].Tipo == filtroTipo && toNumber(datos[i].Precio) > filtroMinimo && toNumber(datos[i].Precio) < filtroMaximo){
         $('.colContenido').append(plantilla(datos[i].Direccion,datos[i].Ciudad,datos[i].Telefono,datos[i].Codigo_Postal,datos[i].Tipo,datos[i].Precio));
       }
      }
     }
   })
 }
/*
  Funcion para crear la estructura que se agrega al codigo HTML
*/
  function plantilla(direccion,ciudad,telefono,codigo,tipo,precio){
    estructura = "<div class='itemMostrado card'>" +
                 "<img src='img/home.jpg' alt='Demo'>" +
                 "<div class='card-stacked'>" +
                 "<strong>Dirección: </strong>" + direccion + "</br>" +
                 "<strong>Ciudad: </strong>" + ciudad + "</br>" +
                 "<strong>Teléfono: </strong>" + telefono + "</br>" +
                 "<strong>Código Postal: </strong>" + codigo + "</br>" +
                 "<strong>Tipo: </strong>" + tipo + "</br>" +
                 "<strong>Precio: </strong><span class='precioTexto'>" + precio + "</span></br>" +
                 "<div class='card-action'>VENTAS</div>" +
                 "</div>" +
                 "</div>";
    return estructura
  }

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
