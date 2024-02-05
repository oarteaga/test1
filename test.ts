//import { stringify } from "querystring"
import { numberToText } from "./utils/src/ebavel/NumberToText"
import { numtoTxt }     from "./utils/src/ebavel/NumberToText"

const operToMade = ['suma', 'resta', 'multiplica']
type operationMode = 'suma' | 'resta' | 'multiplica' | 'divide' | 'x';
type resultOperation = number | string;

const multiplicator = (a:number, b:number, operation: operationMode /*'suma' | 'resta' | 'multiplica'*/) : resultOperation =>
{
    let r:resultOperation = 'Sin valor'
    if(operation=='suma')
        r  = a+b
    if(operation=='resta')
        r =  a-b
    if(operation=='multiplica')
        r =  a*b
    if(operation=='divide')
    {
        if(b===0)
            throw new Error("No se puede dividir entre zero");
        r =  a/b
    }
    console.log('Result : ' + r)
    return r
}
const multiplicator2 = (a:number, b:number, operation: operationMode /*'suma' | 'resta' | 'multiplica'*/) : resultOperation =>
{
    let r:resultOperation = 'Sin valor'
    if(operation=='suma')
        r  = a+b
    if(operation=='resta')
        r =  a-b
    if(operation=='multiplica')
        r =  a*b
    if(operation=='divide')
    {
        if(b===0)
            throw new Error("No se puede dividir entre zero");
        r =  a/b
    }
    console.log('Result : ' + r)
    return r
}
/*  --- test.php ---
<?php
	error_log(date("Y-m-d H:i:s").": ".print_r($_POST, true), 3, "fech.log");
	$n1 = isset($_POST["num1"]) ? $_POST["num1"] : null;
	$n2 = isset($_POST["num2"]) ? $_POST["num2"] : null;

	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
	if ($contentType === "application/json" && $n1==null && $n2==null) {
	  $content = trim(file_get_contents("php://input"));
	  $decoded = json_decode($content, true);
	  if(! is_array($decoded))
		error_log(date("Y-m-d H:i:s").": invalid json ", 3, "fech.log");
	  else {
		$n1 = $decoded['num1'];
		$n2 = $decoded['num2'];
	  }
	}
	else {
		error_log(date("Y-m-d H:i:s").": no fue", 3, "fech.log");
	}
	$data = array("a" => "Apple", "b" => "Ball", "c" => "Cat", "result"=>$n1*$n2);
	header("Content-Type: application/json");
	echo json_encode($data);
	exit();
?>
*/

let _datos = {'titulo': "foo", 'principal': "bar", 'Id':1, 'num1':10, 'num2':20 }
const operation = fetch ('https://kpionline5.bitam.com/gp/test.php', {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(_datos),
    })
    .then(res => res.json())                                //convertir a json
    .then(json => {
        console.log(json)   //imprimir
        console.log(JSON.stringify(json))
    })
    //.then(json => console.log(json))                             //imprimir
    .catch(err=>console.log('Error en la llamada', err))    //capturar errores

console.log( 'operation='+operation )
console.log( numtoTxt(1245) )
console.log( numberToText(10598) )
multiplicator(4, 5, 'x')
multiplicator(4, 0, 'suma')
//indica que se regresa un tipo de array que son numeros
const regresaArrayNumbers = (params:string) : Array<number> => {
    return([1,2])
}

const arrTextNumberDict: { [key : string]: string | boolean } = {
    '1_0': '',
    '1_1': 'one hundred',
    '1_2': 'two hundred'
}

interface User {   name: string;   id: number;  }
const user: User = {
    name: "Hayes",
    id: 0,
};

console.log( 'Array key =' + arrTextNumberDict['1_2'] )
console.log( process.argv )
console.log( regresaArrayNumbers('1') )


const a:number = Number(process.argv[2])
const b:number = Number(process.argv[3])
multiplicator2(a, b, 'suma')