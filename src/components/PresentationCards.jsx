import { Accordion, AccordionTab } from 'primereact/accordion';

export default function PresentationCards (){
 
 
    return(
        <>
            <Accordion activeIndex={0}>
                {/** GUIA DE CUENTAS */}
                <AccordionTab header="Guía de cuentas">
                    <section className='m-0 flex flex-col gap-10'>
                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/accounts/NewCard.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 1</h1> 
                                <p>Una vez nos encontremos en la sección de <b>Cuentas</b> podremos ver una tarjeta que pone <b>Crear nueva tarjeta</b> presionamos la tarjeta para que nos salga la ventana donde se crean las tarjetas.</p>
                            </div>    
                        </div>
                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/accounts/FormNewCard.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="form-new-card" />
                            <div className='flex flex-col justify-center'>
                                <h1 className='text-xl font-semibold'>Paso 2</h1>
                                <p className='text-[15px]'>Una vez presionado nos saldrá la siguiente ventana por la derecha, en esta ventana tendremos que rellenar los datos con los que queremos crear esta nueva tarjeta, como lo siguientes campos:</p>

                                <h2 className='mt-5 mb-1.5 text-[17px] font-semibold text-black'>Selector de color</h2>
                                <p className='text-[15px]'>El <b>selector de color</b> es para poder personalizar el color de nuestras tarjetas.</p>
                                <h2 className='mt-5 mb-1.5 text-[17px] font-semibold text-black'>Campo descripción</h2>
                                <p className='text-[15px]'>En el campo <b>descripción</b> se debe de poner el nombre de la tarjeta para el tipo de ahorro, por ejemplo <b>"Viajes"</b>, 
                                poniendo esto es más facil de identificarlo entre las tarjetas.</p>
                                <h2 className='mt-5 mb-1.5 text-[17px] font-semibold text-black'>Campo objetivo</h2>
                                <p className='text-[15px]'>En el campo objetivo se ingresa la cantidad de dinero que tienes como objetivo en tus ahorros y asi poder mostrar en tiempo real 
                                   el porcentaje que te falta para llegar a este objetivo puesto, se puede visualizar en dashboard.</p>
                                 <h2 className='mt-5 mb-1.5 text-[17px] font-semibold text-black'>Campo miembros</h2>
                                 <p className='text-[15px]'>Este campo es uno de los más importantes, ya que se tiene que poner el correo exacto de los miembro de la cuenta que se creará y al final teclear el botón <b>Enter</b>, para así agregarlo correctamente.</p>
                                 <br />
                                 <p className='text-[15px]'>Para finalizar presionamos <b>"Crear nueva tarjeta"</b> y nos tendrá que salir como resultado una tarjeta creada en nuestro tablero de tarjetas.</p>
                            </div>
                        </div>
                            <div className="flex flex-row gap-2">
                                <img src="./assets/accounts/CreateCard.png" className="w-full md:w-150 border object-cover border-gray-200 rounded-md" alt="new-card" />
                            </div>
                    </section>
                </AccordionTab>

                {/** GUIA DE PRESTAMOS */}
                <AccordionTab header="Guía de prestamos">
                    <section className='m-0 flex flex-col gap-10'>
                        <h1 className='text-xl font-semibold'>¿Como pedir prestamos?</h1>
                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPedir.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 1</h1> 
                                <p>Para poder pedir un prestamo de nuestra cuenta de ahorro, lo primero que tendremos que hacer es ir a nuestra cuenta y hacer un movimiento en el apartado de acciones rápidas y seleccionamos <b>Retirar</b> en el desplegable.</p>
                            </div>  
                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPedir2.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 2</h1> 
                                <p>Ingresamos la cantidad del movimiento que haremos en nuestro caso un retiro de 50€ y posteriormente presionamos en <b>"Registrar Movimiento"</b></p>
                            </div>  
                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPedir3.png" className='w-75 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 3</h1> 
                                <p>Nos aparecerá una ventana que nos explicará que tipo de retiro queremos hacer, ya que existen 2 tipos.</p>
                                <br />
                                <p><b>Retiro de prestamo: </b>Se hace el retiro de dinero, pero quedas registrado con la cantidad a devolver en el apartado de <b>"Prestamos</b>.</p>
                                <p><b>Retiro de beneficio:</b>Se hace el retiro para tu beneficio, es decir que no se tiene que devolver el dinero.</p>
                            </div>  
                        </div>
                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPedir4.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 4</h1> 
                                <p>Una vez nos encontremos en la sección de <b>Cuentas</b> podremos ver una tarjeta que pone <b>Crear nueva tarjeta</b> presionamos la tarjeta para que nos salga la ventana donde se crean las tarjetas.</p>
                            </div>  
                        </div>

                        <h1 className='text-xl font-semibold'>¿Como pagar prestamos?</h1>
                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPagar.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 1</h1> 
                                <p>Una vez nos encontremos en la sección de <b>Cuentas</b> podremos ver una tarjeta que pone <b>Crear nueva tarjeta</b> presionamos la tarjeta para que nos salga la ventana donde se crean las tarjetas.</p>
                            </div>  
                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPagar1.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 2</h1> 
                                <p>Una vez nos encontremos en la sección de <b>Cuentas</b> podremos ver una tarjeta que pone <b>Crear nueva tarjeta</b> presionamos la tarjeta para que nos salga la ventana donde se crean las tarjetas.</p>
                            </div>  
                        </div>

                        <div className='flex flex-col-reverse md:flex-row gap-7 border-b border-gray-200 pb-10'>
                            <img src="./assets/loans/PrestamosPagar2.png" className='w-70 border object-cover border-gray-200 rounded-md' alt="new-card" />  
                            <div className='flex flex-col justify-center'> 
                                <h1 className='text-xl font-semibold'>Paso 3</h1> 
                                <p>Una vez nos encontremos en la sección de <b>Cuentas</b> podremos ver una tarjeta que pone <b>Crear nueva tarjeta</b> presionamos la tarjeta para que nos salga la ventana donde se crean las tarjetas.</p>
                            </div>  
                        </div>

                    </section>
                </AccordionTab>
                <AccordionTab header="Guía de Dashboard">
                    <section id='guia-dashboard' className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                        mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </section>
                </AccordionTab>
            </Accordion>
        </>
    )
}