export class Logger {
  levels: string[] = ['debug', 'info', 'warn', 'error'];
  currentLevel: string;

  constructor(level = 'info') {
    this.currentLevel = level;
  }

  shouldLog(level: string): boolean {
    return (
      this.levels.indexOf(level) >= this.levels.indexOf(this.currentLevel)
    );
  }

  log(level: string, message: string): void {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
    }
  }

  debug(message: string): void {
    this.log('debug', message);
  }

  info(message: string): void {
    this.log('info', message);
  }

  warn(message: string): void {
    this.log('warn', message);
  }

  error(message: string): void {
    this.log('error', message);
  }
}
