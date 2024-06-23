import React from "react";

const App = () => {
  const [movie, setMovie] = React.useState("");
  const [emojies, setEmojies] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { VITE_API_KEY } = import.meta.env;

  const getEmoji = async (event) => {
    setLoading(true);
    event.preventDefault();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${VITE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Conver movie title into emoji: \n\n${movie}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (movie) {
      setEmojies(data.candidates[0].content.parts[0].text);
    }

    setMovie("");
    setLoading(false);
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-slate-900 gap-8 p-8">
      <h1 className="text-2xl text-center text-cyan-100 uppercase m-">
        Convertir película en emojies 🎞📽
      </h1>
      {emojies ? (
        <>
          <p className="text-xl rounded p-4 bg-slate-600 tracking-[.5rem] text-center text-cyan-100">
            {emojies}
          </p>
          <button
            className="bg-slate-800 text-cyan-100 py-2 px-4 rounded-sm"
            onClick={() => setEmojies("")}
          >
            Convertir otra pelicula
          </button>
        </>
      ) : (
        <form onSubmit={getEmoji} className="flex flex-col items-center gap-4">
          <input
            className="border rounded border-cyan-300 bg-transparent px-4 py-2 outline-none text-cyan-300"
            onChange={(event) => setMovie(event.target.value)}
            value={movie}
            placeholder="Escribe una película"
            autoFocus
            type="text"
          />
          <button className="bg-slate-800 text-cyan-100 py-2 px-4 rounded-sm">
            Convertir a emoji
          </button>
        </form>
      )}
      {loading && (
        <p className="text-2xl text-cyan-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin icon icon-tabler icon-tabler-inner-shadow-bottom-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z"></path>
            <path d="M18 12a6 6 0 0 1 -6 6"></path>
          </svg>
        </p>
      )}
      <p className="absolute top-4 text-cyan-100">
        Hecho por
        <a
          className="text-cyan-500 pl-1"
          href="https://github.com/carandev"
          target="_blank"
        >
          @carandev
        </a>
      </p>
    </main>
  );
};

export default App;
