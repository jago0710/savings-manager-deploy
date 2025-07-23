export default function CardNew({click, value, visible}) {
  return (
    <div onClick={() => click(value)}
    className="bg-white font-[Trebuchet_MS] w-[91vw] sm:w-auto md:max-w-[313px] transition-all flex flex-col justify-center items-center ease-in hover:rotate-[1deg] hover:rotate-y-[10deg] hover:shadow-[0_7px_7px_#eee] h-[210px] md:h-[200px] duration-200 hover:scale-105 hover:border-gray-700 py-20 px-36 border-1 cursor-pointer border-dashed border-neutral-300 rounded-2xl">
      <p className="select-none text-neutral-300 text-center w-[313px]">Crear nueva tarjeta</p>
    </div>
  );
}
