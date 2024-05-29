import { NextRequest, NextResponse } from "next/server";
import pool from '@/app/db/mysql';

export const GET = async (req: NextRequest, res: NextResponse) => {
  let connection: any;

  try {
    connection = await pool.getConnection();
    const { pathname } = new URL(req.url);
    const paths = pathname.split('/');

    // ตรวจสอบว่า URL ถูกต้องหรือไม่
    if (paths.length !== 5 || paths[1] !== 'api' || paths[2] !== 'selectLV') {
      return new Response('Invalid URL path', { status: 400 });
    }

    const level = paths[3];
    const difficulty = paths[4];

    // สร้างคำสั่ง SQL สำหรับเลือกข้อมูล
    const query = 'SELECT * FROM quiz WHERE level = ? AND difficulty = ?';
    const values = [level, difficulty];

    // ประมวลผลคำสั่ง SQL และรับผลลัพธ์
    const [rows] = await connection.query(query, values);

    // ส่งคืนข้อมูลที่ได้จากฐานข้อมูล
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return new Response('Internal Server Error', { status: 500 });
  } finally {
    // ปิดการเชื่อมต่อฐานข้อมูล
    if (connection) {
      await connection.release();
    }
  }
};