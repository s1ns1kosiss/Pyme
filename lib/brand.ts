export interface BrandPricing {
  remoteSession: {
    price: number;
    formattedPrice: string;
    duration: string;
  };
  onsiteSession: {
    price: number;
    formattedPrice: string;
    description: string;
  };
  pymeMaintenance: {
    pricePerPc: number;
    formattedPricePerPc: string;
    minPcs: number;
    minTotalFormatted: string;
  };
  componentFee: {
    range: string;
    description: string;
  };
}

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  valueProp: string;
  domain: string;
  email: string;
  whatsappNumber: string;
  pricing: BrandPricing;
}

const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+56912345678";
const cleanWhatsapp = rawWhatsapp.replace(/[^0-9+]/g, "");

export const brand: BrandConfig = {
  name: "[MARCA]",
  shortName: "[MARCA]",
  tagline: "Punto óptimo entre presupuesto y rendimiento",
  valueProp:
    "Te ayudamos a encontrar el punto donde tu presupuesto y el rendimiento de tu equipo se encuentran — y solo gastamos en una pieza nueva cuando el diagnóstico realmente lo justifica.",
  domain: "marca.cl",
  email: "contacto@marca.cl",
  whatsappNumber: cleanWhatsapp,
  pricing: {
    remoteSession: {
      price: 19990,
      formattedPrice: "$19.990",
      duration: "45 min",
    },
    onsiteSession: {
      price: 34990,
      formattedPrice: "$34.990",
      description: "A domicilio en Santiago",
    },
    pymeMaintenance: {
      pricePerPc: 6990,
      formattedPricePerPc: "$6.990",
      minPcs: 3,
      minTotalFormatted: "$20.970",
    },
    componentFee: {
      range: "$12.000 - $15.000",
      description: "Fee fijo por instalación y recalibración de pieza",
    },
  },
};

export function getWhatsAppUrl(message?: string): string {
  const defaultText = `Hola, me gustaría agendar una consulta o saber más sobre el servicio de ${brand.name}.`;
  const textParam = encodeURIComponent(message || defaultText);
  const number = brand.whatsappNumber.replace("+", "");
  return `https://wa.me/${number}?text=${textParam}`;
}
