import { NextRequest } from "next/server";
import { cities } from "@/data/cities.json";

export const config = {
    runtime: "edge",
};

export default async function handler(req: NextRequest) {
    try {
        return new Response(JSON.stringify(cities), {
            status: 200
        });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
       
        return new Response("Something went wrong", { status: 500 });
    }
}
