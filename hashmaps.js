import { LinkedList, Node } from "./linkedList.js";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [];
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new LinkedList();
    }
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }
  set(key, value) {
    let index = this.hash(key) % 16;
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bound");
    }
    let current = this.buckets[index].head;
    if (this.buckets[index].contains(key)) {
      for (let i = 0; i < this.buckets[index].find(key); i++) {
        current = current.next;
      }
      current.value = value;
    }
    this.buckets[index].append(key, value);
  }

  get(key) {
    let index = this.hash(key) % 16;
    if (!this.buckets[index].contains(key)) return null;
    let current = this.buckets[index].head;
    for (let i = 0; i < this.buckets[index].find(key); i++) {
      current = current.next;
    }
    return current.value;
  }
  has(key) {
    let index = this.hash(key) % 16;
    return this.buckets[index].contains(key);
  }
  remove(key) {
    let index = this.hash(key) % 16;
    if (!this.buckets[index].contains(key)) return false;
    this.buckets[index].removeAt(this.buckets[index].find(key));
    return true;
  }
  length() {
    const size = this.buckets.reduce((sum, current) => {
      return (sum += current.size());
    }, 0);
    return size;
  }
  clear() {
    this.buckets.forEach((item) => {
      if (item.size()) {
        for (let i = 0; i < item.size(); i++) {
          item.head = null;
        }
      }
    });
  }
  keys() {
    const keysArray = this.buckets.reduce((res, current) => {
      let currNode = current.head;
      for (let i = 0; i < current.size(); i++) {
        res.push(currNode.key);
        currNode = currNode.next;
      }
      return res;
    }, []);
    return keysArray;
  }
  values() {
    const valuesArray = this.buckets.reduce((res, current) => {
      let currNode = current.head;
      for (let i = 0; i < current.size(); i++) {
        res.push(currNode.value);
        currNode = currNode.next;
      }
      return res;
    }, []);
    return valuesArray;
  }
  entries() {
    const keysArray = this.keys();
    const valuesArray = this.values();
    const entriesArray = [];
    for (let i = 0; i < keysArray.length; i++) {
      entriesArray[i] = { key: keysArray[i], value: valuesArray[i] };
    }
    return entriesArray;
  }
}

const hashMap = new HashMap();
console.log(hashMap.hash("Bilel"));
console.log(hashMap.set("Bilel", "Hello world"));
console.log(hashMap.set("Rachid", "world"));
console.log(hashMap.set("Latifa", "Hi"));
console.log(hashMap.set("Abdellah", "What's up?"));
console.log(hashMap.set("Muhammad", "Hello guys"));
console.log(hashMap);
console.log(hashMap.get("Bilel"));
console.log(hashMap.has("Bilel"));
console.log(hashMap.remove("Bilel"));
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.length());
hashMap.clear();
console.log(hashMap);
