import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [inputMode, setInputMode] = useState<'manual' | 'stats'>('manual');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const fieldModNodes = [
    { id: '1', name: 'Увеличенный БК', level: 1, maxLevel: 2, stats: '+3% к урону', x: 50, y: 20 },
    { id: '2', name: 'Улучшенная броня', level: 0, maxLevel: 2, stats: '+5% к броне', x: 30, y: 40 },
    { id: '3', name: 'Усиленный двигатель', level: 1, maxLevel: 2, stats: '+8% к скорости', x: 70, y: 40 },
    { id: '4', name: 'Точная наводка', level: 0, maxLevel: 2, stats: '-10% к разбросу', x: 20, y: 60 },
    { id: '5', name: 'Модуль ремонта', level: 0, maxLevel: 2, stats: '+15% к ремонту', x: 50, y: 60 },
    { id: '6', name: 'Оптика командира', level: 0, maxLevel: 2, stats: '+10% к обзору', x: 80, y: 60 },
  ];

  const crewMembers = [
    { role: 'Командир', skills: ['Шестое чувство', 'Ремонт', 'Маскировка'], level: 100, image: '👨‍✈️' },
    { role: 'Наводчик', skills: ['Плавный поворот башни', 'Ремонт', 'Снайпер'], level: 95, image: '🎯' },
    { role: 'Механик-водитель', skills: ['Король бездорожья', 'Ремонт', 'Плавный ход'], level: 98, image: '🚗' },
    { role: 'Заряжающий', skills: ['Бесконтактная боеукладка', 'Ремонт', 'Отчаянный'], level: 92, image: '⚡' },
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

              <div className="relative h-[400px] bg-muted/20 rounded-lg border border-border/50 p-8">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="20%" x2="30%" y2="40%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="50%" y1="20%" x2="70%" y2="40%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="30%" y1="40%" x2="20%" y2="60%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="30%" y1="40%" x2="50%" y2="60%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="70%" y1="40%" x2="50%" y2="60%" stroke="#3b3b4a" strokeWidth="2" />
                  <line x1="70%" y1="40%" x2="80%" y2="60%" stroke="#3b3b4a" strokeWidth="2" />
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
                    <div className={`w-32 p-3 rounded-lg border-2 text-center transition-all ${
                      selectedNodes.includes(node.id)
                        ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                        : node.level > 0
                        ? 'bg-secondary/20 border-secondary'
                        : 'bg-card border-border hover:border-primary/50'
                    }`}>
                      <div className="text-xs font-bold mb-1">{node.name}</div>
                      <div className="text-[10px] text-muted-foreground">{node.stats}</div>
                      <div className="text-[10px] font-semibold mt-1 text-primary">
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
                  <div key={idx} className="p-4 bg-muted/20 rounded-lg border border-border/50 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{member.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">{member.role}</h3>
                          <Badge variant="secondary" className="text-xs">{member.level}%</Badge>
                        </div>
                        <Progress value={member.level} className="h-1 mb-3" />
                        <div className="space-y-1">
                          {member.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Icon name="CheckCircle2" size={12} className="text-primary" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
