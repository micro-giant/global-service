abstract class Base<T> {
  private events: any = {}
  // abstract async run(...args: any)
  async $call<E extends keyof T>(eventName: E, params?: T[E]) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    for (var i = 0; i < this.events[eventName].length; i++) {
      await this.events[eventName][i](params)
    }
  }
  $tap<E extends keyof T>(eventName: E, callback: (params: T[E]) => any) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
      this.events[eventName].push(callback)
    } else {
      if (
        !this.events[eventName].find((item: any) => {
          return item == callback
        })
      ) {
        this.events[eventName].push(callback)
      }
    }
  }
  $remove<E extends keyof T>(eventName: E, callback: (params: T[E]) => any) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((item: any) => {
        return item !== callback
      })
    }
  }
}
export default Base
