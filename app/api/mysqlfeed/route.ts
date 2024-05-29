import { NextRequest, NextResponse } from "next/server";
import pool from '@/app/db/mysql'

export async function GET() {
    try{
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('select * from `quiz`');
        connection.release();
        return NextResponse.json(rows)

    } catch(error: any){
        return NextResponse.json({
            error: error
        },{status: 500})
    }
}