import axios , { AxiosResponse, AxiosError }from 'axios'
import { BarsData } from './Crypto.types';
interface MyError {
    // Define the shape of your error object here
    code: string;
    message: string;
  }

const BASE_URL = "http://localhost:3003";
// const BASE_URL = 'https://u-o-b.herokuapp.com'

export class CryptoApi{
    static async getTicker(endpoint='SOL'){
        console.log('777777777777777777777777777777')
        const url = `${BASE_URL}/crypto/ticker/${endpoint}`
        // const url = `${BASE_URL}/crypto/ticker/${endpoint}`
        const method = 'GET'
        try{
            const resp = await axios({url, method})
            console.log(resp, 'AKUMENNATATA')
            return resp
        }catch(e){
            console.log('error Ticker')
        }
    }


    static async getStats(endpoint: string, data={timeframe:'1Day'}, method='GET'){
        const url = `${BASE_URL}/crypto/stats/${endpoint}`;  
        const params = (method == 'GET') ? data : {} 
        try{
            console.log('8888888888888888888888888888')
            const resp : AxiosResponse<BarsData>= (await axios({url, method, params, data})).data.data.bars
            console.log('resp in api', resp)
            return resp
        }catch(e){
            console.log('error getSTATS')
            // return 'sap'
        }
    }
}