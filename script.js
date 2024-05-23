//Integrantes del grupo:
//Yara Marcela Diaz Hoyos
//Jhon Jairo Lopez Caicedo
//Ing.Sistemas 3er Semestre TDA


//Variables Globales
var Na = 0, cant=90, ini=10;

function Rand(x)
{ return Math.floor(Math.random() * x); }

class nodo
{ constructor(info, pre, sig)
	{ this.data = info;
		this.prev = pre;
		this.next = sig;
	}
}

class ListaCirDoble
{ constructor()
	{ this.head = null;
		this.tail = null;
		this.size = 0;
	}
	AddHead(info)
	{ const NewNodo = new nodo(info, this.tail, this.head);
		if(!this.head)
			this.head =  this.tail = NewNodo.prev = NewNodo.next = NewNodo;
		else
		{ this.head.prev = NewNodo;
			this.tail.next = NewNodo;
			this.head = NewNodo;
		}
		this.size++;
	}
	AddAt(pos, info){
		let k, previo, actual;
		const NewNodo = new nodo(info, this.tail, this.head);
		if(pos < 0 || pos > this.size-1){
			return null;
		}else{
			if(pos == 0){
				this.AddHead(info);
			}else if(pos == this.size-1){
				this.AddTail(info);
			}else{
				actual = this.head;
				for(k=0; k<pos; k++){
					previo = actual;
					actual = actual.next;
				}
				NewNodo.prev = previo;
				NewNodo.next = actual;
				previo.next = NewNodo;
				actual.prev = NewNodo;
				this.size++;
			}
		}
	}
	AddTail(info)
	{ const NewNodo = new nodo(info, this.tail, this.head);
		if(!this.head)
			this.head =  this.tail = NewNodo.prev = NewNodo.next = NewNodo;
		else
		{ this.tail.next = NewNodo;
			NewNodo.prev = this.tail;
			NewNodo.next = this.head;
			this.head.prev = NewNodo;
			this.tail = NewNodo;
			
		}
		this.size++;
	}
	DelHead(info){
			let tpm;
		
			if(!this.head)
				return null;
			else if(this.head == this.tail){
				this.head = this.tail = null;
				this.size = 0;
			}
			else{
				let tmp = this.head;
				this.head = this.head.next;
				this.head.prev = this.tail;
				this.tail.next = this.head;
				tmp = null;
				this.size--;
			}
	}
	DelTail(){
		let tmp;
		if(!this.tail)
		  return null;
		else if(this.head == this.tail){
		  this.head = this.tail = null;
		  this.size = 0;
		}
		else{
			let tmp = this.tail;
			this.tail = this.tail.prev;
			this.tail.next = this.head;
			this.head.prev = this.tail;
			tmp = null;
			this.size--;
		}
	  }
	  DelAt(pos){
		let k, previo, actual;
		if(!this.head){
			return null;
		}else if(pos == 0){
			this.DelHead();
		}else if(pos == this.size-1){
			this.DelTail();
		}else{
			actual = this.head;
			for(k=0; k<pos; k++){
				previo = actual;
				actual = actual.next;
			}
			previo.next = actual.next;
			actual.next.prev = previo;
			this.tail.next = this.head;
			this.head.prev = this.tail;
			actual = null;
			this.size--;
		}
	}
DelCont(info) {
    let actual = this.head;
    let siguiente;
    for (let i = 0; i < this.size; i++) {
        siguiente = actual.next;
        if (actual.data == info) {
            if (actual == this.head) {
                this.DelHead();
            } else if (actual == this.tail) {
                this.DelTail();
            } else {
                actual.prev.next = actual.next;
                actual.next.prev = actual.prev;
                this.size--;
            }
            if (this.size == 0) {
                this.head = this.tail = null;
            }
        }
        actual = siguiente;
    }
}

	
	
	
	
}

var Lista = new ListaCirDoble(); //Instanciación

function Print()
{ var n, i, k, Tx, Valor;
	document.getElementById('store').innerHTML = "";
	Valor = Lista.head;
	if(Lista.size<=5)
	{	for(k=0; k<Lista.size; k++)
		{ Tx = "<p>"+Valor.data+"<br>"+k+"</p>"; //imprime el valor del nodo y en la parte inferior imprime su posición
			document.getElementById('store').innerHTML += Tx;
			Valor = Valor.next;
		}
	}
	else
	{ for(i=0; i<Na; i++)
			Valor = Valor.next;
		for(k=0; k<5; k++)
		{ n = i + k; //para imprimir la posición del nodo dentro de la lista
			if(n>=Lista.size)
				n-=Lista.size;
			Tx = "<p>"+Valor.data+"<br>"+n+"</p>"; //imprime el valor del nodo y en la parte inferior imprime su posición
			document.getElementById('store').innerHTML += Tx;
			Valor = Valor.next;
		}
	}
	Mensaje();
}

function Ant() //para regresar un nodo en la impresión de la lista
{ Na--;
	if(Na<0)
		Na=Lista.size-1;
	Print();
}

function Sig() //para avanzar un nodo en la impresión de la lista
{ Na++;
	if(Na>=Lista.size)
		Na=0;
	Print();
}

function AddHead(){
	var t;
  	t = Rand(cant)+ini;
	Lista.AddHead(t.toString());
	Print();
}
function AddAt(){
	let x, t;
	t = Rand(cant)+ini;
	x = prompt("Posición a agregar: ");
	if(x<0 || x>Lista.size-1){
	  alert("Posición No Valida!!");
	}
	else{
	  Lista.AddAt(x,t.toString());
	  Print();
	}
}

function AddTail(){
	var t;
	t = Rand(cant)+ini;
    Lista.AddTail(t.toString());  
    Print();
}
function DelHead(){
	Lista.DelHead();
	Print();
}
function DelAt(){
	let x;
	x = prompt("Posición a eliminar: ");
	if(x<0 || x>=Lista.size)
	  alert("Posición No Valida!!");
	else{
	  Lista.DelAt(x);
	  Print();
	}
}
function DelTail(){
	Lista.DelTail();
	Print();
}
function DelIgualA(){
	let num = prompt("Ingrese el contenido a borrar: ");
	Lista.DelCont(num);
	Print();
  }


function Mensaje() //Para imprimir el tamaño de la lista
{	document.getElementById('Msg0').innerHTML = "Tamaño: " + Lista.size;
}

function Iniciar()
{ Mensaje();
}

window.onload=Iniciar;