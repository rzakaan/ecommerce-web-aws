import { UserDto } from '@/app/model/dto/UserDto';
import { NextResponse } from 'next/server';

function createRes(object: any) {
  let jsonStr = JSON.stringify(object);
  return new NextResponse(jsonStr, { status: 200 });
}

function createErr(object: any, error: any) {
  let jsonStr = JSON.stringify(object);
  return new NextResponse(jsonStr, { status: 500 });
}

export async function GET(request: Request) {
  try {
    let user = new UserDto("Riza");
    user.email = "rzakaan@gmail.com"
    return createRes(user);

  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}

export async function POST(request: Request) {

}

export async function PUT(request: Request) {

}

export async function PATCH(request: Request) {

}

export async function DELETE(request: Request) {

}