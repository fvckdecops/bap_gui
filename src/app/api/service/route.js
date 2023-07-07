export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const act = searchParams.get('act');
    const serviceId = searchParams.get('serviceId');
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');

    const path = (act === "detail" && serviceId) ? 'detail?serviceId='+ serviceId : 'list?offset='+ offset +'&limit='+ limit;
    
    let response = await fetch('http://'+ process.env.API_HOST +'/api/Service/'+ path, {
        method: "GET",
        headers: new Headers({
            "Authorization": 'Basic '+ btoa(process.env.API_USERNAME +':'+ process.env.API_PASSWORD)
        }),
        cache: 'default'
    });

    let data = await response.json();

    return new Response(JSON.stringify(data));
}