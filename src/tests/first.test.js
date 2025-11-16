import { expect, test } from 'vitest'
import slugify from './sum'

test(() => {
  expect(slugify("Hello Hitesh Choudhary")).toBe("hello-hitesh-choudhary")
})