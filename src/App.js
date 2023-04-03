import "./css/App.css";
import { useEffect, useState } from "react";

const mock = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/3",
      "https://rickandmortyapi.com/api/episode/4",
      "https://rickandmortyapi.com/api/episode/5",
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/13",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/28",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/37",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  },
];

function App() {
  const [conteudo, setConteudo] = useState(<></>);

  const [busca, setBusca] = useState("");

  function getStatus(status) {
    switch (status) {
      case "Alive":
        return "Vivo";
      case "Dead":
        return "Morto";
      case "unknown":
        return "Desconhecido";
    }
  }
  function getGender(gender) {
    switch (gender) {
      case "Male":
        return " Masculino";
      case "Female":
        return "Feminino";
      case "unknown":
        return "Desconhecido";
    }
  }
  function getSpecies(species) {
    switch (species) {
      case "Human":
        return "Humano";
      case "Alien":
        return "Alien";
      case "unknown":
        return "Desconhecido";
    }
  }
  async function carragarTodosOsPersonagens() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const results = await fetch(
      "https://rickandmortyapi.com/api/character" + busca,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));

    const char = JSON.parse(results);
    return char.results;
  }

  async function listaPersonagem() {
    const todosPersonagens = await carragarTodosOsPersonagens();

    return todosPersonagens.map((personagem) => (
      <div className="card char">
        <img src={personagem.image} alt={personagem.nome} />
        <div className="cardname">
          <h2>{personagem.name}</h2>
        </div>
        <div className="cardspecies">
          <h3>Espécie: {getSpecies(personagem.species)}</h3>
        </div>
        <div className="cardgender">
          <h3>Gênero: {getGender(personagem.gender)}</h3>
        </div>
        <div className="cardepisode">
          <div className="lista-secundaria">
            <b>Participações</b>
            {personagem.episode.map((ep) => (
              <span key={personagem.name + ep.split("episode/")[1]}>
                Ep-{ep.split("episode/")[1]}
              </span>
            ))}
          </div>
        </div>
        <div className="cardstatus">
          <h3>Estado: {getStatus(personagem.status)}</h3>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    async function getConteudo() {
      setConteudo(await listaPersonagem());
    }
    getConteudo();
  }, [busca]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rick and Morty API</h1>
      </header>
    <div className="filtros">
    <span className="titulo-filtros">Filtros</span>
    <div className="filtro status">
      <b>Status:</b>
      <span onClick={() => setBusca('?status=alive')}>Vivo</span>
      <span onClick={() => setBusca('?status=dead')}>Morto</span>
      <span onClick={() => setBusca('?status=unknown')}>Desconhecido</span>
    </div>
    <div className="filtro genero">
      <b>Gênero:</b>
      <span onClick={() => setBusca('?gender=male')}>Masculino</span>
      <span onClick={() => setBusca('?gender=female')}>Feminino</span>
      <span>Sem gênero</span>
      <span onClick={() => setBusca('?gender=unknown')}>Desconhecido</span>
    </div>
  </div>
  <div className="lista-principal">{conteudo}</div> 
  </div>

  );
}

export default App;
