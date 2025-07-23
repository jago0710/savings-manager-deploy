import {Fieldset} from 'primereact/fieldset'

export default function PresentationCards (){
 
    const legendTemplate = (
        <div className="flex align-items-center gap-2 px-2">
            <span className="font-bold">Amy Elsner</span>
        </div>
    );
 
    return(
        <>
            

            <section className='flex flex-col gap-2'>
                <Fieldset toggleable legend={legendTemplate}>
                    <p className="m-0">
                        Guía completa
                    </p>
                </Fieldset>

                <Fieldset toggleable legend={legendTemplate}>
                    <p className="m-0">
                        Guía completa
                    </p>
                </Fieldset>

                <Fieldset toggleable legend={legendTemplate}>
                    <p className="m-0">
                        Guía completa
                    </p>
                </Fieldset>
            
                <Fieldset toggleable legend={legendTemplate}>
                    <p className="m-0">
                        Guía completa
                    </p>
                </Fieldset>
            </section>
        </>
    )
}