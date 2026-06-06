import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, contacto, descripcion } = body as Record<string, unknown>;

    if (
      typeof nombre !== 'string' ||
      typeof contacto !== 'string' ||
      typeof descripcion !== 'string' ||
      !nombre.trim() ||
      !contacto.trim() ||
      !descripcion.trim()
    ) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 });
    }

    await resend.emails.send({
      // NOTE: 'from' uses Resend's test sender until a custom
      // domain is verified. Replace with a verified domain email before launch.
      from: 'Formulario Web <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL as string,
      subject: `Nueva consulta de ${nombre}`,
      text: [
        'Nueva consulta desde el sitio web.',
        '',
        `Nombre: ${nombre}`,
        `Contacto: ${contacto}`,
        `Mensaje: ${descripcion}`,
        '',
        'Enviado desde fabio.mombello.com.ar',
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 });
  }
}
