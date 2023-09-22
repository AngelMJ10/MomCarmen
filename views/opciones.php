<?php

// Este archivo "invocará" desde el index (Dashboard) por lo tanto
// ya no es neceario session_start()

// Paso 1. ¿Cúal es nuestro nivel de acceso?
$permiso = $_SESSION['login']['nivelacceso'];

//2. Cada perfil tendrá disponible algunas opciones
$opciones = [];

switch ($permiso) {
  case "A":
    $opciones = [
      ["menu" => "Plato", "url" => "index.php?view=plato.php"],
      ["menu" => "Bebidas", "url" => "index.php?view=bebidas.php"],
      ["menu" => "Caja", "url" => "index.php?view=caja.php"]
    ];
  break;
  
  case "S":
    $opciones = [
      ["menu" => "Plato", "url" => "index.php?view=plato.php"],
      ["menu" => "Bebidas", "url" => "index.php?view=bebidas.php"],
      ["menu" => "Caja", "url" => "index.php?view=caja.php"]
    ];
  break;

  case "C":
    $opciones = [
      ["menu" => "Plato", "url" => "index.php?view=plato.php"],
      ["menu" => "Bebidas", "url" => "index.php?view=bebidas.php"],
      ["menu" => "Caja", "url" => "index.php?view=caja.php"]
    ];
  break;
}

// Paso 3. Ahora redenrizamos a la vista(SIDEBAR) las opciones que 
// corresponde a cada perfil
foreach ($opciones as $item) {
  echo "
    <li class='nav-item'>
      <a href='{$item['url']}' class='nav-link'>
        <i class='fas fa-fw fa-chart-area'></i>
        <span>{$item['menu']}</span>
      </a>
    </li>";
}

?>