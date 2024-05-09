class Product {
  constructor(
    id,
    title,
    price,
    stock,
    images,
    discount,
    supplier,
    colors,
    descripton
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.images = images;
    this.discount = discount;
    this.supplier = supplier;
    this.colors = colors;
    this.description = descripton;
  }
}
const prod1 = new Product(
  1,
  "Macbook Pro 15'4",
  "750",
  2,
  ["assets/mock1.jpg", "./assets/mock1-1.jpg", "./assets/mock1-2.jpg"],
  "50% Off",
  "Proveedor1",
  ["Space-Gray", "Space-Black"],
  "El MacBook Pro de 15,4 pulgadas tiene una pantalla Retina retroiluminada por LED con tecnología IPS y una resolución nativa de 2880 por 1800 a 220 píxeles por pulgada. El MacBook Pro de 15,4 pulgadas también puede tener una Touch Bar con sensor Touch ID integrado."
);
const prod2 = new Product(
  2,
  "Laptop Asus 32'",
  "1000",
  3,
  ["assets/mock2.jpg", "./assets/mock2-1.jpg", "./assets/mock2-2.jpg"],
  "20% Off",
  "Proveedor2",
  ["Black", "White"],
  "11 Pro para empresa: Procesador Intel® Core™ i9-13980HX, NVIDIA RTX™ GPU para portátiles de generación Ada 3000, pantalla OLED de 16' 16:10 de 3,2 K y 120 Hz, memoria de dos ranuras SODIMM de hasta 32 GB, hasta 1 TB, dos ranuras M.2 PCIe® SSD, ASUS Dial y Thunderbolt™ 4 USB-C®"
);
const prod3 = new Product(
  3,
  "Samsumg S23 Ultra",
  "2000",
  4,
  ["assets/mock3.jpg", "./assets/mock3-1.jpg", "./assets/mock3-2.jpg"],
  "10% Off",
  "Proveedor3",
  ["Green", "Yellow"],
  "El Samsung Galaxy S23 Ultra es un teléfono inteligente que salió a la venta el 17 de febrero de 2023. Tiene las mismas dimensiones que el Galaxy S22 Ultra, pero con mejoras en la cámara y la batería"
);
const prod4 = new Product(
  4,
  "Motorola",
  "400",
  5,
  ["assets/mock4.jpg", "./assets/mock4-1.jpg", "./assets/mock4-2.jpg"],
  "5% Off",
  "Proveedor4",
  ["Purple", "Yellow"],
  "El Moto G53 con capacidad 5G pertenece a la gama intermedia de celulares, por sus características como memoria RAM y capacidad de almacenamiento."
);
const prod5 = new Product(
  5,
  "Samsumg S23+",
  "1500",
  6,
  ["assets/mock5.jpg", "./assets/mock5-1.jpg", "./assets/mock5-2.jpg"],
  "10% Off",
  "Proveedor5",
  ["Gray", "Green"],
  "El Samsung Galaxy S23 Plus posee un procesador Qualcomm (SM8550) con una velocidad Octa Core 3.36GHz,2.8GHz,2GHz. ¿Cuántas cámaras tiene el Samsung Galaxy S23 Plus? El Samsung Galaxy S23 Plus cuenta con una cámara frontal de 12MP además de tres cámaras posteriores de 50MP, 10MP y 12MP."
);
const prod6 = new Product(
  6,
  "Lenovo",
  "1300",
  7,
  ["assets/mock6.jpg", "./assets/mock6-1.jpg", "./assets/mock6-2.jpg"],
  "5% Off",
  "Proveedor6",
  ["Space black", "Gray"],
  "Lenovo es una marca de computadoras portátiles que ofrece una amplia variedad de laptops adaptadas a todas las necesidades de los usuarios."
);
const prod7 = new Product(
  7,
  "LG K42",
  "1500",
  8,
  ["assets/mock7.jpg", "./assets/mock7-1.jpg", "./assets/mock7-2.jpg"],
  "8% Off",
  "Proveedor7",
  ["Space black", "Red"],
  "Procesador. Mediatek MT6762 Octa-Core 2.0GHz · Sistema operativo. Android 10 · Memoria interna (ROM). 64GB · Soporta Memoria Externa. Hasta 2TB · Memoria RAM. 3GB."
);
const prod8 = new Product(
  5,
  "Samsumg S23+",
  "1500",
  6,
  ["assets/mock5.jpg", "./assets/mock5-1.jpg", "./assets/mock5-2.jpg"],
  "10% Off",
  "Proveedor5",
  ["Gray", "Green"],
  "El Samsung Galaxy S23 Plus posee un procesador Qualcomm (SM8550) con una velocidad Octa Core 3.36GHz,2.8GHz,2GHz. ¿Cuántas cámaras tiene el Samsung Galaxy S23 Plus? El Samsung Galaxy S23 Plus cuenta con una cámara frontal de 12MP además de tres cámaras posteriores de 50MP, 10MP y 12MP."
);
const products = [prod1, prod2, prod3, prod4, prod5, prod6,prod7,prod8];
