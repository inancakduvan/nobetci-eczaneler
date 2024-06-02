import { NextRequest } from "next/server";

export const config = {
    runtime: "edge",
};

export default async function handler(req: NextRequest) {
    const key = process.env.PHARMACY_API_KEY;
    const params = req.nextUrl.searchParams;
    const city = params.get("city");

    try {
        if (!city) {
            return new Response("Missing parameters", { status: 400 });
        }

        const url = `https://api.collectapi.com/health/districtList?il=${city}`;

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
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
       
        return new Response("Something went wrong", { status: 500 });
    }
}
