import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // Usamos la Service Role Key para poder actualizar el stock y la orden
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    );
    
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || url.searchParams.get('topic');
    const paymentId = url.searchParams.get('data.id') || url.searchParams.get('id');

    if (type === 'payment' && paymentId) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string });
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const orderId = paymentData.external_reference;
        
        const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).single();
        
        if (order && order.status !== "Procesando") {
          await supabase.from("orders").update({ status: "Procesando" }).eq("id", orderId);

          for (const item of order.items) {
            const { data: product } = await supabase.from("products").select("stock").eq("id", item.id).single();
            if (product && product.stock !== null) {
              const newStock = Math.max(0, product.stock - item.quantity);
              await supabase.from("products").update({ stock: newStock }).eq("id", item.id);
            }
          }
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error en Webhook:", error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}