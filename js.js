let $buttons = document.querySelectorAll(".tip-buttons button");
let $customInput = document.getElementById("custom");
let $resetButton = document.querySelector(".button-reset button");

let $persons = document.getElementById("peoples");;
let $bill = document.getElementById("bill");

let $totalResult = document.getElementById("total-result");
let $dividedResult = document.getElementById("divided-result");






// a cada boton le agrego el evento click y dentro la funcion calculo;
$buttons.forEach(element => {

    element.addEventListener("click",(event)=>{

        if(validacionRegular()){
            deleteMsj($customInput);
            $customInput.value = "";
            calculo(event.target.id , $persons.value)
            $resetButton.disabled = false;
        }
        
    })
})


// al custom input le agrego el evento keyup y la funcion calculo
$customInput.addEventListener("keyup",(event)=>{
    if(validacionRegular() && validacionCustom()){
        calculo(event.target.value, $persons.value);
        $resetButton.disabled = false;
    }
    
})



// boton que resetea toda la aplicacion
$resetButton.addEventListener("click", ()=>{
    $customInput.value = "";
    $persons.value= "";
    $bill.value = "";
    $totalResult.innerHTML= `$0.00`;
    $dividedResult.innerHTML=`$0.00`;
    $resetButton.disabled = true;


})






// funcion que realiza los calculos matematicos
const calculo = function (porcentaje,personas){

    //calculo el total del tipo y el tip por persona
    let tipTotal = ($bill.value * porcentaje) / 100;
    let tipDividido = tipTotal / personas;
    
    // pinto resultados en el dom
    $totalResult.innerHTML= `$${tipTotal.toFixed(2)}`;
    $dividedResult.innerHTML=`$${tipDividido.toFixed(2)}`;
}


// funcion que realiza las validaciones de los inputs
const validacionRegular = function (){

    let variableDeControl = true

    // limpio espacios vacios antes y despues
    $bill.value = $bill.value.trim();
    $persons.value = $persons.value.trim();
  
    //expresion regular que acepta solo numeros y flotantes
    let noLetras = /^-?\d*\.?\d*$/;

    //borramos mensajes anteriores si existen
    deleteMsj($bill);
    deleteMsj($persons);
    

    //consultamos que solo contenga numeros y flotantes
    if(!noLetras.test($bill.value)){
        createMsj("debe contener solo numeros",$bill);
        variableDeControl = false
    }
    
    if(!noLetras.test($persons.value)){
        createMsj("debe contener solo numeros",$persons);
        variableDeControl = false
    }


    //consultamos que el numero ingresado sea mayor a 0
    console.log($bill.value);
    if($bill.value<=0){
        createMsj("debe ser mayor a 0",$bill);
        variableDeControl = false
    }
    
    if($persons.value<=0){
        createMsj("debe ser mayor a 0", $persons);
        variableDeControl = false
    }

    if(variableDeControl == true){
        return true;
    }else{
        return false;
    }
}


// funcion que realiza las validaciones del  input custom
const validacionCustom = function (){

    let variableDeControl = true

    // limpio espacios vacios antes y despues
    $customInput.value = $customInput.value.trim();


    //expresion regular que acepta solo numeros y flotantes
    let noLetras = /^-?\d*\.?\d*$/;

    //borramos mensajes anteriores si existen
    deleteMsj($customInput);

    

    //consultamos que solo contenga numeros y flotantes
    if(!noLetras.test($customInput.value)){
        createMsj("debe contener solo numeros",$customInput);
        variableDeControl = false
    }
    

    //consultamos que el numero ingresado sea mayor a 0
    console.log($customInput.value);
    if($customInput.value<=0){
        createMsj("debe ser mayor a 0",$customInput);
        variableDeControl = false
    }

    if(variableDeControl == true){
        return true;
    }else{
        return false;
    }
}



// funcion que crea los mensajes
const createMsj = function(text,node){
    let fragment = document.createElement("p");
    fragment.classList.add("error-msj");
    fragment.innerHTML = text;
    node.parentNode.appendChild(fragment);    
}

//funcion que borra los mensajes

const deleteMsj = function(node){
     let deleted = node.parentNode.querySelector(".error-msj");
        if(deleted != null){
            node.parentNode.removeChild(deleted);
        }
}



// tiene que agregar la clase active al boton de reseteo