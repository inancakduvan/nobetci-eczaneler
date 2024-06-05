import { NextRequest } from "next/server";

export const config = {
    runtime: "edge",
};

export default async function handler(req: NextRequest) {
    const envMode = process.env.ENV_MODE;
    const key = process.env.PHARMACY_API_KEY;
    const params = req.nextUrl.searchParams;
    const city = params.get("city");

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
        return new Response(JSON.stringify(mockData), {
            status: 200
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
       
        return new Response("Something went wrong", { status: 500 });
    }
}
