<template>
    <div class="cont">
        <!-- <img src="\assets\logo.png" alt="logovue"> -->
        <h1 class="titulo1">MAGACINE</h1>
        <p>Conoce más sobre tus temas favoritos</p>
        <div class="Admin-revistas">   
            <router-link to="/ediciones">
                <button class="botones">
                   Administrar
                </button>
            </router-link>
            <router-link to="/Ver-ediciones">
                <button class="botones">
                    Ver revista
                </button>
            </router-link>
        </div>
    </div>
</template>

<style>
.cont
{
    padding: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
body
{
    background-image :url("../assets/fondo-lineas.jpg");
    background-size: cover;
}
.titulo1{
    font-family: 'Playfair Display', serif;
    text-align: center;
    font-size: 10vw;
}
h1{
    font-family: 'Playfair Display', serif;
    text-align: center;
    font-size: 5vw;
    text-shadow: 2px 2px 2px #0299ad;
    display: flex;
    justify-content: center;
    align-items: end;
}
p{
    font-family: 'Sono', sans-serif;
    text-align: center;
    justify-content: center;
    font-size: 2vw;
}
.botones
{
    font-family: 'Quicksand', sans-serif;
    font-size: 1.5vw;
    background-color:#0299AD;
    border-radius: 3vw;
    border: 2px groove #98EEFA;
    margin: 10px;
    display: flex;
    padding: 1vw;
    flex-direction: column;
}
.Admin-revistas
{
    display: flex;
}
.botones-listas
{
    font-family: 'Quicksand', sans-serif;
    font-size: 1vw;
    background-color:#0299AD;
    border-radius: 3vw;
    border: 2px groove #98EEFA;
    margin: 10px;
    display: flex;
    padding: 1vw;
    flex-direction: column;
    align-items: center;
}
.lista{
    list-style: none;
    display: flex;
    justify-content: space-around;
}
.botonfechas{
    font-family: 'Quicksand', sans-serif;
    font-size: 3vw;
    background-color:white;
    border: none;
    margin: 10px;
}
.botonEditar{
    font-family: 'Quicksand', sans-serif;
    font-size: 0.8vw;
    background-color:#0299AD;
    border-radius: 2vw;
    border: 2px groove #98EEFA;
    margin: 10px;
    padding: 1%;
}
.tabla{    
    font-family: 'Quicksand', sans-serif;
    font-size: 2vw;
}
.tabla-imagen{
    margin-top:2%;
}
</style>