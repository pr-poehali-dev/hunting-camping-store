import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: 'hunting' | 'camping';
  price: number;
  stock: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Палатка 4-местная',
    category: 'camping',
    price: 15900,
    stock: 7,
    image: 'https://cdn.poehali.dev/projects/6604c836-9843-47e2-aa77-f9a43ab4983c/files/c4bd8674-5845-4598-ab45-4f649910e4be.jpg',
    description: 'Водонепроницаемая палатка для кемпинга'
  },
  {
    id: 2,
    name: 'Рюкзак походный 65L',
    category: 'camping',
    price: 8500,
    stock: 12,
    image: 'https://cdn.poehali.dev/projects/6604c836-9843-47e2-aa77-f9a43ab4983c/files/9cd56fa7-5037-4bda-9a20-b844e34e4aec.jpg',
    description: 'Вместительный рюкзак с ортопедической спинкой'
  },
  {
    id: 3,
    name: 'Охотничий нож',
    category: 'hunting',
    price: 4200,
    stock: 5,
    image: 'https://cdn.poehali.dev/projects/6604c836-9843-47e2-aa77-f9a43ab4983c/files/a8b36d68-83a6-4bb4-976f-c63e2309c0f0.jpg',
    description: 'Прочный нож из углеродистой стали'
  },
  {
    id: 4,
    name: 'Спальный мешок -15°C',
    category: 'camping',
    price: 6300,
    stock: 15,
    image: 'https://cdn.poehali.dev/projects/6604c836-9843-47e2-aa77-f9a43ab4983c/files/c4bd8674-5845-4598-ab45-4f649910e4be.jpg',
    description: 'Теплый спальный мешок для холодной погоды'
  },
  {
    id: 5,
    name: 'Бинокль 10x42',
    category: 'hunting',
    price: 12500,
    stock: 3,
    image: 'https://cdn.poehali.dev/projects/6604c836-9843-47e2-aa77-f9a43ab4983c/files/9cd56fa7-5037-4bda-9a20-b844e34e4aec.jpg',
    description: 'Профессиональный охотничий бинокль'
  },
  {
    id: 6,
    name: 'Термос 1.5L',
    category: 'camping',
    price: 2100,
    stock: 24,
    image: 'https://cdn.poehali.dev/projects/6604c836-9843-47e2-aa77-f9a43ab4983c/files/a8b36d68-83a6-4bb4-976f-c63e2309c0f0.jpg',
    description: 'Вакуумный термос для напитков'
  }
];

export default function Index() {
  const [filter, setFilter] = useState<'all' | 'hunting' | 'camping'>('all');
  const [activeSection, setActiveSection] = useState<string>('catalog');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="Mountain" size={28} />
              BIVEN
            </h1>
            <div className="flex gap-6">
              {['catalog', 'delivery', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`hover:text-accent transition-colors ${
                    activeSection === section ? 'text-accent font-semibold' : ''
                  }`}
                >
                  {section === 'catalog' && 'Каталог'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'about' && 'О магазине'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Снаряжение для профессионалов</h2>
          <p className="text-xl opacity-90 mb-8">Охота и кемпинг с надежным оборудованием</p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => scrollToSection('catalog')}
            className="gap-2"
          >
            Смотреть каталог
            <Icon name="ArrowRight" size={20} />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Каталог товаров</h2>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="gap-2"
            >
              <Icon name="Grid3x3" size={18} />
              Все товары
            </Button>
            <Button
              variant={filter === 'hunting' ? 'default' : 'outline'}
              onClick={() => setFilter('hunting')}
              className="gap-2"
            >
              <Icon name="Target" size={18} />
              Охота
            </Button>
            <Button
              variant={filter === 'camping' ? 'default' : 'outline'}
              onClick={() => setFilter('camping')}
              className="gap-2"
            >
              <Icon name="Tent" size={18} />
              Кемпинг
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <Badge variant={product.category === 'hunting' ? 'default' : 'secondary'}>
                      {product.category === 'hunting' ? 'Охота' : 'Кемпинг'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                      <p className={`text-sm flex items-center gap-1 ${
                        product.stock < 10 ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        <Icon name="Package" size={14} />
                        {product.stock > 0 ? `Осталось ${product.stock} шт.` : 'Нет в наличии'}
                      </p>
                    </div>
                    <Button disabled={product.stock === 0}>
                      {product.stock > 0 ? 'Купить' : 'Нет в наличии'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">По всей России</h3>
              <p className="text-muted-foreground">Доставка транспортными компаниями в любой регион</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая отправка</h3>
              <p className="text-muted-foreground">Отправляем заказы в течение 1-2 рабочих дней</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">Возврат и обмен в течение 14 дней</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-center">О магазине</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong>BIVEN</strong> — специализированный магазин товаров для охоты и кемпинга. 
              Мы работаем с 2015 года и знаем всё о качественном снаряжении для активного отдыха на природе.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              В нашем каталоге только проверенные бренды и товары, которые прошли испытания в реальных условиях. 
              Мы сами охотники и туристы, поэтому понимаем важность надежного оборудования.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Наша миссия — сделать ваши походы и охотничьи экспедиции комфортными и безопасными, 
              предоставляя лучшее снаряжение по честным ценам.
            </p>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={24} />
                  Адрес магазина
                </h3>
                <p className="text-muted-foreground mb-4">
                  г. Москва, ул. Лесная, д. 15<br />
                  ТЦ "Охотник", 2 этаж
                </p>
                <p className="text-sm text-muted-foreground">
                  Пн-Пт: 10:00 - 20:00<br />
                  Сб-Вс: 11:00 - 19:00
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Phone" size={24} />
                  Связь с нами
                </h3>
                <p className="text-muted-foreground mb-2">
                  <strong>Телефон:</strong> +7 (495) 123-45-67
                </p>
                <p className="text-muted-foreground mb-2">
                  <strong>Email:</strong> info@proohota.ru
                </p>
                <p className="text-muted-foreground">
                  <strong>WhatsApp:</strong> +7 (999) 888-77-66
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Mountain" size={24} />
            <span className="font-semibold text-lg">BIVEN</span>
          </p>
          <p className="text-sm opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}