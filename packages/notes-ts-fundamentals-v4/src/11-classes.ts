//* Classes

//? Field types
class Car {
  private static nextSerialNumber = 100
  private static generateSerialNumber() {
    return this.nextSerialNumber++
  }
  static isReady: boolean
  static {
    // `this` is the static scope
    fetch('https://api.example.com/vin_number_data')
      .then((response) => response.json())
      .then((data) => {
        this.nextSerialNumber = data.mostRecentInvoiceId + 1
        this.isReady = true
      })
  }

  make: string
  model: string
  year: number
  // serialNumber = Car.generateSerialNumber()
  // private _serialNumber = Car.generateSerialNumber()
  #serialNumber = Car.generateSerialNumber()
  protected get serialNumber(): number {
    return this.#serialNumber
  }
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    //     ^?
    this.year = year
  }

  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }

  equals(other: unknown) {
    if (
      other &&
      typeof other === 'object' &&
      #serialNumber in other
    ) {
      other
      //       ^?
      return (other.#serialNumber = this.#serialNumber)
    }
    return false
  }

  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }
}

let sedan = new Car('Honda', 'Accord', 2017)
// sedan.activateTurnSignal('left') //! not safe!
new Car(2017, 'Honda', 'Accord') //! not safe!

//? method types

const c = new Car('Honda', 'Accord', 2017)
c.honk(5) // "hooooonk"

//? static member fields

console.log(new Car('Honda', 'Accord', 2017).getLabel())
// > "Honda Accord 2017 - #100
console.log(new Car('Toyota', 'Camry', 2022))
// > "Toyota Camry 2022 - #101

//? static blocks

//* Access modifier keywords

//? on member fields

// const s = new Sedan("Nissan", "Altima", 2020)
// s.serialNumber

//? on static fields
// private static nextSerialNumber: number
// private static generateSerialNumber() { return this.nextSerialNumber++ }
// Car.generateSerialNumber()

//* JS private #fields

//? member fields
#serialNumber = Car.generateSerialNumber()
c.#serialNumber

//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }
// #serialNumber = Car.#generateSerialNumber()

//* Private field presence checks

// const c2 = c1
// c2.equals(c1)

//* readonly

// readonly #serialNumber = Car.#generateSerialNumber()
// changeSerialNumber(num: number) {
//     this.#serialNumber = num
// }

//* Parameter properties

// constructor(
//     public make: string,
//     public model: string,
//     public year: number
//   ) {}

class Base {}

class Car2 extends Base {
  foo = console.log('class field initializer')
  constructor(public make: string) {
    super()
    console.log('custom constructor stuff')
  }
}

//* Overrides

class Truck extends Car {
  override honk() {
    // OOPS!
    return 'BEEP'
  }
}

const t = new Truck('Ford', 'F-150', 2020)
t.honk() // "beep"

//? override keyword
// override hoonk() { // OOP2!

//? noImplicitOverride
// "noImplicitOverride": true

/**/
export default {}
