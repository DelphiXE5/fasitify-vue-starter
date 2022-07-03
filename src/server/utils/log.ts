export class Log {
    private moduleId: string;

    constructor(moduleId: string) {
        this.moduleId = moduleId.split("/").at(-1);
    }

    log(text: string){
      console.log(`\x1b[34mLOGGER \x1b[32m"${this.moduleId}":\x1b[37m ${text}`);
    }

    error(text: string){
      console.log(`\x1b[34mLOGGER \x1b[32m"${this.moduleId}": \x1b[31m${text}\x1b[37m`);
    }
}
