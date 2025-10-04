import 'dotenv/config'
// importing databse connection 
import database from "../backend/database.js";
import fetch from 'node-fetch';

const baseUrl = process.env.PAYPAL_API_BASE_URL
let orderCode = "" 
  
  export async function generateAccessToken() {
    try {
      const auth = `${process.env.PAYPAL_API_CLIENT_ID}:${process.env.PAYPAL_API_CLIENT_SECRET}`

        // sending the request 
      const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          "Authorization": `Basic ${Buffer.from(auth).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
      });
  
      const data = await response.json();

      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  }
  
  // create an order
  export async function createOrder(paymentSource,purchaseCode) {
    

    const accessToken = await generateAccessToken();

    const url = `${baseUrl}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: purchaseAmount
            },
          },
        ],
        payment_source: {
          [paymentSource]: {}
        }
      }),
    });
    const data = await response.json();
    return data;
  }


// capture payment for an order
export async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${baseUrl}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
        // updating the order in database 
        const status = "paid"
        const date = new Date()
        const orders = await database`
        update orders set status=${status},payment_date=${date}  where id = ${orderCode}
        `
      return data
    
  }
      
      