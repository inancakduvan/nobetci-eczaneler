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
                name: "DAMLA ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,24, 27,81"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,10, 27,31"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,10, 27,32"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,10, 27,33"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,10, 27,34"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,10, 27,35"
            },
            {
                name: "ŞUKUFE ECZANESİ",
                dist: "Konak",
                address: "730/2 sk, Zerafet mahallesi",
                phone: "2324201313",
                loc: "38,10, 27,36"
            }
        ]
    }

    try {
        if(dataType !== "mock") {
            if (!city || !district) {
                return new Response("Missing parameters", { status: 400 });
            }
    
            const url = `https://api.collectapi.com/health/dutyPharmacy?ilce=${district}&il=${city}`;
    
            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Authorization" : 'apikey ' + key,
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
