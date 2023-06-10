import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(pokemonData);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Pokemon Name"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container" key={data.id}>
            <img src={data.sprites["front_default"]} alt="" />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {Math.round(data.weight / 4.3)} lbs
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Name</div>
                  <div className="divTableCell">{data.name}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Abilities</div>
                  <div className="divTableCell">
                    {data.abilities.map((ability) => (
                      <span key={ability.ability.name}>
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">HP</div>
                  <div className="divTableCell">
                    {data.stats[0].base_stat}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Attack</div>
                  <div className="divTableCell">
                    {data.stats[1].base_stat}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Defense</div>
                  <div className="divTableCell">
                    {data.stats[2].base_stat}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Special Attack</div>
                  <div className="divTableCell">
                    {data.stats[3].base_stat}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Special Defense</div>
                  <div className="divTableCell">
                    {data.stats[4].base_stat}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Speed</div>
                  <div className="divTableCell">{data.stats[5].base_stat}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
