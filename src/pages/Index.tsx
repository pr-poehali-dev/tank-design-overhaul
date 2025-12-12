import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Index = () => {
  const [selectedNation, setSelectedNation] = useState('USSR');
  const [selectedType, setSelectedType] = useState('heavyTank');
  const [selectedLevel, setSelectedLevel] = useState(10);
  const [fieldModData, setFieldModData] = useState([
    {
      category: 'Огневая мощь',
      slots: [
        { level: 1, name: 'Увеличенный БК', bonus: '+3% урон', selected: true },
        { level: 2, name: 'Скорострельность', bonus: '-8% перезарядка', selected: false },
        { level: 3, name: 'Точная наводка', bonus: '-10% разброс', selected: true },
        { level: 4, name: 'Стабилизатор', bonus: '+6% точность', selected: false },
        { level: 5, name: 'Бронепробитие', bonus: '+5% пробитие', selected: false },
      ]
    },
    {
      category: 'Выживаемость',
      slots: [
        { level: 1, name: 'Улучшенная броня корпуса', bonus: '+5% броня', selected: false },
        { level: 2, name: 'Усиленная башня', bonus: '+7% броня башни', selected: true },
        { level: 3, name: 'Модуль ремонта', bonus: '+15% ремонт', selected: false },
        { level: 4, name: 'Реактивная броня', bonus: '+10% от кумулятивов', selected: false },
        { level: 5, name: 'Укрепленные модули', bonus: '+20% прочность', selected: true },
      ]
    },
    {
      category: 'Подвижность',
      slots: [
        { level: 1, name: 'Усиленный двигатель', bonus: '+8% скорость', selected: true },
        { level: 2, name: 'Улучшенная подвеска', bonus: '+12% маневр', selected: false },
        { level: 3, name: 'Турбина', bonus: '+15% мощность', selected: false },
        { level: 4, name: 'Гусеницы премиум', bonus: '+10% проходимость', selected: true },
        { level: 5, name: 'Разгонный блок', bonus: '+18% разгон', selected: false },
      ]
    },
    {
      category: 'Разведка',
      slots: [
        { level: 1, name: 'Оптика командира', bonus: '+10% обзор', selected: false },
        { level: 2, name: 'Радиостанция', bonus: '+12% связь', selected: true },
        { level: 3, name: 'Усиленная оптика', bonus: '+15% дальность', selected: false },
        { level: 4, name: 'Система наведения', bonus: '+8% обнаружение', selected: false },
        { level: 5, name: 'Командирская башня', bonus: '+20% обзор в движении', selected: true },
      ]
    },
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['Улучшенная вентиляция', 'Стабилизатор вертикальной наводки']);

  const nations = [
    { id: 'USSR', name: 'СССР', flag: '🇷🇺' },
    { id: 'Germany', name: 'Германия', flag: '🇩🇪' },
    { id: 'USA', name: 'США', flag: '🇺🇸' },
    { id: 'China', name: 'Китай', flag: '🇨🇳' },
    { id: 'France', name: 'Франция', flag: '🇫🇷' },
    { id: 'UK', name: 'Великобритания', flag: '🇬🇧' },
  ];

  const types = [
    { id: 'lightTank', name: 'ЛТ', icon: 'Zap' },
    { id: 'mediumTank', name: 'СТ', icon: 'Circle' },
    { id: 'heavyTank', name: 'ТТ', icon: 'Shield' },
    { id: 'AT-SPG', name: 'ПТ', icon: 'Target' },
    { id: 'SPG', name: 'САУ', icon: 'Crosshair' },
  ];

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const equipmentList = [
    { name: 'Улучшенная вентиляция', bonus: '+5% ко всем навыкам экипажа', category: 'universal' },
    { name: 'Стабилизатор вертикальной наводки', bonus: '-20% к разбросу в движении', category: 'firepower' },
    { name: 'Досылатель', bonus: '-10% ко времени перезарядки', category: 'firepower' },
    { name: 'Усиленные приводы наводки', bonus: '-10% ко времени сведения', category: 'firepower' },
    { name: 'Просветленная оптика', bonus: '+10% к обзору', category: 'vision' },
    { name: 'Стереотруба', bonus: '+25% к обзору (неподвижно)', category: 'vision' },
    { name: 'Маскировочная сеть', bonus: '+15% к маскировке (неподвижно)', category: 'vision' },
    { name: 'Ящик с инструментами', bonus: '+25% к скорости ремонта', category: 'survivability' },
    { name: 'Улучшенная компоновка', bonus: '+50% к прочности модулей', category: 'survivability' },
    { name: 'Турбонагнетатель', bonus: '+7.5% к мощности двигателя', category: 'mobility' },
    { name: 'Дополнительные грунтозацепы', bonus: '+15% к проходимости', category: 'mobility' },
  ];

  const toggleModification = (categoryIndex: number, slotIndex: number) => {
    setFieldModData(prev => {
      const newData = [...prev];
      const category = newData[categoryIndex];
      const slot = category.slots[slotIndex];
      
      const selectedCount = newData.reduce((acc, cat) => 
        acc + cat.slots.filter(s => s.selected).length, 0
      );
      
      if (!slot.selected && selectedCount >= 12) {
        return prev;
      }
      
      slot.selected = !slot.selected;
      return newData;
    });
  };

  const toggleEquipment = (equipmentName: string) => {
    setSelectedEquipment(prev => {
      if (prev.includes(equipmentName)) {
        return prev.filter(e => e !== equipmentName);
      } else if (prev.length < 3) {
        return [...prev, equipmentName];
      }
      return prev;
    });
  };

  const getTotalSelectedMods = () => {
    return fieldModData.reduce((acc, cat) => 
      acc + cat.slots.filter(s => s.selected).length, 0
    );
  };

  const tankCharacteristics = [
    { param: 'Прочность', base: 2400, modified: 2640, bonus: '+240' },
    { param: 'Урон в минуту', base: 2850, modified: 3135, bonus: '+285' },
    { param: 'Средний урон', base: 440, modified: 440, bonus: '0' },
    { param: 'Пробитие', base: 268, modified: 281, bonus: '+13' },
    { param: 'Скорострельность', base: 6.48, modified: 7.12, bonus: '+0.64' },
    { param: 'Время перезарядки', base: 9.26, modified: 8.43, bonus: '-0.83' },
    { param: 'Разброс на 100м', base: 0.38, modified: 0.34, bonus: '-0.04' },
    { param: 'Время сведения', base: 2.21, modified: 2.08, bonus: '-0.13' },
  ];

  const armorData = [
    { zone: 'Лоб корпуса', base: 220, modified: 231, bonus: '+11' },
    { zone: 'Борт корпуса', base: 150, modified: 158, bonus: '+8' },
    { zone: 'Корма корпуса', base: 100, modified: 105, bonus: '+5' },
    { zone: 'Лоб башни', base: 280, modified: 300, bonus: '+20' },
    { zone: 'Борт башни', base: 180, modified: 193, bonus: '+13' },
    { zone: 'Корма башни', base: 120, modified: 126, bonus: '+6' },
  ];

  const mobilityData = [
    { param: 'Макс. скорость', base: 50, modified: 54, bonus: '+4' },
    { param: 'Скорость назад', base: 15, modified: 16, bonus: '+1' },
    { param: 'Удельная мощность', base: 15.2, modified: 17.5, bonus: '+2.3' },
    { param: 'Скорость поворота', base: 26, modified: 29, bonus: '+3' },
  ];

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center gap-6 px-8">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">LEBWA.TV</div>
          </div>
          
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Ивенты</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Сервисы</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Модпак</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Турниры</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">BetBoom</a>
            <a href="#" className="text-foreground border-b-2 border-primary pb-0.5">Полевая модернизация</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-8 py-6">
        <Card className="p-6 mb-6 bg-card border-border">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Icon name="Filter" size={20} className="text-primary" />
            Фильтры
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Нация</div>
              <div className="flex flex-wrap gap-2">
                {nations.map(nation => (
                  <Button
                    key={nation.id}
                    variant={selectedNation === nation.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedNation(nation.id)}
                  >
                    <span className="mr-2">{nation.flag}</span>
                    {nation.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">Тип техники</div>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                  >
                    <Icon name={type.icon as any} size={16} className="mr-2" />
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">Уровень</div>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className="w-12"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-secondary via-primary to-destructive flex items-center justify-center text-3xl shadow-lg">
                🛡️
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">Object 279 (e)</h1>
                <div className="flex gap-2">
                  <Badge variant="secondary">X уровень</Badge>
                  <Badge variant="outline" className="border-destructive text-destructive">СССР</Badge>
                  <Badge variant="outline">ТТ</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-destructive">85</div>
                <div className="text-xs text-muted-foreground">Огневая мощь</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">92</div>
                <div className="text-xs text-muted-foreground">Бронирование</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-secondary">65</div>
                <div className="text-xs text-muted-foreground">Подвижность</div>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-accent">78</div>
                <div className="text-xs text-muted-foreground">Обзор</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-card border-border mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon name="Zap" className="text-secondary" size={24} />
              Полевая модернизация
            </h2>
            <div className="text-sm text-muted-foreground">
              Очков использовано: <span className="text-secondary font-bold">{getTotalSelectedMods()}/12</span>
            </div>
          </div>

          <Tabs defaultValue={fieldModData[0].category} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {fieldModData.map(cat => (
                <TabsTrigger key={cat.category} value={cat.category}>
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {fieldModData.map((category, catIdx) => (
              <TabsContent key={category.category} value={category.category}>
                <div className="space-y-3">
                  {category.slots.map((slot, slotIdx) => (
                    <button
                      key={slotIdx}
                      onClick={() => toggleModification(catIdx, slotIdx)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        slot.selected
                          ? 'bg-primary/20 border-primary'
                          : 'bg-muted/20 border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                          {slot.level}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{slot.name}</div>
                          <div className="text-sm text-muted-foreground">{slot.bonus}</div>
                        </div>
                      </div>
                      <div>
                        {slot.selected ? (
                          <Badge variant="default" className="bg-primary">
                            <Icon name="CheckCircle2" size={14} className="mr-1" />
                            Выбрано
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <Icon name="Plus" size={14} className="mr-1" />
                            Выбрать
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Target" className="text-destructive" size={20} />
              Характеристики орудия
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Параметр</TableHead>
                  <TableHead className="text-right">Базовое</TableHead>
                  <TableHead className="text-right">С модами</TableHead>
                  <TableHead className="text-right text-primary">Бонус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tankCharacteristics.map((char, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{char.param}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{char.base}</TableCell>
                    <TableCell className="text-right font-semibold">{char.modified}</TableCell>
                    <TableCell className="text-right text-primary font-semibold">{char.bonus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Shield" className="text-primary" size={20} />
              Бронирование
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Зона</TableHead>
                  <TableHead className="text-right">Базовое</TableHead>
                  <TableHead className="text-right">С модами</TableHead>
                  <TableHead className="text-right text-primary">Бонус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {armorData.map((armor, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{armor.zone}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{armor.base}</TableCell>
                    <TableCell className="text-right font-semibold">{armor.modified}</TableCell>
                    <TableCell className="text-right text-primary font-semibold">{armor.bonus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6 bg-card border-border lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Gauge" className="text-secondary" size={20} />
              Подвижность
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Параметр</TableHead>
                  <TableHead className="text-right">Базовое</TableHead>
                  <TableHead className="text-right">С модами</TableHead>
                  <TableHead className="text-right text-primary">Бонус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mobilityData.map((mob, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{mob.param}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{mob.base}</TableCell>
                    <TableCell className="text-right font-semibold">{mob.modified}</TableCell>
                    <TableCell className="text-right text-primary font-semibold">{mob.bonus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <Card className="p-6 bg-card border-border mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon name="Package" className="text-secondary" size={24} />
              Оборудование
            </h2>
            <div className="text-sm text-muted-foreground">
              Выбрано: <span className="text-secondary font-bold">{selectedEquipment.length}/3</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentList.map((equipment, idx) => {
              const isSelected = selectedEquipment.includes(equipment.name);
              return (
                <button
                  key={idx}
                  onClick={() => toggleEquipment(equipment.name)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'bg-primary/20 border-primary'
                      : 'bg-muted/20 border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm leading-tight">{equipment.name}</div>
                    {isSelected && (
                      <Icon name="CheckCircle2" size={18} className="text-primary flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{equipment.bonus}</div>
                  <Badge variant="outline" className="mt-2 text-[10px]">
                    {equipment.category === 'firepower' && '🎯 Огонь'}
                    {equipment.category === 'vision' && '👁️ Обзор'}
                    {equipment.category === 'survivability' && '🛡️ Защита'}
                    {equipment.category === 'mobility' && '⚡ Подвижность'}
                    {equipment.category === 'universal' && '⭐ Универсал'}
                  </Badge>
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Info" size={16} className="text-primary" />
              Выбранное оборудование
            </h4>
            {selectedEquipment.length > 0 ? (
              <div className="space-y-2">
                {selectedEquipment.map((name, idx) => {
                  const equipment = equipmentList.find(e => e.name === name);
                  return (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{equipment?.name}</span>
                      <span className="text-primary font-semibold">{equipment?.bonus}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Выберите до 3 единиц оборудования</p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;