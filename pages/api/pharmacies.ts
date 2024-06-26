import { NextRequest } from "next/server";

export const config = {
    runtime: "edge",
};

export default async function handler(req: NextRequest) {
    const dataType = process.env.DATA_TYPE;
    const key = process.env.PHARMACY_API_KEY;
    const params = req.nextUrl.searchParams;
    const city = params.get("city");
    const district = params.get("district");

    const mockData = {
        success: true,
        result: [
            {
                name: "SENA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201312",
                loc: "38.223142,27.182524"
            },
            {
                name: "DAMLA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201311",
                loc: "38.423142,27.162524"
            },
            {
                name: "DAMLA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "35.423142,27.162524"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "34.423142,27.162524"
            },
            {
                name: "DAMLA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "33.423142,27.162524"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "32.423142,27.162524"
            },
            {
                name: "DAMLA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "31.423142,27.162524"
            },
            {
                name: "SENA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "30.423142,27.162524"
            }
        ]
    }

    try {
        if(dataType !== "mock") {
            if (!city || !district) {
                return new Response("Missing parameters", { status: 400 });
            }

            const url = `https://www.nosyapi.com/apiv2/service/pharmacies-on-duty?city=${city}&district=${district}`;
    
            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Authorization" : 'Bearer ' + key,
                    "Content-Type" : "application/json"
                }
            });
            
            const data = await response.json();
    
            return new Response(JSON.stringify(data), {
                status: 200
            });
        } else {
            return new Response(JSON.stringify(mockData), {
                status: 200
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
       
        return new Response("Something went wrong", { status: 500 });
    }
}
