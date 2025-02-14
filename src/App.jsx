import { useRef, useState } from "react";

export default function App() {
  const textRef = useRef(null);
  const [audio, setAudio] = useState(null);

  const fetchData = async (text) => {
    const res = await fetch(
      `http://localhost:3000/ttsfree?text=${encodeURIComponent(text)}`
    );
    const audioBlob = await res.blob();
    const audioURL = URL.createObjectURL(audioBlob);

    // Liberar el audio anterior para evitar acumulación en memoria
    if (audio) URL.revokeObjectURL(audio);

    setAudio(audioURL);
  };

  const handlerClick = () => {
    if (!textRef.current.value) return;
    fetchData(textRef.current.value);
  };


  return (
    <main className="w-80 h-48 border-2 rounded-md p-2 flex flex-col justify-center gap-2">
      <label htmlFor="text">Escribe un texto 👇</label>
      <div className="flex gap-2">
        <input
          className=" p-2 border-2 rounded-md"
          type="text"
          ref={textRef}
          name="text"
          id="text"
          placeholder="Hola, soy tu padre."
        />
        <input
          className="cursor-pointer text-3xl"
          type="button"
          value="▶️"
          onClick={handlerClick}
        />
      </div>

      <div className="h-14 flex flex-col justify-center" key={audio}>
        {audio ? (
          <audio className="mt-2" controls>
            <source src={audio} type="audio/wav"></source>
          </audio>
        ) : (
          <p className="text-zinc-400">No hay audio disponible aún. 🔇</p>
        )}
      </div>
    </main>
  );
}
