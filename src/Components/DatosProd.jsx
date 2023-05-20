

import {Table, Button, Row} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {useState} from "react";

export const DatosProd = (props) => {
    //hook para la visualizacion del formulario
    const [isVisible, setIsVisible] = useState(false);
    //hooks para los datos del Producto
    const [matricula, setMatricula] = useState("");
    const [nombre, setNombre] = useState("");
    const [marca, setmarca] = useState("Norma");
    const [imagen, setImagen] = useState("");
    //hook Arreglo para el listado de Productos
    const [Productos, setProductos] = useState([])  //lista vacia


    //variable del estado inicial de formulario(indicador de guardar)
    const estadoInicial = {botonF:'GUARDAR', Producto:{},indice:-1,titulo:''}
    //hook para estado del formulario
    const [estado,setEstado] = useState(estadoInicial)


    const guardar = (event) => {
        event.preventDefault();
        if (estado.botonF==="GUARDAR"){
            setProductos([...Productos, {matricula,nombre,marca,imagen}])
            setMatricula('')
            setNombre('')
        }else if (estado.botonF==="Editar"){
            const aux =[...Productos]
            aux[estado.indice]={matricula,nombre,marca,imagen}
            setProductos(aux)
            setEstado(estadoInicial)
            setMatricula('')
            setNombre('')
        }

    };



    const vistaFormu = () => {
        setIsVisible(!isVisible); //hook con funcionamiendo de bandera
    }


    //evento que cuando ingrese matricula se va a mandar lo que se halla secrito
    const eventoMatricula = (event) => {
        setMatricula(event.target.value)
    }
    const eventoNombre = (event) => {
        setNombre(event.target.value)
    }
    const eventomarca = (event) => {
        setmarca(event.target.value)
    }

    //evento que recibe la imagen y despues la convierte en un onjeto temporal
    //accesible desde una URL
    const eventoImagen = (event) => {
        const file = event.target.files[0]; //e.t file arreglo de archivos
        const url = URL.createObjectURL(file)
        setImagen(url)
    }

    const onEdit = (alum,index) => {
        setEstado({botonF:'Editar', Producto:{},indice:index,titulo: 'Editar Producto'})
        setMatricula(alum.matricula)
        setNombre(alum.nombre)
        setmarca(alum.marca)

    }

    const onBorrar = (i) => {
        setProductos(Productos.filter((_,id)=>id!==i))

    }

    return <>

        <Row>
            <h2 className="titulo">REGISTRO PRODUCTOS </h2>
            <Button color="primary" onClick={vistaFormu}>Agregar Producto</Button>
            {isVisible && (
                <Form onSubmit={guardar}>
                    <h2>{estado.titulo}</h2>
                    <FormGroup>
                        <Label>
                            Clave:
                            <Input //Input T mayuscula pertenece a la libreria de Reac strap
                                //
                                type="text" //tipo input = texto
                                value={matricula} //valor va a ser en cado de la edicion del Producto
                                onChange={eventoMatricula} //metodo en caso de ingrrse un valor
                                required={true} //
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Producto:
                            <Input
                                type="text"
                                value={nombre}
                                onChange={eventoNombre}
                                required={true}
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            marca:
                            <Input
                                type="select"
                                required={true}
                                value={marca}
                                onChange={eventomarca}
                            >
                                <option value="norma">norma</option>
                                <option value="STABILO">STABILO</option>
                                <option value="PRITT">PRITT</option>
                                <option value="SCRIBE">SCRIBE</option>
                                <option value="BIC">BIC</option>
                                <option value="PELIKAN">PELIKAN</option>
                            </Input>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="foto">FOTO:</Label>
                        <Input
                            type="file"
                            name="foto"
                            id="foto"
                            onChange={eventoImagen}
                            required={true}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" className="botong">{estado.botonF}</Button>
                </Form>
            )}

            <Table class="table table-striped" >
                <thead className="table-primary">
                <tr>
                    <th>MATRICULA</th>
                    <th>NOMBRE</th>
                    <th>marca</th>
                    <th>FOTO</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Productos.map((Producto,i)=>(
                    <tr key={i}>
                        <td>{Producto.matricula}</td>
                        <td>{Producto.nombre}</td>
                        <td>{Producto.marca}</td>
                        <td>
                            <img src={Producto.imagen} className="imagen" alt={"foto"}/>

                        </td>
                        <td>
                            <Button color="primary" className="boton1" onClick={() => onEdit(Producto,i)}>Editar</Button>
                            <Button color="primary" onClick={() => onBorrar(i)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Row>
    </>;
}