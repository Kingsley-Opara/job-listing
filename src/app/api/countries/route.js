import { NextResponse } from "next/server"

export async function GET(request){
    try{
        const response = await fetch("https://www.apicountries.com/countries")
        const data = await response.json()

        return NextResponse.json(data, {status: 200})

    }
    catch(error){
        return NextResponse.json({"message": "Error handling fetching data"}, {status:400})
    }
}