const TELEGRAM_BOT_TOKEN = '8181527285:AAHbwjuU715Wlp9KgM5Oe3phM3pwRl42FPY';
const TELEGRAM_CHAT_ID = '8092169481'; 

export const sendToTelegram = async (message: string) => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Telegram API error');
    }

    return await response.json();
  } catch (error) {
    console.error('Telegram yuborishda xatolik:', error);
    throw error;
  }
};

export const formatBookingMessage = (data: any) => {
  return `
🏨 <b>YANGI BRON</b>

👤 <b>Mijoz ma'lumotlari:</b>
• Ism: ${data.fullName}
• Telefon: ${data.phone}
• Email: ${data.email}

🏠 <b>Bron ma'lumotlari:</b>
• Kirish: ${data.checkIn}
• Chiqish: ${data.checkOut}
• Mehmonlar: ${data.guests}
• Xona turi: ${data.roomType}

${data.specialRequests ? `📝 <b>Maxsus so'rovlar:</b>\n${data.specialRequests}` : ''}

⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}
  `;
};

export const formatContactMessage = (data: any) => {
  return `
📞 <b>YANGI ALOQA</b>

👤 <b>Mijoz ma'lumotlari:</b>
• Ism: ${data.name}
• Telefon: ${data.phone}
• Email: ${data.email}

📋 <b>Mavzu:</b> ${data.subject}

💬 <b>Xabar:</b>
${data.message}

⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}
  `;
};