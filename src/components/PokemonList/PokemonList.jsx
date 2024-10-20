import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
  const [pokedexUrl , setPoekdexurl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [pokemonList , setPokemonList] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const [nextUrl , setNextUrl] = useState('')
    const [prevUrl , setPrevUrl] = useState('')
   async function downloadPokemons() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl)
    const pokemonResults = response.data.results

    setNextUrl(response.data.next)
    setPrevUrl(response.data.previous)
    const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url))
    const pokemonData = await axios.all(pokemonResultPromise) ; 
    console.log(pokemonData);   
    const res = pokemonData.map((pokeData)=>{
        const pokemon = pokeData.data ; 
        return {
            id : pokemon.id , 
            image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :  pokemon.sprites.front_shiny, 
            name : pokemon.name ,
             types : pokemon.types
            }
    })
    console.log(res);
    setPokemonList(res)
    setIsLoading(false) 
    }

    useEffect( ()=>{
        downloadPokemons() ;
    } , [pokedexUrl] )

  return (
    <div className='pokemon-list-wrapper'>
       <div>Pokemon List</div> 
       <div className='pokemon-wrapper'>
       {(isLoading) ? 'Loading...' : 
        pokemonList.map((p)=> 
        <Pokemon name = {p.name} image ={p.image} key = {p.id} />
       )}
       </div>
       <div className='controls'>
        <button disabled= {prevUrl==null} onClick={()=> setPoekdexurl(prevUrl)} >Prev</button>
        <button disabled = {nextUrl==null} onClick={() => setPoekdexurl(nextUrl)}>Next</button>
       </div>
    </div>
  )
}

export default PokemonList