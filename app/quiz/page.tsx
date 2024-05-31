import PhraseWordSix from "@/components/PhraseWordSix";

export default function Page() {
    return (
      <main>
        <div>
          <h1 className="flex justify-center text-indigo-400 font-extrabold">Match a word that matches the pharse on the  left.</h1>
          <PhraseWordSix/>
        </div>
      </main>
    );
  }