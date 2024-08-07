import { NextRequest } from "next/server";

export const config = {
    runtime: "edge",
};

export default async function handler(req: NextRequest) {
    const key = process.env.PHARMACY_API_KEY;
    const params = req.nextUrl.searchParams;
    const city = params.get("city");
    const dataType = process.env.DATA_TYPE;

    const mockData = {
        success: true,
        result: [
            {
                text: "KONAK"
            },
            {
                text: "BORNOVA"
            },
            {
                text: "BALÇOVA"
            }
        ]
    }

    try {
        if(dataType !== "mock") {
            if (!city) {
                return new Response("Missing parameters", { status: 400 });
            }
    
            const url = `https://www.nosyapi.com/apiv2/service/pharmacies-on-duty/cities?city=${city}&apiKey=${key}`;
    
            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin" : "*",
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
