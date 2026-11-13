import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // Usamos la Service Role Key para saltar el RLS y poder insertar la orden
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string 
    );

    const body = await req.json();
    const { items, formData, total, whatsappOptIn, tipoComprobante, documento, razonSocial } = body;

    const fullAddress = `${formData.direccion}, ${formData.distrito}, ${formData.departamento}. Ref: ${formData.referencia}`;
    const { data: orderData, error: dbError } = await supabase.from("orders").insert([{
      customer_name: `${formData.nombre} ${formData.apellidos}`,
      customer_email: formData.email,
      customer_phone: formData.telefono,
      shipping_address: fullAddress,
      total: total,
      items: items,
      status: "Pendiente de Pago",
      whatsapp_opt_in: whatsappOptIn,
      tipo_comprobante: tipoComprobante,
      documento_cliente: documento,
      razon_social: razonSocial
    }]).select().single();

    if (dbError) {
      console.error("Error Supabase:", dbError);
      throw new Error(dbError.message);
    }
    const orderId = orderData.id;

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error("Falta el MERCADOPAGO_ACCESS_TOKEN en las variables de entorno");
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
    const preference = new Preference(client);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://joined.pe';

    const mpItems = items.map((item: any) => ({
      id: item.id.toString(),
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: 'PEN'
    }));

    const result = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: formData.nombre,
          surname: formData.apellidos,
          email: formData.email,
        },
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/error`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
        external_reference: orderId,
        notification_url: `${baseUrl}/api/webhooks/mercadopago`
      }
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error: any) {
    console.error("Error en API Mercado Pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}