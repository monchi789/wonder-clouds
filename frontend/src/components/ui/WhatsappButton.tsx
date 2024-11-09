import Image from 'next/image';

function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP;

  return (
    <a
      className="fixed bottom-5 right-6 p-4 bg-[#2e6329] rounded-full z-10 transition-transform duration-500 ease-in-out hover:scale-110 animate-efecto"
      href={`https://wa.me/+51946899196?text=Hola Wonder Clouds, quisiera realizar una consulta`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image className="w-10 transition-all duration-1000 ease-in-out" src="/static/images/whatsapp.webp" alt="WhatsApp Logo" width={200} height={200} />
    </a>
  );
}

export default WhatsAppButton;
