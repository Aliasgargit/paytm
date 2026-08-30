import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async () => {
     try{
        const session = await getServerSession(authOptions);
        if(session?.user) {
            return NextResponse.json({
                user: session.user,
            });
        }
     } catch(e) {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 });
     }
    return NextResponse.json({
        message: "Internal Server Error",
    }, { status: 500 });
}