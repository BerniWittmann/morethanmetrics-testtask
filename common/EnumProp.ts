export default function EnumProp<T extends string | number>(d: T, e: Record<any, any>) {
  return {
    default: d,
    validator(v: T) {
      return Object.values(e).includes(v)
    }
  }
}
