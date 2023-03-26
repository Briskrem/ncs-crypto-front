import { useState, useEffect} from 'react';
import { io } from 'socket.io-client';
import { CryptoApi } from './api';
import { CryptoForm } from './CryptoForm';
import { Calculations } from './Calculations';
import {re, ini} from './StarterCode'
import { Graph } from './Graph';
import './styles/Crypto.css'

export const Crypto = () => {

  const [cryptoName, setCryptoName] = useState('')
  const [newCryptoPrice, setnewCryptoPrice] = useState(null)
  const [cryptoBars, setCryptoBars] = useState(re)
  const [convertedBars, setConvertedBars] = useState(ini)
  const [priceColor, setPriceColor] = useState('yellow')
  const [oldPrice, setoldPrice] = useState(null)
  
  let socket;
  // "WHEN" user enters CryptoName, USEEFFECT clientside turns on io-websocket to try connecting to backends, io-websocket. 
  // io on backend is turned on and connection is made. When backend succesfully opens stream from alpaca, it sends the stream id'd as meta
  useEffect(() =>{
    socket = io('http://localhost:3003');
    // socket = io.connect('https://u-o-b.herokuapp.com')

    // listening for stream id'd as meta.
    socket.on("meta", data => {
      let result = JSON.parse(data)
      let price = result[0].bp   
      // setnewCryptoPrice(price.toFixed(3))
      setnewCryptoPrice(price)
    })
    socket.connect()
  },[cryptoName]);

  // As cryptoPrice updates so does its color, socket.io("meta") updates new crypto price, which triggers this useEffect,
  // which sets the newPrice as the oldPrice, so the next newPrice will be compared to the previous newPrice(odPrice)
  useEffect(()=>{
    let color = !oldPrice || oldPrice === newCryptoPrice ? 'yellow' : newCryptoPrice > oldPrice ? 'green' : 'red';
    setoldPrice(newCryptoPrice)
    setPriceColor(color)
  },[newCryptoPrice]);

  //After user updates cryptoName, api requests are  made which turn on the io-websocket(connects to backend) &  ws-websocket(connects to alpaca servers)
  // Fetches cryptoPrice aand cryptoBars
  useEffect(()=>{
    async function getData(){
        try{
          const results = await CryptoApi.getTicker(cryptoName)
        }catch(e){
            console.log(e)
        }

        try{
          const results = await CryptoApi.getStats(cryptoName)
          setCryptoBars(results.data.data.bars)
        }catch(e){
          console.log(e)
        }
    }
    getData()
  },[cryptoName])

  // When cryptoBars have been fetched and updated its now converted and convertedBars are updated.
  useEffect(()=>{
    const results = Calculations.calculate(cryptoBars)
    setConvertedBars(results)
  }, [cryptoBars])

  // Unlike previous CryptoApi.getStats above, which gets bar for the initial request, 
  // this gets bars for min, hr, day, week, month when clicked
  // apply memoiszation to this for optimization.
  const getCryptoCharts = async time => {
    let t = { timeframe: time }
    const results = await CryptoApi.getStats(cryptoName, t)
    setCryptoBars(results.data.data.bars)
  }

  //this function called by formComponent, onSubmit and updates the cryptoName to fetch streamData
  const getCryptoName = (data) => {
    setCryptoName(data)
  }
    
      
    
  return (
    <div className='crypto-body'>
      <div className='crypto-data'>
        <CryptoForm getCryptoName={getCryptoName}/>
        <p className='crypto-name'>{cryptoName}</p>
        <div className='price-container'>
            <p className='crypto-price' style={{color : priceColor}} >{newCryptoPrice}</p>
        </div> 
        <Graph crypto={convertedBars} timeFunc={getCryptoCharts}/>      
      </div> 
      <div className='amount-container'>
          <p className='crypto-amount'></p>
      </div>
    </div>
  )
}
