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
        const url = `${BASE_URL}/crypto/ticker/${endpoint}`
        // const url = `${BASE_URL}/crypto/ticker/${endpoint}`
        const method = 'GET'
        try{
            const resp = await axios({url, method})
            console.log(resp, 'AKUMENNATATA')
            return resp
        }catch(e){
            console.log('error FRONTEND')
        }
    }


    static async getStats(endpoint: string, data={timeframe:'1Day'}, method='GET'){
        const url = `${BASE_URL}/crypto/stats/${endpoint}`;  
        const params = (method == 'GET') ? data : {} 
        try{
            const resp : AxiosResponse<BarsData>= (await axios({url, method, params, data})).data.data.bars

            // const resp : AxiosResponse<BarsData> | undefined | null = (await axios({url, method, params, data})).data.data.bars
            return resp
        }catch(e){
            console.log(e)
            // return 'sap'
        }
    }
}