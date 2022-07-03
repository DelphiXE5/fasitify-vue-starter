class Store {
  private store: Array<{key: string, value: any}> = [];

  push(key: string, value: any){
    this.store.push({key, value});
  }

  get(key: string){
    return this.store.find(x => (x.key == key)).value;
  }

}

export const store = new Store();