### 書籍: Typescriptハンズオン を Q &A形式で一部纏めました。

問1 P.56  
let x: numberの :number の部分を何というか。  
A. 型アノテーション



問2 P.58  
以下を実行するとどうなるか。

```ts
let x
x = 123;
console.log(x);
x = "ok";
console.log(x);
```

A. 123とokが出力される。 
*let x* の様にただ変数を定義しただけで型の指定はしていないので、自動的にどんな値でも設定可能な<u>any 型</u>になる。  
typescriptの恩恵を受けられなくなるので、any型は通常使わない。



問3 P.60  
以下の例ではエラーが起こるが、yを数値変換する方法は？

```ts
let x = 123;
let y = "456";
x = y; 
// Type 'string' is not assignable to type 'number'.
```

A. 
```ts
・値の前に + をつける。　
　x = +y;
・値に *1 をする。　
　x = y * 1;
・Number()関数を使用する。 
　x = Number(y);
```



問4 P.77  
[1,2,3]などの数値の入る配列の型定義は？

A. const data: number[]= [1,2,3] となる。
　保管する値の後に、[]を付けて表現する。

 

問5 P.78  
data1:number = [1,2,3] とあった場合に、配列を変更できない様にするにはどうするか

A. readonlyを付ける。

```ts
const data2:readonly number[] = [1,2,3]
data2[0] = 100;
console.log(data1) // => エラー

const data1:number[] = [1,2,3]
data1[0] = 100;
console.log(data1) // => 変更できる
```



問6 P.82  
配列に異なる型の値を保管する時に使用する型は何か
ex) [ 名前, 年齢 ]

A. タプル型 を使用する

```ts
let customer:[string, number]
customer = ['taro', 20]
console.log(customer)
```



問7 P.84  
ジャンケンのプログラムを作成する際に、グー・チョキ・パーしか選べない型を作りたい。


A. enum 型 { 項目1, 項目2, ... } を使用する.

```ts
enum janken { goo, choki, paa }

const you = janken.goo // janken型のgooという値を設定。
// const you:kanken = janken.goo
// jankenという「複数の値から一つ選ぶ」方式の新しい型を定義

switch(you) {
  case janken.goo:
  console.log("あいこです");
  break
  case janken.choki:
  console.log("あなたの勝ち");
  break
  case janken.paa:
  console.log("あなたの負け");
  break
}
// 上記の例では、janken.goo以外は実行されないので、エラーが出るがサンプルなので無視.
```



問8 P.86  
問6で使用したタプル型について、 *let customer:[string, number]* の配列内の各型名をそれぞれ型エイリアスを使用し分かりやすくしてください。

A.

```ts
// 型エイリアス(Type Aliase)
type name = string
type age = number

let customer:[name, age] // タプル型を定義
// let customer:[string, number] よりも何の値が入るか分かりやすくなっている

customer = ['taro', 20]
console.log(customer)
```



問9 P.88  
問8で配列内の値の型を*type aliase*を使用しそれぞれ定義したが、[name, age]という配列自体を*type aliase*を使用し定義してください。

A. 

```ts
// 型エイリアス(Type Aliase)
type name = string
type mail = string
type age = number

// タプル型にtype Aliaseで別名を付ける
type person = [name, mail, age] 

// taro、hanakoと増えていっても、同じpersonを適用すればよい。
let taro:person = ['taro', 'taro@example.co.jp', 20]
let hanako:person = ['hanako', 'hanako@example.co.jp', 18]

const data:person[] = [taro, hanako]

for(let item of data){
  console.log(item)
}
```



問10 P.89  
リテラル型(ex. 'hello')のtype aliaseを作成してください。

A. 

リテラルには、文字列型リテラル・数値型リテラル・論理型リテラル(true・false)がある。
リテラル型というのは、特定のリテラル許可を許可する型のこと

```ts
// greetingは、helloという文字列リテラルのみを許可
type hello = 'hello'
const greeting:hello = 'hello'
```



問11 P.90  
複数のリテラル型( 'hello', 'Hi', 'bye' )を許可する条件型(Conditional Types)を作成してください。

A. 

```ts
type greet = 'hello' | 'Hi' | 'bye'
const morningGreeting:greet = 'hello'
```



問12 P.91  
以下のdataを読み取り専用にしてください

```ts
type data = [string, number] //タプル型
```



A. ユーティリティ型 Readonlyを使用する

```ts
type data = [string, number]; //タプル型
type ReqData = Readonly<data>; // ユーティリティ型 Readonly

const x:data = ["taro", 23]
const y:ReqData = ["hanako", 23]

x[1] = 34
y[1] = 32 // エラー

console.log(x)
console.log(y)
```



問13 P.90  
複数のリテラル型( 'hello', 'Hi', 'bye' )を許可する条件型(Conditional Types)を作成してください。

A. 

```ts
type greet = 'hello' | 'Hi' | 'bye'
const morningGreeting:greet = 'hello'
```



問14 P.91  
次のタプル型において、nameはnullを許可しない、ageはnullを許可するようにように書き換えて下さい。

```
type data = [name: string, age: number]
```

A. 

```ts
type data = [name!: string, age?: number]

// ちなみに、 nullを許可するageについては、その値が省略される可能性があるので、配列の並び順として、nullを許可しない値の前に置くことはできない。
```



問15 P.90  
複数のリテラル型( 'hello', 'Hi', 'bye' )を許可する条件型(Conditional Types)を作成してください。

A. 

```ts
type greet = 'hello' | 'Hi' | 'bye'
const morningGreeting:greet = 'hello'
```



問16 P.107  
以下の関数の引数と戻り値の型を定義して下さい。

```ts
function calcTax(price) {
  const p = price / 1.1
  const t = price - p
  return [p, t]
}

```

A. 

```ts
function calcTax(price:number):[price: number, tax: number] {
  const p = price / 1.1
  const t = price - p
  return [p, t]
}
```



問17 P.112  
以下の関数の引数に初期値(1000)を与えて下さい。

```ts
function calcTax(price:number):[price: number, tax: number] {
  const p = price / 1.1
  const t = price - p
  return [p, t]
}
```

A. 

```ts
function calcTax(price:number = 1000):[price: number, tax: number] {
  const p = price / 1.1
  const t = price - p
  return [p, t]
}
```



問18 P.112  
以下の関数の引数に初期値(1000)を与えて下さい。

```ts
function calcTax(price:number):[price: number, tax: number] {
  const p = price / 1.1
  const t = price - p
  return [p, t]
}
```

A. 

```ts
function calcTax(price:number = 1000):[price: number, tax: number] {
  const p = price / 1.1
  const t = price - p
  return [p, t]
}
```



問19 P.117  
以下の関数を無名関数とアロー関数に書き換えて下さい。

```ts
function calcTax(price:number):[price: number, tax: number] {...}
```

A. 

```ts
// 無名関数
const calcTax2 = function(price:number=1000):[price: number, tax: number] {...}

// アロー関数
const calcTax2 = (price:number=1000):[price: number, tax: number] => {...}
```



問20 P.120  
内部関数(inF)を使用するメリットは？

```
const f = (n:number) => {
  const inF = (n:number) => {
    console.log("value:" + n)
  }
  let total = 0;
  for(let i = 1; i < n; i++){
   total += i;
   inF(total);
  }
}

f(10);
```

A. 
他で使用されない、その場限りの関数の場合、内部で定義した方が構文内で利用範囲を限定できる。
知らないところで、名前が被ってバグを生む可能性も無くなる。

問21 P.121  
関数を引数として受け取る関数を定義して下さい。
※ 関数の型はFunctionとすること。

A. 

```ts
const calcNumber = (n: number, f: Function):void => {
  let res = f(n);
  conosle.log("result: " + res)
}
const double = (n:number) => n * 2

calcNumber(1000, double)
```

問22 P.123  
問21で引数として、渡した関数fの引数や戻り値の型を具体的に記載下さい。

A. 

```ts
// fは、numberを引数に取り、numberを返す関数である。
// f:(n:number) => number と表現できる
const calcNumber = (n: number, f:(n:number) => number):void => {
  let res = f(n);
  conosle.log("result: " + res)
}
const double = (n:number) => n * 2

calcNumber(1000, double)
```



問23 P.125  
戻り値に関数を渡す関数を定義ください。

A. 

```ts
// 戻り値に「引数にnumber・戻り値がnumber」の関数を定義する。 (n:number) => number
const f = (tax: number):(n:number) => number => { 
  // returnで関数を返す
 	return (n:number) => n * ( 1 + tax)
}

const f1 = f(0.1) // f1はtax0.1がセットされた関数
const price = 10000
console.log(f1(price)) // fに、tax=0.1, n=priceになる。
```



問24 P.130  
以下の結果は何が出力されるか。

```ts
const f = (n:number): ()=> number => {
    let count:number = 0
    return ():number => {
        count += n
        return count
    }
}

const f1 = f(1)
for(let i =0; i < 10; i++) {
    // for文中countが消えていない
    console.log(f1())
}
```

A.
1, 2, 3, ..., 10
f1 を実行した際の戻り値は、f関数になり、その中で定義していたcountとnの値を返している。
この関数は、ただ関数だけでなく、関数が定義された時の環境まで保ったまま動いている。
→ 「定義された環境を保ち、その中で動く関数」のことを、「クロージャ」という。



問25 P.138   
以下のジェネリクス型のメリットは何か

```ts
function getRnd<T>(values: T[]): T {
    const r = Math.floor(Math.random() * values.length)
    return values[r]
}
const data1 = [0,2,4,6,8,10]
const data2 = ['グー','チョキ','パー']
```

A. 
関数の引数や戻り値の型を定義するとき、numberやstringなど特定の型が決まってない場合、
any型か(string | number)など条件型を使用する必要がある。
その場合に、「ジェネリクス」を使用することで、引数がnumberなら、
Tがnumberに決まり、上記の例であれば、戻り値もnumberと固定する事ができる。

```ts
・条件型
type t = number | string
function getRnd(values: t[]):t {
    const r = Math.floor(Math.random() * values.length)
    return values[r]
}
・any型
function getRnd(values: any[]): any {
    const r = Math.floor(Math.random() * values.length)
    return values[r]
}
```



問26 P. 144  
以下の非同期関数を解説して下さい。

```ts
const f = (n:number, d:number): Promise<number> =>{
    console.log("start:" + n)
    return new Promise((f) => {
        let total = 0
        for(let i = 1;i <= n;i++)
            total += i
        setTimeout(() => {
            f(total)
        }, d)
    })
}
const cb = (n:number)=> {
    console.log("result:" + n)
}
f(10,300).then(cb)
```

A.

関数fの戻り値は、```Promise<number>```となっており、numberの値が結果として渡されるPromiseになる。
returnされるPromiseの引数```f```は、待機後に実施される関数であり、この例では関数```cb```になる。また、先ほどのnumberは、cbに渡される。

この```cb```のように、非同期処理が終了した後に、実行される処理を「コールバック」という。



setter, getterなどは後で纏める



問27 P.187  
クラスを定義するときにinterfaceを渡すメリットは何か。
クラスを定義するときにどんな制約が生まれるか。

A. 
interfaceでは、プロパティやメソッドを定義する事ができる。
classでinterfaceをimplementsする事で、interfaceで定義したプロパティやメソッドが必須となるために、
クラスにこれらの実装を保証する事ができる。
以下、サンプルを示す。

```ts
interface Human {
    name:string
    print():void
}

class Person implements Human {
    name:string ='no-name'
    mail:string
    age:number

    constructor(name:string, mail:string = 'no-mail', age:number = -1) {
        this.name = name
        this.mail = mail
        this.age = age
    }

    print():void {
        console.log(this.name + '(' + this.mail + ',' + this.age + ')') 
    }
}
```

問28 P. 189  
複数のクラスで同じinterfaceをimplementsするメリットは何か。

A. 
implementsしたクラスは、そのinterfaceの型のオブジェクトとして扱える様になる。
→ どのクラスでもそのinerfaceで定義したプロパティやメソッドを実装していることになるので、問題なく動作する。

```ts
interface Human {
    name:string
    print():void
}
class Person implements Human
end
class Student implements Human
end

const taro:Person = new Person('taro','taro@yamada',39)
const hanako:Student = new Student('hanako',School.high,2)
const sachiko:Person = new Person('sachiko')
const jiro:Student = new Student('jiro')

const data:Human[] = [taro,hanako,sachiko,jiro] // 全てHumanとして扱える

for(let item of data) {
    item.print()
}
```



問29 P.190  
interfaceを継承したサンプルを作成して下さい

A. 

```ts
interface Human {
  ...
}

interface People extends Human {
  birth: Date
}
// => Humanで定義したプロパティ・メソッドと独自のbirthを実装する必要がある。
```



問30 P.192  
抽象クラスを定義して下さい。

A. 
抽象クラスではメソッドを定義出来て、それを継承したサブクラスでそのメソッドをオーバーライドする様に強制する事が出来る。
抽象クラスを定義するときには、
・abstractというキーワードを使用する。
・サブクラスのconstructorでは、1行目にsuper()を追記する。
抽象クラスで定義したメソッドを継承するサブクラス側で、必ずこのメソッドを実装する必要がある。

```ts
abstract class Human {
    abstract print():void
}

// クラスの継承なので、extendsキーワードを使用する。
class Person extends Human {
    name:string ='no-name'
    mail:string
    age:number

    constructor(name:string, mail:string = 'no-mail', age:number = -1) {
        super() // super()を追加
        this.name = name
        this.mail = mail
        this.age = age
    }

    print():void {
        console.log(this.name + '(' + this.mail + ',' + this.age + ')') 
    }
}

const john:Person = new Person("john", "john@test.co.jp", 29)
kohei.print()
```



問31 P.193

抽象クラスとインターフェースの違いは何か
・継承する際のキーワード
・複数のクラスを継承できるか否か
・プロパティを強制することができるか
・protectedメソッドかpublicメソッドか
A.

・継承する際のキーワード
→ インターフェースはimplements。抽象クラスはabstruct。
・複数のクラスを継承できるか否か
→ インターフェースは可能。抽象クラスは1つのみ。
・プロパティを強制することができるか
→ インターフェースは可能。抽象クラスは不可。基本的にはメソッドを定義するところ。
　以下の様な事は出来る。

```ts
abstract class Food {
  abstract foo: string;
  abstract keepRefrigerated(): boolean;
}
 
class Meat extends Food {
    foo = 'foo'
    keepRefrigerated():boolean { return true; }
}
```

・protectedメソッドか、publicメソッドか
→ インターフェースメソッドは基本的にpublicメソッドを定義するもの。protectedメソッドは不可。
　 protectedメソッドの実装を義務つけたいなら、抽象クラスを使う。以下、 ※1 

```ts
abstract class Person {
  // ※1
  constructor(protected readonly name: string, public age: number) {}
  abstract hello(): void;
}

class Japanese extends Person {
  constructor(name: string, age: number, private gender: "male" | "female") {
    super(name, age); //superメソッドで継承元のプロパティを継承先でも使える状態にします。
    this.gender = gender; //継承元のプロパティを受け継いだあとにJapanese独自のプロパティを設定。
  }
  hello() { return 'hello'}
}
const ichiro = new Japanese("ichiro", 24, "male");
ichiro.hello();
```

参照: https://zenn.dev/tsuboi/articles/417cdf154a3e8dce618e



問32 P.194  
静的メンバーを利用するメリットは何か

A.
通常、クラスからインスタンスを生成して利用する。
ただ、計算処理をクラスに纏めていて結果だけ必要で、インスタンスを生成する必要がないクラスの場合、
この様なクラスのプロパティやメソッドを「静的メンバー」として用意する。
「静的」とは、クラスからそのまま呼び出せるもの。
「メンバー」とは、クラスに用意されるプロパティやメソッドのこと。
「static」というキーワードを使う。

```ts
class StaticHuman {
    static fullname:string // 静的ポロパティ
    static age:number      // 静的ポロパティ
  
    static set(nm:string, ag:number):void { // 静的メソッド
        this.fullname = nm
        this.age = ag
    }
  
    static print():void { // 静的メソッド
        // 静的メソッド内ではthisはクラスを指す
        console.log(this.fullname + '(' + this.age + ')')
    }
}

StaticHuman.set('taro',39) // staticのプロパティに設置
StaticHuman.print()
StaticHuman.set('hanako',28)
StaticHuman.print()
```

問33 P.196  
以下のHumanクラスのconstructor内では何も記述がないが、```print```メソッドが実行出来ている。
これはなぜか。

```ts
class Human {
  　// nameとageを受け取れる様にしただけ
    constructor(readonly name:string, readonly age:number) {
    }

    print():void {
        console.log(this.name + '(' + this.age + ')')
    }
}

const taro = new Human('taro', 39)
taro.print() // taro(39)
const hana = new Human('hanako', 28)
hana.print() // hanako(28)
```

A.
constructorにreadonlyを指定した引数を用意すると、読み取りのみのプロパティとして扱える。
これを「パラメータプロパティ」という。

問34 P.196  
ジェネリクス型を用いてクラスを定義して下さい。

A.

```ts
class 名前 <T> {
  ...
}
const data1 = new 名前<string>('st1','st2','st3')
```

sample

```tsx
class Data<T> {
    data?:T[] // T型配列の型指定
    
    constructor(...item:T[]) {  // ...items: rest parameterについては、問35,36で確認
        this.data = item
    }

    print():void {
        if (this.data) {
            for(let item of this.data) {
                console.log(item)
            }
        } else {
            console.log('no data...')
        }
    }
}

const data1 = new Data<string>('one','two','three')
const data2 = new Data<number>(123,456,78,90)
ジェネリクス(総称型)は、実行時に、型が確定する特殊な型指定
data1.print()
data2.print()
```



問35 P.196

残余引数(rest parameter)の出力結果はどうなるか

```tsx
function func(...params) {
  console.log(params);
}
func(1, 2, 3); // 1

function func(param1, ...params) {
  console.log(param1, params);
}
func(1, 2, 3); // 2
```

A.

```ts
//1 
[1,2,3]
...params = 1,2,3 なので、 paramsは、[1,2,3]ということになる。
よって、引数として渡すときは、配列を展開した状態で、「 1,2,3 」とそのまま渡す。
// 2
1 [2,3]
```

参照: https://typescriptbook.jp/reference/functions/rest-parameters

問36 P.196
残余引数の型注釈はどうなるか

A. 
配列になるため配列を定義する。 中身がnumberなら以下の様になる。

```tsx
function func(...params: number[]) {
  // ...
}
```

問37 P.200

Human型の値をプロパティとして扱うところで、Requiredというユーティリティ型使用している。
この場合、Human型のmailやageのプロパティは必須となるか。

```ts
type Human = {
    name:string
    mail?:string
    age?:number
}

class Person {
    human:Required<Human>

    constructor(nm:string, ml:string, ag:number) {
        this.human = {name:nm, mail:ml, age:ag}
    }

    print():void {
        console.log(this.human.name 
            + ' (' + this.human.age + '::'
            + this.human.mail + ')')
    }
}
const taro = new Person('taro','taro@yamada', 39)
taro.print()
```

A.
yes

問38 P.206  
メモアプリの解説をして下さい。

```tsx
let table:HTMLTableElement
let message:HTMLInputElement

function showTable(html:string) {
    table.innerHTML = html
}
function doAction() {
    const msg = message.value // 入力フォームの値を取得
    memo.add({message:msg,date:new Date()}) // memoインスタンスのaddの呼び出し dataに追加
    memo.save() // dataをlocalStrageに保存
    memo.load() // 保存されたlocalStrageを参照
    showTable(memo.getHtml()) // 出力
}
function doInitial() {
    memo.data = []
    memo.save()
    memo.load()
    message.value = ''
    showTable(memo.getHtml())
}
type Memo = {
    message:string,
    date:Date
}

class MemoData {
    data:Memo[] = []

    add(mm:Memo):void {
        this.data.unshift(mm) // 配列の一番最初に追加
    }
    save():void {
        localStorage.setItem('memo_data', JSON.stringify(this.data))
    }
    load():void {
        const readed = JSON.parse(localStorage.getItem('memo_data'))
        this.data = readed ? readed : []
    }
    getHtml():string {
        let html = '<thead><th>memo</th><th>date</th></thead><tbody>'
        for(let item of this.data) {
            html += '<tr><td>' + item.message + '</td><td>' 
                + item.date.toLocaleString() + '</td></tr>'
        }
        return html + '</tbody>'
    }
}

const memo = new MemoData()

window.addEventListener('load',()=>{ // DOMオブジェクトが生成されたら発火
    table = document.querySelector('#table')
    message = document.querySelector('#message')
    document.querySelector('#btn').addEventListener('click', doAction)
    document.querySelector('#initial').addEventListener('click',doInitial)
    memo.load()
    showTable(memo.getHtml())
})
```



問39 P.217   
map型を定義して下さい。
また、stringのキーにstringの値を保管するmap型を定義して下さい。

A.
「マップ型」とは、キーと値がセットになっている情報を保管する型。

```ts
type 名前 = { [key in 型] : 型 }
キーは、 [key in 型] で定義する.
valueは : 型 で定義する.


stringのキーにstringの値を保管するmap型の場合
type stringArray = {
  [key in string] : string
}

const data1:stringArray = {
  'start': "最初の値",
  'middle': "中央の値",
  'end': "最後の値",
}
data1['finish'] = "おしまい"
data[100] = "ok"
console.log(data1)
{
  "100": "ok", // 100がstring型に変換されている。
  "start": "最初の値",
  "middle": "中央の値",
  "end": "最後の値",
  "finish": "おしまい"
} 
```

問40 P.218  
enumのキーを指定して、map型を定義して下さい。
``` enum human { name='name', mail='mail' } ```

A. 

```ts
enum human {name='name', mail='mail'}

type HumanMap = {
  [key in human] : string
}

const taro:HumanMap = {
   name: 'taro',
   mail: 'taro@gmail.com',
}
console.log(taro)
```

問41 P.218

問40でtaroはHumanMap型インスタンスとなっているが、値を変化させた場合にどれがエラーになるか。
① mailキーを無くす
② nicknameという新しいキー・バリューを追加する
③ nameのバリューを123 というsting以外のものにする

A.

全てエラーとなる。キーにenumや複数の値を指定すると、それら全てをキーとして持たせないといけなくなる。
→ 予め用意されているプロパティを強制する事ができる。

問41 P.222  
以下、StudentクラスとEmployeeクラスを一つにまとめたPeople型を定義して下さい。

```ts
class Student {
    name:string
    school:string
    grade:number

    constructor(nm:string, sc:string, gr:number) {
        this.name = nm
        this.school = sc
        this.grade = gr
    }

    print():void {
        console.log('<< ' + this.name + ',' +
            this.school + ':' + this.grade + ' >>')
    }
}
class Employee {
    name:string
    title:string
    department:string

    constructor(nm:string, tt:string, dp:string) {
        this.name = nm
        this.title = tt
        this.department = dp
    }

    print():void {
        console.log(this.name + '[' + this.title + 
            ',' + this.department + ']')
    }
}
```

A.

```ts
type People = Student | Employee
```



問42 P.222  
問41にあるPeople型を使用し、studentとemployeeのインスタンスを生成して下さい。
また、printメソッドを実行して下さい。

A.

```ts
const taro:People = new Student("taro", "high-school", 3)
const jiro:People = new Employee("jiro", "director","labo")

const data:People[] = [taro, jiro]
for(let item of data) {
    item.print()
}
```

StudentとEmployeeでnameとprintメソッドは共通しており、「**ユニオン型の機能**」として呼び出せる。



問43 P.224  
問41にあるように、printメソッドはStudentクラスとEmployeeクラスで共通していたために、呼びだす事が出来た。
共通していないメソッドを呼び出す際には、どうすればよいか。

A.
ユニオン型の値がどれの型の値なのかチェックして元の型に変換すれば良い。
以下の例では、swtich文を使用している。

また、switch文で分岐後のインスタンスに各クラスをキャストする。(型アサーション)

```ts
for(let item of this.data) {
  let ob
  switch(item.constructor.name) {
      case 'Student': // itemのクラス名がStudentと一致
      ob = item as Student // itemをStudentインスタンスとして取り出す。 = 型アサーション
      　　　　　　　　　　　　 // (itemがStudentインスタンスだとコンパイラに情報提供している)
      console.log(ob.name + ', ' + ob.school + '(' + ob.grade + ')')
      break
    case 'Employee':
      ob = item as Employee
      console.log(ob.name + ':' + ob.title + ':' + ob.department)
      break
    default:
      console.log('cannot print.')
  }
}
```

問44 P.229

以下のPersonをRecord型で定義して下さい。

```ts
const taro:Person = {
    name:'taro',
    age:39
}
```

A.

```ts
type prop_name = 'name' | 'mail' | 'age' |
type Person = Record<prop_name, string, number>
// type 型名 = Record<キー, 値>
// キーには、予めprop＿nameの様に複数の項目を纏めたユニオン型を指定すると、それらの項目をキーとする
// マップ型が作成できる(マップ型については、問39を参照)
```

問45 P.230

以下の person_data 型から nameとageだけを抽出した新しいperson型を作成して下さい。

```ts
type person_data = {
    name:string,
    mail:string,
    address:string,
    age:number
}
```

A.

```ts
type person_data = {
    name:string,
    mail:string,
    address:string,
    age:number
}
type person_keys = 'name' | 'age' // 取り出すキーをまとめるために、ユニオン型で定義
type person = Pick<person_data, person_keys> // type 名前 = Pick<抽出元の型, 抽出するキー>

const taro:person = {
  name: 'taro',
  age: 39
}
console.log(taro)
```



参考 P.236　名前空間 namespace  
関数やクラス名の衝突を防ぐために、名前空間を利用する。
以下の様に、namespaceを使用する。参照する際には、名前空間.関数名の様に呼び出す。

```ts
namespace myapp {
  
    namespace foundation {
        export interface printable {
            print():void
        }
        export interface stringable {
            getString():string
        }
    }

    export type Person = {
        name:string
        age:number
    }

    export class MyData implements foundation.printable, foundation.stringable {
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
}

const mydata = new myapp.MyData()
mydata.add('taro', 39)
mydata.add('jiro', 6)
mydata.print()
```



問46 P.244  
typescriptでは、複数のクラスを継承(多重継承)することができるか。

A.
多重継承はできない。( 参考: 問31 P.193 )
ただし、継承したいクラスを一つに纏めて、それを組み込む事ができる。(これを「**ミックスイン**」という。)

以下が、ミックスインを実現するためのロジック
https://www.typescriptlang.org/docs/handbook/mixins.html#handbook-content

```ts
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

// 以下の形で使用する
interface 組み込み先のクラス extends 組み込むクラス　{}
applyMixins(組み込み先のクラス, [ 組み込むクラスの配列 ])
```

・サンプル

```ts
class Person {
    name:string = ''
    title:string = ''

    setPerson(nm:string, tt:string):void {
        this.name = nm
        this.title = tt
    }
}

class Pet {
    kind:string = ''
    age:number = 0

    setPet(k:string, ag:number):void {
        this.kind = k
        this.age = ag
    }
}

class Me {
    print():void {
        console.log(this.name + ' (' + this.age + ')\n'
          + '"' + this.title + '". pet is ' + this.kind + '!')
    }
}
// MeインターフェースにPersonとPetをextendsする。(P.192抽象クラスをextendsする感じ)
interface Me extends Person,Pet {}
// applyMixinsを呼び出して、MeクラスにPersonとPetクラスを組み込む。
applyMixins(Me, [Person,Pet])

// PersonとPetクラスにあったプロパティやメソッドが使用できる様になっている。
const me = new Me()
me.setPerson('taro','designer')
me.setPet('cat',2)
me.print()
```



問47 P.275  
以下のままでは、title.hrefでElementクラスにはhrefプロパティがなくエラーが出ます。修正して下さい。

```ts
const title = document.querySelector('#title')
title.href = "http://google.com"
```

A.
titleをHTMLAnchorElementクラスにする。HTMLAnchorElementクラスはHTMLElementクラスのサブクラスで、<a>タグに対応したエレメントを提供する。
何も指定しないと、titleはElementクラスのインスタンスであり、hrefを持っていない。そのため、HTMLAnchorElement型の変数に代入する。

```ts
const title:HTMLAnchorElement = document.querySelector('#title')
title.href = "http://google.com"
```

[参考]
setDivで引数に渡されたdivタグにスタイルを設定している。

```ts
let msg:HTMLParagraphElement
const html = `<h3>This is message</h3>
    <div id="content">wait...</div>`

window.addEventListener('load',()=>{
    msg = document.querySelector('#msg')
    msg.innerHTML = html
    const content:HTMLDivElement = document.querySelector('#content')
    setDiv(content)
})

function setDiv(content:HTMLDivElement) {
    content.style.width ="300px"
    content.style.height = "300px"
    content.style.borderWidth = "3px"
    content.style.borderStyle = "solid"
    content.style.borderColor = "red"
    content.style.backgroundColor = "white"
    content.textContent = ""
}
```

