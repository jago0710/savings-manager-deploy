import { Accordion, AccordionTab } from 'primereact/accordion';

export default function PresentationCards (){
 
 
    return(
        <>
            <Accordion activeIndex={0}>
                <AccordionTab header="Introducción">
                    <p>Para poder saber como funciona la aplicacío puedes consultar una guía por cada sección de la aplicación.</p>
                    <p className='mt-2'>En estas secciones se explica el funcionamiento y conceptos que se tienen que tener en cuenta para poder evitar errores a futuro</p>
                    <p className='mt-2'></p>
                </AccordionTab>
                <AccordionTab header="Guía de cuentas">
                    <section className='m-0 flex flex-col gap-7'>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <img src="./assets/accounts/NewCard.png" className='w-60 border border-gray-200 rounded-md' alt="new-card" />  
                            <p>Una vez nos encontremos en la sección de <b>Cuentas</b> podremos ver una tarjeta que pone <b>Crear nueva tarjeta</b> presionamos la tarjeta para que nos salga la ventana donde se crean las tarjetas.</p>    
                        </div>
                        <div className='flex flex-col-reverse md:flex-row gap-3'>
                            <div>
                                <p>Una vez presionado nos saldrá la siguiente ventana por la derecha, en esta ventana tendremos que rellenar los datos con los que queremos crear esta nueva tarjeta, como lo siguientes campos:</p>

                                <h2 className='mt-5 mb-1.5 text-lg font-semibold text-black'>Selector de color</h2>
                                <p>El <b>selector de color</b> es para que se pueda elegir a gusto el color de la card y asi tenerlo personalizado</p>
                                <h2 className='mt-5 mb-1.5 text-lg font-semibold text-black'>Campo descripción</h2>
                                <p>El campo <b>descripción</b> se debe de poner un nombre de la tarjeta para el tipo de ahorro por ejemplo <b>Viajes</b>, 
                                poniendo esto es más facil de identificarlo entre las tarjetas</p>
                                <h2 className='mt-5 mb-1.5 text-lg font-semibold text-black'>Campo objetivo</h2>
                                <p>En el campo objetivo se ingresa la cantidad de dinero que tienes como objetivo en tus ahorros y asi poder mostrar en tiempo real 
                                   el porcentaje que te falta para llegar a este objetivo puesto, se puede visualizar en dashboard</p>
                                 <h2 className='mt-5 mb-1.5 text-lg font-semibold text-black'>Campo miembros</h2>
                                 <p>Este campo es uno de los más importantes, ya que se tiene que poner</p>
                            </div>
                            <img src="./assets/accounts/FormNewCard.png" className='w-60 border border-gray-200 rounded-md' alt="form-new-card" />
                        </div>
                            <div>
                                <img src="./assets/accounts/CreateCard.png" className='w-120 border border-gray-200 rounded-md' alt="new-card" />
                            </div>
                    </section>
                </AccordionTab>
                <AccordionTab header="Guía de prestamos">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
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