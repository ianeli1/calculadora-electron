export class ByteArray {
  data: Uint8Array;

  //byte can be created with number arr or string
  constructor(content: number[] | string) {
    if (typeof content[0] === "number") {
      const numberArray = content as number[];
      for (const elem of numberArray) {
        if (elem > 255 || elem < 0) {
          throw new Error(`Integer overflow: ${elem} doesn't fit in 8 bits`);
        }
      }
      this.data = new Uint8Array(numberArray);
    } else {
      const contentArray = [...(content as string)];
      const arr = [];
      for (const letra of contentArray) {
        const charCode = letra.charCodeAt(0);
        if (charCode > 255 || charCode < 0) {
          throw new Error(
            `Integer overflow, char code of "${letra}" doesn't fit in 8 bits`
          );
        } else {
          arr.push(charCode);
        }
      }

      this.data = new Uint8Array(arr);
    }
  }

  serialize(): Buffer {
    return Buffer.from(this.data.buffer);
  }
}

