import { NextResponse } from "next/server";

export async function POST(request) {
    const {searchParams } = new URL(request.url)
    const page = searchParams.get("page") || 1
    const contentType = request.headers.get("Content-Type")
    const limit = 10

    if (contentType != "application/json"){
        return NextResponse.json({'error': "This not valid format"}, {status:400})
    }

    const data = await request.json()

    const search = data && data.search

    if(!search){
        return NextResponse.json({"error": "Invalid parameter"}, {status:400})
    }

    if (search){
        const baseUrl = "https://remotive.com/api/remote-jobs"

        const params = new URLSearchParams({"search": search, "limit": limit, "page": page})

        const formatedUrl = `${baseUrl}?${params.toString()}`

        const response = await fetch(formatedUrl)
        console.log(formatedUrl)
        const result = await response.json()
        const data = result.jobs


        return NextResponse.json({data:data, totalPages: Math.ceil(result['job-count']/limit)}, {status: 200})

    }

    // const allJobs = await fetch("/api/jobs/")
    // const jobs = await response.json()

    return NextResponse.json({"data": "Good response"}, {status:201})

    
}