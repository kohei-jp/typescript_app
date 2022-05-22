export interface printable {
  print():void
}

export interface stringable {
  getString():string
}

export type Person = {
  name:string
  age:number
}

export class MyData implements printable,stringable {

  people:Person[] = []

  constructor(){}

  add(nm:string, ag:number) {
      this.people.push({name:nm, age:ag})
  }

  print():void {
      console.log('*** mydata ***\n' + this.getString())
  }

  getString():string {
      let res = '[\n'
      for (let item of this.people) {
          res += '  "' +item.name + ' (' + item.age + ')",\n'
      }
      return res + ']'
  }
}