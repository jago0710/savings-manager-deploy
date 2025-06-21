import { Plus } from "lucide-react";

export default function CardNew({click, value}) {
  return (
    <div  onClick={() => click(value)}
    className="font-[Trebuchet_MS] w-[89vw] mx-5 transition-all  ease-in hover:rotate-[1deg] hover:rotate-y-[10deg] hover:shadow-[0_7px_7px_#eee] h-[210px] md:h-[200px] mb-5 duration-200 hover:scale-105 hover:border-gray-700 py-20 px-36 border-1 cursor-pointer border-dashed border-neutral-400 rounded-2xl">
      <Plus
        size={100}
        strokeWidth={0.5}
        className="text-neutral-400 w-full h-full"
      />
      <p className="select-none text-neutral-400 text-center">Crear</p>
    </div>
  );
}
