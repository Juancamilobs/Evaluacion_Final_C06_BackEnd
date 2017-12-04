<?php

$data = file_get_contents("data-1.json");
$propiedades = json_decode($data,true);

$i=0;
foreach($propiedades as $prop){
  echo $prop['Ciudad'];
  $i++;
  
}



 ?>
