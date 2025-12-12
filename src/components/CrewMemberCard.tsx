import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CrewMemberProps {
  role: string;
  skills: string[];
  level: number;
  image: string;
  availableSkills: string[];
}

const CrewMemberCard = ({ role, skills, level, image, availableSkills }: CrewMemberProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(skills);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 6) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="p-4 bg-muted/20 rounded-lg border border-border/50 hover:border-primary/50 transition-all">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{image}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">{role}</h3>
            <Badge variant="secondary" className="text-xs">{level}%</Badge>
          </div>
          <Progress value={level} className="h-1 mb-3" />
          <div className="space-y-1 mb-3">
            {selectedSkills.slice(0, 4).map((skill, skillIdx) => (
              <div key={skillIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="CheckCircle2" size={12} className="text-primary" />
                {skill}
              </div>
            ))}
            {selectedSkills.length > 4 && (
              <div className="text-xs text-muted-foreground ml-5">
                +{selectedSkills.length - 4} ещё...
              </div>
            )}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Icon name="Edit3" size={14} className="mr-2" />
                Изменить навыки
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{image}</span>
                  {role}
                </DialogTitle>
                <DialogDescription>
                  Выберите до 6 навыков для члена экипажа
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        selectedSkills.includes(skill)
                          ? 'bg-primary/20 border-primary'
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill}</span>
                        {selectedSkills.includes(skill) && (
                          <Icon name="CheckCircle2" size={16} className="text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center justify-between text-sm pt-4 border-t">
                <span className="text-muted-foreground">
                  Выбрано: {selectedSkills.length}/6
                </span>
                <Button size="sm" onClick={() => setSelectedSkills(skills)}>
                  Сбросить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CrewMemberCard;
