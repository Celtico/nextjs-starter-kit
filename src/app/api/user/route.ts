import { NextResponse } from "next/server";

// https://beta.nextjs.org/docs/api-reference/response
export async function GET(request: Request) {
//  let obj = { x: 1, y: 2, z: 3 };

  //console.log(JSON.stringify(obj, null, 2)); // spacing level = 2

  // return  JSON.stringify(request.url,null,2)
  // return NextResponse.redirect(new URL('/new', request.url));
  return NextResponse.json({
    GET: "Next.js",
  });
}
