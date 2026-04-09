interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ number, title, subtitle, centered = false }: SectionTitleProps) {
  return (
    <div className={`space-y-4 mb-16 ${centered ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
        <span className="text-sm font-medium tracking-wider text-muted-foreground dark:text-primary">
          {number} —
        </span>
        <div className="h-px flex-1 bg-border/50 dark:bg-border/20 max-w-xs"></div>
      </div>
      <h2 className="font-serif text-4xl lg:text-5xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-foreground/60 ${centered ? 'mx-auto' : ''} max-w-2xl`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
