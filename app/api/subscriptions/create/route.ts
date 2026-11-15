import { NextResponse } from 'next/server';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';

export async function POST(req: Request) {
  try {
    const { plan, userEmail, userName } = await req.json();

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error("Falta el MERCADOPAGO_ACCESS_TOKEN");
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
    const preApproval = new PreApproval(client);

    // Definir el precio y nombre según el plan elegido
    const isSilver = plan === 'silver';
    const amount = isSilver ? 24.90 : 49.90;
    const reason = isSilver ? "Suscripción Joined Silver" : "Suscripción Joined Black";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://joined.pe';

    const result = await preApproval.create({
      body: {
        reason: reason,
        auto_recurring: {
          frequency: 1, // Cobrar cada 1...
          frequency_type: "months", // ...mes
          transaction_amount: amount,
          currency_id: "PEN"
        },
        payer_email: userEmail,
        back_url: `${baseUrl}/profile?subscription=success`,
        status: "pending",
        external_reference: `${userName} - ${plan}` // Para identificar al usuario luego
      }
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error: any) {
    console.error("Error en Suscripción MP:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}