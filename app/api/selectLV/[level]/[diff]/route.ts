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
    const query = `SELECT * FROM quiz WHERE level = '${level}' AND difficulty = '${difficulty}'`;
    const values = [level, difficulty];

    // ประมวลผลคำสั่ง SQL และรับผลลัพธ์
    const [rows] = await connection.query(query, values);

    // เมื่อได้ข้อมูลจากการค้นหา
    const shuffledRows = shuffleArray(rows);
    return new Response(JSON.stringify(shuffledRows), {
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

// ฟังก์ชันสำหรับสุ่มลำดับของอาร์เรย์
function shuffleArray(array: any[]) {
  const newArray = array.slice(); // ทำการสำเนาอาร์เรย์เพื่อป้องกันการแก้ไขอาร์เรย์เดิม
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}