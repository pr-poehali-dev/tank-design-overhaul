import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import CrewMemberCard from '@/components/CrewMemberCard';

const Index = () => {
  const [inputMode, setInputMode] = useState<'manual' | 'stats'>('manual');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const fieldModNodes = [
    { id: '1', name: 'Увеличенный БК', level: 1, maxLevel: 2, stats: '+3% к урону', x: 50, y: 10, category: 'firepower' },
    { id: '2', name: 'Улучшенная броня', level: 0, maxLevel: 2, stats: '+5% к броне корпуса', x: 25, y: 28, category: 'armor' },
    { id: '3', name: 'Усиленный двигатель', level: 1, maxLevel: 2, stats: '+8% к скорости', x: 75, y: 28, category: 'mobility' },
    { id: '4', name: 'Точная наводка', level: 0, maxLevel: 2, stats: '-10% к разбросу', x: 15, y: 46, category: 'firepower' },
    { id: '5', name: 'Усиленная башня', level: 0, maxLevel: 2, stats: '+7% к броне башни', x: 35, y: 46, category: 'armor' },
    { id: '6', name: 'Улучшенная подвеска', level: 0, maxLevel: 2, stats: '+12% к маневренности', x: 65, y: 46, category: 'mobility' },
    { id: '7', name: 'Оптика командира', level: 0, maxLevel: 2, stats: '+10% к обзору', x: 85, y: 46, category: 'vision' },
    { id: '8', name: 'Скорострельность', level: 0, maxLevel: 2, stats: '-8% к перезарядке', x: 10, y: 64, category: 'firepower' },
    { id: '9', name: 'Модуль ремонта', level: 0, maxLevel: 2, stats: '+15% к ремонту', x: 30, y: 64, category: 'armor' },
    { id: '10', name: 'Турбина', level: 0, maxLevel: 2, stats: '+15% к мощности', x: 50, y: 64, category: 'mobility' },
    { id: '11', name: 'Радиостанция', level: 0, maxLevel: 2, stats: '+12% к связи', x: 70, y: 64, category: 'vision' },
    { id: '12', name: 'Стабилизатор', level: 0, maxLevel: 2, stats: '+6% к точности', x: 90, y: 64, category: 'firepower' },
    { id: '13', name: 'Реактивная броня', level: 0, maxLevel: 2, stats: '+10% защита от кумулятивов', x: 20, y: 82, category: 'armor' },
    { id: '14', name: 'Гусеницы премиум', level: 0, maxLevel: 2, stats: '+10% к проходимости', x: 50, y: 82, category: 'mobility' },
    { id: '15', name: 'Усиленная оптика', level: 0, maxLevel: 2, stats: '+15% к дальности обзора', x: 80, y: 82, category: 'vision' },
  ];

  const allSkills = {
    commander: ['Шестое чувство', 'Эксперт', 'Орлиный глаз', 'Мастер на все руки', 'Боевое братство', 'Ремонт', 'Маскировка', 'Пожаротушение'],
    gunner: ['Плавный поворот башни', 'Снайпер', 'Злопамятный', 'Мастер-оружейник', 'Боевое братство', 'Ремонт', 'Маскировка', 'Пожаротушение'],
    driver: ['Король бездорожья', 'Плавный ход', 'Виртуоз', 'Чистота и порядок', 'Боевое братство', 'Ремонт', 'Маскировка', 'Пожаротушение'],
    loader: ['Бесконтактная боеукладка', 'Отчаянный', 'Интуиция', 'Аккуратность', 'Боевое братство', 'Ремонт', 'Маскировка', 'Пожаротушение'],
  };

  const crewMembers = [
    { role: 'Командир', skills: ['Шестое чувство', 'Ремонт', 'Маскировка'], level: 100, image: '👨‍✈️', availableSkills: allSkills.commander },
    { role: 'Наводчик', skills: ['Плавный поворот башни', 'Ремонт', 'Снайпер'], level: 95, image: '🎯', availableSkills: allSkills.gunner },
    { role: 'Механик-водитель', skills: ['Король бездорожья', 'Ремонт', 'Плавный ход'], level: 98, image: '🚗', availableSkills: allSkills.driver },
    { role: 'Заряжающий', skills: ['Бесконтактная боеукладка', 'Ремонт', 'Отчаянный'], level: 92, image: '⚡', availableSkills: allSkills.loader },
  ];

  const tankStats = {
    firepower: 85,
    armor: 92,
    mobility: 65,
    vision: 78,
  };

  const toggleNode = (nodeId: string) => {
    setSelectedNodes(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

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

      <main className="container mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-secondary via-primary to-destructive flex items-center justify-center text-4xl shadow-lg">
              🛡️
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Object 279 (e)</h1>
              <div className="flex gap-2">
                <Badge variant="secondary">X уровень</Badge>
                <Badge variant="outline" className="border-destructive text-destructive">СССР</Badge>
                <Badge variant="outline">ТТ</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
              <Label htmlFor="mode-switch" className="text-sm">
                {inputMode === 'manual' ? '✏️ Ручной ввод' : '📊 Статистика'}
              </Label>
              <Switch
                id="mode-switch"
                checked={inputMode === 'stats'}
                onCheckedChange={(checked) => setInputMode(checked ? 'stats' : 'manual')}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Zap" className="text-secondary" size={24} />
                <h2 className="text-xl font-bold">Полевая модернизация</h2>
              </div>

              <div className="relative h-[500px] bg-muted/20 rounded-lg border border-border/50 p-8 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="10%" x2="25%" y2="28%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="50%" y1="10%" x2="75%" y2="28%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="25%" y1="28%" x2="15%" y2="46%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="25%" y1="28%" x2="35%" y2="46%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="75%" y1="28%" x2="65%" y2="46%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="75%" y1="28%" x2="85%" y2="46%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="15%" y1="46%" x2="10%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="15%" y1="46%" x2="30%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="35%" y1="46%" x2="30%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="65%" y1="46%" x2="50%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="65%" y1="46%" x2="70%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="85%" y1="46%" x2="70%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="85%" y1="46%" x2="90%" y2="64%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="30%" y1="64%" x2="20%" y2="82%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="50%" y1="64%" x2="50%" y2="82%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="70%" y1="64%" x2="80%" y2="82%" stroke="#3b3b4a" strokeWidth="2" />
                </svg>

                {fieldModNodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                      selectedNodes.includes(node.id) ? 'z-20' : 'z-10'
                    }`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div className={`w-28 p-2.5 rounded-lg border-2 text-center transition-all ${
                      selectedNodes.includes(node.id)
                        ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                        : node.level > 0
                        ? 'bg-secondary/20 border-secondary'
                        : 'bg-card border-border hover:border-primary/50'
                    }`}>
                      <div className="text-[10px] font-bold mb-1 leading-tight">{node.name}</div>
                      <div className="text-[9px] text-muted-foreground leading-tight">{node.stats}</div>
                      <div className="text-[9px] font-semibold mt-1 text-primary">
                        {node.level}/{node.maxLevel}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Доступно очков: <span className="text-secondary font-bold">3</span>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить конфигурацию
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Activity" className="text-secondary" size={24} />
                <h2 className="text-xl font-bold">Характеристики танка</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Icon name="Target" size={16} className="text-destructive" />
                      Огневая мощь
                    </span>
                    <span className="text-sm font-bold text-foreground">{tankStats.firepower}%</span>
                  </div>
                  <Progress value={tankStats.firepower} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Icon name="Shield" size={16} className="text-primary" />
                      Бронирование
                    </span>
                    <span className="text-sm font-bold text-foreground">{tankStats.armor}%</span>
                  </div>
                  <Progress value={tankStats.armor} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Icon name="Gauge" size={16} className="text-secondary" />
                      Подвижность
                    </span>
                    <span className="text-sm font-bold text-foreground">{tankStats.mobility}%</span>
                  </div>
                  <Progress value={tankStats.mobility} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Icon name="Eye" size={16} className="text-accent" />
                      Обзор
                    </span>
                    <span className="text-sm font-bold text-foreground">{tankStats.vision}%</span>
                  </div>
                  <Progress value={tankStats.vision} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="Users" className="text-secondary" size={24} />
                  <h2 className="text-xl font-bold">Экипаж</h2>
                </div>
                <Button size="sm" variant="outline">
                  <Icon name="Settings" size={16} />
                </Button>
              </div>

              <div className="space-y-4">
                {crewMembers.map((member, idx) => (
                  <CrewMemberCard
                    key={idx}
                    role={member.role}
                    skills={member.skills}
                    level={member.level}
                    image={member.image}
                    availableSkills={member.availableSkills}
                  />
                ))}
              </div>

              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Переобучить экипаж
              </Button>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="BookOpen" className="text-secondary" size={20} />
                <h3 className="font-bold">Подсказка</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Полевая модернизация позволяет улучшить ключевые характеристики танка. Выбирайте узлы в дереве развития, чтобы повысить огневую мощь, броню или подвижность.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;